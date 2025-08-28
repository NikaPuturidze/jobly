import { router } from '../server/trpc'
import { vacancyRouter } from './routes/vacancy'

export const appRouter = router({
  vacancy: vacancyRouter,
})

export type AppRouter = typeof appRouter
