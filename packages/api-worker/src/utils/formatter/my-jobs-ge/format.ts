import { Cat } from '../../shared/categories'
import { IFormat } from '../../shared/format.interface'
import {
  CategoryId,
  EmploymentType,
  Experience,
  IMyJobsGeData,
  JobType,
  SalaryPeriodType,
  SalaryType,
} from './interfaces/interface'

export default function format(data: IMyJobsGeData): IFormat {
  const categoryId = +Object.entries(CategoriesMap).find(([, value]) =>
    value.includes(data.category_data.id)
  )![0]

  return {
    sourceUrl: `https://myjobs.ge/ka/vacancy/${data.id}`,
    title: data.title,
    postedAt: data.created_at,
    jobTypeId: JobTypeMap[data.job_type],
    employmentTypeId: EmploymentTypeMap[data.employment_type as EmploymentType] ?? null,
    categoryId: categoryId,
    salaryFrom: data.salary_from,
    salaryTo: data.salary_to,
    salaryPeriodId: data.salary_period ? SalaryPeriodMap[data.salary_period] : null,
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
      .map((e) => ExperienceMap[e.experience_level])
      .filter((id): id is number => !!id),
  }
}

const EmploymentTypeMap: Record<EmploymentType, number> = {
  [EmploymentType.FullTime]: 1,
  [EmploymentType.PartTime]: 2,
  [EmploymentType.Hourly]: 3,
  [EmploymentType.Shifts]: 4,
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

const SalaryPeriodMap: Record<SalaryPeriodType, number> = {
  [SalaryPeriodType.Monthly]: 1,
  [SalaryPeriodType.Daily]: 2,
}

const CategoriesMap: Partial<Record<Cat, CategoryId[]>> = {
  [Cat.IT]: [CategoryId.ITDevelopment, CategoryId.WebDesign, CategoryId.ITTech],
  [Cat.MarketingSales]: [CategoryId.Marketing],
  [Cat.Finance]: [CategoryId.Sales, CategoryId.Finance],
  [Cat.Banking]: [CategoryId.Banking],
  [Cat.Healthcare]: [CategoryId.Healthcare],
  [Cat.Education]: [CategoryId.Education],
  [Cat.Law]: [CategoryId.Law],
  [Cat.HR]: [CategoryId.HR],
  [Cat.Horeca]: [CategoryId.Horeca],
  [Cat.ServiceStaff]: [CategoryId.ServiceStaff],
  [Cat.Media]: [CategoryId.Media],
  [Cat.ArtsCulture]: [CategoryId.ArtsCulture],
  [Cat.ConstructionEngineering]: [CategoryId.Construction],
  [Cat.Logistics]: [CategoryId.Logistics],
  [Cat.Transport]: [CategoryId.Transport, CategoryId.AutoIndustry],
  [Cat.Energy]: [CategoryId.Energy],
  [Cat.Management]: [CategoryId.Management, CategoryId.ProjectManagement],
  [Cat.TourismHotel]: [CategoryId.Tourism],
  [Cat.Security]: [CategoryId.Security],
  [Cat.AestheticsBeauty]: [CategoryId.Aesthetics],
  [Cat.NGO]: [CategoryId.NGO],
  [Cat.Gambling]: [CategoryId.Gambling],
  [Cat.Sport]: [CategoryId.Sports],
  [Cat.AgroFarming]: [CategoryId.Agro],
  [Cat.Office]: [CategoryId.Office],
}

const ExperienceMap: Record<Experience, number> = {
  [Experience.Junior]: 1,
  [Experience.Middle]: 2,
  [Experience.Professional]: 3,
  [Experience.Specialist]: 4,
}
