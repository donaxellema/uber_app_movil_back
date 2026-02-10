import { Module } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';
import { Documento } from 'src/modules/users/entities/documentos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Documento])],
  providers: [DocumentosService],
  controllers: [DocumentosController],
  exports: [DocumentosService],

})
export class DocumentosModule {}
