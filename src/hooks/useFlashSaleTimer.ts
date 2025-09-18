import { useState, useEffect, useMemo, useCallback } from 'react'

interface FlashSaleTour {
  id: number
  saleEndTime?: Date
  saleType?: string
}

interface TimerState {
  [key: number]: string
}

export function useFlashSaleTimer(tours: FlashSaleTour[], isClient: boolean) {
  const [timeLeft, setTimeLeft] = useState<TimerState>({})

  // Memoize tours that actually have flash sales to reduce calculations
  const flashSaleTours = useMemo(() => 
    tours.filter(tour => tour.saleType === 'flash' && tour.saleEndTime),
    [tours]
  )

  const calculateTimeLeft = useCallback(() => {
    if (!isClient || flashSaleTours.length === 0) return {}

    const now = Date.now()
    const newTimeLeft: TimerState = {}

    flashSaleTours.forEach(tour => {
      if (tour.saleEndTime) {
        const endTime = new Date(tour.saleEndTime).getTime()
        const difference = endTime - now

        if (difference > 0) {
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((difference % (1000 * 60)) / 1000)
          
          newTimeLeft[tour.id] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        } else {
          newTimeLeft[tour.id] = 'หมดเวลา'
        }
      }
    })

    return newTimeLeft
  }, [isClient, flashSaleTours])

  useEffect(() => {
    if (!isClient || flashSaleTours.length === 0) {
      setTimeLeft({})
      return
    }

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Set up timer only if there are flash sale tours
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(prev => {
        // Only update if there's actually a change to prevent unnecessary re-renders
        const hasChanged = Object.keys(newTimeLeft).some(
          key => prev[key] !== newTimeLeft[key]
        )
        return hasChanged ? newTimeLeft : prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isClient, flashSaleTours.length, calculateTimeLeft])

  // Return both timer state and helper functions
  return {
    timeLeft,
    hasActiveFlashSales: flashSaleTours.length > 0,
    flashSaleCount: flashSaleTours.length
  }
}