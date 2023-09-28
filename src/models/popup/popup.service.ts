import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreatePopupDto, Popup } from '@models/popup'
import { ApiSuccessResponse } from '@common/api-response'
import { PageOptionsDto, PageMetaDto, PageDto } from '@common/pagination'

@Injectable()
export class PopupService {
  constructor(
    @InjectRepository(Popup) private popupRepository: Repository<Popup>
  ) {}

  async create(createPopupDto: CreatePopupDto) {
    const popup = this.popupRepository.create(createPopupDto)
    await this.popupRepository.save(popup)
    return popup
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const query = this.popupRepository
      .createQueryBuilder('popup')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('popup.created_at', pageOptionsDto.order)
    const [list, count] = await query.getManyAndCount()
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: pageOptionsDto,
      itemCount: count
    })
    return new PageDto(list, pageMetaDto)
  }

  async findOne(id: string) {
    const popup = await this.popupRepository.findOneBy({ id })
    if (!popup) {
      throw new NotFoundException('Popup Not Found')
    }
    return popup
  }

  async update(id: string, updatePopupDto: CreatePopupDto) {
    await this.findOne(id)
    const updateUser = await this.popupRepository.update(id, updatePopupDto)
    return updateUser
  }

  async remove(id: string) {
    const popup = await this.findOne(id)
    await this.popupRepository.remove(popup)
    return new ApiSuccessResponse()
  }
}
