import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from 'src/modules/users/entities/ratings.entity';
import { Repository } from 'typeorm';

/* @Injectable()
export class RatingsService {}
 */

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepo: Repository<Rating>,
  ) {}

  create(data: Partial<Rating>) {
    const usuario = this.ratingRepo.create(data);
    return this.ratingRepo.save(usuario);
  }

  findAll() {
    return this.ratingRepo.find();
  }

  findOne(id: number) {
    return this.ratingRepo.findOneBy({ rating_id: id });
  }

  update(id: number, data: Partial<Rating>) {
    return this.ratingRepo.update({ rating_id: id }, data);
  }

  remove(id: number) {
    return this.ratingRepo.delete({ rating_id: id });
  }
}
