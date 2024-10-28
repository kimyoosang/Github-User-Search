'use client'

import { FallbackProps } from 'react-error-boundary'

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div
      role="alert"
      className="w-full flex flex-col items-center justify-center p-[100px]"
    >
      <p className="text-2xl">에러가 발생했습니다</p>
      <div className="break-keep mt-2">에러내용: {error.message}</div>
      <button
        className="mt-5 p-4 rounded-md bg-gray-800 text-white text-sm"
        onClick={resetErrorBoundary}
      >
        다시 시도
      </button>
    </div>
  )
}
