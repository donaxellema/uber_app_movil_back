import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Documento } from 'src/modules/users/entities/documentos.entity';
import { Repository } from 'typeorm';

/* @Injectable()
export class DocumentosService {}
 */

@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(Documento)
    private readonly documentoRepo: Repository<Documento>,
  ) {}

  create(data: Partial<Documento>) {
    const documentos = this.documentoRepo.create(data);
    return this.documentoRepo.save(documentos);
  }

  findAll() {
    return this.documentoRepo.find();
  }

  findOne(id: number) {
    return this.documentoRepo.findOneBy({ docume_id: id });
  }

  update(id: number, data: Partial<Documento>) {
    return this.documentoRepo.update({ docume_id: id }, data);
  }

  remove(id: number) {
    return this.documentoRepo.delete({ docume_id: id });
  }
}


