import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateGroupDto {
  @ApiProperty({ example: 'green app' })
  @IsString()
  @IsNotEmpty()
  title: string
}
