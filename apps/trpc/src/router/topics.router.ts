import { db } from '@jobly/db'
import { navigation } from '@jobly/db/src/schema'
import { TRPCRootObject } from '@trpc/server'
import { RuntimeConfigOptions } from '@trpc/server/unstable-core-do-not-import'

export const topicsRouter = (trpc: TRPCRootObject<object, object, RuntimeConfigOptions<object, object>>) =>
  trpc.router({
    get: trpc.procedure.query(() => {
      return db.select().from(navigation)
    }),
  })
