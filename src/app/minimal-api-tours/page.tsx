'use client'

import { useState, useEffect } from 'react'

export default function MinimalApiTours() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching TTN API data...')
        const response = await fetch('https://online.ttnconnect.com/api/agency/get-allprogram')
        console.log('Response received:', response.ok, response.status)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        
        const result = await response.json()
        console.log('Data received:', result?.length || 0)
        setData(result || [])
      } catch (err: any) {
        console.error('API Error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Minimal TTN API Test</h1>
        <div className="text-blue-600">Loading...</div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Minimal TTN API Test</h1>
        <div className="text-red-600">Error: {error}</div>
      </div>
    )
  }
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Minimal TTN API Test</h1>
      <p className="text-green-600">Success! Loaded {data.length} items</p>
      
      {data.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">First Item:</h2>
          <pre className="bg-gray-100 p-4 text-sm overflow-auto">
            {JSON.stringify(data[0], null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}