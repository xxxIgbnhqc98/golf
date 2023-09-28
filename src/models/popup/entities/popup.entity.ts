import { Entity, Column } from 'typeorm'

import { BaseEntity } from '@database'

export class Popup extends BaseEntity {
  @Column({ length: 255 })
  link: string

  @Column({ length: 255 })
  image: string

  @Column({ length: 255 })
  thumbnail: string

  @Column()
  from_date: Date

  @Column()
  to_date: Date

  @Column({ length: 255 })
  user_id: string
}
