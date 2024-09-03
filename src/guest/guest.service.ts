import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContact } from 'src/contact/dto/contact.dto';
import { Contact } from 'src/contact/model/contact.schema';
import { HomeBrowseRange, HomeNewCollection } from 'src/home_page/model/home.schema';
import { Product } from 'src/product/model/product.schema';
import { createSubscribeDto } from 'src/subscribe/dto/subscribe.dto';
import { Subscribe } from 'src/subscribe/model/subscribe.schema';
import { MessageResponse } from 'src/utils/messagetype';

@Injectable()
export class GuestService {
  constructor(@InjectModel('subscribe') private readonly subscribeModel: Model<Subscribe>,
  @InjectModel('contact') private readonly contactModel: Model<Contact>,
  @InjectModel('product') private readonly productModel: Model<Product>, 
  @InjectModel('home-newCollection') private readonly homeNewCollectionModel: Model<HomeNewCollection>,
  @InjectModel('home-browseRange') private readonly homeBrowseRangeModel: Model<HomeBrowseRange>,
  private mailerService: MailerService
  ) { }

  // subscribe
  async subscribe(CreateSubscribeDto: createSubscribeDto): Promise<MessageResponse> {
    const existEmail = await this.subscribeModel.findOne({ email: CreateSubscribeDto.email })
    if (existEmail) {
      throw new HttpException('Qeyd etdiyiniz mail adresi ilə artıq abunə olmusunuz.', HttpStatus.CONFLICT)
    }
    await this.subscribeModel.create(CreateSubscribeDto)
    this.mailerService.sendMail({
      from: `${CreateSubscribeDto.email}`,
      to: 'orelsacosmetics@gmail.com',
      subject: 'Yeni abunəlik',
      text: `Yeni abunəlik: ${CreateSubscribeDto.email}`
    })
    return { message: 'Abunləyiniz üçün təşəkkür edirik 🙏' }
  }


  // Bizimlə əlaqə bölməsinin doldurulması
   async contactUs(createContact:CreateContact):Promise<MessageResponse>{
    const{name,email} = createContact
    const contactUs = await this.contactModel.findOne({name,email})
    if(contactUs) throw new HttpException('Artıq sizin məlumatlarınız bizim bazada mövcuddur.Tezliklə geri dönüş ediləcəkdir.', HttpStatus.CONFLICT)
      await this.contactModel.create(createContact)
    return { message: "Sizinlə tezliklə əlaqə saxlanacaq. Məlumatınız üçün təşəkkür edirik." }
   }



  // Bütün məhsulları gətir
  async getAllProduct(): Promise<Product[]> {
    return await this.productModel.find({ active:true })
  }


  // İD -sinə görə gətir
  async getSingleProduct(_id: string): Promise<Product> {
    return await this.productModel.findById(_id)
  }


    // Home page - yeni kolleksiya bölməsində datalara baxış
  async getAllNewCollection(): Promise<HomeNewCollection[]> {
    return await this.homeNewCollectionModel.find({ active:true })
  }


    // Home page - seçilmiş kateqoriyalar bölməsində datalara baxış
    async getAllBrowseRange(): Promise<HomeBrowseRange[]> {
      return await this.homeBrowseRangeModel.find()
    }




  // GUEST UCUN GET EMELIYYATLARI
  // GUEST UCUN FILTER EMELIYYATLARI
}
