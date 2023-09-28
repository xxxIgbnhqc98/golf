import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

import { UserRole, Gender } from '@constants'

export class createTableUser1666776941043 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'nickname',
            type: 'varchar'
          },
          {
            name: 'phone_number',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'role',
            type: 'enum',
            enum: [UserRole.Admin, UserRole.Coach, UserRole.User],
            default: `'${UserRole.User}'`
          },
          {
            name: 'level',
            type: 'int',
            default: 1
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'thumbnail',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'gender',
            type: 'enum',
            enum: [Gender.MALE, Gender.FEMALE, Gender.OTHER],
            isNullable: true
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true
          },
          {
            name: 'emergency',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'technique',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      }),
      true
    )
    await queryRunner.createIndex(
      'user',
      new TableIndex({ name: 'IDX_USERNAME', columnNames: ['username'] })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user')
  }
}
