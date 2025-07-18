'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface SimpleTour {
  id: string
  title: string
  price: number
  image: string
  country: string
}

export default function ToursRealSimplePage() {
  const [tours, setTours] = useState<SimpleTour[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTours = async () => {
      try {
        console.log('เริ่มเรียก API...')
        
        const res = await fetch("https://www.zegoapi.com/v1.5/programtours", {
          headers: {
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhmMmViYjEyYjE0NzIyZDQxZDRmODQiLCJpYXQiOjE2NzA4NDI2NTB9.OqjXzyitMLH2Q2int7pfAvZ1Fel-7eZSnmak0k9g3pk"
          }
        })
        
        console.log('ได้รับ response:', res.ok, res.status)
        
        if (!res.ok) throw new Error(`API error: ${res.status}`)
        
        const data = await res.json()
        console.log('ข้อมูลจาก API:', data.length, 'รายการ')
        
        // แปลงข้อมูลแบบง่าย
        const simpleTours: SimpleTour[] = data.slice(0, 20).map((item: any, index: number) => {
          const periods = item.Periods || []
          const price = periods.length > 0 ? periods[0].Price : 25000
          
          return {
            id: item.ProductID || `tour-${index}`,
            title: item.ProductName || 'ทัวร์',
            price: price || 25000,
            image: item.URLImage || '/plane.svg',
            country: item.CountryName || 'ไม่ระบุ'
          }
        })
        
        console.log('แปลงข้อมูลแล้ว:', simpleTours.length, 'รายการ')
        console.log('ทัวร์แรก:', simpleTours[0])
        
        setTours(simpleTours)
      } catch (e: any) {
        console.error('เกิดข้อผิดพลาด:', e)
        setError(e.message || 'เกิดข้อผิดพลาด')
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-blue-600 font-medium">กำลังโหลดทัวร์จาก API...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
              <h2 className="font-bold">เกิดข้อผิดพลาด</h2>
              <p>{error}</p>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              ลองใหม่
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">ทัวร์จาก API จริง</h1>
          <p className="text-lg text-blue-700">ข้อมูลแบบเรียลไทม์ {tours.length} รายการ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tours.map(tour => (
            <div key={tour.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                  {tour.country}
                </div>
              </div>
              
              <div className="p-4">
                <h2 className="text-lg font-bold text-blue-900 mb-2 line-clamp-2">
                  {tour.title}
                </h2>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-900">
                    ฿{tour.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">/ท่าน</div>
                </div>
                
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                  ดูรายละเอียด
                </button>
              </div>
            </div>
          ))}
        </div>

        {tours.length === 0 && !loading && !error && (
          <div className="text-center py-16">
            <p className="text-gray-600">ไม่พบทัวร์</p>
          </div>
        )}
      </div>
    </main>
  )
}