'use client'

import { GitHubUser } from '@/app/shared/types'
import { useBookmarkStore } from '@/app/store'

interface BookmarkButtonProps {
  user: GitHubUser
}

export function BookmarkButton({ user }: BookmarkButtonProps) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore()
  const bookmarked = isBookmarked(user.id)

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(user.id)
    } else {
      addBookmark(user)
    }
  }

  return (
    <button
      onClick={toggleBookmark}
      className={`px-3 py-1 rounded ${
        bookmarked ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
      }`}
    >
      {bookmarked ? '북마크 해제' : '북마크'}
    </button>
  )
}
