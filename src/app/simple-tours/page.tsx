'use client'

import { useState, useEffect } from 'react'

export default function SimpleToursPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('เริ่มเรียก API...')
        const response = await fetch('https://online.ttnconnect.com/api/agency/get-allprogram')
        console.log('Response status:', response.status)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        
        const result = await response.json()
        console.log('Data received:', result?.length || 0, 'items')
        setData(result)
      } catch (err: any) {
        console.error('Error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="p-8">กำลังโหลด...</div>
  }

  if (error) {
    return <div className="p-8 text-red-600">Error: {error}</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Tours Test</h1>
      <p>พบข้อมูล: {data?.length || 0} รายการ</p>
      
      {data && data.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">ตัวอย่างทัวร์แรก:</h2>
          <pre className="bg-gray-100 p-4 mt-2 text-sm overflow-auto">
            {JSON.stringify(data[0], null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}