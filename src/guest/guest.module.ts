import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { subscribeModel } from 'src/subscribe/model/subscribe.schema';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'subscribe', schema: subscribeModel }])],
  providers: [GuestService],
  controllers: [GuestController]
})
export class GuestModule { }
