'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface CompareContextType {
  compareList: number[]
  toggleCompare: (tourId: number) => void
  removeFromCompare: (tourId: number) => void
  clearCompareList: () => void
  isCompared: (tourId: number) => boolean
  compareCount: number
  maxCompareItems: number
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

interface CompareProviderProps {
  children: ReactNode
  maxItems?: number
}

export function CompareProvider({ children, maxItems = 3 }: CompareProviderProps) {
  const [compareList, setCompareList] = useState<number[]>([])

  const toggleCompare = useCallback((tourId: number) => {
    setCompareList(prev => {
      if (prev.includes(tourId)) {
        return prev.filter(id => id !== tourId)
      }
      
      // If we're at max capacity, remove the first item and add the new one
      if (prev.length >= maxItems) {
        return [...prev.slice(1), tourId]
      }
      
      return [...prev, tourId]
    })
  }, [maxItems])

  const removeFromCompare = useCallback((tourId: number) => {
    setCompareList(prev => prev.filter(id => id !== tourId))
  }, [])

  const clearCompareList = useCallback(() => {
    setCompareList([])
  }, [])

  const isCompared = useCallback((tourId: number) => {
    return compareList.includes(tourId)
  }, [compareList])

  const value = {
    compareList,
    toggleCompare,
    removeFromCompare,
    clearCompareList,
    isCompared,
    compareCount: compareList.length,
    maxCompareItems: maxItems
  }

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider')
  }
  return context
}