import { Module } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { VehiculosController } from './vehiculos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculo } from 'src/modules/users/entities/vehiculos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehiculo])],
  providers: [VehiculosService],
  controllers: [VehiculosController],
  exports: [VehiculosService]
})
export class VehiculosModule {}
