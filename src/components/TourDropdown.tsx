'use client'

import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Search, Globe, Star, TrendingUp } from 'lucide-react'
import countryList from '../lib/country-list-th.json';
import { useRouter } from 'next/navigation';

interface Country {
  code: string
  name: string
  flag: string
  popular?: boolean
  featured?: boolean
}

interface Continent {
  name: string
  countries: Country[]
  icon: string
}

const continents: Continent[] = [
  {
    name: 'เอเชีย',
    icon: '🌏',
    countries: [
      { code: 'th', name: 'ประเทศไทย', flag: 'th', popular: true },
      { code: 'jp', name: 'ญี่ปุ่น', flag: 'jp', featured: true },
      { code: 'kr', name: 'เกาหลีใต้', flag: 'kr', featured: true },
      { code: 'cn', name: 'จีน', flag: 'cn' },
      { code: 'sg', name: 'สิงคโปร์', flag: 'sg' },
      { code: 'my', name: 'มาเลเซีย', flag: 'my' },
      { code: 'vn', name: 'เวียดนาม', flag: 'vn' },
      { code: 'in', name: 'อินเดีย', flag: 'in' }
    ]
  },
  {
    name: 'ยุโรป',
    icon: '🏛️',
    countries: [
      { code: 'fr', name: 'ฝรั่งเศส', flag: 'fr', featured: true },
      { code: 'it', name: 'อิตาลี', flag: 'it', featured: true },
      { code: 'es', name: 'สเปน', flag: 'es' },
      { code: 'de', name: 'เยอรมนี', flag: 'de' },
      { code: 'gb', name: 'อังกฤษ', flag: 'gb' },
      { code: 'ch', name: 'สวิตเซอร์แลนด์', flag: 'ch' },
      { code: 'at', name: 'ออสเตรีย', flag: 'at' },
      { code: 'nl', name: 'เนเธอร์แลนด์', flag: 'nl' }
    ]
  },
  {
    name: 'อื่นๆ',
    icon: '🌍',
    countries: [
      { code: 'us', name: 'สหรัฐอเมริกา', flag: 'us', featured: true },
      { code: 'ca', name: 'แคนาดา', flag: 'ca' },
      { code: 'au', name: 'ออสเตรเลีย', flag: 'au' },
      { code: 'nz', name: 'นิวซีแลนด์', flag: 'nz' },
      { code: 'za', name: 'แอฟริกาใต้', flag: 'za' },
      { code: 'eg', name: 'อียิปต์', flag: 'eg' },
      { code: 'br', name: 'บราซิล', flag: 'br' },
      { code: 'tr', name: 'ตุรกี', flag: 'tr' }
    ]
  }
]

// รายชื่อประเทศทั้งหมด (ISO 3166-1 alpha-2) พร้อมชื่อไทย/อังกฤษ (มาตรฐาน)
const allCountryList = countryList.map(c => ({
  code: c.alpha2.toLowerCase(),
  name: c.enName,
  thai: c.name
}));

interface TourDropdownProps {
  isActive: boolean
}

