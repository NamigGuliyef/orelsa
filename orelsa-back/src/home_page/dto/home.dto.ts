import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional } from "class-validator"

export class createNewCollectionDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string
  @ApiProperty()
  @IsNotEmpty()
  description: string
  @IsOptional()
  active: boolean
}


export class updateNewCollectiontDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string
  @ApiProperty()
  @IsNotEmpty()
  description: string
  @ApiProperty()
  @IsOptional()
  active: boolean
}


export class createBrowseRangeDto {
  @ApiProperty()
  @IsNotEmpty()
  description: string
}


export class updateBrowseRangeDto {
  @ApiProperty()
  @IsNotEmpty()
  description: string
}
