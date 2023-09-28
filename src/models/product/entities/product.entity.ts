import { Entity, Column } from 'typeorm'
import { BaseEntity } from '@database'

@Entity({ name: 'product' })
export class Product extends BaseEntity {
  @Column({ length: 255 })
  title: string

  @Column()
  price: number

  @Column({ length: 255 })
  introduction: string

  @Column('text', { array: true })
  color: string[]

  @Column()
  description: string

  @Column('text', { array: true })
  images: string[]

  @Column('text', { array: true })
  thumbnails: string[]

  @Column()
  user_id: string
}
