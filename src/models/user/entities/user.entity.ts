import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  Column
} from 'typeorm'
import * as bcrypt from 'bcrypt'

import { BaseEntity } from '@database'

const SaltOrRound: number | string = 12

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ length: 255, unique: true })
  username: string

  @Column({ length: 255 })
  password: string

  @Column({ length: 255, unique: true })
  nickname: string

  @Column({ length: 255, unique: true })
  phone_number: string

  @Column({ length: 255, nullable: true })
  avatar: string

  @BeforeInsert()
  async hasPassword() {
    this.password = await bcrypt.hash(this.password, SaltOrRound)
  }
}
