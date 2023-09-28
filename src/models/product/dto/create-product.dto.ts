import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  ArrayMaxSize,
  ArrayMinSize
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  introduction: string

  @ApiProperty({ description: 'min size 1' })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  color: string[]

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiProperty({ description: 'min size 1 max size 5' })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  images: string[]

  @ApiProperty({ description: 'min size 1 max size 5' })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  thumbnails: string[]
}
