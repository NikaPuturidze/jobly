import { initTRPC } from '@trpc/server'

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  hello: trpc.procedure.query(() => {
    return {
      item: 'test',
    }
  }),
})

export type TrpcRouter = typeof trpcRouter
