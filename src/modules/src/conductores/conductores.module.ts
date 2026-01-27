import { Module } from '@nestjs/common';
import { ConductoresService } from './conductores.service';
import { ConductoresController } from './conductores.controller';

@Module({
  providers: [ConductoresService],
  controllers: [ConductoresController]
})
export class ConductoresModule {}
