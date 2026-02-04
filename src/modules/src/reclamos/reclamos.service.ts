import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reclamo } from 'src/modules/users/entities/reclamos.entity';
import { Repository } from 'typeorm';

/* @Injectable()
export class ReclamosService {}
 */


@Injectable()
export class ReclamosService {
  constructor(
    @InjectRepository(Reclamo)
    private readonly reclamoRepo: Repository<Reclamo>,
  ) {}

  create(data: Partial<Reclamo>) {
    const reclamos = this.reclamoRepo.create(data);
    return this.reclamoRepo.save(reclamos);
  }

  findAll() {
    return this.reclamoRepo.find();
  }

  findOne(id: number) {
    return this.reclamoRepo.findOneBy({ recla_id: id });
  }

  update(id: number, data: Partial<Reclamo>) {
    return this.reclamoRepo.update({ recla_id: id }, data);
  }

  remove(id: number) {
    return this.reclamoRepo.delete({ recla_id: id });
  }
}
