import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Notification, NotificationGlobal } from '@models/notification'
import { NotificationService } from './notification.service'
import { NotificationController } from './notification.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Notification, NotificationGlobal])],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
