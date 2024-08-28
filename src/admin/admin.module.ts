import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  HomeBrowseRangeModel,
  homeNewCollectionModel,
} from 'src/home_page/model/home.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { productModel } from 'src/product/model/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'home-newCollection', schema: homeNewCollectionModel },
      { name: 'home-browseRange', schema: HomeBrowseRangeModel },
      { name: 'product', schema: productModel },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
