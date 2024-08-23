import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomePageController } from './home_page.controller';
import { HomePageService } from './home_page.service';
import { homeModel } from './model/home.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'home', schema: homeModel }])],
  providers: [HomePageService],
  controllers: [HomePageController]
})
export class HomePageModule { }
