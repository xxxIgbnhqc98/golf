import { Entity, Column } from 'typeorm'
import { BaseEntity } from '@database'

@Entity({ name: 'refresh_token' })
export class RefreshToken extends BaseEntity {
  @Column()
  user_id: string

  @Column({ length: 255 })
  refresh_token: string

  @Column({ nullable: true })
  expire_at: Date
}
