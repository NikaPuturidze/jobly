import { initTRPC } from '@trpc/server'
import { topicsRouter } from './router/topics.router'
import { mainRouter } from './router/main.router'

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  topics: topicsRouter(trpc),
  main: mainRouter(trpc),
})

export type TrpcRouter = typeof trpcRouter
