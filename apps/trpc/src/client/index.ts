import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from '../router'
import { config } from 'dotenv'
import path from 'path'

config({ path: path.resolve(__dirname, '../../../../.env') })

if (!process.env['PORT_TRPC']) {
  throw new Error('PORT_TRPC is not defined in the environment variables.2')
}

export default createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `http://localhost:${process.env['PORT_TRPC']}/trpc`,
    }),
  ],
})
