import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { StudentLevel } from '@constants'

export class createTableCounseling1668567245254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'counseling',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'title',
            type: 'varchar'
          },
          {
            name: 'phone_number',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'level',
            type: 'enum',
            enum: [
              StudentLevel.BASIC,
              StudentLevel.ADVANCED,
              StudentLevel.PROFESSIONAL
            ]
          },
          {
            name: 'content',
            type: 'text'
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('counseling')
  }
}
