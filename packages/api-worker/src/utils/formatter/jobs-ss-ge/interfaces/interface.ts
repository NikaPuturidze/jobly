export interface IJobsSsGe {
  result: Result
}

export interface Result {
  items: IJobsSsGeItem[]
  totalCount: number
}

export interface IJobsSsGeItem {
  address: Address
  companyId: number | null
  companySeoTitle: null | string
  currencyId: number | null
  description: Description
  endDate: Date
  gender: number | null
  hasPhoneNumber: boolean
  id: number
  isFavorite: boolean
  isHighlighted: boolean
  isMovedUp: boolean
  isUrgent: boolean
  jobsDealType: JobType
  language: number
  logo: null | string
  monthOrDayType: SalaryPeriodType
  paidServices: null
  publisherName: string
  requirments: null
  salaryFrom: number | null
  salaryTo: number | null
  seoTitle: string
  sphereId: CategoryId
  startDate: Date
  title: Description
  userId: string
  vipStatus: number
  workingExperience: Experience | null
  workingFormat: number
  workingSchedule: number | null
}

export interface Address {
  city: Description
  subdistrict: Description
}

export interface Description {
  en: null | string
  ka: null | string
  ru: null | string
  text: null | string
}

export enum JobType {
  OnSite = 1,
  Remote = 2,
  Hybrid = 3,
}

export enum SalaryType {
  Negotiable = 1,
  Fixed = 2,
  Range = 3,
}

export enum Experience {
  NoExperience = 0,
  Junior = 1,
  Middle = 2,
  Specialist = 3,
  Professional = 4,
}

export enum SalaryPeriodType {
  Monthly = 0,
  Daily = 1,
}

export enum CategoryId {
  AccountingFinance = 63,
  AutoService = 61,
  Cashier = 64,
  Education = 398,
  SalesManager = 397,
  BanksInsurance = 65,
  Cleaning = 66,
  Security = 45,
  IT = 68,
  Law = 69,
  Media = 74,
  Medicine = 55,
  CookBaker = 391,
  WaiterBartender = 32,
  Tailor = 393,
  WorkerLoader = 392,
  Driver = 57,
  Construction = 47,
  Office = 59,
  TourismHotel = 44,
  Abroad = 395,
  Beauty = 41,
  Agro = 42,
  PetCare = 30,
  Sport = 4,
  Engineering = 67,
  TopManagement = 77,
  Distribution = 72,
  Factory = 53,
  ArtScience = 75,
  HandymanRepair = 48,
  NanyCaretakerHelper = 50,
  Operator = 452,
  Internship = 43,
  Other = 52,
}
