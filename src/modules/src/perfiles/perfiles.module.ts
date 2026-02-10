import { Module } from '@nestjs/common';
import { PerfilesService } from './perfiles.service';
import { PerfilesController } from './perfiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfil } from 'src/modules/users/entities/perfiles.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Perfil])],
  providers: [PerfilesService],
  controllers: [PerfilesController],
  exports: [PerfilesService]
})
export class PerfilesModule {}
