import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const env = process.env.ENV

export const client = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: env == 'dev' ? process.env.DB_NAME : process.env.DB_TEST,
  port: process.env.DB_PORT as number | undefined,
})
