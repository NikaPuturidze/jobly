export const defaultJobConfig = {
  connection: { host: '127.0.0.1', port: 6379 },
  attempts: 3,
  backoff: { type: 'fixed', delay: 2000 },
} as const
