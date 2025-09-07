import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'
import path from 'path'

config({ path: path.resolve(__dirname, '../../../../.env') })

if (!process.env['DATABASE_URL']) {
  throw new Error('DATABASE_URL is not defined in the environment variables.')
}

export default defineConfig({
  schema: './src/schema.ts',
  out: './src/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env['DATABASE_URL'],
  },
})
