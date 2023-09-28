import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createTableProduct1667359348241 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
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
            name: 'color',
            type: 'text',
            isArray: true
          },
          {
            name: 'description',
            type: 'text'
          },
          {
            name: 'images',
            type: 'text',
            isArray: true
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
    await queryRunner.dropTable('product')
  }
}
