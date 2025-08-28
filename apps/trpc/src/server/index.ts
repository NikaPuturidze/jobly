import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from '../router'
import { config } from 'dotenv'
import path from 'path'

config({ path: path.resolve(__dirname, '../../../../.env') })

if (!process.env['PORT_TRPC']) {
  throw new Error('PORT_TRPC is not defined in the environment variables.')
}

const app = express()

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
)

app.listen(process.env['PORT_TRPC'], () => {
  console.log(`🚀 Server running at http://localhost:${process.env['PORT_TRPC']}/trpc`)
})
