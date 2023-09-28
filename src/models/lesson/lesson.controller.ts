import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { AuthenticationGuard, Roles, RolesGuard } from '@models/auth'
import { LessonService } from './lesson.service'
import { CreateLessonDto } from '@models/lesson'
import { PageOptionsDto } from '@common/pagination'

@ApiTags('lesson')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard)
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto)
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.lessonService.findAll(pageOptionsDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: CreateLessonDto) {
    return this.lessonService.update(id, updateLessonDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(id)
  }
}
