import axios from 'axios'
import { IMyJobsGe, IMyJobsGeData } from './src/interfaces'
import format from './src/utils/formatter/my-jobs-ge/formatter'
import { insertVacancy } from './src/utils/formatter/my-jobs-ge'
import createVacancyWorker from './src'

async function initVacancyWorker() {
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
    'vacancy-queue',
    fetchVacanciesPage,
    async (item) => {
      await insertVacancy(format(item))
    },
    totalPages
  )
}

initVacancyWorker()
