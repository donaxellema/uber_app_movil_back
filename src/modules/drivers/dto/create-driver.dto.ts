import { IsUUID } from 'class-validator';

export class CreateDriverDto {
  @IsUUID()
  userId: string;
}
