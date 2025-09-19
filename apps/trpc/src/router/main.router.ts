import { db } from '@jobly/db'
import { categoryJob, company, experience, experience_vacancy, typeJob, vacancy } from '@jobly/db/src/schema'
import { inferProcedureOutput, TRPCRootObject } from '@trpc/server'
import { RuntimeConfigOptions } from '@trpc/server/unstable-core-do-not-import'
import {
  eq,
  count,
  inArray,
  desc,
  and,
  isNull,
  not,
  sql,
  gt,
  SQL,
  ilike,
  countDistinct,
  gte,
  lte,
  or,
} from 'drizzle-orm'
import z from 'zod'
import { numberFormat } from '../utils/format'

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
            .leftJoin(vacancy, eq(categoryJob.categoryId, vacancy.categoryId))
            .groupBy(categoryJob.categoryId, categoryJob.name, categoryJob.icon, categoryJob.color)
            .orderBy(desc(count(vacancy.id))),
          db
            .select({
              companyId: company.id,
              name: company.name,
              logo: company.logo,
              description: company.description,
              totalVacancies: count(vacancy.id),
            })
            .from(company)
            .where(
              inArray(company.name, [
                'ლიბერთ ბანკი',
                'თიბისი',
                'კრედო ბანკი',
                'ნიკორა ტრეიდი',
                'ნიკორა',
                'TNET',
                'სილქნეტი',
                'ზუმერი · Zoommer',
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
        categories: categories.sort((a, b) => a.name.localeCompare(b.name)),
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
    vacancies: trpc.procedure
      .input(
        z.object({
          query: z.string().optional().nullable(),
          selectedCategoriesIds: z.array(z.number()).optional(),
          selectedExperienceLevelsIds: z.array(z.number()).optional(),
          selectedJobTypeIds: z.array(z.number()).optional(),
          currentPage: z.number().optional().default(1),
          salaryFrom: z.number().optional().default(0),
          salaryTo: z.number().optional().default(undefined),
        })
      )
      .query(async ({ input }) => {
        const filtersVacancies: (SQL | undefined)[] = []

        if (input.query) {
          filtersVacancies.push(ilike(sql`LOWER(${vacancy.title})`, `%${input.query.toLowerCase()}%`))
        }
        if (input.selectedCategoriesIds?.length) {
          filtersVacancies.push(inArray(vacancy.categoryId, input.selectedCategoriesIds))
        }

        if (input.selectedExperienceLevelsIds?.length) {
          filtersVacancies.push(inArray(experience_vacancy.experienceId, input.selectedExperienceLevelsIds))
        }
        if (input.selectedJobTypeIds?.length) {
          filtersVacancies.push(inArray(vacancy.jobTypeId, input.selectedJobTypeIds))
        }

        if (input.salaryFrom) {
          filtersVacancies.push(
            or(
              isNull(vacancy.salaryFrom),
              isNull(vacancy.salaryTo),
              gte(vacancy.salaryTo, input.salaryFrom),
              gte(vacancy.salaryFrom, input.salaryFrom)
            )
          )
        }

        if (input.salaryTo) {
          filtersVacancies.push(
            or(
              isNull(vacancy.salaryFrom),
              isNull(vacancy.salaryTo),
              lte(vacancy.salaryFrom, input.salaryTo),
              lte(vacancy.salaryTo, input.salaryTo)
            )
          )
        }

        const [vacancies, categories, maxSalary, expereinceLevels, jobType, totalVacancy] = await Promise.all(
          [
            db
              .selectDistinctOn([vacancy.id], {
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
              .leftJoin(experience_vacancy, eq(vacancy.id, experience_vacancy.vacancyId))
              .where(and(...filtersVacancies))
              .offset((input.currentPage - 1) * 24)
              .limit(24)
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
              })
              .from(categoryJob),
            db
              .select({ maxSalary: vacancy.salaryFrom })
              .from(vacancy)
              .where(not(isNull(vacancy.salaryFrom)))
              .orderBy(desc(vacancy.salaryFrom))
              .limit(1),
            db
              .select({
                id: experience.experienceId,
                name: experience.level,
              })
              .from(experience),
            db
              .select({
                id: typeJob.typeId,
                name: typeJob.name,
              })
              .from(typeJob),
            db
              .select({ count: countDistinct(vacancy.id) })
              .from(vacancy)
              .leftJoin(experience_vacancy, eq(vacancy.id, experience_vacancy.vacancyId))
              .where(and(...filtersVacancies)),
          ]
        )

        return {
          vacancies,
          filters: {
            categories: categories.sort((a, b) => a.name.localeCompare(b.name)),
            expereinceLevels,
            jobType,
          },
          info: {
            maxSalary: maxSalary[0]?.maxSalary,
            totalPages: Math.ceil(Number(totalVacancy[0]?.count ?? 0) / 24),
            totalVacancy: numberFormat(Number(totalVacancy[0]?.count ?? 0)),
          },
        }
      }),
  })

type MainRouter = ReturnType<typeof mainRouter>
export type MainGet = inferProcedureOutput<MainRouter['get']>
export type PopularVacancy = MainGet['popularVacancies'][number]
export type TopCompany = MainGet['popularCompanies'][number]
export type Vacancies = inferProcedureOutput<MainRouter['vacancies']>
export type MainCategories = inferProcedureOutput<MainRouter['categories']>
