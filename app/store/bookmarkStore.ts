import { create } from 'zustand'
import { persist, PersistStorage } from 'zustand/middleware'
import { GitHubUser } from '../shared/types'

interface BookmarkStore {
  bookmarks: GitHubUser[]
  addBookmark: (user: GitHubUser) => void
  removeBookmark: (userId: number) => void
  isBookmarked: (userId: number) => boolean
}

const storage: PersistStorage<BookmarkStore> | undefined =
  typeof window !== 'undefined'
    ? {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          return JSON.parse(str)
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: (name) => localStorage.removeItem(name),
      }
    : undefined

export const useBookmarkStore = create(
  persist<BookmarkStore>(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (user) =>
        set((state) => ({
          bookmarks: state.bookmarks.some((b) => b.id === user.id)
            ? state.bookmarks
            : [...state.bookmarks, user],
        })),
      removeBookmark: (userId) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((u) => u.id !== userId),
        })),
      isBookmarked: (userId) => get().bookmarks.some((u) => u.id === userId),
    }),
    {
      name: 'github-bookmarks',
      storage: storage,
    },
  ),
)
