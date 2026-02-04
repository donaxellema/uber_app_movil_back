import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { Persona } from 'src/modules/users/entities/personas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Persona])],
  providers: [PersonasService],
  controllers: [PersonasController]
})
export class PersonasModule {}



