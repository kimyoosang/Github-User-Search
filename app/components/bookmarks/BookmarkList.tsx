'use client'

import { useState, useEffect, useCallback } from 'react'
import { useBookmarkStore } from '@/app/store'
import { GitHubUser } from '@/app/shared/types'
import { GridChildComponentProps } from 'react-window'
import { UserCard } from '@/app/components/search'
import { InfiniteGrid } from '@/app/components/common'
import { EmptyBookmarks } from './EmptyBookmarks'

export function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<GitHubUser[]>([])
  const { bookmarks: storeBookmarks, removeBookmark } = useBookmarkStore()

  useEffect(() => {
    setBookmarks(storeBookmarks)
  }, [storeBookmarks])

  const handleRemoveBookmark = useCallback(
    (userId: number) => {
      removeBookmark(userId)
      setBookmarks((prev) => prev.filter((user) => user.id !== userId))
    },
    [removeBookmark],
  )

  const isItemLoaded = useCallback(
    (index: number) => index < bookmarks.length,
    [bookmarks.length],
  )

  const loadMoreItems = useCallback(() => Promise.resolve(), [])

  const renderItem = useCallback(
    ({
      columnIndex,
      rowIndex,
      style,
      data,
    }: GridChildComponentProps<GitHubUser[]>) => {
      const index = rowIndex * 4 + columnIndex
      const user = data[index]

      if (!user) {
        return <div style={style} />
      }

      return (
        <div style={style}>
          <UserCard
            user={user}
            isBookmarkPage={true}
            onRemoveBookmark={() => handleRemoveBookmark(user.id)}
          />
        </div>
      )
    },
    [handleRemoveBookmark],
  )

  if (bookmarks.length === 0) {
    return <EmptyBookmarks />
  }

  return (
    <div className="h-[calc(100vh-200px)] mt-[98px]">
      <InfiniteGrid<GitHubUser>
        items={bookmarks}
        isItemLoaded={isItemLoaded}
        loadMoreItems={loadMoreItems}
        itemCount={bookmarks.length}
        renderItem={renderItem}
        maxColumnCount={4}
        rowHeight={350}
        maxColumnWidth={300}
        gap={16}
      />
    </div>
  )
}
