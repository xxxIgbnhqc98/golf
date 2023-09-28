import { Entity, Column } from 'typeorm'

import { BaseEntity } from '@database'

@Entity({ name: 'group' })
export class Group extends BaseEntity {
  @Column({ length: 255 })
  title: string
}
