import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificacionE } from 'src/modules/users/entities/notificaciones.enity';
import { Repository } from 'typeorm';

/* @Injectable()
export class NotificacionesService {}
 */

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(NotificacionE)
    private readonly notificaRepo: Repository<NotificacionE>,
  ) {}

  create(data: Partial<NotificacionE>) {
    const notificacionesC = this.notificaRepo.create(data);
    return this.notificaRepo.save(notificacionesC);
  }

  findAll() {
    return this.notificaRepo.find();
  }

  findOne(id: number) {
    return this.notificaRepo.findOneBy({ notifica_id: id });
  }

  update(id: number, data: Partial<NotificacionE>) {
    return this.notificaRepo.update({ notifica_id: id }, data);
  }

  remove(id: number) {
    return this.notificaRepo.delete({ notifica_id: id });
  }
}

