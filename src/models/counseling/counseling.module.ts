import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Counseling } from '@models/counseling'
import { CounselingService } from './counseling.service'
import { CounselingController } from './counseling.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Counseling])],
  controllers: [CounselingController],
  providers: [CounselingService]
})
export class CounselingModule {}
