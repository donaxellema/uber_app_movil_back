import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehiculo } from 'src/modules/users/entities/vehiculos.entity';
import { Repository } from 'typeorm';

/* @Injectable()
export class VehiculosService {}
 */

@Injectable()
export class VehiculosService {
  constructor(
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepo: Repository<Vehiculo>,
  ) {}

  create(data: Partial<Vehiculo>) {
    const vehiculos = this.vehiculoRepo.create(data);
    return this.vehiculoRepo.save(vehiculos);
  }

  findAll() {
    return this.vehiculoRepo.find();
  }

  findOne(id: number) {
    return this.vehiculoRepo.findOneBy({ vehiculo_id: id });
  }

  update(id: number, data: Partial<Vehiculo>) {
    return this.vehiculoRepo.update({ vehiculo_id: id }, data);
  }

  remove(id: number) {
    return this.vehiculoRepo.delete({ vehiculo_id: id });
  }
}

