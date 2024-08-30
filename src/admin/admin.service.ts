import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import cloudinary from 'src/config/cloudinary';
import { createBrowseRangeDto, createNewCollectionDto, updateBrowseRangeDto, updateNewCollectiontDto } from 'src/home_page/dto/home.dto';
import { HomeBrowseRange, HomeNewCollection } from 'src/home_page/model/home.schema';
import { createProduct, updateProduct } from 'src/product/dto/product.dto';
import { Product } from 'src/product/model/product.schema';
import { MessageResponse } from 'src/utils/messagetype';


@Injectable()
export class AdminService {
  constructor(@InjectModel('home-newCollection') private readonly homeNewCollectionModel: Model<HomeNewCollection>,
    @InjectModel('home-browseRange') private readonly homeBrowseRangeModel: Model<HomeBrowseRange>,
    @InjectModel('product') private readonly productModel: Model<Product>,
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



  // Home page - seçilmiş kateqoriyalar bölməsində dəyişiklik
  async updateBrowseRange(_id: string, UpdateBrowseRangeDto: updateBrowseRangeDto, photo: Express.Multer.File): Promise<MessageResponse> {

    const BrowseRange = await this.homeBrowseRangeModel.findById(_id)
    if (!BrowseRange) throw new HttpException('Dəyişmək istədiyiniz seçilmiş kateqoriya bazada mövcud deyildir', HttpStatus.NOT_FOUND)
    const { description } = UpdateBrowseRangeDto
    const existBrowseRange = await this.homeBrowseRangeModel.findOne({ description })
    if (existBrowseRange) throw new HttpException('Dəyişmək istədiyiniz mətn artıq mövcuddur', HttpStatus.CONFLICT)

    // Şəkil və yazılar tam dəyişirsə
    if (photo && photo.path) {
      const data = await cloudinary.uploader.upload(photo.path, { public_id: photo.originalname })
      await this.homeBrowseRangeModel.findByIdAndUpdate(_id, { $set: { ...UpdateBrowseRangeDto, browseRangePhoto: data.secure_url } }, { new: true })
      return { message: "Seçilmiş kateqoriyada dəyişikliklər icra olundu!✅" }
    } else {
      // Şəkil xaric digər datalar dəyişirsə
      await this.homeBrowseRangeModel.findByIdAndUpdate(_id, { $set: { ...UpdateBrowseRangeDto } }, { new: true })
      return { message: "Seçilmiş kateqoriyada dəyişikliklər icra olundu!✅" }
    }
  }


  // Home page - seçilmiş kateqoriyalar bölməsin silmək
  async deleteBrowseRange(_id: string): Promise<MessageResponse> {
    const BrowseRange = await this.homeBrowseRangeModel.findById(_id)
    if (!BrowseRange) throw new HttpException('Silmək istədiyiniz seçilmiş kateqoriya bazada mövcud deyildir', HttpStatus.NOT_FOUND)
    await this.homeBrowseRangeModel.findByIdAndDelete(_id)
    return { message: " Uğurla bazadan silindi ✔" }
  }


  // Home page - seçilmiş kateqoriyalar bölməsində datalara baxış
  async getAllBrowseRange(): Promise<HomeBrowseRange[]> {
    return await this.homeBrowseRangeModel.find()
  }


  // Home page - seçilmiş kateqoriyalar bölməsində datalara ID ilə baxış
  async getSingleBrowseRange(_id: string): Promise<HomeBrowseRange> {
    return await this.homeBrowseRangeModel.findById(_id)
  }


  // yeni məhsul yarat
  async createProduct(CreateProduct: createProduct, photos: Express.Multer.File[]): Promise<MessageResponse> {
    const { category, name, model_no, discount, price } = CreateProduct
    const existProduct = await this.productModel.findOne({ category, name, model_no })
    if (existProduct) throw new HttpException('Məhsul artıq yaradılıb', HttpStatus.CONFLICT)

    // məhsul yoxdursa yenisi yaradılır
    let productPhotos = []
    for (let i = 0; i < photos.length; i++) {
      const data = await cloudinary.uploader.upload(photos[i].path, { public_id: photos[i].originalname })
      productPhotos.push(data.secure_url)
    }

    // əgər məhsula endirim verilirsə
    if (discount) {
      let discountPrice = price - (price * discount / 100)
      await this.productModel.create({ ...CreateProduct, discount_price: discountPrice, photos: productPhotos })
      return { message: 'Yeni məhsul yaradıldı ✅' }
      // endirimsiz olarsa
    } else {
      const { discount, discount_price, ...CreateProductWithoutDiscount } = CreateProduct
      await this.productModel.create({ ...CreateProductWithoutDiscount, photos: productPhotos })
      return { message: 'Yeni məhsul yaradıldı ✅' }
    }
  }


  // Yaranmış məhsulda dəyişiklik et
  async updateProduct(_id: string, UpdateProduct: updateProduct, photos: Express.Multer.File[]): Promise<MessageResponse> {
    const {discount, price,discount_price } = UpdateProduct
    const existProduct = await this.productModel.findById(_id)
    if (!existProduct) throw new HttpException('Məhsul artıq bazada mövcud deyil !', HttpStatus.CONFLICT)

    let productPhotos = []
    for (let i = 0; i < photos.length; i++) {
      const data = await cloudinary.uploader.upload(photos[i].path, { public_id: photos[i].originalname })
      productPhotos.push(data.secure_url)
    }

    let discountPrice = price - (price * discount / 100)
    // Əgər şəkil dəyişiklik edilirsə
    if (photos && photos[0] && photos[0].path) {
      await this.productModel.findByIdAndUpdate(_id, { $set: { ...UpdateProduct, discount_price: discountPrice, photos: productPhotos } })
      return { message: "Məhsul məlumatları uğurla dəyişdirildi! ✅" }
      // Əgər discount dəyişirsə
    } else {
      await this.productModel.findByIdAndUpdate(_id, { $set: { ...UpdateProduct, discount_price: discountPrice } })
      return { message: "Məhsul məlumatları uğurla dəyişdirildi! ✅" }
    }
  }


  // Yaranmış məhsulu sil
  async deleteProduct(_id:string):Promise<MessageResponse>{
    await this.productModel.findByIdAndDelete(_id)
    return {message:"Məhsul silindi ❌"}
  }


  // Bütün məhsulları gətir
  async getAllProduct():Promise<Product[]>{
    return await this.productModel.find()
  }


  // İD -sinə görə gətir
  async getSingleProduct(_id:string):Promise<Product>{
    return await this.productModel.findById(_id)
  }




}
