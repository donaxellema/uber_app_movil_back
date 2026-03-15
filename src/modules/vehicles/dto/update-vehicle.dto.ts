import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { VehicleCategory } from '../../../common/enums/vehicle-category.enum';

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsNumber()
  @Min(1990)
  @Max(new Date().getFullYear() + 1)
  year?: number;

  @IsOptional()
  @IsString()
  plate?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsEnum(VehicleCategory)
  category?: VehicleCategory;

  @IsOptional()
  isActive?: boolean;
}
