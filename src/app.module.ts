import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongoDB_URI } from './config/mongoDB';
import { ContactModule } from './contact/contact.module';
import { GuestModule } from './guest/guest.module';
import { HomePageModule } from './home_page/home_page.module';
import { ProductModule } from './product/product.module';
import { SubscribeModule } from './subscribe/subscribe.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoDB_URI),
    MailerModule.forRoot({
      transport: {
        port: 587,
        service: "gmail",
        auth: {
          user: "orelsacosmetics@gmail.com",
          pass: "njuprxirtdhgeqlr"
        }
      },
    }),
    HomePageModule,
    ProductModule,
    ContactModule,
    AdminModule,
    SubscribeModule,
    GuestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
