import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsDate } from 'class-validator'

export class CreateNotificationGlobalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty()
  @IsDate()
  date: Date

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  thumbnail: string
}
