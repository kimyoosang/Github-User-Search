import { ErrorBoundaryWrapper } from '@/app/components/common'
import Spinner from '@/app/components/common/Spinner'
import { SearchBar, UserList } from '@/app/components/search'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: '사용자 검색',
  description: 'GitHub 사용자를 검색하고 프로필을 확인할 수 있습니다.',
  openGraph: {
    title: 'GitHub 사용자 검색',
    description: 'GitHub 사용자를 검색하고 프로필을 확인할 수 있습니다.',
  },
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string }
}) {
  const initialQuery = searchParams.query || ''

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">GitHub 사용자 검색</h1>
      <SearchBar initialQuery={initialQuery} />
      <ErrorBoundaryWrapper>
        <Suspense fallback={<Spinner />}>
          <div className="mt-10">
            <UserList initialQuery={initialQuery} />
          </div>
        </Suspense>
      </ErrorBoundaryWrapper>
    </main>
  )
}
