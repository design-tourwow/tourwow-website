'use client'

import { X, Search, Calendar } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface AdvancedFiltersProps {
  onClose: () => void
  tours: any[]
  filteredTours: any[]
  onApplyFilters?: (filters: any) => void
}

// Countries with flags - same as original
const allCountries = [
  { name: "ญี่ปุ่น", flagCode: "jp" },
  { name: "เกาหลีใต้", flagCode: "kr" },
  { name: "จีน", flagCode: "cn" },
  { name: "ไต้หวัน", flagCode: "tw" },
  { name: "ไทย", flagCode: "th" },
  { name: "สิงคโปร์", flagCode: "sg" },
  { name: "มาเลเซีย", flagCode: "my" },
  { name: "เวียดนาม", flagCode: "vn" },
  { name: "อิตาลี", flagCode: "it" },
  { name: "ฝรั่งเศส", flagCode: "fr" },
  { name: "สวิตเซอร์แลนด์", flagCode: "ch" },
  { name: "อังกฤษ", flagCode: "gb-eng" },
  { name: "อินเดีย", flagCode: "in" },
  { name: "แคนาดา", flagCode: "ca" },
  { name: "ออสเตรเลีย", flagCode: "au" }
].sort((a, b) => a.name.localeCompare(b.name, 'th'))

const FILTER_CATEGORIES = [
  { id: 'all', name: 'ทั้งหมด', icon: '🌍' },
  { id: 'premium', name: 'พรีเมี่ยม', icon: '👑' },
  { id: 'popular', name: 'ยอดนิยม', icon: '🔥' },
  { id: 'luxury', name: 'หรูหรา', icon: '💎' },
  { id: 'culture', name: 'วัฒนธรรม', icon: '🏛️' },
  { id: 'nature', name: 'ธรรมชาติ', icon: '🏔️' },
  { id: 'romantic', name: 'โรแมนติก', icon: '💕' }
]

const PRICE_RANGES = [
  { id: 'all', name: 'ทุกราคา', min: 0, max: 999999 },
  { id: 'budget', name: '< 30,000', min: 0, max: 30000 },
  { id: 'mid', name: '30,000-80,000', min: 30000, max: 80000 },
  { id: 'high', name: '80,000-150,000', min: 80000, max: 150000 },
  { id: 'luxury', name: '> 150,000', min: 150000, max: 999999 }
]

export default function AdvancedFilters({ onClose, tours, filteredTours, onApplyFilters }: AdvancedFiltersProps) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const [countrySearchQuery, setCountrySearchQuery] = useState('')

  const clearFilters = () => {
    setSelectedCountries([])
    setSelectedCategory('all')
    setSelectedPriceRange('all')
    setSelectedMonths([])
    setCountrySearchQuery('')
  }

  const applyFilters = () => {
    const filters = {
      countries: selectedCountries,
      category: selectedCategory,
      priceRange: selectedPriceRange,
      months: selectedMonths
    }
    
    onApplyFilters?.(filters)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900">ตัวกรองขั้นสูง</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-8">
          {/* Countries with Flags */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-4">🌍 ประเทศ</h4>
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ค้นหาประเทศ..."
                  value={countrySearchQuery}
                  onChange={(e) => setCountrySearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                {countrySearchQuery && (
                  <button
                    onClick={() => setCountrySearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-48 overflow-y-auto">
              {allCountries.filter(country => {
                if (countrySearchQuery.length < 2) return true;
                return country.name.toLowerCase().includes(countrySearchQuery.toLowerCase());
              }).map((country, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedCountries(prev =>
                      prev.includes(country.name)
                        ? prev.filter(c => c !== country.name)
                        : [...prev, country.name]
                    )
                  }}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    selectedCountries.includes(country.name)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-[18px] h-[18px] rounded-full border border-gray-200 overflow-hidden flex-shrink-0">
                      <Image 
                        src={`/icons/destinations/flag-icons-main/flags/1x1/${country.flagCode}.svg`}
                        alt={`${country.name} flag`}
                        width={18}
                        height={18}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to text emoji if flag image fails
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    </div>
                    <div className="text-sm font-medium truncate">{country.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Travel Date Filter */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-blue-600" />
              <h4 className="text-lg font-semibold text-slate-900">วันเดินทาง</h4>
              <span className="text-xs text-gray-500">(2568)</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {[
                { name: 'มกราคม', short: 'ม.ค.', value: '01', isPast: true, hasTours: true },
                { name: 'กุมภาพันธ์', short: 'ก.พ.', value: '02', isPast: true, hasTours: true },
                { name: 'มีนาคม', short: 'มี.ค.', value: '03', isPast: true, hasTours: true },
                { name: 'เมษายน', short: 'เม.ย.', value: '04', isPast: false, hasTours: true },
                { name: 'พฤษภาคม', short: 'พ.ค.', value: '05', isPast: false, hasTours: true },
                { name: 'มิถุนายน', short: 'มิ.ย.', value: '06', isPast: false, hasTours: true },
                { name: 'กรกฎาคม', short: 'ก.ค.', value: '07', isPast: false, hasTours: true },
                { name: 'สิงหาคม', short: 'ส.ค.', value: '08', isPast: false, hasTours: false },
                { name: 'กันยายน', short: 'ก.ย.', value: '09', isPast: false, hasTours: true },
                { name: 'ตุลาคม', short: 'ต.ค.', value: '10', isPast: false, hasTours: true },
                { name: 'พฤศจิกายน', short: 'พ.ย.', value: '11', isPast: false, hasTours: true },
                { name: 'ธันวาคม', short: 'ธ.ค.', value: '12', isPast: false, hasTours: true }
              ].map((month, index) => {
                const isDisabled = month.isPast || !month.hasTours
                const isSelected = selectedMonths.includes(month.value)
                
                return (
                  <button
                    key={index}
                    disabled={isDisabled}
                    onClick={() => {
                      if (isDisabled) return
                      setSelectedMonths(prev => 
                        isSelected 
                          ? prev.filter(m => m !== month.value)
                          : [...prev, month.value]
                      )
                    }}
                    className={`relative py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                      isDisabled
                        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-50'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                  >
                    <div className="text-xs font-bold">{month.short}</div>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-4">หมวดหมู่ทัวร์</h4>
            <div className="grid grid-cols-2 gap-3">
              {FILTER_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    selectedCategory === category.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Ranges */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-4">ช่วงราคา</h4>
            <div className="grid grid-cols-1 gap-3">
              {PRICE_RANGES.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setSelectedPriceRange(range.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    selectedPriceRange === range.id
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-slate-200 hover:border-green-300 hover:bg-green-50/50'
                  }`}
                >
                  <span className="font-medium">{range.name}</span>
                  {range.id !== 'all' && (
                    <span className="text-sm text-slate-500">
                      ฿{range.min.toLocaleString()}{range.max < 999999 ? ` - ฿${range.max.toLocaleString()}` : '+'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200">
          <div className="flex gap-3">
            <button
              onClick={clearFilters}
              className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
            >
              รีเซ็ตตัวกรอง
            </button>
            <button
              onClick={applyFilters}
              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              ใช้ตัวกรอง ({filteredTours.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}