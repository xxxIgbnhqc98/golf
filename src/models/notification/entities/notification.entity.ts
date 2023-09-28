import { Entity, Column } from 'typeorm'

import { BaseEntity } from '@database'

export class Notification extends BaseEntity {
  @Column({ length: 255 })
  title: string

  @Column()
  description: string

  @Column({ length: 255 })
  image: string

  @Column({ length: 255 })
  thumbnail: string

  @Column()
  user_id: string
}
