import { Entity, Column } from 'typeorm'

import { BaseEntity } from '@database'

@Entity({ name: 'notification_global' })
export class NotificationGlobal extends BaseEntity {
  @Column({ length: 255 })
  title: string

  @Column()
  description: string

  @Column()
  date: Date

  @Column({ length: 255 })
  image: string

  @Column({ length: 255 })
  thumbnail: string
}
