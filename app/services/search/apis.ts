import { axiosInstance } from '../instance'
import { GitHubUser } from '@/app/shared/types'

interface SearchParams {
  q: string
  page: number
  per_page?: number
}

interface GitHubSearchResponse {
  total_count: number
  incomplete_results: boolean
  items: GitHubUser[]
}

export async function searchUsers({ q, page, per_page = 20 }: SearchParams) {
  const { data } = await axiosInstance.get<GitHubSearchResponse>(
    '/search/users',
    {
      params: {
        q,
        page,
        per_page,
      },
    },
  )
  return data
}
