'use client'

import React from 'react'

interface TourDetailClientProps {
  initialTour: any
  src?: string
}

export default function TourDetailClient({ initialTour, src }: TourDetailClientProps) {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Tour Detail Client Component</h2>
      <p>This component is ready for implementation.</p>
    </div>
  )
}