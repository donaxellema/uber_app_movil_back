import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Viaje } from 'src/modules/users/entities/viaje.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ViajeService {
  constructor(
    @InjectRepository(Viaje)
    private readonly viajeRepo: Repository<Viaje>,
  ) {}

  create(data: Partial<Viaje>) {
    const viajes = this.viajeRepo.create(data);
    return this.viajeRepo.save(viajes);
  }

  findAll() {
    return this.viajeRepo.find();
  }

  findOne(id: number) {
    return this.viajeRepo.findOneBy({ viaje_id: id });
  }

  update(id: number, data: Partial<Viaje>) {
    return this.viajeRepo.update({ viaje_id: id }, data);
  }

  remove(id: number) {
    return this.viajeRepo.delete({ viaje_id: id });
  }
}

