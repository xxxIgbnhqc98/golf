import { IsNotEmpty, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    example: 'xxxigbnhqc',
    description: 'Length must be greater than 7'
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  username: string

  @ApiProperty({
    example: '12345678',
    description: 'Length must be greater than 7'
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string

  @ApiProperty({ example: 'quocdeptrai' })
  @IsNotEmpty()
  nickname: string

  @ApiProperty({
    example: '0983780940',
    description: 'Must be a phone number'
  })
  @IsNotEmpty()
  phone_number: string
}
