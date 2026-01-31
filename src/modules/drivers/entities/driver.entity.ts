import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/base.entity';
import { DriverStatus } from '../../../common/enums/driver-status.enum';
import { User } from '../../users/entities/user.entity';

@Entity('drivers')
export class Driver extends AbstractEntity {
  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: DriverStatus,
    default: DriverStatus.OFFLINE,
  })
  status: DriverStatus;

  // Other driver-specific fields can be added here
  // e.g., license_number, vehicle_id, etc.
}
