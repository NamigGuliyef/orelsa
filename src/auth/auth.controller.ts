import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { adminDto } from 'src/admin/dto/admin.dto';
import { MessageResponse, tokenMessageResponse } from 'src/utils/messagetype';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }



  @ApiOperation({ summary: 'Admin panel qeydiyyat' })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        username: { type: "string" },
        password: { type: "string" }
      }
    }
  })
  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async SignUp(@Body() AdminDto: adminDto): Promise<MessageResponse> {
    return await this.authService.SignUp(AdminDto)
  }


  @ApiOperation({ summary: "Admin panelə giriş" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        username: { type: "string" },
        password: { type: "string" }
      }
    }
  })
  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async SingIn(@Body() AdminDto: adminDto): Promise<tokenMessageResponse> {
    return await this.authService.SingIn(AdminDto)
  }


}
