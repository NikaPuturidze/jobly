import { CategoryId, Experience, IMyJobsGeData, JobType, SalaryType } from '../../../interfaces'

export default function format(data: IMyJobsGeData): IFormattedMyJobsGe {
  return {
    sourceUrl: `https://myjobs.ge/ka/vacancy/${data.id}`,
    title: data.title,
    postedAt: data.created_at,
    jobTypeId: JobTypeMap[data.job_type],
    categoryId: +Object.entries(CategoriesMap).find(([, value]) => value.includes(data.category_data.id))![0],
    salaryFrom: data.salary_from,
    salaryTo: data.salary_to,
    salaryPeriod: data.salary_period,
    salaryTypeId: SalaryTypeMap[data.salary_type],
    locationCountry: data.country?.title,
    locationCity: data.country?.city?.title,
    companyName: data.company.brand_name,
    companyHasLogo: !!data.company?.has_logo,
    companyLogo: `https://static.my.ge/myjobs/company/${data.company.id}.jpg`,
    companyCountry: data.company.country_title,
    companyCity: data.company.city_title,
    companyDescription: data.company.description,
    experienceIds: data.experience_levels
      .map((e) => experienceMap[e.experience_level])
      .filter((id): id is number => !!id),
  }
}

export interface IFormattedMyJobsGe {
  sourceUrl: string
  title: string
  postedAt: string
  jobTypeId: number
  categoryId: number
  salaryFrom: number | null
  salaryTo: number | null
  salaryPeriod: string | null
  salaryTypeId: number
  locationCountry: string | null
  locationCity: string | null | undefined
  companyName: string
  companyHasLogo: boolean
  companyLogo: string | null
  companyCountry: string | null
  companyCity: string | null | null
  companyDescription: string | null
  experienceIds: number[]
}

const JobTypeMap: Record<JobType, number> = {
  [JobType.OnSite]: 1,
  [JobType.Remote]: 2,
  [JobType.Hybrid]: 3,
  [JobType.Freelance]: 4,
}

const SalaryTypeMap: Record<SalaryType, number> = {
  [SalaryType.Negotiable]: 1,
  [SalaryType.Fixed]: 2,
  [SalaryType.Range]: 3,
}

const CategoriesMap: Record<number, CategoryId[]> = {
  1: [CategoryId.ITDevelopment, CategoryId.WebDesign, CategoryId.ITTech],
  2: [CategoryId.Marketing],
  3: [CategoryId.Sales],
  4: [CategoryId.Finance, CategoryId.Banking],
  5: [CategoryId.Healthcare],
  6: [CategoryId.Education],
  7: [CategoryId.Law],
  8: [CategoryId.HR],
  9: [CategoryId.ServiceStaff, CategoryId.Office],
  10: [CategoryId.Media, CategoryId.ArtsCulture],
  11: [CategoryId.Construction],
  12: [CategoryId.Logistics],
  13: [CategoryId.Transport, CategoryId.AutoIndustry, CategoryId.Energy],
  14: [CategoryId.Management, CategoryId.ProjectManagement],
  15: [CategoryId.Tourism],
  16: [CategoryId.Security],
  17: [CategoryId.Aesthetics],
  18: [CategoryId.NGO, CategoryId.Gambling, CategoryId.Sports, CategoryId.Horeca, CategoryId.Agro],
}

const experienceMap: Record<Experience, number> = {
  [Experience.Junior]: 1,
  [Experience.Middle]: 2,
  [Experience.Professional]: 3,
  [Experience.Specialist]: 4,
}
