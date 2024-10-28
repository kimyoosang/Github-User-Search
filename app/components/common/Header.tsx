import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-gray-800 text-white p-6">
      <nav>
        <ul className="flex space-x-4 px-[50px]">
          <li>
            <Link href="/" className="hover:text-gray-300">
              홈
            </Link>
          </li>
          <li>
            <Link href="/search" className="hover:text-gray-300">
              검색
            </Link>
          </li>
          <li>
            <Link href="/bookmarks" className="hover:text-gray-300">
              북마크
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
