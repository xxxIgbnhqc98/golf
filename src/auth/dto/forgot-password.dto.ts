import { IsPhoneNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ForgetPasswordDto {
  @ApiProperty({ example: '0983780940', description: 'Must be a phone number' })
  @IsPhoneNumber()
  phone_number: string
}
