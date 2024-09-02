import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createSubscribeDto } from 'src/subscribe/dto/subscribe.dto';
import { MessageResponse } from 'src/utils/messagetype';
import { GuestService } from './guest.service';

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
  async subscribe(@Body() CreateSubscribeDto: createSubscribeDto): Promise<MessageResponse> {
    return this.guestService.subscribe(CreateSubscribeDto)
  }

}
