import { Module } from '@nestjs/common';
import { PagosViajeService } from './pagos_viaje.service';
import { PagosViajeController } from './pagos_viaje.controller';

@Module({
  providers: [PagosViajeService],
  controllers: [PagosViajeController]
})
export class PagosViajeModule {}
