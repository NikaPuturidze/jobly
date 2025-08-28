import { db } from '@jobly/db'
import { vacancy } from '@jobly/db/src/schema'
import { count } from 'drizzle-orm'
import { publicProcedure, router } from '../../server/trpc'

export const vacancyRouter = router({
  title: publicProcedure.query(async () => {
    return db
      .select({
        count: count(),
      })
      .from(vacancy)
  }),
})
