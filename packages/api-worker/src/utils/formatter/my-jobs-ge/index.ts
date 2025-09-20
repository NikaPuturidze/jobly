import { db } from '@jobly/db'
import { vacancy, experience_vacancy } from '@jobly/db/src/schema'
import { getOrCreateCompany } from '../../shared/company'
import { IFormat } from '../../shared/format.interface'
import identityKey from '../../shared/dedupe'
import { eq } from 'drizzle-orm'
import { extractDomain } from '../../shared/domain'
import { VacancyInsertStrict } from '../../shared/insert.type'

export default async function insertVacancy(data: IFormat) {
  let companyId: number | null = null

  if (data.companyName) {
    companyId = await getOrCreateCompany({
      name: data.companyName,
      description: data.companyDescription,
      hasLogo: data.companyHasLogo,
      logo: data.companyLogo,
      country: data.companyCountry,
      city: data.companyCity,
    })
  }

  const key = identityKey(data, companyId)
  const domain = extractDomain(data.sourceUrl)

  try {
    const existingVacancies = await db.select().from(vacancy).where(eq(vacancy.dedupeKey, key))

    const isDuplicateOnOtherDomain = existingVacancies.some((v) => extractDomain(v.sourceUrl) !== domain)

    if (isDuplicateOnOtherDomain) {
      console.warn(`Duplicate vacancy across domains skipped: ${data.title} (existing on another domain)`)
      return null
    }

    const values: VacancyInsertStrict = {
      sourceUrl: data.sourceUrl,
      title: data.title,
      postedAt: new Date(data.postedAt),
      employmentTypeId: data.employmentTypeId,
      jobTypeId: data.jobTypeId,
      categoryId: data.categoryId,
      salaryFrom: data.salaryFrom ?? null,
      salaryTo: data.salaryTo ?? null,
      salaryPeriodId: data.salaryPeriodId,
      salaryTypeId: data.salaryTypeId,
      country: data.locationCountry,
      city: data.locationCity ?? null,
      companyId,
      dedupeKey: key,
    }

    const [insertedVacancy] = await db.insert(vacancy).values(values).returning({ id: vacancy.id })

    if (!insertedVacancy) {
      console.warn(`Duplicate vacancy skipped (same domain): ${data.title}`)
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
