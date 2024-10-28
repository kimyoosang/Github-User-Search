import {
  QueryCache,
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query'

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        throwOnError: true,
        retry: false,
      },
      mutations: {
        throwOnError: true,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
    queryCache: new QueryCache({
      onError: (_error, query) => {
        const meta = query.meta as { errorMessage?: string } | undefined
        const errorMessage = meta?.errorMessage || 'An error occurred'
        console.log({ type: 'error', message: errorMessage })
      },
    }),
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
