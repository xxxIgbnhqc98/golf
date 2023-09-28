import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class AnswerQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  answer: string
}
