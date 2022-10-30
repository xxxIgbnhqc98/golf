import * as dotenv from 'dotenv'
dotenv.config()

import database from './database'

interface ConfigDatabase {
  username: string
  password: string
  database: string
  host: string
  port: number
  type: any
}

function getConfig(environment: string): {
  server: {
    port: string
    secret: string
    expires_in: string
    refresh_expires_in: string
  }
  database: ConfigDatabase
} {
  const _config = {
    server: {
      port: process.env.PORT,
      secret: process.env.SECRET_KEY,
      expires_in: process.env.EXPIRES,
      refresh_expires_in: process.env.REFRESH_EXPIRES
    },
    database: database.development
  }
  if (environment === 'production') {
    _config.database = database.production
  }
  return _config
}

const config = getConfig(process.env.NODE_ENV)

export default config
