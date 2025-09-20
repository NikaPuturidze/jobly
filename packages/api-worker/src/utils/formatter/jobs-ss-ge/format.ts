import { Cat } from '../../shared/categories'
import { IFormat } from '../../shared/format.interface'
import { ICompaniesItem } from './interfaces/companies.interface'
import {
  CategoryId,
  Experience,
  IJobsSsGeItem,
  JobType,
  SalaryPeriodType,
  SalaryType,
  WorkingSchedule,
} from './interfaces/interface'

type Props = {
  data: IJobsSsGeItem
  companies: ICompaniesItem[]
}

export default function format({ data, companies }: Props): IFormat {
  const findCompany = (companies: ICompaniesItem[], categoryId: number | null): ICompaniesItem | null => {
    return companies.find((c) => c.companyId === categoryId) || null
  }

  const company = findCompany(companies, data.companyId)
  const categoryId = +Object.entries(CategoriesMap).find(([, value]) => value.includes(data.sphereId))![0]

  return {
    sourceUrl: `https://jobs.ss.ge/ka/details/${data.seoTitle}-${data.id}`,
    title: data.title.ka,
    postedAt: data.startDate,
    jobTypeId: JobTypeMap[data.jobsDealType],
    employmentTypeId: EmploymentTypeMap[data.workingFormat as WorkingSchedule] ?? null,
    categoryId: categoryId,
    salaryFrom: data.salaryFrom,
    salaryTo: data.salaryTo,
    salaryPeriodId:
      data.monthOrDayType !== null && data.monthOrDayType !== undefined
        ? SalaryPeriodMap[data.monthOrDayType]
        : null,
    salaryTypeId:
      data.salaryFrom && data.salaryTo
        ? SalaryTypeMap[SalaryType.Range]
        : data.salaryFrom
          ? SalaryTypeMap[SalaryType.Fixed]
          : SalaryTypeMap[SalaryType.Negotiable],
    locationCountry: null,
    locationCity: data.address.city.ka,
    companyName: company?.name || null,
    companyHasLogo: !!company?.logoImageThumb,
    companyLogo: company?.logoImageThumb || null,
    companyCountry: null,
    companyCity: null,
    companyDescription: company?.description || null,
    experienceIds: [ExperienceTypeMap[data?.workingSchedule ?? 0] ?? 0],
  }
}

const EmploymentTypeMap: Record<WorkingSchedule, number> = {
  [WorkingSchedule.FullTime]: 1,
  [WorkingSchedule.PartTime]: 2,
  [WorkingSchedule.Shifts]: 4,
  [WorkingSchedule.Free]: 5,
}

const JobTypeMap: Record<JobType, number> = {
  [JobType.OnSite]: 1,
  [JobType.Remote]: 2,
  [JobType.Hybrid]: 3,
}

const SalaryTypeMap: Record<SalaryType, number> = {
  [SalaryType.Negotiable]: 1,
  [SalaryType.Fixed]: 2,
  [SalaryType.Range]: 3,
}

const ExperienceTypeMap: Record<number, Experience> = {
  0: Experience.Junior,
  1: Experience.Junior,
  2: Experience.Middle,
  3: Experience.Professional,
  4: Experience.Specialist,
}

const SalaryPeriodMap: Record<SalaryPeriodType, number> = {
  [SalaryPeriodType.Monthly]: 1,
  [SalaryPeriodType.Daily]: 2,
}

const CategoriesMap: Partial<Record<Cat, CategoryId[]>> = {
  [Cat.IT]: [CategoryId.IT],
  [Cat.AutoService]: [CategoryId.AutoService],
  [Cat.MarketingSales]: [CategoryId.SalesManager],
  [Cat.Finance]: [CategoryId.AccountingFinance],
  [Cat.Banking]: [CategoryId.BanksInsurance],
  [Cat.Healthcare]: [CategoryId.Medicine],
  [Cat.Education]: [CategoryId.Education],
  [Cat.Law]: [CategoryId.Law],
  [Cat.Horeca]: [CategoryId.CookBaker, CategoryId.WaiterBartender],
  [Cat.Cashier]: [CategoryId.Cashier],
  [Cat.Media]: [CategoryId.Media],
  [Cat.ArtsCulture]: [CategoryId.ArtScience],
  [Cat.ConstructionEngineering]: [CategoryId.Construction, CategoryId.Engineering],
  [Cat.Transport]: [CategoryId.Distribution, CategoryId.Driver],
  [Cat.Management]: [CategoryId.TopManagement],
  [Cat.TourismHotel]: [CategoryId.TourismHotel],
  [Cat.Security]: [CategoryId.Security],
  [Cat.AestheticsBeauty]: [CategoryId.Beauty],
  [Cat.Sport]: [CategoryId.Sport],
  [Cat.AgroFarming]: [CategoryId.Agro],
  [Cat.Office]: [CategoryId.Office],
  [Cat.Factory]: [CategoryId.Factory],
  [Cat.CareTaker]: [CategoryId.NanyCaretakerHelper],
  [Cat.PetCareTaker]: [CategoryId.PetCare],
  [Cat.Internship]: [CategoryId.Internship],
  [Cat.Abroad]: [CategoryId.Abroad],
  [Cat.CustomerSupport]: [CategoryId.Operator],
  [Cat.Cleaning]: [CategoryId.Cleaning],
  [Cat.Physical]: [CategoryId.HandymanRepair, CategoryId.WorkerLoader],
  [Cat.Tailor]: [CategoryId.Tailor],
  [Cat.Other]: [CategoryId.Other],
}
