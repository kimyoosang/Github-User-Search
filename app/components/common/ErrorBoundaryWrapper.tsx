'use client'

import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './ErrorFallback'
import { useQueryClient } from '@tanstack/react-query'

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode
}

export function ErrorBoundaryWrapper({ children }: ErrorBoundaryWrapperProps) {
  const queryClient = useQueryClient()

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        queryClient.clear()
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
