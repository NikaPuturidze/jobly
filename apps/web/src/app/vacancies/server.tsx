'use server'

import React from 'react'
import { trpcServer } from '@/src/lib/trpc'
import VacanciesProviders from './providers'

export default async function VacanciesData() {
  const initialData = await trpcServer.main.vacancies.query({})
  return <VacanciesProviders initialData={initialData} />
}
