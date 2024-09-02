import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createSubscribeDto } from 'src/subscribe/dto/subscribe.dto';
import { Subscribe } from 'src/subscribe/model/subscribe.schema';
import { MessageResponse } from 'src/utils/messagetype';

@Injectable()
export class GuestService {
  constructor(@InjectModel('subscribe') private readonly subscribeModel: Model<Subscribe>,
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

  // CONTACT 
  // GUEST UCUN GET EMELIYYATLARI
  // GUEST UCUN FILTER EMELIYYATLARI
}
