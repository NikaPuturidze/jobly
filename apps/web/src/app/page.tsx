'use server'

import { trpc } from '@jobly/trpc'

export default async function Home() {
  const [response] = await trpc.vacancy.title.query()
  return <div>Found {response?.count} vacanies in db</div>
}
