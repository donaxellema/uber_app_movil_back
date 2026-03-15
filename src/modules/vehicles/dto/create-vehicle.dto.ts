import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { VehicleCategory } from '../../../common/enums/vehicle-category.enum';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @Min(1990)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @IsString()
  @IsNotEmpty()
  plate: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsEnum(VehicleCategory)
  @IsNotEmpty()
  category: VehicleCategory;

  @IsOptional()
  isActive?: boolean;
}
