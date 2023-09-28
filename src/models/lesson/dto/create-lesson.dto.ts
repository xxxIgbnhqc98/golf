import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateLessonDto {
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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  schedule: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  thumbnails: string
}
