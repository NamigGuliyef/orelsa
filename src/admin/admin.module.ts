import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  HomeBrowseRangeModel,
  homeNewCollectionModel,
} from 'src/home_page/model/home.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { productModel } from 'src/product/model/product.schema';
import { subscribeModel } from 'src/subscribe/model/subscribe.schema';
import { contactModel } from 'src/contact/model/contact.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'home-newCollection', schema: homeNewCollectionModel },
      { name: 'home-browseRange', schema: HomeBrowseRangeModel },
      { name: 'product', schema: productModel },
      { name: 'subscribe', schema: subscribeModel },
      { name: 'contact', schema: contactModel }
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
