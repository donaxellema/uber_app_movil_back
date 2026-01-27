import { Module } from '@nestjs/common';
import { PushTokensService } from './push_tokens.service';
import { PushTokensController } from './push_tokens.controller';

@Module({
  providers: [PushTokensService],
  controllers: [PushTokensController]
})
export class PushTokensModule {}
