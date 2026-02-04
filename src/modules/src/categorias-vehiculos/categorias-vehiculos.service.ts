import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaVehiculo } from 'src/modules/users/entities/categorias-vehiculo.entity';
import { Repository } from 'typeorm';
/* 
@Injectable()
export class CategoriasVehiculosService {}
 */

@Injectable()
export class CategoriasVehiculosService {
  constructor(
    @InjectRepository(CategoriaVehiculo)
    private readonly categoVehiRepo: Repository<CategoriaVehiculo>,
  ) {}

  create(data: Partial<CategoriaVehiculo>) {
    const categoriasVehi = this.categoVehiRepo.create(data);
    return this.categoVehiRepo.save(categoriasVehi);
  }

  findAll() {
    return this.categoVehiRepo.find();
  }

  findOne(id: number) {
    return this.categoVehiRepo.findOneBy({ catego_id: id });
  }

  update(id: number, data: Partial<CategoriaVehiculo>) {
    return this.categoVehiRepo.update({ catego_id: id }, data);
  }

  remove(id: number) {
    return this.categoVehiRepo.delete({ catego_id: id });
  }
}

