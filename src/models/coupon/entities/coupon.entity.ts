import { Entity, Column } from 'typeorm'

import { BaseEntity } from '@database'

export class Coupon extends BaseEntity {
  @Column({ length: 255 })
  title: string

  @Column()
  description: string

  @Column()
  discount: number

  @Column({ length: 255 })
  image: string

  @Column({ length: 255 })
  thumbnail: string

  @Column()
  expire_at: Date
}
