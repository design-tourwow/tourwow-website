'use client'

import React from 'react'
import { Search, Package, MapPin, Calendar, Heart, AlertCircle, Wifi, RefreshCw, Plus } from 'lucide-react'
import { Button } from './Button'

export type EmptyStateVariant = 'search' | 'tours' | 'bookings' | 'wishlist' | 'error' | 'offline' | 'loading' | 'general'

interface EmptyStateProps {
  variant?: EmptyStateVariant
  title?: string
  description?: string
  icon?: React.ReactNode
  image?: string
  actions?: Array<{
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary' | 'outline'
    icon?: React.ReactNode
  }>
  className?: string
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

const defaultContent: Record<EmptyStateVariant, {
  icon: React.ReactNode
  title: string
  description: string
}> = {
  search: {
    icon: <Search className="w-16 h-16 text-gray-300" />,
    title: 'ไม่พบผลการค้นหา',
    description: 'ลองใช้คำค้นหาอื่น หรือปรับเปลี่ยนตัวกรองเพื่อค้นหาทัวร์ที่ต้องการ'
  },
  tours: {
    icon: <Package className="w-16 h-16 text-gray-300" />,
    title: 'ยังไม่มีทัวร์',
    description: 'ขณะนี้ยังไม่มีทัวร์ที่ตรงกับเงื่อนไขที่คุณเลือก กรุณาลองใหม่อีกครั้ง'
  },
  bookings: {
    icon: <Calendar className="w-16 h-16 text-gray-300" />,
    title: 'ยังไม่มีการจอง',
    description: 'คุณยังไม่มีการจองทัวร์ใด ๆ เริ่มวางแผนการเดินทางของคุณวันนี้'
  },
  wishlist: {
    icon: <Heart className="w-16 h-16 text-gray-300" />,
    title: 'รายการโปรดยังว่างอยู่',
    description: 'เพิ่มทัวร์ที่คุณสนใจลงในรายการโปรด เพื่อดูภายหลัง'
  },
  error: {
    icon: <AlertCircle className="w-16 h-16 text-red-300" />,
    title: 'เกิดข้อผิดพลาด',
    description: 'ขออภัย มีข้อผิดพลาดเกิดขึ้น กรุณาลองใหม่อีกครั้ง'
  },
  offline: {
    icon: <Wifi className="w-16 h-16 text-gray-300" />,
    title: 'ไม่มีการเชื่อมต่ออินเทอร์เน็ต',
    description: 'กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของคุณและลองใหม่'
  },
  loading: {
    icon: <RefreshCw className="w-16 h-16 text-blue-300 animate-spin" />,
    title: 'กำลังโหลด...',
    description: 'กรุณารอสักครู่ เรากำลังเตรียมข้อมูลให้คุณ'
  },
  general: {
    icon: <Package className="w-16 h-16 text-gray-300" />,
    title: 'ไม่มีข้อมูล',
    description: 'ขณะนี้ยังไม่มีข้อมูลที่จะแสดง'
  }
}

export function EmptyState({
  variant = 'general',
  title,
  description,
  icon,
  image,
  actions = [],
  className = '',
  size = 'md',
  animated = true
}: EmptyStateProps) {
  const content = defaultContent[variant]
  const finalTitle = title || content.title
  const finalDescription = description || content.description
  const finalIcon = icon || content.icon

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'py-8 px-4',
          icon: 'mb-4',
          title: 'text-lg',
          description: 'text-sm max-w-sm',
          spacing: 'space-y-3'
        }
      case 'lg':
        return {
          container: 'py-20 px-6',
          icon: 'mb-8',
          title: 'text-3xl',
          description: 'text-lg max-w-2xl',
          spacing: 'space-y-6'
        }
      default: // md
        return {
          container: 'py-12 px-4',
          icon: 'mb-6',
          title: 'text-xl',
          description: 'text-base max-w-lg',
          spacing: 'space-y-4'
        }
    }
  }

  const sizeClasses = getSizeClasses()

  return (
    <div 
      className={`
        flex flex-col items-center justify-center text-center
        ${sizeClasses.container} ${sizeClasses.spacing}
        ${animated ? 'animate-in fade-in-50 duration-500' : ''}
        ${className}
      `}
    >
      {/* Image or Icon */}
      {image ? (
        <div className={`${sizeClasses.icon} overflow-hidden rounded-2xl`}>
          <img 
            src={image} 
            alt={finalTitle}
            className="w-32 h-32 object-cover opacity-60"
          />
        </div>
      ) : (
        <div 
          className={`
            ${sizeClasses.icon}
            ${animated ? 'animate-in zoom-in-50 duration-300 delay-100' : ''}
          `}
        >
          {finalIcon}
        </div>
      )}

      {/* Title */}
      <h3 
        className={`
          font-bold text-gray-900 ${sizeClasses.title}
          ${animated ? 'animate-in slide-in-from-bottom-4 duration-300 delay-200' : ''}
        `}
      >
        {finalTitle}
      </h3>

      {/* Description */}
      <p 
        className={`
          text-gray-600 leading-relaxed mx-auto ${sizeClasses.description}
          ${animated ? 'animate-in slide-in-from-bottom-4 duration-300 delay-300' : ''}
        `}
      >
        {finalDescription}
      </p>

      {/* Actions */}
      {actions.length > 0 && (
        <div 
          className={`
            flex flex-col sm:flex-row gap-3 justify-center items-center mt-2
            ${animated ? 'animate-in slide-in-from-bottom-4 duration-300 delay-500' : ''}
          `}
        >
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'primary'}
              onClick={action.onClick}
              leftIcon={action.icon}
              className="min-w-[120px]"
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

// Specialized Empty State Components
export function SearchEmptyState({ 
  searchTerm, 
  onReset,
  onViewAll 
}: { 
  searchTerm?: string
  onReset?: () => void
  onViewAll?: () => void
}) {
  return (
    <EmptyState
      variant="search"
      title="ไม่พบทัวร์ที่คุณค้นหา"
      description={
        searchTerm 
          ? `ไม่พบทัวร์สำหรับ "${searchTerm}" ลองค้นหาด้วยคำอื่นหรือดูทัวร์ทั้งหมด`
          : 'ลองปรับเปลี่ยนตัวกรองหรือคำค้นหาเพื่อค้นหาทัวร์ที่ต้องการ'
      }
      actions={[
        ...(onReset ? [{ 
          label: 'ล้างตัวกรอง', 
          onClick: onReset, 
          variant: 'outline' as const,
          icon: <RefreshCw className="w-4 h-4" />
        }] : []),
        ...(onViewAll ? [{ 
          label: 'ดูทัวร์ทั้งหมด', 
          onClick: onViewAll,
          icon: <MapPin className="w-4 h-4" />
        }] : [])
      ]}
    />
  )
}

export function BookingEmptyState({ onBrowseTours }: { onBrowseTours: () => void }) {
  return (
    <EmptyState
      variant="bookings"
      title="ยังไม่มีการจองทัวร์"
      description="เริ่มสำรวจทัวร์น่าสนใจและจองทัวร์แรกของคุณวันนี้"
      actions={[
        {
          label: 'เลือกดูทัวร์',
          onClick: onBrowseTours,
          icon: <Search className="w-4 h-4" />
        }
      ]}
    />
  )
}

export function WishlistEmptyState({ onBrowseTours }: { onBrowseTours: () => void }) {
  return (
    <EmptyState
      variant="wishlist"
      title="รายการโปรดยังว่างอยู่"
      description="เพิ่มทัวร์ที่คุณสนใจลงในรายการโปรด เพื่อเปรียบเทียบและจองภายหลัง"
      actions={[
        {
          label: 'ค้นหาทัวร์',
          onClick: onBrowseTours,
          icon: <Heart className="w-4 h-4" />
        }
      ]}
    />
  )
}

export function ErrorEmptyState({ 
  onRetry, 
  error 
}: { 
  onRetry: () => void
  error?: string 
}) {
  return (
    <EmptyState
      variant="error"
      title="เกิดข้อผิดพลาด"
      description={error || 'ขออภัย มีข้อผิดพลาดเกิดขึ้น กรุณาลองใหม่อีกครั้ง'}
      actions={[
        {
          label: 'ลองใหม่',
          onClick: onRetry,
          icon: <RefreshCw className="w-4 h-4" />
        }
      ]}
    />
  )
}

export default EmptyState