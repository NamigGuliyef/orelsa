import { IsNotEmpty } from "class-validator"

export class createNewProductDto {
  @IsNotEmpty()
  title: string
  @IsNotEmpty()
  description: string
}


export class updateNewProductDto {
  @IsNotEmpty()
  title: string
  @IsNotEmpty()
  description: string
}


export class createBrowseRangeDto {
  @IsNotEmpty()
  description: string
}


export class updateBrowseRangeDto {
  @IsNotEmpty()
  description: string
}
