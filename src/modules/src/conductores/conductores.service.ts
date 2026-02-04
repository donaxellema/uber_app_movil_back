import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conductor } from 'src/modules/users/entities/conductores.entity';
import { Repository } from 'typeorm';

/* @Injectable()
export class ConductoresService {}
 */
@Injectable()
export class ConductoresService {
  constructor(
    @InjectRepository(Conductor)
    private readonly conductorRepo: Repository<Conductor>,
  ) {}

  create(data: Partial<Conductor>) {
    const usuario = this.conductorRepo.create(data);
    return this.conductorRepo.save(usuario);
  }

  findAll() {
    return this.conductorRepo.find();
  }

  findOne(id: number) {
    return this.conductorRepo.findOneBy({ conduct_id: id });
  }

  update(id: number, data: Partial<Conductor>) {
    return this.conductorRepo.update({ conduct_id: id }, data);
  }

  remove(id: number) {
    return this.conductorRepo.delete({ conduct_id: id });
  }
}