import { Entity, Column } from 'typeorm'

import { BaseEntity } from '@database'

@Entity({ name: 'question' })
export class Question extends BaseEntity {
  @Column({ length: 255, nullable: true })
  phone_number: string

  @Column()
  status: boolean

  @Column()
  type: string

  @Column({ length: 255 })
  title: string

  @Column({ length: 200 })
  description: string

  @Column({ nullable: true })
  answer: string
}
