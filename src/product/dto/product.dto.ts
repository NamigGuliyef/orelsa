import { IsNotEmpty, IsOptional } from "class-validator"

export class createProduct {
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  description: string
  @IsNotEmpty()
  price: string
  @IsOptional()
  discount: string
  @IsOptional()
  discount_price: string
  @IsNotEmpty()
  model_no: string
  @IsNotEmpty()
  category: string
  @IsNotEmpty()
  new: boolean
}


export class updateProduct {
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  description: string
  @IsNotEmpty()
  price: string
  @IsOptional()
  discount: string
  @IsOptional()
  discount_price: string
  @IsNotEmpty()
  model_no: string
  @IsNotEmpty()
  category: string
  @IsNotEmpty()
  new: boolean
}

