import { Entity, Column } from 'typeorm'

import { BaseEntity } from '@database'
import { StudentLevel } from '@constants'

@Entity({ name: 'counseling' })
export class Counseling extends BaseEntity {
  @Column({ length: 255 })
  title: string

  @Column({ length: 255 })
  phone_number: string

  @Column({ length: 255 })
  email: string

  @Column({ type: 'enum', enum: StudentLevel })
  level: StudentLevel

  @Column()
  content: string
}
