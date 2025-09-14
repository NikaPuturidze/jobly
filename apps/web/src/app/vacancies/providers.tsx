'use client'

import { Vacancies } from '@jobly/trpc/src/router/main.router'
import { VacanciesProvider } from './context/vacancies-provider'
import VacanciesView from './view'

export default function VacanciesProviders({ initialData }: Readonly<{ initialData: Vacancies }>) {
  return (
    <VacanciesProvider initialData={initialData}>
      <VacanciesView />
    </VacanciesProvider>
  )
}
