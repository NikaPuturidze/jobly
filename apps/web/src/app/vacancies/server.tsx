'use server'

import React from 'react'
import VacanciesView from './view'
import { trpcServer } from '@/src/lib/trpc'

export default async function VacanciesData() {
  const initialData = await trpcServer.main.vacancies.query({})
  return <VacanciesView initialData={initialData} />
}
