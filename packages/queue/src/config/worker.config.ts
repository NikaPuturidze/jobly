export const defaultWorkerConfig = {
  connection: { host: '127.0.0.1', port: 6379 },
  concurrency: 5,
  limiter: {
    max: 5,
    duration: 1200,
  },
} as const
