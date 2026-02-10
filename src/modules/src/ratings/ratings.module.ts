import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from 'src/modules/users/entities/ratings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating])],
  providers: [RatingsService],
  controllers: [RatingsController],
  exports: [RatingsService]
})
export class RatingsModule {}
