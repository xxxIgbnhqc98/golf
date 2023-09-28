import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createTableCoupon1667361551234 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'coupon',
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
            name: 'description',
            type: 'text'
          },
          {
            name: 'discount',
            type: 'int'
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
            name: 'expire_at',
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
    await queryRunner.dropTable('coupon')
  }
}
