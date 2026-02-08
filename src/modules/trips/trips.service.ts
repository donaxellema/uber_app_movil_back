import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { RateTripDto } from './dto/rate-trip.dto';
import { TripStatus } from '../../common/enums/trip-status.enum';
import { VehicleCategory } from '../../common/enums/vehicle-category.enum';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}

  // Crear nuevo viaje
  async create(userId: string, createTripDto: CreateTripDto): Promise<Trip> {
    const basePrice = this.calculateBasePrice(
      createTripDto.vehicleCategory,
      this.calculateDistance(
        createTripDto.originLat,
        createTripDto.originLng,
        createTripDto.destinationLat,
        createTripDto.destinationLng,
      ),
    );

    const trip = this.tripRepository.create({
      ...createTripDto,
      userId,
      basePrice,
      status: TripStatus.REQUESTED,
    });

    return this.tripRepository.save(trip);
  }

  // Asignar conductor al viaje
  async assignDriver(tripId: string, driverId: string): Promise<Trip> {
    const trip = await this.findOne(tripId);

    if (trip.status !== TripStatus.REQUESTED) {
      throw new BadRequestException('Trip is not available for assignment');
    }

    trip.driverId = driverId;
    trip.status = TripStatus.ACCEPTED;
    trip.acceptedAt = new Date();

    return this.tripRepository.save(trip);
  }

  // Iniciar viaje
  async startTrip(tripId: string, driverId: string): Promise<Trip> {
    const trip = await this.findOne(tripId);

    if (trip.driverId !== driverId) {
      throw new BadRequestException('You are not assigned to this trip');
    }

    if (trip.status !== TripStatus.ACCEPTED) {
      throw new BadRequestException('Trip cannot be started');
    }

    trip.status = TripStatus.IN_PROGRESS;
    trip.startedAt = new Date();

    return this.tripRepository.save(trip);
  }

  // Completar viaje
  async completeTrip(tripId: string, driverId: string): Promise<Trip> {
    const trip = await this.findOne(tripId);

    if (trip.driverId !== driverId) {
      throw new BadRequestException('You are not assigned to this trip');
    }

    if (trip.status !== TripStatus.IN_PROGRESS) {
      throw new BadRequestException('Trip is not in progress');
    }

    trip.status = TripStatus.COMPLETED;
    trip.completedAt = new Date();
    trip.finalPrice = trip.basePrice; // Por ahora el precio final es igual al base

    return this.tripRepository.save(trip);
  }

  // Cancelar viaje
  async cancelTrip(
    tripId: string,
    userId: string,
    updateTripDto: UpdateTripDto,
  ): Promise<Trip> {
    const trip = await this.findOne(tripId);

    if (trip.userId !== userId && trip.driverId !== userId) {
      throw new BadRequestException('You are not authorized to cancel this trip');
    }

    if (trip.status === TripStatus.COMPLETED || trip.status === TripStatus.CANCELLED) {
      throw new BadRequestException('Trip cannot be cancelled');
    }

    trip.status = TripStatus.CANCELLED;
    trip.cancelledAt = new Date();
    if (updateTripDto.cancellationReason) {
      trip.cancellationReason = updateTripDto.cancellationReason;
    }
    trip.cancelledBy = trip.userId === userId ? 'user' : 'driver';

    return this.tripRepository.save(trip);
  }

  // Calificar viaje
  async rateTrip(tripId: string, userId: string, rateTripDto: RateTripDto): Promise<Trip> {
    const trip = await this.findOne(tripId);

    if (trip.userId !== userId) {
      throw new BadRequestException('You are not authorized to rate this trip');
    }

    if (trip.status !== TripStatus.COMPLETED) {
      throw new BadRequestException('Only completed trips can be rated');
    }

    trip.rating = rateTripDto.rating;
    if (rateTripDto.comment) {
      trip.comment = rateTripDto.comment;
    }

    return this.tripRepository.save(trip);
  }

  // Buscar todos los viajes de un usuario
  async findByUser(userId: string): Promise<Trip[]> {
    return this.tripRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  // Buscar todos los viajes de un conductor
  async findByDriver(driverId: string): Promise<Trip[]> {
    return this.tripRepository.find({
      where: { driverId },
      order: { createdAt: 'DESC' },
    });
  }

  // Buscar viaje activo de un usuario
  async findActiveByUser(userId: string): Promise<Trip | null> {
    return this.tripRepository.findOne({
      where: [
        { userId, status: TripStatus.REQUESTED },
        { userId, status: TripStatus.ACCEPTED },
        { userId, status: TripStatus.IN_PROGRESS },
      ],
    });
  }

  // Buscar viaje activo de un conductor
  async findActiveByDriver(driverId: string): Promise<Trip | null> {
    return this.tripRepository.findOne({
      where: [
        { driverId, status: TripStatus.ACCEPTED },
        { driverId, status: TripStatus.IN_PROGRESS },
      ],
    });
  }

  // Buscar viajes solicitados (para matching)
  async findRequested(): Promise<Trip[]> {
    return this.tripRepository.find({
      where: { status: TripStatus.REQUESTED },
      order: { createdAt: 'ASC' },
    });
  }

  // Buscar un viaje por ID
  async findOne(id: string): Promise<Trip> {
    const trip = await this.tripRepository.findOne({ where: { id } });

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    return trip;
  }

  // Calcular precio base
  private calculateBasePrice(category: VehicleCategory, distance: number): number {
    const rates = {
      [VehicleCategory.ECONOMY]: { base: 5000, perKm: 1500 },
      [VehicleCategory.COMFORT]: { base: 8000, perKm: 2000 },
      [VehicleCategory.XL]: { base: 12000, perKm: 2500 },
      [VehicleCategory.MOTO]: { base: 3000, perKm: 1000 },
      [VehicleCategory.VAN]: { base: 15000, perKm: 3000 },
    };

    const rate = rates[category];
    return rate.base + rate.perKm * distance;
  }

  // Calcular distancia usando fórmula de Haversine
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 100) / 100; // Redondear a 2 decimales
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
