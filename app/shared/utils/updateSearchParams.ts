import { ReadonlyURLSearchParams } from 'next/navigation'

export const updateSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  key: string,
  value: string,
) => {
  const params = new URLSearchParams(searchParams.toString())
  if (value.trim()) {
    params.set(key, value.trim())
  } else {
    params.delete(key)
  }
  const newUrl = `/search?${params.toString()}`
  window.history.pushState(null, '', newUrl)
}
