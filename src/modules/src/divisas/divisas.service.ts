import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Divisa } from 'src/modules/users/entities/divisas.entity';
import { Repository } from 'typeorm';

/* @Injectable()
export class DivisasService {} */

@Injectable()
export class DivisasService {
  constructor(
    @InjectRepository(Divisa)
    private readonly usuarioRepo: Repository<Divisa>,
  ) {}

  create(data: Partial<Divisa>) {
    const usuario = this.usuarioRepo.create(data);
    return this.usuarioRepo.save(usuario);
  }

  findAll() {
    return this.usuarioRepo.find();
  }

  findOne(id: number) {
    return this.usuarioRepo.findOneBy({ divisa_id: id });
  }

  update(id: number, data: Partial<Divisa>) {
    return this.usuarioRepo.update({ divisa_id: id }, data);
  }

  remove(id: number) {
    return this.usuarioRepo.delete({ divisa_id: id });
  }
}
