'use client'

import { useState } from 'react'
import { X, Lock, Eye, EyeOff } from 'lucide-react'

interface PasscodeModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  title?: string
}

export default function PasscodeModal({ isOpen, onClose, onSuccess, title = "แก้ไขการจอง" }: PasscodeModalProps) {
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')
  const [showPasscode, setShowPasscode] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  const VALID_PASSCODE = '123456'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!passcode.trim()) {
      setError('กรุณาใส่รหัสผ่าน')
      return
    }

    setIsVerifying(true)
    setError('')

    // Simulate verification delay
    setTimeout(() => {
      if (passcode === VALID_PASSCODE) {
        // Success
        setPasscode('')
        setError('')
        onSuccess()
        onClose()
      } else {
        // Failed
        setError('รหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง')
        setPasscode('')
      }
      setIsVerifying(false)
    }, 500)
  }

  const handleClose = () => {
    setPasscode('')
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-700 font-medium mb-2">🔒 เพื่อความปลอดภัย</p>
            <p className="text-sm text-gray-500">กรุณาใส่รหัสผ่านเพื่อแก้ไขข้อมูลการจอง</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รหัสผ่าน
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  data-form-type="other"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pr-12 ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="ใส่รหัสผ่าน 6 หลัก"
                  maxLength={6}
                  disabled={isVerifying}
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isVerifying}
                >
                  {showPasscode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <X className="w-4 h-4" />
                  {error}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={isVerifying}
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              disabled={isVerifying || !passcode.trim()}
            >
              {isVerifying ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  กำลังตรวจสอบ...
                </div>
              ) : (
                'ยืนยัน'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}