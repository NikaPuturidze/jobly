'use server'

import { Suspense } from 'react'
import VacanciesData from './server'

export default async function Vacancies() {
  return (
    <Suspense fallback={<div>Loading Vacancies...</div>}>
      <VacanciesData />
    </Suspense>
  )
}
