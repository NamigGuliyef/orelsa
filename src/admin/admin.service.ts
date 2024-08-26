import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import cloudinary from 'src/config/cloudinary';
import { createNewCollectionDto, updateNewCollectiontDto } from 'src/home_page/dto/home.dto';
import { Home } from 'src/home_page/model/home.schema';
import { MessageResponse } from 'src/utils/messagetype';

@Injectable()
export class AdminService {
  constructor(@InjectModel('home') private readonly homeModel: Model<Home>) { }


  // Home page - yeni kolleksiya bölməsinin yaradılması
  async createNewCollection(CreateNewCollectionDto: createNewCollectionDto, photo: Express.Multer.File): Promise<MessageResponse> {
    const { title, description } = CreateNewCollectionDto
    const existNewCollection = await this.homeModel.findOne({ title, description })
    if (existNewCollection) throw new HttpException('Yaratmaq istədiyiniz başlıq və mətn artıq mövcuddur', HttpStatus.CONFLICT)
    const data = await cloudinary.uploader.upload(photo.path, { public_id: photo.originalname })
    await this.homeModel.create({ ...CreateNewCollectionDto, newproductPhoto: data.secure_url })
    return { message: "Yeni kolleksiya home səhifəsində yaradıldı✅" }
  }



  // Home page - yeni kolleksiya bölməsində dəyişiklik
  async updateNewCollection(_id: string, UpdateNewCollectiontDto: updateNewCollectiontDto, photo: Express.Multer.File): Promise<MessageResponse> {

    const newCollection = await this.homeModel.findById(_id)
    if (!newCollection) throw new HttpException('Dəyişmək istədiyiniz kolleksiya bazada mövcud deyildir', HttpStatus.NOT_FOUND)
    const { title, description } = UpdateNewCollectiontDto
    const existNewCollection = await this.homeModel.findOne({ title, description })
    if (existNewCollection) throw new HttpException('Dəyişmək istədiyiniz başlıq və mətn artıq mövcuddur', HttpStatus.CONFLICT)

    // Şəkil və yazılar tam dəyişirsə
    if (photo && photo.path) {
      const data = await cloudinary.uploader.upload(photo.path, { public_id: photo.originalname })
      await this.homeModel.findByIdAndUpdate(_id, { $set: { ...UpdateNewCollectiontDto, newproductPhoto: data.secure_url } }, { new: true })
      return { message: "Yeni kolleksiyada dəyişikliklər icra olundu!✅" }
    } else {
      // Şəkil xaric digər datalar dəyişirsə
      await this.homeModel.findByIdAndUpdate(_id, { $set: { ...UpdateNewCollectiontDto } }, { new: true })
      return { message: "Yeni kolleksiyada dəyişikliklər icra olundu!✅" }
    }
  }


  // Home page - yeni kolleksiya bölməsin silmək


}
