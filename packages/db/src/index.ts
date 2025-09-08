import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import path from 'path'
import postgres from 'postgres'

config({ path: path.resolve(__dirname, '../../../.env') })

if (!process.env['DATABASE_URL']) {
  throw new Error('DATABASE_URL is not defined in the environment variables.')
}

const client = postgres(process.env['DATABASE_URL']!, {
  ssl: { rejectUnauthorized: false },
  prepare: true,
})

export default drizzle({ client })
