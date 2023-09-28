import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Question } from '@models/question'
import { QuestionService } from './question.service'
import { QuestionController } from './question.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule {}
