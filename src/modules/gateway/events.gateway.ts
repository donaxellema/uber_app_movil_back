import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TripsService } from '../trips/trips.service';
import { CreateTripDto } from '../trips/dto/create-trip.dto';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedDrivers: Map<string, string> = new Map(); // driverId -> socketId
  private connectedUsers: Map<string, string> = new Map(); // userId -> socketId
  private driverLocations: Map<string, { lat: number; lng: number }> = new Map();

  constructor(
    private readonly jwtService: JwtService,
    private readonly tripsService: TripsService,
    private readonly configService: ConfigService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];
      
      if (!token) {
        client.disconnect();
        return;
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      client.data.userId = payload.sub;
      client.data.role = payload.role;

      if (payload.role === 'DRIVER') {
        this.connectedDrivers.set(payload.sub, client.id);
        client.join('drivers');
      } else if (payload.role === 'USER') {
        this.connectedUsers.set(payload.sub, client.id);
        client.join('users');
      }

      console.log(`Client connected: ${client.id} (${payload.role})`);
    } catch (error) {
      console.error('Connection error:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    const role = client.data.role;

    if (role === 'DRIVER') {
      this.connectedDrivers.delete(userId);
      this.driverLocations.delete(userId);
    } else if (role === 'USER') {
      this.connectedUsers.delete(userId);
    }

    console.log(`Client disconnected: ${client.id}`);
  }

  // Usuario solicita viaje
  @SubscribeMessage('trip:request')
  async handleTripRequest(
    @ConnectedSocket() client: Socket,
    @MessageBody() createTripDto: CreateTripDto,
  ) {
    try {
      const userId = client.data.userId;
      
      // Verificar si el usuario ya tiene un viaje activo
      const activeTrip = await this.tripsService.findActiveByUser(userId);
      if (activeTrip) {
        return { error: 'You already have an active trip' };
      }

      // Crear viaje
      const trip = await this.tripsService.create(userId, createTripDto);

      // Notificar a conductores cercanos
      this.server.to('drivers').emit('trip:new', {
        tripId: trip.id,
        origin: {
          lat: trip.originLat,
          lng: trip.originLng,
          address: trip.originAddress,
        },
        destination: {
          lat: trip.destinationLat,
          lng: trip.destinationLng,
          address: trip.destinationAddress,
        },
        vehicleCategory: trip.vehicleCategory,
        basePrice: trip.basePrice,
      });

      return { success: true, trip };
    } catch (error) {
      return { error: error.message };
    }
  }

  // Conductor acepta viaje
  @SubscribeMessage('trip:accept')
  async handleTripAccept(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { tripId: string },
  ) {
    try {
      const driverId = client.data.userId;

      // Verificar si el conductor ya tiene un viaje activo
      const activeTrip = await this.tripsService.findActiveByDriver(driverId);
      if (activeTrip) {
        return { error: 'You already have an active trip' };
      }

      const trip = await this.tripsService.assignDriver(data.tripId, driverId);

      // Notificar al usuario
      const userSocketId = this.connectedUsers.get(trip.userId);
      if (userSocketId) {
        this.server.to(userSocketId).emit('trip:accepted', {
          tripId: trip.id,
          driver: trip.driver,
          acceptedAt: trip.acceptedAt,
        });
      }

      // Notificar a otros conductores que el viaje ya fue tomado
      this.server.to('drivers').emit('trip:taken', { tripId: trip.id });

      return { success: true, trip };
    } catch (error) {
      return { error: error.message };
    }
  }

  // Conductor inicia viaje
  @SubscribeMessage('trip:start')
  async handleTripStart(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { tripId: string },
  ) {
    try {
      const driverId = client.data.userId;
      const trip = await this.tripsService.startTrip(data.tripId, driverId);

      // Notificar al usuario
      const userSocketId = this.connectedUsers.get(trip.userId);
      if (userSocketId) {
        this.server.to(userSocketId).emit('trip:started', {
          tripId: trip.id,
          startedAt: trip.startedAt,
        });
      }

      return { success: true, trip };
    } catch (error) {
      return { error: error.message };
    }
  }

  // Conductor completa viaje
  @SubscribeMessage('trip:complete')
  async handleTripComplete(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { tripId: string },
  ) {
    try {
      const driverId = client.data.userId;
      const trip = await this.tripsService.completeTrip(data.tripId, driverId);

      // Notificar al usuario
      const userSocketId = this.connectedUsers.get(trip.userId);
      if (userSocketId) {
        this.server.to(userSocketId).emit('trip:completed', {
          tripId: trip.id,
          completedAt: trip.completedAt,
          finalPrice: trip.finalPrice,
        });
      }

      return { success: true, trip };
    } catch (error) {
      return { error: error.message };
    }
  }

  // Cancelar viaje
  @SubscribeMessage('trip:cancel')
  async handleTripCancel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { tripId: string; reason?: string },
  ) {
    try {
      const userId = client.data.userId;
      const trip = await this.tripsService.cancelTrip(userId, userId, {
        cancellationReason: data.reason,
      });

      // Notificar a la otra parte
      if (trip.driverId) {
        const driverSocketId = this.connectedDrivers.get(trip.driverId);
        if (driverSocketId) {
          this.server.to(driverSocketId).emit('trip:cancelled', {
            tripId: trip.id,
            cancelledBy: trip.cancelledBy,
            reason: trip.cancellationReason,
          });
        }
      }

      if (trip.userId !== userId) {
        const userSocketId = this.connectedUsers.get(trip.userId);
        if (userSocketId) {
          this.server.to(userSocketId).emit('trip:cancelled', {
            tripId: trip.id,
            cancelledBy: trip.cancelledBy,
            reason: trip.cancellationReason,
          });
        }
      }

      return { success: true, trip };
    } catch (error) {
      return { error: error.message };
    }
  }

  // Actualizar ubicación del conductor
  @SubscribeMessage('driver:location')
  handleDriverLocation(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { lat: number; lng: number; tripId?: string },
  ) {
    const driverId = client.data.userId;
    this.driverLocations.set(driverId, { lat: data.lat, lng: data.lng });

    // Si hay un tripId, notificar al usuario
    if (data.tripId) {
      this.server.emit('driver:location:update', {
        driverId,
        lat: data.lat,
        lng: data.lng,
        tripId: data.tripId,
      });
    }

    // Broadcast a todos los usuarios las ubicaciones de conductores disponibles
    this.server.to('users').emit('drivers:nearby', {
      driverId,
      lat: data.lat,
      lng: data.lng,
    });
  }

  // Obtener conductores cercanos
  @SubscribeMessage('drivers:getNearby')
  handleGetNearbyDrivers(@ConnectedSocket() client: Socket) {
    const drivers = Array.from(this.driverLocations.entries()).map(([driverId, location]) => ({
      driverId,
      ...location,
    }));

    return { drivers };
  }
}
