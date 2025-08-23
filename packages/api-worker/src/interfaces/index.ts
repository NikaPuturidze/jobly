export interface IMyJobsGe {
  current_page: number
  data: IMyJobsGeData[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: null
  to: number
  total: number
}

export interface IMyJobsGeData {
  adjusted_salary_from: number
  applicants_count: number
  benefits: Benefit[]
  category_data: CategoryData
  category_id: CategoryId
  company: Company
  company_id: number
  country: Country
  country_id: number
  created_at: string
  description: string
  education_levels: string[]
  employment_type: string
  experience_level: Experience | null
  experience_levels: { experience_level: Experience }[]
  has_search_priority: number
  helio: number
  hire_types: string[]
  id: number
  is_smart_recruiter: number
  is_urgently_hiring: number
  is_vip: number
  job_type: JobType
  languages: Language[]
  priority_level: number
  salary_from: null
  salary_period: null | string
  salary_to: null
  salary_type: SalaryType
  seo_keywords: SEOKeywords
  show_salary: number
  skills: string[]
  status: string
  sub_category: null
  template_title: null
  title: string
  view_count: number
  work_experiences: WorkExperience[]
}

export interface Benefit {
  id?: number
  title: null | string
}

export interface CategoryData {
  id: number
  sub_category: Benefit
  title: string
}

export interface Company {
  brand_name: string
  city_title: string | null
  country_title: string
  description: string
  has_logo: number
  id: number
  logo_version: number
}

export interface Country {
  city?: Benefit
  id: number
  title: string
}

export interface Language {
  language_id: number
  level: string
}

export interface SEOKeywords {
  category: string
  sub_category: string | null
  title: string
}

export interface WorkExperience {
  experience_from: number | null
  experience_to: number
}

export interface Link {
  active: boolean
  label: string
  url: null | string
}

export enum JobType {
  Hybrid = 'hybrid',
  OnSite = 'on_site',
  Remote = 'remote',
  Freelance = 'freelance',
}

export enum SalaryType {
  Negotiable = 'negotiable',
  Fixed = 'fixed',
  Range = 'range',
}

export enum Experience {
  Junior = 'junior',
  Middle = 'mid-level',
  Specialist = 'senior',
  Professional = 'head',
}

export enum CategoryId {
  Law = 1,
  Horeca = 15,
  Education = 43,
  HR = 59,
  Marketing = 77,
  Healthcare = 98,
  Aesthetics = 146,
  Media = 160,
  Construction = 196,
  ServiceStaff = 236,
  Office = 259,
  Transport = 283,
  Banking = 307,
  Tourism = 357,
  Sports = 379,
  Finance = 395,
  Agro = 435,
  Management = 471,
  ArtsCulture = 501,
  NGO = 525,
  Sales = 540,
  Energy = 583,
  AutoIndustry = 600,
  Gambling = 629,
  Security = 655,
  ITDevelopment = 674,
  WebDesign = 707,
  ITTech = 726,
  ProjectManagement = 746,
  Logistics = 757,
}
