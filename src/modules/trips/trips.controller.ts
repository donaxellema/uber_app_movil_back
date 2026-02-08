import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { RateTripDto } from './dto/rate-trip.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { UserRole } from '../../common/enums/user-role.enum';

@Controller('trips')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  // Usuario crea viaje
  @Post()
  @Roles(UserRole.USER)
  create(@GetUser('id') userId: string, @Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(userId, createTripDto);
  }

  // Conductor acepta viaje
  @Post(':id/accept')
  @Roles(UserRole.DRIVER)
  acceptTrip(@Param('id') tripId: string, @GetUser('id') driverId: string) {
    return this.tripsService.assignDriver(tripId, driverId);
  }

  // Conductor inicia viaje
  @Post(':id/start')
  @Roles(UserRole.DRIVER)
  startTrip(@Param('id') tripId: string, @GetUser('id') driverId: string) {
    return this.tripsService.startTrip(tripId, driverId);
  }

  // Conductor completa viaje
  @Post(':id/complete')
  @Roles(UserRole.DRIVER)
  completeTrip(@Param('id') tripId: string, @GetUser('id') driverId: string) {
    return this.tripsService.completeTrip(tripId, driverId);
  }

  // Cancelar viaje
  @Patch(':id/cancel')
  @Roles(UserRole.USER, UserRole.DRIVER)
  cancelTrip(
    @Param('id') tripId: string,
    @GetUser('id') userId: string,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripsService.cancelTrip(tripId, userId, updateTripDto);
  }

  // Calificar viaje
  @Post(':id/rate')
  @Roles(UserRole.USER)
  rateTrip(
    @Param('id') tripId: string,
    @GetUser('id') userId: string,
    @Body() rateTripDto: RateTripDto,
  ) {
    return this.tripsService.rateTrip(tripId, userId, rateTripDto);
  }

  // Obtener viajes del usuario
  @Get('my-trips')
  @Roles(UserRole.USER)
  getMyTrips(@GetUser('id') userId: string) {
    return this.tripsService.findByUser(userId);
  }

  // Obtener viaje activo del usuario
  @Get('active')
  @Roles(UserRole.USER)
  getActiveTrip(@GetUser('id') userId: string) {
    return this.tripsService.findActiveByUser(userId);
  }

  // Obtener viajes del conductor
  @Get('driver/trips')
  @Roles(UserRole.DRIVER)
  getDriverTrips(@GetUser('id') driverId: string) {
    return this.tripsService.findByDriver(driverId);
  }

  // Obtener viaje activo del conductor
  @Get('driver/active')
  @Roles(UserRole.DRIVER)
  getDriverActiveTrip(@GetUser('id') driverId: string) {
    return this.tripsService.findActiveByDriver(driverId);
  }

  // Obtener viajes solicitados (para matching)
  @Get('requested')
  @Roles(UserRole.DRIVER, UserRole.ADMIN)
  getRequestedTrips() {
    return this.tripsService.findRequested();
  }

  // Obtener detalle de un viaje
  @Get(':id')
  @Roles(UserRole.USER, UserRole.DRIVER, UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.tripsService.findOne(id);
  }
}
