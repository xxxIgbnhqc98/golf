import 'reflect-metadata'
import { DataSource } from 'typeorm'
import config from '../config'

export const AppDataSource = new DataSource({
  ...config.database,
  logging: true,
  synchronize: true,
  migrationsTableName: 'migrations',
  migrations: ['src/database/migration/*{.ts, .js}'],
  entities: ['src/models/**/entities/*{.ts, .js}']
})
