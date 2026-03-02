import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViajeService } from './viaje.service';
import { ViajeController } from './viaje.controller';
import { Viaje } from 'src/modules/users/entities/viaje.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Viaje])],
  providers: [ViajeService],
  controllers: [ViajeController],
  exports: [ViajeService],
})
export class ViajeModule {}
