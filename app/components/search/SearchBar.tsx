'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useDebounce } from '@/app/shared/hooks'
import { updateSearchParams } from '@/app/shared/utils'

export function SearchBar({ initialQuery }: { initialQuery: string }) {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery)
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery !== initialQuery) {
      updateSearchParams(searchParams, 'query', debouncedQuery)
    }
  }, [debouncedQuery, initialQuery, searchParams])

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="GitHub 사용자 검색..."
      className="w-full p-2 border rounded"
    />
  )
}
