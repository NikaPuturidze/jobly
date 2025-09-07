'use server'

import { Suspense } from 'react'
import HomeData from './home/server'

export default async function Home() {
  return (
    <Suspense fallback={<div>Loading Home...</div>}>
      <HomeData />
    </Suspense>
  )
}
