import type { Metadata } from 'next'
import '../styles/globals.css'

import { QueryProviders } from '../shared/providers'
import { Header } from '../components/common'

export const metadata: Metadata = {
  title: {
    template: '%s | GitHub 사용자 검색',
    default: 'GitHub 사용자 검색',
  },
  description: 'GitHub 사용자를 검색하고 북마크할 수 있는 서비스입니다.',
  keywords: ['GitHub', '사용자 검색', '개발자', '북마크'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'GitHub 사용자 검색',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <QueryProviders>
        <body className="bg-gray-100">
          <Header />
          {children}
        </body>
      </QueryProviders>
    </html>
  )
}
