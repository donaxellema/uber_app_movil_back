import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagosViajeService } from './pagos_viaje.service';
import { PagosViajeController } from './pagos_viaje.controller';
import { PagoViaje } from 'src/modules/users/entities/pagos_viaje.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PagoViaje])],
  providers: [PagosViajeService],
  controllers: [PagosViajeController],
  exports: [PagosViajeService],
})
export class PagosViajeModule {}
