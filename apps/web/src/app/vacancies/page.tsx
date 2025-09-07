'use server'

import { Suspense } from 'react'

export default async function Vacancies() {
  return (
    <Suspense fallback={<div>Loading Companies...</div>}>
      <div>Vacancies</div>
    </Suspense>
  )
}
