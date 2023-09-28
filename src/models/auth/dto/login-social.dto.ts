import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginSocialDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string
}
