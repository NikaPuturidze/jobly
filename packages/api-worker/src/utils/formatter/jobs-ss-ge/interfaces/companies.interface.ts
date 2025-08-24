export interface ICompanies {
  result: ICompaniesResult
}

export interface ICompaniesResult {
  items: ICompaniesItem[]
  totalCount: number
}

export interface ICompaniesItem {
  address: null
  companyId: number
  companySeoTitle: string
  countOfApplications: number
  createDate: Date
  description: string
  identificationNumber: null
  logoImageThumb: string
  name: string
  phoneNumber: string
  type: number
  userId: null
}
