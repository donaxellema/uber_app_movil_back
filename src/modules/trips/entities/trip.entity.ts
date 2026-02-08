import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AbstractEntity } from '../../../common/entities/base.entity';
import { TripStatus } from '../../../common/enums/trip-status.enum';
import { PaymentMethod } from '../../../common/enums/payment-method.enum';
import { VehicleCategory } from '../../../common/enums/vehicle-category.enum';
import { User } from '../../users/entities/user.entity';
import { Driver } from '../../drivers/entities/driver.entity';

@Entity('trips')
export class Trip extends AbstractEntity {
  // Usuario que solicita el viaje
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  // Conductor asignado
  @ManyToOne(() => Driver, { eager: true, nullable: true })
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column({ name: 'driver_id', nullable: true })
  driverId: string;

  // Ubicaciones
  @Column({ type: 'decimal', precision: 10, scale: 7, name: 'origin_lat' })
  originLat: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, name: 'origin_lng' })
  originLng: number;

  @Column({ name: 'origin_address' })
  originAddress: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, name: 'destination_lat' })
  destinationLat: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, name: 'destination_lng' })
  destinationLng: number;

  @Column({ name: 'destination_address' })
  destinationAddress: string;

  // Información del viaje
  @Column({
    type: 'enum',
    enum: VehicleCategory,
    name: 'vehicle_category',
  })
  vehicleCategory: VehicleCategory;

  @Column({
    type: 'enum',
    enum: TripStatus,
    default: TripStatus.REQUESTED,
  })
  status: TripStatus;

  // Distancia y duración
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  distance: number; // en kilómetros

  @Column({ type: 'int', nullable: true })
  duration: number; // en minutos

  // Precios
  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'base_price' })
  basePrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'final_price', nullable: true })
  finalPrice: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    name: 'payment_method',
  })
  paymentMethod: PaymentMethod;

  // Timestamps del viaje
  @Column({ type: 'timestamp', nullable: true, name: 'accepted_at' })
  acceptedAt: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'started_at' })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'completed_at' })
  completedAt: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'cancelled_at' })
  cancelledAt: Date;

  // Razón de cancelación
  @Column({ nullable: true, name: 'cancellation_reason' })
  cancellationReason: string;

  @Column({ nullable: true, name: 'cancelled_by' })
  cancelledBy: string; // 'user' o 'driver'

  // Calificación
  @Column({ type: 'int', nullable: true })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;
}
