import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomePageController } from './home_page/home_page.controller';
import { HomePageService } from './home_page/home_page.service';
import { HomePageModule } from './home_page/home_page.module';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { ContactController } from './contact/contact.controller';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [HomePageModule, ProductModule, ContactModule],
  controllers: [AppController, HomePageController, ProductController, ContactController],
  providers: [AppService, HomePageService],
})
export class AppModule {}
