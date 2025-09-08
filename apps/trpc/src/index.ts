import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { trpcRouter } from './trpc'
import cors from 'cors'

const app = express()

app.use(cors())

app.use('/trpc', trpcExpress.createExpressMiddleware({ router: trpcRouter }))

app.listen(3000, () => {
  console.info('TRPC is listening at http://localhost:3000')
})
