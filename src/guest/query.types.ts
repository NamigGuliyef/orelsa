import { IsOptional } from "class-validator";

export class productSearch {
  @IsOptional()
  name: string
  @IsOptional()
  description: string;
  @IsOptional()
  model_no: string;
  @IsOptional()
  category: string;
}