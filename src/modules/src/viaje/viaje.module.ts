import { Module } from '@nestjs/common';
import { ViajeService } from './viaje.service';
import { ViajeController } from './viaje.controller';

@Module({
  providers: [ViajeService],
  controllers: [ViajeController]
})
export class ViajeModule {}
