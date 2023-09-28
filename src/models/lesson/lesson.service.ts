import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PageOptionsDto, PageMetaDto, PageDto } from '@common/pagination'
import { CreateLessonDto, Lesson } from '@models/lesson'
import { ApiSuccessResponse } from '@common/api-response'

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>
  ) {}

  async create(createLessonDto: CreateLessonDto) {
    const lesson = this.lessonRepository.create(createLessonDto)
    await this.lessonRepository.save(lesson)
    return lesson
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const query = this.lessonRepository
      .createQueryBuilder('lesson')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('created_at', pageOptionsDto.order)
    const [list, count] = await query.getManyAndCount()
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: pageOptionsDto,
      itemCount: count
    })

    return new PageDto(list, pageMetaDto)
  }

  async findOne(id: string) {
    const lesson = await this.lessonRepository.findOneBy({ id })
    if (!lesson) throw new NotFoundException('Lesson Not Found')
    return lesson
  }

  async update(id: string, updateLessonDto: CreateLessonDto) {
    await this.findOne(id)
    const lessonUpdate = await this.lessonRepository.update(id, updateLessonDto)
    return lessonUpdate
  }

  async remove(id: string) {
    const lesson = await this.findOne(id)
    await this.lessonRepository.remove(lesson)
    return new ApiSuccessResponse()
  }
}
