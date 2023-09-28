import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Counseling } from '@models/counseling'
import {
  PageOptionsDto,
  PageMetaDto,
  PageDto,
  ApiSuccessResponse
} from '@common'
import { CreateCounselingDto } from '@models/counseling'

@Injectable()
export class CounselingService {
  constructor(
    @InjectRepository(Counseling)
    private counselingRepository: Repository<Counseling>
  ) {}

  async create(createDto: CreateCounselingDto) {
    const result = this.counselingRepository.create(createDto)
    await this.counselingRepository.save(createDto)
    return result
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const query = this.counselingRepository
      .createQueryBuilder('counseling')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('counseling.created_at', pageOptionsDto.order)
    const [list, count] = await query.getManyAndCount()
    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount: count })
    new PageDto(list, pageMetaDto)
    return new PageDto(list, pageMetaDto)
  }

  async findOne(id: string, exception: boolean = true) {
    const result = await this.counselingRepository.findOneBy({ id })
    if (!result && exception) throw new NotFoundException('Result Not Found')
    return result
  }

  async remove(id: string) {
    const result = await this.findOne(id)
    await this.counselingRepository.remove(result)
    return new ApiSuccessResponse()
  }
}
