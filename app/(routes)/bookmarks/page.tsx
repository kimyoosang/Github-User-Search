import { BookmarkList } from '@/app/components/bookmarks'
import { ErrorFallback } from '@/app/components/common'
import Spinner from '@/app/components/common/Spinner'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const metadata: Metadata = {
  title: '북마크',
  description: '북마크한 GitHub 사용자 목록을 확인할 수 있습니다.',
  openGraph: {
    title: '북마크한 GitHub 사용자',
    description: '북마크한 GitHub 사용자 목록을 확인할 수 있습니다.',
  },
}

export default function BookmarksPage() {
  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold mb-6">북마크한 사용자</h1>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Spinner />}>
          <BookmarkList />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
