import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { PaymentProductType } from '@constants'

export class createTablePaymentHistory1668591886780
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payment_history',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'user_id',
            type: 'uuid'
          },
          {
            name: 'status',
            type: 'boolean'
          },
          {
            name: 'type',
            type: 'enum',
            enum: [PaymentProductType.LESSON, PaymentProductType.PRODUCT]
          },
          {
            name: 'info',
            type: 'jsonb'
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
    await queryRunner.dropTable('payment_history')
  }
}
