import { IsNotEmpty, IsOptional } from 'class-validator';

export class createProduct {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  price: number;
  @IsOptional()
  discount: number;
  @IsOptional()
  discount_price: number;
  @IsNotEmpty()
  model_no: string;
  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  new: boolean;
  @IsOptional()
  active: boolean;
}



export class updateProduct {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  price: number;
  @IsOptional()
  discount: number;
  @IsOptional()
  discount_price: number;
  @IsNotEmpty()
  model_no: string;
  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  new: boolean;
  @IsOptional()
  active: boolean;
}
