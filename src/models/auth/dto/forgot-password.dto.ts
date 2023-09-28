import { IsNotEmpty, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ForgetPasswordDto {
  @ApiProperty({ example: '0983780940', description: 'Must be a phone number' })
  @IsNotEmpty()
  @IsString()
  phone_number: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firebase_token: string

  @ApiProperty({ description: 'Length must be greater than 7' })
  @IsString()
  @MinLength(7)
  password: string
}
