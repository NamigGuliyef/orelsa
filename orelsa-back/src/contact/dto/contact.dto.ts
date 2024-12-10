import { IsEmail, IsNotEmpty, Matches } from "class-validator"

export class CreateContact {
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-zÜİÖĞIƏÇŞüöğıəçş ]{3,30}$'))
  name: string
  @IsNotEmpty()
  @IsEmail()
  email: string
  @IsNotEmpty()
  subject: string
  @IsNotEmpty()
  message: string
}
