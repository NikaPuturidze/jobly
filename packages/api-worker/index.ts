import axios from 'axios'
import createVacancyWorker from './src'
import insert_my_jobs_ge from './src/utils/formatter/my-jobs-ge/'
import format_my_jobs_ge from './src/utils/formatter/my-jobs-ge/format'
import insert_jobs_ss_ge from './src/utils/formatter/jobs-ss-ge'
import format_jobs_ss_ge from './src/utils/formatter/jobs-ss-ge/format'
import { IMyJobsGe, IMyJobsGeData } from './src/utils/formatter/my-jobs-ge/interfaces/interface'
import { getAccessToken } from './src/utils/formatter/jobs-ss-ge'
import { CategoryId, IJobsSsGe, IJobsSsGeItem } from './src/utils/formatter/jobs-ss-ge/interfaces/interface'
import { ICompanies } from './src/utils/formatter/jobs-ss-ge/interfaces/companies.interface'

export async function my_jobs_ge_worker() {
  const firstCall = await axios.get<IMyJobsGe>(`https://api.myjobs.ge/api/ka/public/vacancies/v2?page=1`)

  const firstPageData = firstCall.data.data
  const totalPages = Math.ceil(firstCall.data.total / firstCall.data.per_page)

  const fetchVacanciesPage = async (page: number): Promise<IMyJobsGeData[]> => {
    if (page === 1) return firstPageData
    const { data } = await axios.get<{ data: IMyJobsGeData[] }>(
      `https://api.myjobs.ge/api/ka/public/vacancies/v2?page=${page}`
    )
    return data.data
  }

  createVacancyWorker<IMyJobsGeData>(
    'my-jobs-ge-worker',
    fetchVacanciesPage,
    async (item) => {
      await insert_my_jobs_ge(format_my_jobs_ge(item))
    },
    totalPages
  )
}

export async function jobs_ss_ge_worker() {
  const token = await getAccessToken()

  const [firstVacancy, firstCompany] = await Promise.all([
    axios.post<IJobsSsGe>(
      'https://jobs-gateway.ss.ge/Jobs/search',
      {
        paging: { limit: 1, offset: 1 },
        jobsDealType: 1,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
    axios.post<ICompanies>(
      'https://jobs-gateway.ss.ge/Company/companies-list',
      {
        paging: { limit: 1, offset: 1 },
        sorting: { sortBy: 'CountOfApplications', sortDir: 'desc' },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
  ])

  const totalVacancies = firstVacancy.data.result.totalCount
  const totalCompanies = firstCompany.data.result.totalCount

  const { data: companies } = await axios.post<ICompanies>(
    'https://jobs-gateway.ss.ge/Company/companies-list',
    {
      paging: { limit: totalCompanies, offset: 1 },
      sorting: { sortBy: 'CountOfApplications', sortDir: 'desc' },
    },
    { headers: { Authorization: `Bearer ${token}` } }
  )

  const fetchVacancies = async (): Promise<IJobsSsGeItem[]> => {
    const { data } = await axios.post<IJobsSsGe>(
      'https://jobs-gateway.ss.ge/Jobs/search',
      {
        paging: { limit: totalVacancies, offset: 1 },
        jobsDealType: 1,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return data.result.items
  }

  createVacancyWorker<IJobsSsGeItem>(
    'jobs-ss-ge-worker',
    fetchVacancies,
    async (item) => {
      if (item.sphereId === (396 as CategoryId)) return
      if (item.sphereId === (394 as CategoryId)) return
      if (item.sphereId === (0 as CategoryId)) return
      await insert_jobs_ss_ge(format_jobs_ss_ge({ data: item, companies: companies.result.items }))
    },
    1
  )
}

my_jobs_ge_worker()
