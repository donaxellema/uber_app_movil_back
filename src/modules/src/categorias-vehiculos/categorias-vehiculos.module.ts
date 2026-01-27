import { Module } from '@nestjs/common';
import { CategoriasVehiculosService } from './categorias-vehiculos.service';
import { CategoriasVehiculosController } from './categorias-vehiculos.controller';

@Module({
  providers: [CategoriasVehiculosService],
  controllers: [CategoriasVehiculosController]
})
export class CategoriasVehiculosModule {}
