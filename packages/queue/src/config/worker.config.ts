export const defaultWorkerConfig = {
  connection: { host: '127.0.0.1', port: 6379 },
  concurrency: 20,
  limiter: {
    max: 5,
    duration: 1200,
  },
} as const
