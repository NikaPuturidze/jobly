import { createQueue, createWorker } from '@jobly/queue/src/create'

export default function createVacancyWorker<T>(
  queueName: string,
  fetchFn: (page: number) => Promise<T[]>,
  inserter: (item: T) => Promise<void>,
  pages: number
) {
  const startTime = Date.now()
  const worker = createWorker<{ page: number }>(queueName, async (job) => {
    const { page } = job.data
    try {
      const dataArray = await fetchFn(page)
      await Promise.all(dataArray.map(inserter))
    } catch (error) {
      console.error(`Failed to fetch page ${page}:`, error)
    }
  })

  worker.on('completed', (job) => {
    const elapsed = Date.now() - startTime
    console.log(`Job ${job.id} finished! Time elapsed since start: ${(elapsed / 1000).toFixed(2)}s`)
  })

  worker.on('failed', (job, err) => console.error(`Job ${job?.id} failed:`, err))

  async function startWorker() {
    const queue = createQueue(queueName)
    for (let page = 1; page <= pages; page++) {
      await queue.add('fetch-page', { page })
    }
  }

  startWorker()
}
