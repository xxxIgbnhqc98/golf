import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class AddUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  group_id: string
}
