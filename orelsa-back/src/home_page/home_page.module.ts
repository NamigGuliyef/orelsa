import { Module } from '@nestjs/common';
import { HomePageController } from './home_page.controller';
import { HomePageService } from './home_page.service';

@Module({
  imports: [],
  providers: [HomePageService],
  controllers: [HomePageController]
})
export class HomePageModule { }
