import {
  IsDate,
  IsString,
  IsNotEmpty,
  IsNumber,
  Max,
  Min
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCouponDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  @Min(0)
  discount: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  thumbnail: string

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  expire_at: Date
}
