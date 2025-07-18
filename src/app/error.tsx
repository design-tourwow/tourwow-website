'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Home, RefreshCw } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              เกิดข้อผิดพลาด
            </h1>
            <p className="text-gray-600 mb-8">
              ขออภัย เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={reset}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              ลองใหม่
            </button>
            
            <div className="pt-4">
              <Link 
                href="/"
                className="text-blue-600 hover:text-blue-800 inline-flex items-center"
              >
                <Home className="w-5 h-5 mr-2" />
                กลับหน้าแรก
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
} 