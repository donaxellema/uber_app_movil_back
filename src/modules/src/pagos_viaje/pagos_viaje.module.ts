import { Module } from '@nestjs/common';
import { PagosViajeService } from './pagos_viaje.service';
import { PagosViajeController } from './pagos_viaje.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoViaje } from 'src/modules/users/entities/pagos_viaje.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PagoViaje])],
  providers: [PagosViajeService],
  controllers: [PagosViajeController],
  exports: [PagosViajeService]
})
export class PagosViajeModule {}
