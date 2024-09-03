import { MailerModule } from '@nestjs-modules/mailer';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { mongoDB_URI } from './config/mongoDB';
import { ContactModule } from './contact/contact.module';
import { GuestModule } from './guest/guest.module';
import { HomePageModule } from './home_page/home_page.module';
import { adminMiddleware } from './middleware/admin';
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(adminMiddleware).forRoutes(AdminController)
  }
}
