import { Entity, Column } from 'typeorm'

import { BaseEntity } from '@database'
import { LessonType } from '@src/constants'

@Entity({ name: 'lesson' })
export class Lesson extends BaseEntity {
  @Column({ length: 255 })
  title: string

  @Column()
  price: number

  @Column({ length: 255 })
  introduction: string

  @Column({ length: 255 })
  schedule: string

  @Column()
  description: string

  @Column({ length: 255 })
  image: string

  @Column({ length: 255 })
  thumbnail: string

  @Column({ type: 'enum', enum: LessonType })
  type: LessonType
}
