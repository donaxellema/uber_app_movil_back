import { Module } from '@nestjs/common';
import { ConductoresService } from './conductores.service';
import { ConductoresController } from './conductores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conductor } from 'src/modules/users/entities/conductores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conductor])],
  providers: [ConductoresService],
  controllers: [ConductoresController],
  exports: [ConductoresService],
})
export class ConductoresModule {}
