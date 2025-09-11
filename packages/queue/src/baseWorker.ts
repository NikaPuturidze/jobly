import { createWorker } from './create'
import { Job } from 'bullmq'

export interface JobHandler<T> {
  process: (job: Job<T>) => Promise<void>
}

export class BaseWorker<T> {
  constructor(
    private readonly queueName: string,
    private readonly handler: JobHandler<T>
  ) {}

  start() {
    const worker = createWorker<T>(this.queueName, async (job) => {
      await this.handler.process(job)
    })

    worker.on('completed', (job) => console.log(`✅ Job ${job.id} completed`))
    worker.on('failed', (job, err) => console.error(`❌ Job ${job?.id} failed`, err))
  }
}
