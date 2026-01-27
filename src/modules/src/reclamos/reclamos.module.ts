import { Module } from '@nestjs/common';
import { ReclamosService } from './reclamos.service';
import { ReclamosController } from './reclamos.controller';

@Module({
  providers: [ReclamosService],
  controllers: [ReclamosController]
})
export class ReclamosModule {}
