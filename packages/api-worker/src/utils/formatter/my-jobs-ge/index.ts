import { db } from '@jobly/db'
import { vacancy, experience_vacancy } from '@jobly/db/src/schema'
import { IFormattedMyJobsGe } from './formatter'
import { getOrCreateCompany } from './utils/company'
import crypto from 'crypto'

export async function insertVacancy(data: IFormattedMyJobsGe) {
  const companyId = await getOrCreateCompany({
    name: data.companyName,
    description: data.companyDescription,
    hasLogo: data.companyHasLogo,
    logo: data.companyLogo,
    country: data.companyCountry,
    city: data.companyCity,
  })

  try {
    const [insertedVacancy] = await db
      .insert(vacancy)
      .values({
        sourceUrl: data.sourceUrl,
        title: data.title,
        postedAt: new Date(data.postedAt),
        jobTypeId: data.jobTypeId,
        categoryId: data.categoryId,
        salaryFrom: data.salaryFrom ?? null,
        salaryTo: data.salaryTo ?? null,
        salaryPeriod: data.salaryPeriod,
        salaryTypeId: data.salaryTypeId,
        country: data.locationCountry,
        city: data.locationCity,
        companyId,
        dedupeKey: makeDedupeKey(data, companyId),
      })
      .onConflictDoNothing({ target: vacancy.dedupeKey })
      .returning({ id: vacancy.id })

    if (!insertedVacancy) {
      console.warn(`Duplicate vacancy skipped: ${data.title}`)
      return null
    }

    const vacancyId = insertedVacancy.id

    const experienceRows = data.experienceIds
      .filter((id): id is number => !!id)
      .map((experienceId) => ({ vacancyId, experienceId }))

    if (experienceRows.length > 0) {
      await db.insert(experience_vacancy).values(experienceRows)
    }

    return { vacancyId, experienceIds: data.experienceIds }
  } catch (error) {
    console.error(`Failed to insert vacancy: ${data.title}`, error)
    return null
  }
}

function makeDedupeKey(vacancy: IFormattedMyJobsGe, companyId: number) {
  return crypto
    .createHash('sha256')
    .update(
      [
        vacancy.title?.toLowerCase().trim(),
        companyId,
        vacancy.locationCity ?? '-',
        vacancy.locationCountry ?? '-',
        vacancy.categoryId ?? '-',
        vacancy.jobTypeId ?? '-',
      ].join('|')
    )
    .digest('hex')
}
