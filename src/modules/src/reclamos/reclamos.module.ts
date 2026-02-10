import { Module } from '@nestjs/common';
import { ReclamosService } from './reclamos.service';
import { ReclamosController } from './reclamos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reclamo } from 'src/modules/users/entities/reclamos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reclamo])],
  providers: [ReclamosService],
  controllers: [ReclamosController],
  exports: [ReclamosService]
})
export class ReclamosModule {}
