import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../../../common/enums';

export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password?: string;

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEnum(UserRole)
  role: UserRole;
}
