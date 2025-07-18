'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface LoadingContextType {
  isLoading: boolean
  showLoading: (message?: string) => void
  hideLoading: () => void
  loadingMessage: string
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('กำลังเตรียมการเดินทาง...')

  const showLoading = (message = 'กำลังเตรียมการเดินทาง...') => {
    setLoadingMessage(message)
    setIsLoading(true)
  }

  const hideLoading = () => {
    setIsLoading(false)
  }

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading, loadingMessage }}>
      {children}
      {isLoading && (
        <LoadingSpinner 
          message={loadingMessage}
          size="md"
          fullScreen={true}
        />
      )}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}