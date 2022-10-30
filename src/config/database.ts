import * as dotenv from 'dotenv'
dotenv.config()

export default {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_DATABASE,
    host: process.env.DEV_DB_HOST,
    port: parseInt(process.env.DEV_DB_PORT),
    type: 'postgres'
  },
  production: {
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASS,
    database: process.env.PROD_DB_NAME,
    port: parseInt(process.env.PROD_DB_PORT),
    host: process.env.PROD_DB_HOST,
    type: 'postgres'
  }
}
