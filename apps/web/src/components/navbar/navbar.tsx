'use server'

import { trpcServer } from '@/src/lib/trpc'
import NavbarClient from './view'

export default async function NavbarView() {
  const data = await trpcServer.topics.get.query()
  return <NavbarClient data={data} />
}
