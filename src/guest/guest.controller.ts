import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createSubscribeDto } from 'src/subscribe/dto/subscribe.dto';
import { MessageResponse } from 'src/utils/messagetype';
import { GuestService } from './guest.service';
import { Product } from 'src/product/model/product.schema';
import { HomeBrowseRange, HomeNewCollection } from 'src/home_page/model/home.schema';
import { CreateContact } from 'src/contact/dto/contact.dto';

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


  
}
