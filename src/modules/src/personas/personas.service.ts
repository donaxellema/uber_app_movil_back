import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from 'src/modules/users/entities/personas.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PersonasService {

constructor(
    @InjectRepository(Persona)
    private readonly personasRepository: Repository<Persona>,
    ) {}

create(data: Partial<Persona>) {
    const persona = this.personasRepository.create(data);
    return this.personasRepository.save(persona);
  }

  
  findAll() {
    return this.personasRepository.find();
  }

  findOne(id: number) {
    return this.personasRepository.findOneBy({ person_id: id });
  }

  update(id: number, data: Partial<Persona>) {
    return this.personasRepository.update({ person_id: id }, data);
  }

  remove(id: number) {
    return this.personasRepository.delete({ person_id: id });
  }


}
