import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import cloudinary from 'src/config/cloudinary';
import { createBrowseRangeDto, createNewCollectionDto, updateNewCollectiontDto } from 'src/home_page/dto/home.dto';
import { HomeBrowseRange, HomeNewCollection } from 'src/home_page/model/home.schema';
import { MessageResponse } from 'src/utils/messagetype';


@Injectable()
export class AdminService {
  constructor(@InjectModel('home-newCollection') private readonly homeNewCollectionModel: Model<HomeNewCollection>,
    @InjectModel('home-browseRange') private readonly homeBrowseRangeModel: Model<HomeBrowseRange>
  ) { }


  // Home page - yeni kolleksiya bölməsinin yaradılması
  async createNewCollection(CreateNewCollectionDto: createNewCollectionDto, photo: Express.Multer.File): Promise<MessageResponse> {
    const { title, description } = CreateNewCollectionDto
    const existNewCollection = await this.homeNewCollectionModel.findOne({ title, description })
    if (existNewCollection) throw new HttpException('Yaratmaq istədiyiniz başlıq və mətn artıq mövcuddur', HttpStatus.CONFLICT)
    const data = await cloudinary.uploader.upload(photo.path, { public_id: photo.originalname })
    await this.homeNewCollectionModel.create({ ...CreateNewCollectionDto, newproductPhoto: data.secure_url })
    return { message: "Yeni kolleksiya home səhifəsində yaradıldı✅" }
  }



  // Home page - yeni kolleksiya bölməsində dəyişiklik
  async updateNewCollection(_id: string, UpdateNewCollectiontDto: updateNewCollectiontDto, photo: Express.Multer.File): Promise<MessageResponse> {

    const newCollection = await this.homeNewCollectionModel.findById(_id)
    if (!newCollection) throw new HttpException('Dəyişmək istədiyiniz kolleksiya bazada mövcud deyildir', HttpStatus.NOT_FOUND)
    const { title, description } = UpdateNewCollectiontDto
    const existNewCollection = await this.homeNewCollectionModel.findOne({ title, description })
    if (existNewCollection) throw new HttpException('Dəyişmək istədiyiniz başlıq və mətn artıq mövcuddur', HttpStatus.CONFLICT)

    // Şəkil və yazılar tam dəyişirsə
    if (photo && photo.path) {
      const data = await cloudinary.uploader.upload(photo.path, { public_id: photo.originalname })
      await this.homeNewCollectionModel.findByIdAndUpdate(_id, { $set: { ...UpdateNewCollectiontDto, newproductPhoto: data.secure_url } }, { new: true })
      return { message: "Yeni kolleksiyada dəyişikliklər icra olundu!✅" }
    } else {
      // Şəkil xaric digər datalar dəyişirsə
      await this.homeNewCollectionModel.findByIdAndUpdate(_id, { $set: { ...UpdateNewCollectiontDto } }, { new: true })
      return { message: "Yeni kolleksiyada dəyişikliklər icra olundu!✅" }
    }
  }


  // Home page - yeni kolleksiya bölməsin silmək
  async deleteNewCollection(_id: string): Promise<MessageResponse> {
    const newCollection = await this.homeNewCollectionModel.findById(_id)
    if (!newCollection) throw new HttpException('Silmək istədiyiniz kolleksiya bazada mövcud deyildir', HttpStatus.NOT_FOUND)
    await this.homeNewCollectionModel.findByIdAndDelete(_id)
    return { message: " Uğurla bazadan silindi ✔" }
  }


  // Home page - yeni kolleksiya bölməsində datalara baxış
  async getAllNewCollection(): Promise<HomeNewCollection[]> {
    return await this.homeNewCollectionModel.find()
  }


  // Home page - yeni kolleksiya bölməsində datalara ID ilə baxış
  async getSingleNewCollection(_id: string): Promise<HomeNewCollection> {
    return await this.homeNewCollectionModel.findById(_id)
  }



  // Home page - seçilmiş kateqoriyaları incələ bölməsinin yaradılması
  async createBrowseRange(CreateBrowseRangeDto: createBrowseRangeDto, photo: Express.Multer.File): Promise<MessageResponse> {
    const { description } = CreateBrowseRangeDto
    const existBrowseRange = await this.homeBrowseRangeModel.findOne({ description })
    if (existBrowseRange) throw new HttpException('Yaratmaq istədiyiniz mətn artıq mövcuddur', HttpStatus.CONFLICT)
    const data = await cloudinary.uploader.upload(photo.path, { public_id: photo.originalname })
    await this.homeBrowseRangeModel.create({ ...CreateBrowseRangeDto, browseRangePhoto: data.secure_url })
    return { message: "Home səhifəsində seçilmiş kateqoriya yaradıldı✅" }
  }



  // // Home page - yeni kolleksiya bölməsində dəyişiklik
  // async updateNewCollection(_id: string, UpdateNewCollectiontDto: updateNewCollectiontDto, photo: Express.Multer.File): Promise<MessageResponse> {

  //   const newCollection = await this.homeNewCollectionModel.findById(_id)
  //   if (!newCollection) throw new HttpException('Dəyişmək istədiyiniz kolleksiya bazada mövcud deyildir', HttpStatus.NOT_FOUND)
  //   const { title, description } = UpdateNewCollectiontDto
  //   const existNewCollection = await this.homeNewCollectionModel.findOne({ title, description })
  //   if (existNewCollection) throw new HttpException('Dəyişmək istədiyiniz başlıq və mətn artıq mövcuddur', HttpStatus.CONFLICT)

  //   // Şəkil və yazılar tam dəyişirsə
  //   if (photo && photo.path) {
  //     const data = await cloudinary.uploader.upload(photo.path, { public_id: photo.originalname })
  //     await this.homeNewCollectionModel.findByIdAndUpdate(_id, { $set: { ...UpdateNewCollectiontDto, newproductPhoto: data.secure_url } }, { new: true })
  //     return { message: "Yeni kolleksiyada dəyişikliklər icra olundu!✅" }
  //   } else {
  //     // Şəkil xaric digər datalar dəyişirsə
  //     await this.homeNewCollectionModel.findByIdAndUpdate(_id, { $set: { ...UpdateNewCollectiontDto } }, { new: true })
  //     return { message: "Yeni kolleksiyada dəyişikliklər icra olundu!✅" }
  //   }
  // }


  // // Home page - yeni kolleksiya bölməsin silmək
  // async deleteNewCollection(_id: string): Promise<MessageResponse> {
  //   const newCollection = await this.homeNewCollectionModel.findById(_id)
  //   if (!newCollection) throw new HttpException('Silmək istədiyiniz kolleksiya bazada mövcud deyildir', HttpStatus.NOT_FOUND)
  //   await this.homeNewCollectionModel.findByIdAndDelete(_id)
  //   return { message: " Uğurla bazadan silindi ✔" }
  // }


  // // Home page - yeni kolleksiya bölməsində datalara baxış
  // async getAllNewCollection(): Promise<HomeNewCollection[]> {
  //   return await this.homeNewCollectionModel.find()
  // }


  // // Home page - yeni kolleksiya bölməsində datalara ID ilə baxış
  // async getSingleNewCollection(_id: string): Promise<HomeNewCollection> {
  //   return await this.homeNewCollectionModel.findById(_id)
  // }



}
