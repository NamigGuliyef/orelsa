import { IsEmail, IsNotEmpty } from "class-validator";

export class createSubscribeDto {

  @IsNotEmpty({ message: 'Xana boşdur.' })
  @IsEmail()
  email: string

}
