import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomePageController } from './home_page/home_page.controller';
import { HomePageService } from './home_page/home_page.service';
import { HomePageModule } from './home_page/home_page.module';

@Module({
  imports: [HomePageModule],
  controllers: [AppController, HomePageController],
  providers: [AppService, HomePageService],
})
export class AppModule {}
