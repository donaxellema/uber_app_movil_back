import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/modules/users/entities/usuarios.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  create(data: Partial<Usuario>) {
    const usuario = this.usuarioRepo.create(data);
    return this.usuarioRepo.save(usuario);
  }

  findAll() {
    return this.usuarioRepo.find();
  }

  findOne(id: number) {
    return this.usuarioRepo.findOneBy({ usuario_id: id });
  }

  update(id: number, data: Partial<Usuario>) {
    return this.usuarioRepo.update({ usuario_id: id }, data);
  }

  remove(id: number) {
    return this.usuarioRepo.delete({ usuario_id: id });
  }
}
