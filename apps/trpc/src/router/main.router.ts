import { db } from '@jobly/db'
import { categoryJob, company, typeJob, vacancy } from '@jobly/db/src/schema'
import { inferProcedureOutput, TRPCRootObject } from '@trpc/server'
import { RuntimeConfigOptions } from '@trpc/server/unstable-core-do-not-import'
import { eq, count, inArray, desc, and, isNull, not, sql, gt } from 'drizzle-orm'
import { Cat } from '../../../../packages/api-worker/src/utils/shared/categories'

export const mainRouter = (trpc: TRPCRootObject<object, object, RuntimeConfigOptions<object, object>>) =>
  trpc.router({
    get: trpc.procedure.query(async () => {
      const [totalVacancy, totalCompanies, popularVacancies, categories, popularCompanies] =
        await Promise.all([
          db.$count(vacancy),
          db.$count(company),
          db
            .select({
              id: vacancy.id,
              createdAt: vacancy.createdAt,
              postedAt: vacancy.postedAt,
              sourceUrl: vacancy.sourceUrl,
              title: vacancy.title,
              jobTypeId: vacancy.jobTypeId,
              jobTypeTitle: typeJob.name,
              categoryId: vacancy.categoryId,
              salaryFrom: vacancy.salaryFrom,
              salaryTo: vacancy.salaryTo,
              salaryPeriodId: vacancy.salaryPeriodId,
              salaryTypeId: vacancy.salaryTypeId,
              country: vacancy.country,
              city: vacancy.city,
              companyId: vacancy.companyId,
              companyName: company.name,
              companyDescription: company.description,
              companyHasLogo: company.hasLogo,
              companyLogo: company.logo,
            })
            .from(vacancy)
            .leftJoin(company, eq(vacancy.companyId, company.id))
            .leftJoin(typeJob, eq(vacancy.jobTypeId, typeJob.typeId))
            .where(
              and(
                not(isNull(vacancy.salaryFrom)),
                not(isNull(vacancy.companyId)),
                not(isNull(vacancy.city)),
                not(isNull(company.logo)),
                gt(vacancy.salaryFrom, 1500)
              )
            )
            .orderBy(sql`random()`)
            .limit(6)
            .then((rows) =>
              rows.map((v) => ({
                ...v,
                createdAt: String(v.createdAt),
                postedAt: String(v.postedAt),
              }))
            ),
          db
            .select({
              id: categoryJob.categoryId,
              name: categoryJob.name,
              icon: categoryJob.icon,
              color: categoryJob.color,
              totalVacancies: count(vacancy.id),
            })
            .from(categoryJob)
            .where(
              inArray(categoryJob.categoryId, [
                Cat.IT,
                Cat.Cleaning,
                Cat.Banking,
                Cat.AutoService,
                Cat.Horeca,
                Cat.Finance,
                Cat.Cashier,
                Cat.Security,
              ])
            )
            .leftJoin(vacancy, eq(categoryJob.categoryId, vacancy.categoryId))
            .groupBy(categoryJob.categoryId, categoryJob.name, categoryJob.icon, categoryJob.color)
            .orderBy(desc(count(vacancy.id))),
          db
            .select({
              companyId: company.id,
              name: company.name,
              logo: company.logo,
              totalVacancies: count(vacancy.id),
            })
            .from(company)
            .where(
              inArray(company.name, [
                'ლიბერთი ბანკი',
                'თიბისი',
                'კრედო ბანკი',
                'ნიკორა ტრეიდი',
                'ნიკორა',
                'TNET',
                'სილქნეტი',
                'საბვეი',
                'დანკინ',
                'თეგეტა მოტორსი',
              ])
            )
            .leftJoin(vacancy, eq(company.id, vacancy.companyId))
            .groupBy(company.id, company.name, company.logo)
            .orderBy(desc(count(vacancy.id))),
        ])

      return {
        totalCompanies,
        totalVacancy,
        popularVacancies,
        categories,
        popularCompanies,
      }
    }),
    categories: trpc.procedure.query(async () => {
      return await db
        .select({
          id: categoryJob.categoryId,
          name: categoryJob.name,
          icon: categoryJob.icon,
          color: categoryJob.color,
          totalVacancies: count(vacancy.id),
        })
        .from(categoryJob)
        .leftJoin(vacancy, eq(categoryJob.categoryId, vacancy.categoryId))
        .groupBy(categoryJob.categoryId, categoryJob.name, categoryJob.icon, categoryJob.color)
        .orderBy(desc(count(vacancy.id)))
    }),
  })

type MainRouter = ReturnType<typeof mainRouter>
export type MainGet = inferProcedureOutput<MainRouter['get']>
export type PopularVacancy = MainGet['popularVacancies'][number]
export type TopCompany = MainGet['popularCompanies'][number]
export type MainCategories = inferProcedureOutput<MainRouter['categories']>
