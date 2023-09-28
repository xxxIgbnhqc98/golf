import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { LessonType } from '@constants'

export class createTableLesson1667358690210 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lesson',
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
            name: 'price',
            type: 'bigint'
          },
          {
            name: 'introduction',
            type: 'varchar'
          },
          {
            name: 'schedule',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'text'
          },
          {
            name: 'image',
            type: 'varchar'
          },
          {
            name: 'thumbnail',
            type: 'varchar'
          },
          {
            name: 'type',
            type: 'enum',
            enum: [LessonType.BASIC, LessonType.POINT, LessonType.ADVANCED]
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
    await queryRunner.dropTable('lesson')
  }
}
