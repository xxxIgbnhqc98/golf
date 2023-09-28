import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PopupService } from './popup.service'
import { PopupController } from './popup.controller'
import { Popup } from '@models/popup'

@Module({
  imports: [TypeOrmModule.forFeature([Popup])],
  controllers: [PopupController],
  providers: [PopupService]
})
export class PopupModule {}
