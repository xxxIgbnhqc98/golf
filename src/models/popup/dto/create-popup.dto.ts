import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsDate, IsNotEmpty } from 'class-validator'

export class CreatePopupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  link: string

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
  from_date: Date

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  to_date: Date
}
