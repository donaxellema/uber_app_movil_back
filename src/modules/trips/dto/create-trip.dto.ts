import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { VehicleCategory } from '../../../common/enums/vehicle-category.enum';
import { PaymentMethod } from '../../../common/enums/payment-method.enum';

export class CreateTripDto {
  @IsNumber()
  @IsNotEmpty()
  originLat: number;

  @IsNumber()
  @IsNotEmpty()
  originLng: number;

  @IsString()
  @IsNotEmpty()
  originAddress: string;

  @IsNumber()
  @IsNotEmpty()
  destinationLat: number;

  @IsNumber()
  @IsNotEmpty()
  destinationLng: number;

  @IsString()
  @IsNotEmpty()
  destinationAddress: string;

  @IsEnum(VehicleCategory)
  @IsNotEmpty()
  vehicleCategory: VehicleCategory;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;
}
