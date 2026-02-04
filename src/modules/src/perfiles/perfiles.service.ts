import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Perfil } from 'src/modules/users/entities/perfiles.entity';
import { Repository } from 'typeorm';

/* @Injectable()
export class PerfilesService {} */

@Injectable()
export class PerfilesService {
  constructor(
    @InjectRepository(Perfil)
    private readonly perfilRepo: Repository<Perfil>,
  ) {}

  create(data: Partial<Perfil>) {
    const perfil = this.perfilRepo.create(data);
    return this.perfilRepo.save(perfil);
  }

  findAll() {
    return this.perfilRepo.find();
  }

  findOne(id: number) {
    return this.perfilRepo.findOneBy({ perfil_id: id });
  }

  update(id: number, data: Partial<Perfil>) {
    return this.perfilRepo.update({ perfil_id: id }, data);
  }

  remove(id: number) {
    return this.perfilRepo.delete({ perfil_id: id });
  }
}

