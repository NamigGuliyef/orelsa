import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { subscribeModel } from 'src/subscribe/model/subscribe.schema';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';
import { contactModel } from 'src/contact/model/contact.schema';
import { productModel } from 'src/product/model/product.schema';
import { HomeBrowseRangeModel, homeNewCollectionModel } from 'src/home_page/model/home.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'subscribe', schema: subscribeModel },
      { name: 'contact', schema: contactModel },
      { name: 'product', schema: productModel },
      { name: 'home-newCollection', schema: homeNewCollectionModel },
      { name: 'home-browseRange', schema: HomeBrowseRangeModel },

    ]),
  ],
  providers: [GuestService],
  controllers: [GuestController],
})
export class GuestModule {}
