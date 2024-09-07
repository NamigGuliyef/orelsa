import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { createSubscribeDto } from 'src/subscribe/dto/subscribe.dto';
import { MessageResponse } from 'src/utils/messagetype';
import { GuestService } from './guest.service';
import { Product } from 'src/product/model/product.schema';
import { HomeBrowseRange, HomeNewCollection } from 'src/home_page/model/home.schema';
import { CreateContact } from 'src/contact/dto/contact.dto';
import { productSearch } from './query.types';

@ApiTags('guest')
@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) { }


  // subscribe
  @ApiOperation({ summary: 'Abone ol' })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string" }
      }
    }
  })
  @Post('/subscribe')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async subscribe(@Body() CreateSubscribeDto: createSubscribeDto): Promise<MessageResponse> {
    return this.guestService.subscribe(CreateSubscribeDto)
  }



  // Bizimlə əlaqə bölməsinin doldurulması
  @ApiOperation({ summary: "Bizimlə əlaqə formunu doldur" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        subject: { type: "string" },
        message: { type: "string" },
      }
    }
  })
  @Post('/contact-us')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async contactUs(@Body() createContact: CreateContact): Promise<MessageResponse> {
    return await this.guestService.contactUs(createContact)
  }



  // Bütün məhsulları gətir
  @ApiOperation({ summary: 'Bütün məhsulları gətir' })
  @Get('/product')
  @HttpCode(HttpStatus.OK)
  async getAllProduct(): Promise<Product[]> {
    return await this.guestService.getAllProduct()
  }


  // İD -sinə görə gətir
  @ApiOperation({ summary: 'Məhsulu İD -sinə görə gətir' })
  @Get('/product/:_id')
  @HttpCode(HttpStatus.OK)
  async getSingleProduct(@Param('_id') _id: string): Promise<Product> {
    return await this.guestService.getSingleProduct(_id)
  }


  // Home page - yeni kolleksiya bölməsində datalara baxış
  @ApiOperation({ summary: "Yeni kolleksiyanı görsün" })
  @Get('/homeNewCollection')
  @HttpCode(HttpStatus.OK)
  async getAllNewCollection(): Promise<HomeNewCollection[]> {
    return await this.guestService.getAllNewCollection()
  }


  // Home page - seçilmiş kateqoriyalar bölməsində datalara baxış
  @ApiOperation({ summary: "Seçilmiş kateqoriyaları gör" })
  @Get('/homeBrowseRange')
  @HttpCode(HttpStatus.OK)
  async getAllBrowseRange(): Promise<HomeBrowseRange[]> {
    return await this.guestService.getAllBrowseRange()
  }


  // category -sinə aid məhsullar gəlsin
  @ApiOperation({ summary: "Baxılan məhsulun kateqroiyasında olanlara da baxmaq" })
  @Get('/product-category/:_id')
  @HttpCode(HttpStatus.OK)
  async getProductByCategory(@Param('_id') _id: string): Promise<Product[]> {
    return await this.guestService.getProductByCategory(_id)
  }


  // Məhsul axtarışı
  @ApiOperation({ summary: "Məhsul axtarışı" })
  @ApiQuery({ name: 'name', required: false, type: String, description: 'Məhsulun adı' })
  @ApiQuery({ name: 'description', required: false, type: String, description: 'Məhsul haqqinda' })
  @ApiQuery({ name: 'model_no', required: false, type: String, description: 'Məhsul modeli' })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'Məhsulun kateqoriyası' })
  @Get('/search')
  @HttpCode(HttpStatus.OK)
  async productSearch(@Query() ProductSearch: productSearch): Promise<Product[]> {
    return await this.guestService.productSearch(ProductSearch)
  }


}
