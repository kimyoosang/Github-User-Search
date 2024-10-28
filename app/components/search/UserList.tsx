'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { GridChildComponentProps } from 'react-window'
import { useGitHubUserSearch } from '@/app/services/search'
import Spinner from '../common/Spinner'
import { UserCard } from './UserCard'
import { GitHubUser } from '@/app/shared/types'
import { InfiniteGrid } from '../common'

interface UserListProps {
  initialQuery: string
}

export function UserList({ initialQuery }: UserListProps) {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery.trim())

  const { users, fetchNextPage, hasNextPage, isLoading, refetch } =
    useGitHubUserSearch(query)

  useEffect(() => {
    const currentQuery = searchParams.get('query')?.trim() || ''
    if (currentQuery !== query) {
      setQuery(currentQuery)
    }
  }, [searchParams, query])

  useEffect(() => {
    if (query && query !== initialQuery) {
      refetch()
    }
  }, [query, initialQuery, refetch])

  const isItemLoaded = useCallback(
    (index: number) => !hasNextPage || index < users.length,
    [hasNextPage, users.length],
  )

  const loadMoreItems = useCallback(() => {
    if (hasNextPage) {
      return fetchNextPage().then(() => {})
    }
    return Promise.resolve()
  }, [hasNextPage, fetchNextPage])

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
        return isItemLoaded(index) ? (
          <div style={style} />
        ) : (
          <div style={style}>Loading...</div>
        )
      }

      return (
        <div style={style}>
          <UserCard user={user} />
        </div>
      )
    },
    [isItemLoaded],
  )

  if (!query) {
    return (
      <div className="text-gray-500 w-full text-center mt-10">
        검색어를 입력하세요.
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center mt-[200px]">
        <Spinner />
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="text-gray-500 w-full text-center mt-10">
        검색 결과가 없습니다.
      </div>
    )
  }

  return (
    <div className="container mx-auto h-[calc(100vh-200px)] relative">
      <InfiniteGrid<GitHubUser>
        items={users}
        isItemLoaded={isItemLoaded}
        loadMoreItems={loadMoreItems}
        itemCount={hasNextPage ? users.length + 1 : users.length}
        renderItem={renderItem}
        maxColumnCount={4}
        rowHeight={350}
        maxColumnWidth={300}
        gap={16}
      />
    </div>
  )
}
