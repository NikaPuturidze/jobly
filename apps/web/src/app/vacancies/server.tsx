'use server'

import React from 'react'
import { trpcServer } from '@/src/lib/trpc'
import VacanciesProviders from './providers'

export default async function VacanciesData() {
  const initialData = await trpcServer.main.vacancies.query({})
  console.log('initialData', initialData)
  return <VacanciesProviders initialData={initialData} />
}
