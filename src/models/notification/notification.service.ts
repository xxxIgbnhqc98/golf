import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Notification, NotificationGlobal } from '@models/notification'
import {
  CreateNotificationGlobalDto,
  UpdateNotificationGlobalDto,
  CreateNotificationDto
} from '@models/notification'
import { PageOptionsDto, PageDto, PageMetaDto } from '@common/pagination'
import { ApiSuccessResponse } from '@common/api-response'

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(NotificationGlobal)
    private notificationGlobalRepository: Repository<NotificationGlobal>
  ) {}
  async create(createNotificationDto: CreateNotificationDto) {
    const notification = this.notificationRepository.create(
      createNotificationDto
    )
    await this.notificationRepository.save(notification)
    return notification
  }

  async createGlobal(createNotificationGlobalDto: CreateNotificationGlobalDto) {
    const notificationGlobal = this.notificationGlobalRepository.create(
      createNotificationGlobalDto
    )
    await this.notificationGlobalRepository.save(notificationGlobal)
    return notificationGlobal
  }

  async findAllGlobal(pageOptionsDto: PageOptionsDto) {
    const query = this.notificationGlobalRepository
      .createQueryBuilder('notification_global')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('notification_global.created_at', pageOptionsDto.order)
    const [list, count] = await query.getManyAndCount()
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: count
    })
    return new PageDto(list, pageMetaDto)
  }

  async findOne(id: string) {
    const notification = await this.notificationGlobalRepository.findBy({ id })
    if (!notification) throw new NotFoundException('Notification Not Found')
    return notification
  }

  async update(id: string, updateNotificationDto: UpdateNotificationGlobalDto) {
    await this.findOne(id)
    const updateGlobal = await this.notificationGlobalRepository.update(
      id,
      updateNotificationDto
    )
    return updateGlobal
  }

  async remove(id: string) {
    const notificationGlobal = await this.findOne(id)
    await this.notificationGlobalRepository.remove(notificationGlobal)
    return new ApiSuccessResponse()
  }

  async findAllByUser(pageOptionsDto: PageOptionsDto, user_id: string) {
    const query = this.notificationRepository
      .createQueryBuilder('notification')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('notification.created_at', pageOptionsDto.order)
      .where('notification.user_id = :user_id', { user_id })

    const [list, count] = await query.getManyAndCount()
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: pageOptionsDto,
      itemCount: count
    })

    return new PageDto(list, pageMetaDto)
  }

  async findOneByUser(id: string, user_id: string) {
    const notification = await this.notificationRepository.findBy({
      id,
      user_id
    })

    if (!notification) throw new NotFoundException('Notification Not Found')
    return notification
  }
}
