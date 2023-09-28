import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Lesson } from '@models/lesson'
import { LessonService } from './lesson.service'
import { LessonController } from './lesson.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Lesson])],
  controllers: [LessonController],
  providers: [LessonService]
})
export class LessonModule {}
