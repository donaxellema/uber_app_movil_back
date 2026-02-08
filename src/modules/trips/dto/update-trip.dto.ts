import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TripStatus } from '../../../common/enums/trip-status.enum';

export class UpdateTripDto {
  @IsEnum(TripStatus)
  @IsOptional()
  status?: TripStatus;

  @IsString()
  @IsOptional()
  cancellationReason?: string;
}
