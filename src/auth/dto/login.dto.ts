import { MinLength, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ example: 'xxxigbnhqc' })
  @IsString()
  @MinLength(8)
  username: string

  @ApiProperty({ example: '12345678' })
  @IsString()
  @MinLength(8)
  password: string
}
