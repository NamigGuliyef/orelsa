import { IsNotEmpty } from "class-validator"

export class createHomeDto {
  @IsNotEmpty()
  title: string
  @IsNotEmpty()
  description: string
  @IsNotEmpty()
  photo: string
}
