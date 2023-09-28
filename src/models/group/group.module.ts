import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { Group, UserGroup } from '@models/group'
import { GroupService } from './group.service'
import { GroupController } from './group.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Group, UserGroup])],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
