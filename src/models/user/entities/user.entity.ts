import { Entity, BeforeInsert, Column, ManyToMany, JoinTable } from 'typeorm'

import { BaseEntity } from '@database'
import { UserRole, Gender } from '@constants'
import { Group } from '@models/group'
import { hashPassword } from '@utils'

const SaltOrRound: number | string = 12

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ length: 255, unique: true })
  username: string

  @Column({ length: 255 })
  password: string

  @Column({ length: 255 })
  nickname: string

  @Column({ length: 255, unique: true })
  phone_number: string

  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole

  @Column({ default: 1 })
  level: number

  @Column({ length: 255, nullable: true })
  avatar: string

  @Column({ length: 255, nullable: true })
  thumbnail: string

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender

  @Column({ length: 255, nullable: true })
  address: string

  @Column({ length: 255, nullable: true })
  technique: string

  @Column({ nullable: true })
  description: string

  @Column({ length: 255, nullable: true })
  emergency: string

  @ManyToMany(() => Group)
  @JoinTable({
    name: 'user_group',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id'
    }
  })
  groups: Group[]

  @BeforeInsert()
  async hasPassword() {
    this.password = await hashPassword(this.password)
  }
}
