import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import {
  CreateQuestionDto,
  UpdateQuestionDto,
  AnswerQuestionDto,
  Question
} from '@models/question'
import { ApiSuccessResponse } from '@common/api-response'
import { PageOptionsDto, PageMetaDto, PageDto } from '@common/pagination'

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question) private questionRepository: Repository<Question>
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const question = this.questionRepository.create(createQuestionDto)
    await this.questionRepository.save(question)
    return question
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const query = this.questionRepository
      .createQueryBuilder('question')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('question.created_at', pageOptionsDto.order)
    const [list, count] = await query.getManyAndCount()
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: pageOptionsDto,
      itemCount: count
    })
    return new PageDto(list, pageMetaDto)
  }

  async findOne(id: string) {
    const question = await this.questionRepository.findOneBy({ id: id })
    if (!question) throw new NotFoundException('Question Not Found')
    return question
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    await this.findOne(id)
    const updateQuestion = await this.questionRepository.update(
      id,
      updateQuestionDto
    )
    return updateQuestion
  }

  async answer(id: string, answerQuestionDto: AnswerQuestionDto) {
    await this.findOne(id)
    const answerQuestion = await this.questionRepository.update(id, {
      ...answerQuestionDto,
      status: true
    })
    return answerQuestion
  }

  async remove(id: string) {
    const question = await this.findOne(id)
    await this.questionRepository.remove(question)
    return new ApiSuccessResponse()
  }
}
