import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasVehiculosService } from './categorias-vehiculos.service';
import { CategoriasVehiculosController } from './categorias-vehiculos.controller';
import { CategoriaVehiculo } from 'src/modules/users/entities/categorias-vehiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaVehiculo])],
  providers: [CategoriasVehiculosService],
  controllers: [CategoriasVehiculosController],
  exports: [CategoriasVehiculosService],
})
export class CategoriasVehiculosModule {}
