import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createTablePopup1667362880915 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'popup',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'link',
            type: 'varchar'
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
            name: 'from_date',
            type: 'timestamp'
          },
          {
            name: 'to_date',
            type: 'timestamp'
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
    await queryRunner.dropTable('popup')
  }
}
