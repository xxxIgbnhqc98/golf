import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

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
            type: 'varchar'
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
            type: 'varchar'
          },
          {
            name: 'avatar',
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
    await queryRunner.dropIndex('user', 'IDX_USERNAME')
    await queryRunner.dropTable('user')
  }
}
