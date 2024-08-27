import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from 'src/config/multer';
import { createNewCollectionDto, updateNewCollectiontDto } from 'src/home_page/dto/home.dto';
import { MessageResponse } from 'src/utils/messagetype';
import { HomeNewCollection } from 'src/home_page/model/home.schema';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

    // Home page - yeni kolleksiya bölməsinin yaradılması
    @ApiOperation({summary:"Home səhifəsində new collection hissəsinin yaradılması"})
    @ApiConsumes('multipart/form-data')
    @ApiBody({ schema:{ type:'object',
        properties:{
            title:{type:'string'},
            description:{type:'string'},
            photo:{type:'string',format:'binary'}
    }}})
    @Post('/dashboard/home')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('photo',MulterOptions))
    async createNewCollection(@Body() CreateNewCollectionDto: createNewCollectionDto, @UploadedFile() photo: Express.Multer.File): Promise<MessageResponse> {
        return await this.adminService.createNewCollection( CreateNewCollectionDto,photo )
    }


  // Home page - yeni kolleksiya bölməsində dəyişiklik
    @ApiOperation({ summary:"Home səhifəsində new collection hissəsində dəyişiklik" })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ schema:{ type:'object',
        properties:{
            title:{type:'string'},
            description:{type:'string'},
            photo:{ type:'string', format:'binary' }
    }}})
    @Patch('/dashboard/home/:_id')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('photo', MulterOptions))
    async updateNewCollection(@Param('_id') _id: string, @Body() UpdateNewCollectiontDto: updateNewCollectiontDto, @UploadedFile() photo: Express.Multer.File): Promise<MessageResponse> {
        return await this.adminService.updateNewCollection(_id, UpdateNewCollectiontDto, photo )
    }


  // Home page - yeni kolleksiya bölməsin silmək
    @ApiOperation({summary:'Home səhifəsində new collection hissəsində data silmək'})
    @Delete('/dashboard/home/:_id')
    @HttpCode(HttpStatus.OK)
    async deleteNewCollection(@Param('_id') _id:string):Promise<MessageResponse>{
        return await this.adminService.deleteNewCollection(_id)
    }


 // Home page - yeni kolleksiya bölməsində datalara baxış
 @ApiOperation({summary:'Home səhifəsində new collection hissəsində datalara baxış'})
 @Get('/dashboard/home')
 @HttpCode(HttpStatus.OK)
  async getAllNewCollection():Promise<HomeNewCollection[]>{
    return await this.adminService.getAllNewCollection()
  }  


   // Home page - yeni kolleksiya bölməsində datalara baxış
 @ApiOperation({summary:'Home səhifəsində new collection hissəsində datalara baxış'})
 @Get('/dashboard/home/:_id')
 @HttpCode(HttpStatus.OK)
  async getSingleNewCollection(@Param('_id') _id:string):Promise<HomeNewCollection>{
    return await this.adminService.getSingleNewCollection(_id)
  }  


}
