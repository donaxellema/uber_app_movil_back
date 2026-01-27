import { Module } from '@nestjs/common';
import { PerfilesService } from './perfiles.service';
import { PerfilesController } from './perfiles.controller';

@Module({
  providers: [PerfilesService],
  controllers: [PerfilesController]
})
export class PerfilesModule {}
