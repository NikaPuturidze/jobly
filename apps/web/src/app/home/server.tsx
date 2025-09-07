'use server'

import { trpcServer } from '@/src/lib/trpc'
import React from 'react'
import HomeView from './view'

export default async function HomeData() {
  const data = await trpcServer.main.get.query()
  return <HomeView data={data} />
}
