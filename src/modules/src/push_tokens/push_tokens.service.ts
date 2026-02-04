import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PushTokenFCM } from 'src/modules/users/entities/push_tokens_fcm.entity';
import { Repository } from 'typeorm';

/* @Injectable()
export class PushTokensService {} */

@Injectable()
export class PushTokensService {
  constructor(
    @InjectRepository(PushTokenFCM)
    private readonly pushTokenRepo: Repository<PushTokenFCM>,
  ) {}

  create(data: Partial<PushTokenFCM>) {
    const tokens = this.pushTokenRepo.create(data);
    return this.pushTokenRepo.save(tokens);
  }

  findAll() {
    return this.pushTokenRepo.find();
  }

  findOne(id: number) {
    return this.pushTokenRepo.findOneBy({ fcm_id: id });
  }

  update(id: number, data: Partial<PushTokenFCM>) {
    return this.pushTokenRepo.update({ fcm_id: id }, data);
  }

  remove(id: number) {
    return this.pushTokenRepo.delete({ fcm_id: id });
  }
}
