import { MinLength, IsString, Length } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class ChangePasswordDto {
  @ApiProperty({ description: 'Opt receive from message, length equal 6' })
  @IsString()
  @Length(6)
  otp: string

  @ApiProperty({ description: 'Length must be greater than 7' })
  @IsString()
  @MinLength(8)
  password: string
}
