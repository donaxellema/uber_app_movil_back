import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReclamosService } from './reclamos.service';
import { ReclamosController } from './reclamos.controller';
import { Reclamo } from 'src/modules/users/entities/reclamos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reclamo])],
  providers: [ReclamosService],
  controllers: [ReclamosController],
  exports: [ReclamosService],
})
export class ReclamosModule {}
