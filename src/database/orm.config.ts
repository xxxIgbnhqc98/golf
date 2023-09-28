import 'reflect-metadata'
import { DataSource } from 'typeorm'
import config from '@config'

export const AppDataSource = new DataSource({
  ...config.database,
  logging: true,
  synchronize: true,
  migrationsTableName: 'migrations',
  migrations: ['dist/database/migration/*.js'],
  entities: ['dist/models/**/entities/*.js', 'dist/auth/entities/*.js']
})
