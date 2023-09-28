import { IsNotEmpty, IsString, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { CreateUserDto } from './create-user.dto'
import { Gender } from '@constants'

export class CreateCoachDto extends CreateUserDto {
  @ApiProperty({
    example: 'address'
  })
  @IsString()
  @IsNotEmpty()
  address: string

  @ApiProperty({
    example: 'do not know'
  })
  @IsString()
  @IsNotEmpty()
  emergency: string

  @ApiProperty({
    example: 'developer'
  })
  @IsString()
  @IsNotEmpty()
  technique: string

  @ApiProperty({
    enum: Gender,
    default: Gender.MALE
  })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender

  @ApiProperty({ example: 'description' })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ example: 'image url' })
  @IsString()
  @IsNotEmpty()
  avatar: string

  @ApiProperty({ example: 'image url' })
  @IsString()
  @IsNotEmpty()
  thumbnail: string
}
