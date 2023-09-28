import { PartialType } from '@nestjs/swagger'
import { CreateNotificationGlobalDto } from './create-notification-global.dto'

export class UpdateNotificationGlobalDto extends PartialType(
  CreateNotificationGlobalDto
) {}
