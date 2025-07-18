'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Home, RefreshCw } from 'lucide-react'

export default function GlobalError({
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
    <html>
      <body>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="max-w-md mx-auto text-center px-4">
            <div className="mb-8">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                เกิดข้อผิดพลาดร้ายแรง
              </h1>
              <p className="text-gray-600 mb-8">
                ขออภัย เกิดข้อผิดพลาดที่ไม่สามารถแก้ไขได้ กรุณาลองใหม่อีกครั้ง
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
      </body>
    </html>
  )
} 