import { Module } from '@nestjs/common';
import { CategoriasVehiculosService } from './categorias-vehiculos.service';
import { CategoriasVehiculosController } from './categorias-vehiculos.controller';
import { CategoriaVehiculo } from 'src/modules/users/entities/categorias-vehiculo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaVehiculo])],
  providers: [CategoriasVehiculosService],
  controllers: [CategoriasVehiculosController],
  exports: [CategoriasVehiculosService],

})
export class CategoriasVehiculosModule {}
