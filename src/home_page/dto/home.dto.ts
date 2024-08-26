import { IsNotEmpty, IsOptional } from "class-validator"

export class createNewCollectionDto {
  @IsNotEmpty()
  title: string
  @IsNotEmpty()
  description: string
}


export class updateNewCollectiontDto {
  @IsNotEmpty()
  title: string
  @IsNotEmpty()
  description: string
  @IsOptional()
  active: boolean
}


export class createBrowseRangeDto {
  @IsNotEmpty()
  description: string
}


export class updateBrowseRangeDto {
  @IsNotEmpty()
  description: string
}
