import { Module } from '@nestjs/common';
import { PushTokensService } from './push_tokens.service';
import { PushTokensController } from './push_tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushTokenFCM } from 'src/modules/users/entities/push_tokens_fcm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PushTokenFCM])],
  providers: [PushTokensService],
  controllers: [PushTokensController],
  exports: [PushTokensService]
})
export class PushTokensModule {}
