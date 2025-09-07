import { createTRPCReact, httpBatchStreamLink } from '@trpc/react-query'
import { TrpcRouter } from '@jobly/trpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const trpcClient = createTRPCReact<TrpcRouter>()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export const trpcServer = trpcClient.createClient({
  links: [
    httpBatchStreamLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
})

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpcClient.Provider client={trpcServer} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcClient.Provider>
  )
}
