import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { homeNewCollectionModel } from 'src/home_page/model/home.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'home', schema: homeNewCollectionModel }])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
