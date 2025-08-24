import { db } from '@jobly/db'
import { company } from '@jobly/db/src/schema'
import { eq } from 'drizzle-orm'

export async function getOrCreateCompany(data: {
  name: string | null
  description?: string | null
  hasLogo: boolean
  logo: string | null
  country: string | null
  city: string | null
}) {
  const [inserted] = await db
    .insert(company)
    .values({
      name: data.name,
      description: data.description,
      hasLogo: data.hasLogo ?? false,
      logo: data.logo,
      country: data.country,
      city: data.city,
    })
    .onConflictDoNothing({ target: [company.name] })
    .returning({ id: company.id })

  if (inserted) return inserted.id
  if (!data.name) return null

  const [existing] = await db.select({ id: company.id }).from(company).where(eq(company.name, data.name))

  return existing!.id
}
