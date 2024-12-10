import { IsNotEmpty } from "class-validator";

export class adminDto {
  @IsNotEmpty()
  username: string
  @IsNotEmpty()
  password: string
}
