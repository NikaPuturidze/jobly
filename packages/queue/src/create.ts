import { Queue, Worker, QueueOptions, WorkerOptions, Job } from 'bullmq'
import { defaultWorkerConfig } from './config/worker.config'
import { defaultJobConfig } from './config/job.config'

export function createQueue(name: string, options?: QueueOptions) {
  return new Queue(name, {
    ...defaultJobConfig,
    ...options,
  })
}

export function createWorker<T>(
  name: string,
  processor: (job: Job<T>) => Promise<void>,
  options?: WorkerOptions
) {
  return new Worker(name, processor, {
    ...defaultWorkerConfig,
    ...options,
  })
}
