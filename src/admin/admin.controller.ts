import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from 'src/config/multer';
import { createBrowseRangeDto, createNewCollectionDto, updateBrowseRangeDto, updateNewCollectiontDto } from 'src/home_page/dto/home.dto';
import { MessageResponse } from 'src/utils/messagetype';
import { HomeBrowseRange, HomeNewCollection } from 'src/home_page/model/home.schema';
import { createProduct, updateProduct } from 'src/product/dto/product.dto';
import { Product } from 'src/product/model/product.schema';
import { Subscribe } from 'src/subscribe/model/subscribe.schema';
import { Contact } from 'src/contact/model/contact.schema';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  // Home page - yeni kolleksiya bölməsinin yaradılması
  @ApiOperation({ summary: "Home səhifəsində new collection hissəsinin yaradılması" })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        photo: { type: 'string', format: 'binary' }
      }
    }
  })
  @Post('/dashboard/homeNewCollection')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo', MulterOptions))
  async createNewCollection(@Body() CreateNewCollectionDto: createNewCollectionDto, @UploadedFile() photo: Express.Multer.File): Promise<MessageResponse> {
    return await this.adminService.createNewCollection(CreateNewCollectionDto, photo)
  }


  // Home page - yeni kolleksiya bölməsində dəyişiklik
  @ApiOperation({ summary: "Home səhifəsində new collection hissəsində dəyişiklik" })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        photo: { type: 'string', format: 'binary' }
      }
    }
  })
  @Patch('/dashboard/homeNewCollection/:_id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo', MulterOptions))
  async updateNewCollection(@Param('_id') _id: string, @Body() UpdateNewCollectiontDto: updateNewCollectiontDto, @UploadedFile() photo: Express.Multer.File): Promise<MessageResponse> {
    return await this.adminService.updateNewCollection(_id, UpdateNewCollectiontDto, photo)
  }


  // Home page - yeni kolleksiya bölməsin silmək
  @ApiOperation({ summary: 'Home səhifəsində new collection hissəsində data silmək' })
  @Delete('/dashboard/homeNewCollection/:_id')
  @HttpCode(HttpStatus.OK)
  async deleteNewCollection(@Param('_id') _id: string): Promise<MessageResponse> {
    return await this.adminService.deleteNewCollection(_id)
  }


  // Home page - yeni kolleksiya bölməsində datalara baxış
  @ApiOperation({ summary: 'Home səhifəsində new collection hissəsində datalara baxış' })
  @Get('/dashboard/homeNewCollection')
  @HttpCode(HttpStatus.OK)
  async getAllNewCollection(): Promise<HomeNewCollection[]> {
    return await this.adminService.getAllNewCollection()
  }


  // Home page - yeni kolleksiya bölməsində datalara baxış
  @ApiOperation({ summary: 'Home səhifəsində new collection hissəsində datalara baxış' })
  @Get('/dashboard/homeNewCollection/:_id')
  @HttpCode(HttpStatus.OK)
  async getSingleNewCollection(@Param('_id') _id: string): Promise<HomeNewCollection> {
    return await this.adminService.getSingleNewCollection(_id)
  }



  // Home page - seçilmiş kateqoriyaları incələ bölməsinin yaradılması
  @ApiOperation({ summary: 'Home page - seçilmiş kateqoriyaları incələ bölməsinin yaradılması' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        description: { type: 'string' },
        photo: { type: 'string', format: 'binary' }
      }
    }
  })
  @Post('/dashboard/homeBrowseRange')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo', MulterOptions))
  async createBrowseRange(@Body() CreateBrowseRangeDto: createBrowseRangeDto, @UploadedFile() photo: Express.Multer.File): Promise<MessageResponse> {
    return await this.adminService.createBrowseRange(CreateBrowseRangeDto, photo)
  }



  // Home page - seçilmiş kateqoriyalar bölməsində dəyişiklik
  @ApiOperation({ summary: 'Home page - seçilmiş kateqoriyalar bölməsində dəyişiklik' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        description: { type: 'string' },
        photo: { type: 'string', format: 'binary' }
      }
    }
  })
  @Patch('/dashboard/homeBrowseRange/:_id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo', MulterOptions))
  async updateBrowseRange(@Param('_id') _id: string, @Body() UpdateBrowseRangeDto: updateBrowseRangeDto, @UploadedFile() photo: Express.Multer.File): Promise<MessageResponse> {
    return await this.adminService.updateBrowseRange(_id, UpdateBrowseRangeDto, photo)
  }



  // Home page - seçilmiş kateqoriyalar bölməsin silmək
  @ApiOperation({ summary: 'Home page - seçilmiş kateqoriyalar bölməsin silmək' })
  @Delete('/dashboard/homeBrowseRange/:_id')
  @HttpCode(HttpStatus.OK)
  async deleteBrowseRange(@Param('_id') _id: string): Promise<MessageResponse> {
    return await this.adminService.deleteBrowseRange(_id)
  }


  // Home page - seçilmiş kateqoriyalar bölməsində datalara baxış
  @ApiOperation({ summary: 'Home page - seçilmiş kateqoriyalar bölməsində datalara baxış' })
  @Get('/dashboard/homeBrowseRange')
  @HttpCode(HttpStatus.OK)
  async getAllBrowseRange(): Promise<HomeBrowseRange[]> {
    return await this.adminService.getAllBrowseRange()
  }


  // Home page - seçilmiş kateqoriyalar bölməsində datalara ID ilə baxış
  @ApiOperation({ summary: 'Home page - seçilmiş kateqoriyalar bölməsində datalara ID ilə baxış' })
  @Get('/dashboard/homeBrowseRange/:_id')
  @HttpCode(HttpStatus.OK)
  async getSingleBrowseRange(@Param('_id') _id: string): Promise<HomeBrowseRange> {
    return await this.adminService.getSingleBrowseRange(_id)
  }



  // yeni məhsul yarat
  @ApiOperation({ summary: 'Yeni məhsul yarat' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        discount: { type: 'number' },
        model_no: { type: 'string' },
        category: { type: 'string' },
        new: { type: 'boolean', description: "Məhsulun yeni və ya köhnə olmasını göstərir (default false gəlir)" },
        photos: { type: 'array', items: { type: 'string', format: 'binary' } },
        active: { type: 'boolean', description: 'Məhsulun aktiv olub - olmasını göstərir (default false gəlir)' }
      }
    }
  })
  @Post('/dashboard/product')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('photos', 5, MulterOptions))
  async createProduct(@Body() CreateProduct: createProduct, @UploadedFiles() photos: Express.Multer.File[]): Promise<MessageResponse> {
    return await this.adminService.createProduct(CreateProduct, photos)
  }



  // Yaranmış məhsulda dəyişiklik et
  @ApiOperation({ summary: 'Məhsul üzərində dəyişiklik et' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        discount: { type: 'number' },
        model_no: { type: 'string' },
        category: { type: 'string' },
        new: { type: 'boolean', description: "Məhsulun yeni və ya köhnə olmasını göstərir (default false gəlir)" },
        photos: { type: 'array', items: { type: 'string', format: 'binary' } },
        active: { type: 'boolean', description: 'Məhsulun aktiv olub - olmasını göstərir (default false gəlir)' }
      }
    }
  })
  @Patch('/dashboard/product/:_id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('photos', 5, MulterOptions))
  async updateProduct(@Param('_id') _id: string, @Body() UpdateProduct: updateProduct, @UploadedFiles() photos: Express.Multer.File[]): Promise<MessageResponse> {
    return await this.adminService.updateProduct(_id, UpdateProduct, photos)
  }



  // Yaranmış məhsulu sil
  @ApiOperation({ summary: "Yaranmış məhsulu sil" })
  @Delete('/dashboard/product/:_id')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('_id') _id: string): Promise<MessageResponse> {
    return this.adminService.deleteProduct(_id)
  }


  // Bütün məhsulları gətir
  @ApiOperation({ summary: 'Bütün məhsulları gətir' })
  @Get('/dashboard/product')
  @HttpCode(HttpStatus.OK)
  async getAllProduct(): Promise<Product[]> {
    return await this.adminService.getAllProduct()
  }


  // İD -sinə görə gətir
  @ApiOperation({ summary: 'Məhsulu İD -sinə görə gətir' })
  @Get('/dashboard/product/:_id')
  @HttpCode(HttpStatus.OK)
  async getSingleProduct(@Param('_id') _id: string): Promise<Product> {
    return await this.adminService.getSingleProduct(_id)
  }


  // gelen kontaktlari gormek
  @ApiOperation({summary:"Bizimlə əlaqə bölməsini gör"})
  @Get('/dashboard/contact')
  @HttpCode(HttpStatus.OK)  
  async getAllContact():Promise<Contact[]>{
        return await this.adminService.getAllContact()
  }
   
   
  // abonələri gör
  @ApiOperation({summary:"Abunələri gör"})
  @Get('/dashboard/subscribe')
  @HttpCode(HttpStatus.OK)
  async getAllSubscribe():Promise<Subscribe[]>{
       return await this.adminService.getAllSubscribe()
  }


}
