import { Entity, Column, Unique } from 'typeorm'

import { BaseEntity } from '@database'

@Entity({ name: 'user_group' })
@Unique(['user_id', 'group_id'])
export class UserGroup extends BaseEntity {
  @Column()
  user_id: string

  @Column()
  group_id: string
}
