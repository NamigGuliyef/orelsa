import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { adminModel } from 'src/admin/model/admin.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'admin', schema: adminModel }])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
