import { Module } from '@nestjs/common';
import { DivisasService } from './divisas.service';
import { DivisasController } from './divisas.controller';
import { Divisa } from 'src/modules/users/entities/divisas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Divisa])],
  providers: [DivisasService],
  controllers: [DivisasController],
  exports: [DivisasService],

})
export class DivisasModule {}
