import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { HomePageModule } from './home_page/home_page.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDB_URI } from './config/mongoDB';

@Module({
  imports: [
    MongooseModule.forRoot(mongoDB_URI),
    HomePageModule,
    ProductModule,
    ContactModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
