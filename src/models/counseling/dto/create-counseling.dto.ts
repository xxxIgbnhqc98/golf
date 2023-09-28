import { IsString, IsNotEmpty, IsEnum, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { StudentLevel } from '@constants'

export class CreateCounselingDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  phone_number: string

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  email: string

  @ApiProperty({ enum: StudentLevel })
  @IsEnum(StudentLevel)
  @IsNotEmpty()
  level: StudentLevel

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string
}
