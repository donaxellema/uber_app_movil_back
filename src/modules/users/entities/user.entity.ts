import { Entity, Column, Index } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/base.entity';
import { UserRole, UserStatus } from '../../../common/enums';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User extends AbstractEntity {
  @Column({ unique: true, nullable: true })
  @Index()
  email?: string;

  @Column({ unique: true, nullable: true })
  @Index()
  phone?: string;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  status: UserStatus;

  @Column({ name: 'email_verified', default: false })
  emailVerified: boolean;

  @Column({ name: 'phone_verified', default: false })
  phoneVerified: boolean;

  @Column({ name: 'profile_image', nullable: true })
  profileImage?: string;

  @Column({ name: 'refresh_token', nullable: true })
  @Exclude()
  refreshToken?: string;

  @Column({ name: 'verification_token', nullable: true })
  @Exclude()
  verificationToken?: string;

  @Column({ name: 'reset_password_token', nullable: true })
  @Exclude()
  resetPasswordToken?: string;

  @Column({ name: 'reset_password_expires', nullable: true })
  resetPasswordExpires?: Date;
}
