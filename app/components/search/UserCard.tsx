'use client'

import Image from 'next/image'
import { GitHubUser } from '@/app/shared/types'
import { useBookmarkStore } from '@/app/store'

interface UserCardProps {
  user: GitHubUser
  isBookmarkPage?: boolean
  onRemoveBookmark?: () => void
}

export function UserCard({
  user,
  isBookmarkPage,
  onRemoveBookmark,
}: UserCardProps) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore()
  const bookmarked = isBookmarked(user.id)

  const handleBookmarkAction = () => {
    if (isBookmarkPage && onRemoveBookmark) {
      onRemoveBookmark()
    } else if (!isBookmarkPage) {
      if (bookmarked) {
        removeBookmark(user.id)
      } else {
        addBookmark(user)
      }
    }
  }

  return (
    <div className="border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col h-full w-full max-w-[300px]">
      <div className="p-4 flex flex-col items-center text-center">
        <Image
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          width={100}
          height={100}
          className="rounded-full mb-4"
        />
        <h2 className="text-xl font-semibold mb-1">{user.login}</h2>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mb-2"
        >
          View GitHub Profile
        </a>

        <div className="w-full text-sm text-gray-500 mb-4">
          <div className="flex justify-between mb-2">
            <span>Type: {user.type}</span>
            <span>Score: {user.score.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mb-4">
          <a
            href={user.followers_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-full text-sm"
          >
            Followers
          </a>
          <a
            href={user.following_url.replace('{/other_user}', '')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-full text-sm"
          >
            Following
          </a>
        </div>

        <button
          onClick={handleBookmarkAction}
          className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isBookmarkPage || bookmarked
              ? 'text-yellow-500 hover:text-yellow-600 focus:ring-yellow-500'
              : 'text-gray-400 hover:text-gray-500 focus:ring-gray-500'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill={isBookmarkPage || bookmarked ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
