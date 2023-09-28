import * as dotenv from 'dotenv'
import { ServiceAccount } from 'firebase-admin'
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
    salt_or_round: string | number
  }
  s3: {
    access_key_id: string
    secret_access_key: string
    bucket_name: string
  }
  database: ConfigDatabase
  firebase: ServiceAccount
} {
  const _config = {
    server: {
      port: process.env.PORT,
      secret: process.env.SECRET_KEY,
      expires_in: process.env.EXPIRES,
      refresh_expires_in: process.env.REFRESH_EXPIRES,
      salt_or_round: process.env.SALT_OR_ROUND
    },
    s3: {
      access_key_id: process.env.S3_ACCESS_KEY_ID,
      secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
      bucket_name: process.env.S3_BUCKET_NAME
    },
    database: database.development,
    firebase: {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL
    }
  }
  if (environment === 'production') {
    _config.database = database.production
  }
  return _config
}

const config = getConfig(process.env.NODE_ENV)

export default config
