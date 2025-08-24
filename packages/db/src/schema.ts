import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { pgTable, serial, integer, text, boolean, timestamp, primaryKey, unique } from 'drizzle-orm/pg-core'

export const categoryJob = pgTable('category_job', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id').unique().notNull(),
  name: text('name').notNull(),
})

export const typeSalary = pgTable('type_salary', {
  id: serial('id').primaryKey(),
  typeId: integer('type_id').unique().notNull(),
  fixed: boolean('fixed').notNull().default(false),
  name: text('name').notNull(),
})

export const typeJob = pgTable('type_job', {
  id: serial('id').primaryKey(),
  typeId: integer('type_id').unique().notNull(),
  name: text('name').notNull(),
})

export const experience = pgTable('experience', {
  id: serial('id').primaryKey(),
  experienceId: integer('experience_id').unique().notNull(),
  level: text('level'),
})

export const periodSalary = pgTable('period_salary', {
  id: serial('id').primaryKey(),
  typeId: integer('type_id').unique().notNull(),
  name: text('name'),
})

export const vacancy = pgTable('vacancy', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  postedAt: timestamp('posted_at').notNull(),
  sourceUrl: text('source_url').unique().notNull(),
  title: text('title'),
  jobTypeId: integer('job_type_id').references(() => typeJob.typeId),
  categoryId: integer('category_id').references(() => categoryJob.categoryId),
  salaryFrom: integer('salary_from'),
  salaryTo: integer('salary_to'),
  salaryPeriodId: integer('salary_period_id').references(() => periodSalary.typeId),
  salaryTypeId: integer('salary_type_id').references(() => typeSalary.typeId),
  country: text('country'),
  city: text('city'),
  companyId: integer('company_id').references(() => company.id),
  dedupeKey: text('dedupe_key').notNull(),
})

export const experience_vacancy = pgTable(
  'experience_vacancy',
  {
    vacancyId: integer('vacancy_id')
      .references(() => vacancy.id)
      .notNull(),
    experienceId: integer('experience_id')
      .references(() => experience.id)
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.experienceId, table.vacancyId] })]
)

export const company = pgTable(
  'company',
  {
    id: serial('id').primaryKey(),
    name: text('name'),
    description: text('description'),
    hasLogo: boolean('has_logo').notNull().default(false),
    logo: text('logo'),
    country: text('country'),
    city: text('city'),
  },
  (table) => [unique('company_unique').on(table.name)]
)

export type CategoryJob = InferSelectModel<typeof categoryJob>
export type TypeSalary = InferSelectModel<typeof typeSalary>
export type TypeJob = InferSelectModel<typeof typeJob>
export type Experience = InferSelectModel<typeof experience>
export type Vacancy = InferSelectModel<typeof vacancy>
export type ExperienceVacancy = InferSelectModel<typeof experience_vacancy>
export type Company = InferSelectModel<typeof company>
export type PeriodSalary = InferSelectModel<typeof periodSalary>

export type CategoryJobInsert = InferInsertModel<typeof categoryJob>
export type TypeSalaryInsert = InferInsertModel<typeof typeSalary>
export type TypeJobInsert = InferInsertModel<typeof typeJob>
export type ExperienceInsert = InferInsertModel<typeof experience>
export type VacancyInsert = InferInsertModel<typeof vacancy>
export type ExperienceVacancyInsert = InferInsertModel<typeof experience_vacancy>
export type CompanyInsert = InferInsertModel<typeof company>
export type PeriodSalaryInsert = InferInsertModel<typeof periodSalary>
