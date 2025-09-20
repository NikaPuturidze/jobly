export interface IFormat {
  sourceUrl: string
  title: string | null
  postedAt: string | Date
  jobTypeId: number
  employmentTypeId: number | null
  categoryId: number
  salaryFrom: number | null
  salaryTo: number | null
  salaryPeriodId: number | null
  salaryTypeId: number | null
  locationCountry: string | null
  locationCity: string | null | undefined
  companyName: string | null
  companyHasLogo: boolean
  companyLogo: string | null
  companyCountry: string | null
  companyCity: string | null
  companyDescription: string | null
  experienceIds: number[]
}