export default function TourDropdown({ isActive }: TourDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter();

  // Popular countries
  const popular = [
    { code: "jp", thai: "ญี่ปุ่น" },
    { code: "cn", thai: "จีน" },
    { code: "vn", thai: "เวียดนาม" },
    { code: "kr", thai: "เกาหลีใต้" },
    { code: "sg", thai: "สิงคโปร์" },
  ];

  // Filtered countries (เหมือน TestMenuDropdown)
  const filtered = allCountryList.filter(
    c => c.name.toLowerCase().includes(search.toLowerCase()) || c.thai.includes(search)
  );

  // เปิด dropdown เมื่อคลิกเท่านั้น
  const handleButtonClick = () => {
    setIsOpen(!isOpen)
  }
  
  // ปิด dropdown ทันทีเมื่อ mouse leave
  const handleDropdownMouseLeave = () => {
    setIsOpen(false)
  }
  
  // ปิด dropdown เมื่อเปลี่ยนหน้า
  const handleLinkClick = () => {
    setIsOpen(false)
  }

  // Close dropdown when component unmounts or route changes
  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false)
    window.addEventListener('beforeunload', handleRouteChange)
    return () => window.removeEventListener('beforeunload', handleRouteChange)
  }, [])

  // Prevent background scroll when dropdown is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className={`relative flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
          isActive ? 'text-blue-600 bg-blue-50 shadow-sm' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
        }`}
        type="button"
        onClick={handleButtonClick}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        แพ็กเกจทัวร์
        <svg className={`ml-1 w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        {isActive && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>}
      </button>
      <div
        className={`absolute left-1/2 top-full mt-2 z-[9999] w-[900px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-visible transition-opacity duration-150 transform -translate-x-1/2 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ minHeight: 400, pointerEvents: isOpen ? 'auto' : 'none', zIndex: 9999, opacity: isOpen ? 1 : 0 }}
        onMouseLeave={handleDropdownMouseLeave}
      >
        {/* Caret/Arrow */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-5 z-50">
          <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
            <polygon points="16,0 32,20 0,20" fill="#fff" stroke="#e0e7ef" strokeWidth="1" />
          </svg>
        </div>
        <div className="p-8 pt-4">
          {/* Popular Countries */}
          <div className="mb-6">
            <div className="mb-2 text-base font-bold text-amber-700 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-amber-400 rounded-full mr-1"></span>
              ประเทศยอดฮิต
            </div>
            <div className="grid grid-cols-5 gap-4">
              {popular.map(({ code, thai }) => {
                const c = allCountryList.find(c => c.code === code)
                if (!c) return null
                return (
                  <div key={c.code} className="flex flex-col items-center p-3 rounded-xl border-2 border-amber-400 shadow-md hover:scale-110 transition-transform bg-white relative group cursor-pointer">
                    <span className={`fi fi-${c.code} text-3xl mb-2 drop-shadow`}></span>
                    <span className="text-base font-bold text-amber-900 mb-0.5 underline decoration-amber-400 decoration-2 underline-offset-4 flex items-center gap-1">
                      <svg className="w-4 h-4 text-amber-400 inline-block" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.77l-4.77 2.51.91-5.32-3.87-3.77 5.34-.78L10 2z"/></svg>
                      {thai}
                    </span>
                    <span className="text-xs text-gray-500">{c.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
          {/* Search */}
          <input
            type="text"
            placeholder="ค้นหาประเทศหรือจุดหมาย..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 text-base"
          />
          {/* All Countries Grid */}
          <div className="grid grid-cols-8 gap-2 max-h-[400px] overflow-y-auto custom-scrollbar">
            {filtered.map((c) => (
              <div
                key={c.code}
                className="flex flex-col items-center p-2 cursor-pointer hover:bg-blue-50 rounded-lg"
                onClick={() => {
                  handleLinkClick();
                  const url = `/tours/${c.name.toLowerCase().replace(/\s+/g, '-')}-tour`;
                  console.log('Redirecting to:', url);
                  try {
                    router.push(url);
                  } catch (e) {
                    window.location.href = url;
                  }
                }}
              >
                <span className={`fi fi-${c.code} text-xl mb-1`}></span>
                <span className="text-xs text-gray-700 text-center truncate w-16 font-bold">{c.thai}</span>
                <span className="text-[10px] text-gray-400 text-center truncate w-16">{c.name}</span>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-8 text-center text-gray-400 py-4">ไม่พบประเทศที่ค้นหา</div>
            )}
          </div>
          {/* CTA: View all tours */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => {
                handleLinkClick();
                router.push('/tours');
              }}
              className="flex items-center gap-1 text-blue-600 font-semibold text-base hover:underline hover:text-blue-700 transition-all duration-150"
            >
              <span>ดูทัวร์ต่างประเทศทั้งหมด</span>
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}