import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: any

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiPropertyOptional()
  @IsString()
  phone: string
}
