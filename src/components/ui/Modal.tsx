'use client'

import { ReactNode, useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
}

export default function Modal({ 
  open, 
  onClose, 
  children, 
  title,
  size = 'md',
  className = '',
  closeOnOverlayClick = true,
  showCloseButton = true 
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (open) {
      // Store currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
      
      // Show modal with animation
      setTimeout(() => setIsVisible(true), 10)
      
      // Focus modal
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus()
        }
      }, 100)
    } else {
      setIsVisible(false)
      document.body.style.overflow = 'auto'
      
      // Restore focus
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }

    if (open) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'max-w-md'
      case 'md': return 'max-w-2xl'
      case 'lg': return 'max-w-4xl'
      case 'xl': return 'max-w-6xl'
      case 'full': return 'max-w-[95vw] max-h-[95vh]'
      default: return 'max-w-2xl'
    }
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose()
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 200) // Wait for animation
  }

  if (!mounted || !open) return null

  const modalContent = (
    <div 
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-all duration-200 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div 
        className={`
          absolute inset-0 bg-black/60 backdrop-blur-sm
          transition-opacity duration-200
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `} 
      />
      
      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`
          relative bg-white rounded-2xl shadow-2xl w-full overflow-hidden
          transform transition-all duration-200 ease-out
          ${getSizeClasses()}
          ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
          ${className}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            {title && (
              <h2 id="modal-title" className="text-xl font-bold text-gray-900">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={handleClose}
                className="
                  p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  transition-colors duration-150
                "
                aria-label="ปิด"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className={`overflow-y-auto ${size === 'full' ? 'max-h-[calc(95vh-80px)]' : 'max-h-[80vh]'}`}>
          {children}
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
} 