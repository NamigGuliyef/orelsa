import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Home } from './model/home.schema';

@Injectable()
export class HomePageService {

  constructor(@InjectModel('home') private readonly homeModel: Model<Home>) { }

  // home menyu hissə başlıq




}
