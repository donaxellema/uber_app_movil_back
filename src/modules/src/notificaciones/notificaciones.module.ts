import { Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesController } from './notificaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionE } from 'src/modules/users/entities/notificaciones.enity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificacionE])],
  providers: [NotificacionesService],
  controllers: [NotificacionesController],
  exports:[NotificacionesService]
})
export class NotificacionesModule {}
