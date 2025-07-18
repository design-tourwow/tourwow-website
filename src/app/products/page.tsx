'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LoadingScreen from '@/components/LoadingScreen'

interface Product {
  id: string
  title: string
  price: number
  image: string
  country: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://www.zegoapi.com/v1.5/programtours", {
          headers: {
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhmMmViYjEyYjE0NzIyZDQxZDRmODQiLCJpYXQiOjE2NzA4NDI2NTB9.OqjXzyitMLH2Q2int7pfAvZ1Fel-7eZSnmak0k9g3pk"
          }
        })
        
        if (!res.ok) throw new Error('API Error')
        
        const data = await res.json()
        
        const transformedProducts: Product[] = data.slice(0, 12).map((item: any, index: number) => {
          const periods = item.Periods || []
          const price = periods.length > 0 ? periods[0].Price : 25000
          
          return {
            id: item.ProductID || `product-${index}`,
            title: item.ProductName || 'ทัวร์',
            price: price || 25000,
            image: item.URLImage || '/plane.svg',
            country: item.CountryName || 'ไม่ระบุ'
          }
        })
        
        setProducts(transformedProducts)
      } catch (e) {
        setError('ไม่สามารถโหลดข้อมูลได้')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <LoadingScreen 
        title="กำลังโหลดสินค้า" 
        subtitle="โปรดรอสักครู่... กำลังดึงข้อมูลจาก API" 
      />
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">สินค้าและบริการ</h1>
          <p className="text-lg text-blue-700">ข้อมูลจาก API จริง {products.length} รายการ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                    {product.country}
                  </div>
                </div>
                
                <div className="p-4">
                  <h2 className="text-lg font-bold text-blue-900 mb-2 line-clamp-2">
                    {product.title}
                  </h2>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-900">
                      ฿{product.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">/ท่าน</div>
                  </div>
                  
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && !loading && !error && (
          <div className="text-center py-16">
            <p className="text-gray-600">ไม่พบสินค้า</p>
          </div>
        )}
      </div>
    </main>
  )
}