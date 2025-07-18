'use client'

import { useState } from 'react'

export default function TestTTNAPI() {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)
  
  const testAPI = async () => {
    setLoading(true)
    try {
      console.log('Testing TTN API...')
      const response = await fetch('https://online.ttnconnect.com/api/agency/get-allprogram')
      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log('Data length:', data?.length)
      console.log('First item:', data?.[0])
      
      setResult(`Success! Got ${data?.length || 0} items`)
    } catch (error: any) {
      console.error('Error:', error)
      setResult(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">TTN API Test</h1>
      <button 
        onClick={testAPI}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Testing...' : 'Test TTN API'}
      </button>
      
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  )
}