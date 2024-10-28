import { useInfiniteQuery } from '@tanstack/react-query'
import { searchUsers } from './apis'

export function useGitHubUserSearch(query: string) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['search-users', query],
    queryFn: ({ pageParam = 1 }) =>
      searchUsers({
        q: query,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.items.length === 20 ? lastPage.items.length + 1 : undefined,
    enabled: !!query,
    refetchOnWindowFocus: false,
  })

  const users = data?.pages.flatMap((page) => page.items) ?? []

  return {
    users,
    fetchNextPage,
    hasNextPage: !!query && hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  }
}
