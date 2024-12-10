import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { model, Model } from 'mongoose';
import { CreateContact } from '../contact/dto/contact.dto';
import { Contact } from '../contact/model/contact.schema';
import {
  HomeBrowseRange,
  HomeNewCollection,
} from '../home_page/model/home.schema';
import { Product } from '../product/model/product.schema';
import { createSubscribeDto } from '../subscribe/dto/subscribe.dto';
import { Subscribe } from '../subscribe/model/subscribe.schema';
import { MessageResponse } from '../utils/messagetype';
import { productSearch } from './query.types';

@Injectable()
export class GuestService {
  constructor(
    @InjectModel('subscribe') private readonly subscribeModel: Model<Subscribe>,
    @InjectModel('contact') private readonly contactModel: Model<Contact>,
    @InjectModel('product') private readonly productModel: Model<Product>,
    @InjectModel('home-newCollection')
    private readonly homeNewCollectionModel: Model<HomeNewCollection>,
    @InjectModel('home-browseRange')
    private readonly homeBrowseRangeModel: Model<HomeBrowseRange>,
    private mailerService: MailerService,
  ) {}

  // subscribe
  async subscribe(
    CreateSubscribeDto: createSubscribeDto,
  ): Promise<MessageResponse> {
    const existEmail = await this.subscribeModel.findOne({
      email: CreateSubscribeDto.email,
    });
    if (existEmail) {
      throw new HttpException(
        'Qeyd etdiyiniz mail adresi ilə artıq abunə olmusunuz.',
        HttpStatus.CONFLICT,
      );
    }
    await this.subscribeModel.create(CreateSubscribeDto);
    this.mailerService.sendMail({
      from: `${CreateSubscribeDto.email}`,
      to: 'orelsacosmetics@gmail.com',
      subject: 'Yeni abunəlik',
      text: `Yeni abunəlik: ${CreateSubscribeDto.email}`,
    });
    return { message: 'Abunləyiniz üçün təşəkkür edirik 🙏' };
  }

  // Bizimlə əlaqə bölməsinin doldurulması
  async contactUs(createContact: CreateContact): Promise<MessageResponse> {
    const { name, email } = createContact;
    const contactUs = await this.contactModel.findOne({ name, email });
    if (contactUs)
      throw new HttpException(
        'Artıq sizin məlumatlarınız bizim bazada mövcuddur.Tezliklə geri dönüş ediləcəkdir.',
        HttpStatus.CONFLICT,
      );
    await this.contactModel.create(createContact);
    return {
      message:
        'Sizinlə tezliklə əlaqə saxlanacaq. Məlumatınız üçün təşəkkür edirik.',
    };
  }

  // Bütün məhsulları gətir
  async getAllProduct(): Promise<Product[]> {
    return await this.productModel.find({ active: true });
  }

  // İD -sinə görə gətir
  async getSingleProduct(_id: string): Promise<Product> {
    return await this.productModel.findById(_id);
  }

  // Home page - yeni kolleksiya bölməsində datalara baxış
  async getAllNewCollection(): Promise<HomeNewCollection[]> {
    return await this.homeNewCollectionModel.find({ active: true });
  }

  // Home page - seçilmiş kateqoriyalar bölməsində datalara baxış
  async getAllBrowseRange(): Promise<HomeBrowseRange[]> {
    return await this.homeBrowseRangeModel.find();
  }

  // category -sinə aid məhsullar gəlsin
  async getProductByCategory(_id: string): Promise<Product[]> {
    const product = await this.productModel.findById(_id);
    return await this.productModel.find({
      category: product.category, 
      _id: { $ne: product._id }
    });
  }

  // category filter
  async productSearch(ProductSearch: productSearch): Promise<Product[]> {
    const { name, description, model_no, category } = ProductSearch;
    const filter: any = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (description)
      filter.description = { $regex: description, $options: 'i' };
    if (model_no) filter.model_no = { $regex: model_no, $options: 'i' };
    if (category) filter.category = { $regex: category, $options: 'i' };
    return await this.productModel.find(filter);
  }
}
