'use client'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">GitHub 사용자 검색 앱</h1>
      <nav className="space-y-2">
        <Link href="/search" className="block text-blue-500 hover:underline">
          사용자 검색하기
        </Link>
        <Link href="/bookmarks" className="block text-blue-500 hover:underline">
          북마크 목록 보기
        </Link>
      </nav>
    </main>
  )
}
