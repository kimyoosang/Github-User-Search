'use client'

import { FallbackProps } from 'react-error-boundary'

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div
      role="alert"
      className="w-full flex flex-col items-center justify-center p-[100px] border-2 border-red-600"
    >
      <p>에러가 발생했습니다</p>
      <div className="break-keep">에러내용: {error.message}</div>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </div>
  )
}
