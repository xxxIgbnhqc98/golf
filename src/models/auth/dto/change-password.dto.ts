import { MinLength, IsString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class ChangePasswordDto {
  @ApiProperty({ description: 'Length must be greater than 7' })
  @IsString()
  @MinLength(8)
  password: string

  @ApiProperty({ description: 'Length must be greater than 7' })
  @IsString()
  @MinLength(8)
  new_password: string
}
