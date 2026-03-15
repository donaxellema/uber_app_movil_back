import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/base.entity';
import { VehicleCategory } from '../../../common/enums/vehicle-category.enum';
import { Driver } from '../../drivers/entities/driver.entity';

@Entity('vehicles')
export class Vehicle extends AbstractEntity {
  @ManyToOne(() => Driver, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column({ name: 'driver_id' })
  driverId: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column({ unique: true })
  plate: string;

  @Column()
  color: string;

  @Column({
    type: 'enum',
    enum: VehicleCategory,
    default: VehicleCategory.ECONOMY,
  })
  category: VehicleCategory;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;
  
  // Document status
  @Column({ name: 'soat_verified', default: false })
  soatVerified: boolean;

  @Column({ name: 'technical_revision_verified', default: false })
  technicalRevisionVerified: boolean;
}
