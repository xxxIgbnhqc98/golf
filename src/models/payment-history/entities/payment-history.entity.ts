import { Entity, Column } from 'typeorm'

import { BaseEntity } from '@database'
import { PaymentProductType } from '@constants'
import { Product } from '@models/product'
import { Lesson } from '@models/lesson'

@Entity({ name: 'payment_history' })
export class PaymentHistory extends BaseEntity {
  @Column()
  user_id: string

  @Column()
  status: boolean

  @Column({ type: 'enum', enum: PaymentProductType })
  type: PaymentProductType

  @Column({ type: 'jsonb' })
  info: Product | Lesson
}
