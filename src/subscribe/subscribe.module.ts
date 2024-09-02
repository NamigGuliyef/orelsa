import { Module } from '@nestjs/common';
import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';

@Module({
  imports: [],
  providers: [SubscribeService],
  controllers: [SubscribeController]
})
export class SubscribeModule { }
