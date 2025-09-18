'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, MapPin, Globe, Clock, TrendingUp, ArrowRight, X } from 'lucide-react'

export interface Suggestion {
  id: string
  type: 'tour' | 'country' | 'popular' | 'recent'
  title: string
  subtitle?: string
  description?: string
  image?: string
  country?: string
  tourCode?: string
  popularity?: number
}

interface SearchSuggestionsProps {
  suggestions: Suggestion[]
  isVisible: boolean
  isLoading?: boolean
  onSuggestionClick: (suggestion: Suggestion) => void
  onClose: () => void
  searchTerm: string
  recentSearches?: string[]
  onClearRecent?: () => void
  maxHeight?: string
  className?: string
}

export function SearchSuggestions({
  suggestions,
  isVisible,
  isLoading = false,
  onSuggestionClick,
  onClose,
  searchTerm,
  recentSearches = [],
  onClearRecent,
  maxHeight = "max-h-96",
  className = ""
}: SearchSuggestionsProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const suggestionRefs = useRef<(HTMLButtonElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(-1)
    suggestionRefs.current = suggestionRefs.current.slice(0, suggestions.length)
  }, [suggestions])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && suggestions[selectedIndex]) {
            onSuggestionClick(suggestions[selectedIndex])
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isVisible, suggestions, selectedIndex, onSuggestionClick, onClose])

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionRefs.current[selectedIndex]) {
      suggestionRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      })
    }
  }, [selectedIndex])

  if (!isVisible) return null

  const getSuggestionIcon = (type: Suggestion['type']) => {
    switch (type) {
      case 'tour':
        return <Globe className="w-5 h-5 text-blue-600" />
      case 'country':
        return <MapPin className="w-5 h-5 text-green-600" />
      case 'popular':
        return <TrendingUp className="w-5 h-5 text-orange-600" />
      case 'recent':
        return <Clock className="w-5 h-5 text-gray-500" />
      default:
        return <Search className="w-5 h-5 text-gray-500" />
    }
  }

  const getSuggestionBadge = (type: Suggestion['type']) => {
    const badges = {
      tour: { text: 'ทัวร์', color: 'bg-blue-50 text-blue-700 border-blue-200' },
      country: { text: 'ประเทศ', color: 'bg-green-50 text-green-700 border-green-200' },
      popular: { text: 'ยอดนิยม', color: 'bg-orange-50 text-orange-700 border-orange-200' },
      recent: { text: 'ล่าสุด', color: 'bg-gray-50 text-gray-700 border-gray-200' }
    }
    
    const badge = badges[type]
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${badge.color}`}>
        {badge.text}
      </span>
    )
  }

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text
    
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`
        absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 
        rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-sm
        animate-in fade-in-0 slide-in-from-top-2 duration-200
        ${maxHeight} overflow-y-auto custom-scrollbar
        ${className}
      `}
      role="listbox"
      aria-label="ผลการค้นหา"
    >
      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
            <span className="text-sm">กำลังค้นหา...</span>
          </div>
        </div>
      )}

      {/* Recent Searches */}
      {!isLoading && searchTerm.length === 0 && recentSearches.length > 0 && (
        <div className="border-b border-gray-100">
          <div className="flex items-center justify-between p-4 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              ค้นหาล่าสุด
            </h3>
            {onClearRecent && (
              <button
                onClick={onClearRecent}
                className="text-xs text-gray-500 hover:text-red-500 transition-colors"
              >
                ลบทั้งหมด
              </button>
            )}
          </div>
          <div className="p-2">
            {recentSearches.slice(0, 5).map((search, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick({
                  id: `recent-${index}`,
                  type: 'recent',
                  title: search
                })}
                className="w-full flex items-center px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors text-left"
              >
                <Clock className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-gray-700">{search}</span>
                <X className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {!isLoading && suggestions.length > 0 && (
        <div className="py-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              ref={el => suggestionRefs.current[index] = el}
              onClick={() => onSuggestionClick(suggestion)}
              className={`
                w-full flex items-center px-4 py-4 hover:bg-blue-50 transition-colors
                text-left group border-b border-gray-50 last:border-b-0
                ${selectedIndex === index ? 'bg-blue-50 border-blue-100' : ''}
              `}
              role="option"
              aria-selected={selectedIndex === index}
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-white transition-colors">
                {suggestion.image ? (
                  <img 
                    src={suggestion.image} 
                    alt={suggestion.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  getSuggestionIcon(suggestion.type)
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {highlightText(suggestion.title, searchTerm)}
                    </h4>
                    
                    {suggestion.subtitle && (
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {highlightText(suggestion.subtitle, searchTerm)}
                      </p>
                    )}
                    
                    {suggestion.country && suggestion.type === 'tour' && (
                      <p className="text-xs text-gray-500 mt-1">
                        📍 {suggestion.country}
                      </p>
                    )}
                    
                    {suggestion.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {suggestion.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-3">
                    {getSuggestionBadge(suggestion.type)}
                    <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && suggestions.length === 0 && searchTerm.length > 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Search className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="font-semibold text-gray-700 mb-2">ไม่พบผลการค้นหา</h3>
          <p className="text-sm text-center max-w-sm">
            ลองใช้คำค้นหาอื่น หรือเรียกดูทัวร์ทั้งหมดของเรา
          </p>
          <button
            onClick={() => onSuggestionClick({
              id: 'view-all',
              type: 'tour',
              title: 'ดูทัวร์ทั้งหมด'
            })}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            ดูทัวร์ทั้งหมด
          </button>
        </div>
      )}

      {/* Footer */}
      {!isLoading && suggestions.length > 0 && (
        <div className="border-t border-gray-100 p-3 bg-gray-50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>ใช้ ↑↓ เพื่อเลือก, Enter เพื่อค้นหา</span>
            <span>{suggestions.length} ผลลัพธ์</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchSuggestions