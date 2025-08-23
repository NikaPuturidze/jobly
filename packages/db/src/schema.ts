import { pgTable, serial, integer, text, boolean, timestamp, primaryKey, unique } from 'drizzle-orm/pg-core'

export const categoryJob = pgTable('category_job', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id').notNull(),
  name: text('name').notNull(),
})

export const typeSalary = pgTable('type_salary', {
  id: serial('id').primaryKey(),
  typeId: integer('type_id').notNull(),
  fixed: boolean('fixed').notNull().default(false),
  name: text('name').notNull(),
})

export const typeJob = pgTable('type_job', {
  id: serial('id').primaryKey(),
  typeId: integer('type_id').notNull(),
  name: text('name').notNull(),
})

export const experience = pgTable('experience', {
  id: serial('id').primaryKey(),
  experienceId: integer('experience_id').notNull(),
  level: text('level'),
})

export const vacancy = pgTable(
  'vacancy',
  {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    postedAt: timestamp('posted_at').notNull(),
    sourceUrl: text('source_url').notNull(),
    title: text('title').notNull(),
    jobTypeId: integer('job_type_id').references(() => typeJob.id),
    categoryId: integer('category_id').references(() => categoryJob.id),
    salaryFrom: integer('salary_from'),
    salaryTo: integer('salary_to'),
    salaryPeriod: text('salary_period'),
    salaryTypeId: integer('salary_type_id')
      .references(() => typeSalary.id)
      .notNull(),
    country: text('country'),
    city: text('city'),
    companyId: integer('company_id').references(() => company.id),
    dedupeKey: text('dedupe_key').notNull().unique(),
  },
  (table) => [unique('vacancy_unique').on(table.dedupeKey)]
)

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
    name: text('name').notNull(),
    description: text('description'),
    hasLogo: boolean('has_logo').notNull().default(false),
    logo: text('logo'),
    country: text('country'),
    city: text('city'),
  },
  (table) => [unique('company_unique').on(table.name)]
)
