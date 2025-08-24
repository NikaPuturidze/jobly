import { db } from '@jobly/db'
import { IFormat } from '../../shared/format.interface'
import { getOrCreateCompany } from '../../shared/company'
import { vacancy, experience_vacancy } from '@jobly/db/src/schema'
import axios from 'axios'
import identityKey from '../../shared/dedupe'
import { eq } from 'drizzle-orm'
import { extractDomain } from '../../shared/domain'

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
        salaryPeriodId: data.salaryPeriodId,
        salaryTypeId: data.salaryTypeId,
        country: data.locationCountry,
        city: data.locationCity,
        companyId,
        dedupeKey: key,
      })
      .returning({ id: vacancy.id })

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

export async function getAccessToken(): Promise<string | undefined> {
  const url = 'https://jobs.ss.ge/ka/l/vacancies'
  const res = await axios.get(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
    },
  })

  const cookies = res.headers['set-cookie']
  if (!cookies) throw new Error(`No set-cookie header in response from ${url}`)

  const tokenCookie = cookies.find((c: string) => c.startsWith('ss-jobs-access-token='))
  if (!tokenCookie) throw new Error(`No access token cookies ${url}`)

  return tokenCookie.split(';')[0]?.split('=')[1]
}
