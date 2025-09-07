'use server'

import { Suspense } from 'react'

export default async function Companies() {
  return (
    <Suspense fallback={<div>Loading Companies...</div>}>
      <div>Companies</div>
    </Suspense>
  )
}
