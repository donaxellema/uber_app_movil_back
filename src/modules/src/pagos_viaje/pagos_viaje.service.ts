import { Injectable } from '@nestjs/common';
import { PagosViajeModule } from './pagos_viaje.module';
import { PagoViaje } from 'src/modules/users/entities/pagos_viaje.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* @Injectable()
export class PagosViajeService {} */

@Injectable()
export class PagosViajeService {
  constructor(
    @InjectRepository(PagoViaje)
    private readonly pagosViajeRepo: Repository<PagoViaje>,
  ) {}

  create(data: Partial<PagoViaje>) {
    const pagoViaje = this.pagosViajeRepo.create(data);
    return this.pagosViajeRepo.save(pagoViaje);
  }

  findAll() {
    return this.pagosViajeRepo.find();
  }

  findOne(id: number) {
    return this.pagosViajeRepo.findOneBy({ pagos_id: id });
  }

  update(id: number, data: Partial<PagoViaje>) {
    return this.pagosViajeRepo.update({ pagos_id: id }, data);
  }

  remove(id: number) {
    return this.pagosViajeRepo.delete({ pagos_id: id });
  }
}
