'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown, Globe } from 'lucide-react'
import TourDropdown from './TourDropdown'
import FlashSaleDropdown from './FlashSaleDropdown'
import TestMenuDropdown from './TestMenuDropdown'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileTourOpen, setIsMobileTourOpen] = useState(false)
  const pathname = usePathname()
  
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  const mobileCountries = [
    { name: 'ญี่ปุ่น', flag: 'jp' },
    { name: 'เกาหลีใต้', flag: 'kr' },
    { name: 'จีน', flag: 'cn' },
    { name: 'ฝรั่งเศส', flag: 'fr' },
    { name: 'อิตาลี', flag: 'it' },
    { name: 'สเปน', flag: 'es' },
    { name: 'สหรัฐอเมริกา', flag: 'us' },
    { name: 'ออสเตรเลีย', flag: 'au' }
  ]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow bg-transparent">
              <Image src="/favicon.svg" alt="TourWow Logo" width={36} height={36} className="w-9 h-9" priority />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                TourWow
              </span>
              <div className="text-xs text-gray-500 leading-none">ทัวร์ในฝัน</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Link href="/" className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              isActive('/') 
                ? 'text-blue-600 bg-blue-50 shadow-sm' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}>
              หน้าแรก
              {isActive('/') && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>}
            </Link>
            
            <TourDropdown isActive={isActive('/tours')} />
            <FlashSaleDropdown isActive={isActive('/flash-sale')} />
            <Link href="/api-tours" className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              isActive('/api-tours') 
                ? 'text-indigo-600 bg-indigo-50 shadow-sm' 
                : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
            }`}>
              ทัวร์ API
              {isActive('/api-tours') && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full"></div>}
            </Link>
            <Link href="/wholesale-tours" className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              isActive('/wholesale-tours') 
                ? 'text-purple-600 bg-purple-50 shadow-sm' 
                : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
            }`}>
              Wholesale Tours
              {isActive('/wholesale-tours') && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full"></div>}
            </Link>
            <Link href="/api-test" className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              isActive('/api-test') 
                ? 'text-green-600 bg-green-50 shadow-sm' 
                : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
            }`}>
              API Test
              {isActive('/api-test') && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full"></div>}
            </Link>
            
            <Link href="/product-pool" className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              isActive('/product-pool') 
                ? 'text-blue-600 bg-blue-50 shadow-sm' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}>
              Product Pool
              {isActive('/product-pool') && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>}
            </Link>
            
            <Link href="/tourwow-blog" className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              isActive('/tourwow-blog')
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}>
              📝 บล็อก
              {isActive('/tourwow-blog') && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>}
            </Link>
            
            <Link href="/gallery" className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              isActive('/gallery') 
                ? 'text-blue-600 bg-blue-50 shadow-sm' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}>
              แกลเลอรี่
              {isActive('/gallery') && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>}
            </Link>
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              <Phone size={16} className="text-blue-600" />
              <span className="font-medium">02-674-1500</span>
            </div>
            <Link href="/booking" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              จองทัวร์
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <nav className="py-4 space-y-1">
              <Link 
                href="/"
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                หน้าแรก
              </Link>
              
              {/* Mobile Tour Dropdown */}
              <div>
                <button 
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive('/tours') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setIsMobileTourOpen(!isMobileTourOpen)}
                >
                  แพ็คเกจทัวร์
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMobileTourOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMobileTourOpen && (
                  <div className="mt-2 pl-4 space-y-2">
                    <Link 
                      href="/tours"
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => { setIsMenuOpen(false); setIsMobileTourOpen(false); }}
                    >
                      ดูทัวร์ทั้งหมด
                    </Link>
                    <div className="border-t border-gray-100 pt-2">
                      <div className="text-xs font-semibold text-gray-500 px-4 py-1 uppercase tracking-wide">ประเทศยอดนิยม</div>
                      {mobileCountries.map((country) => (
                        <Link
                          key={country.flag}
                          href={`/tours?search=${encodeURIComponent(country.name)}`}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={() => { setIsMenuOpen(false); setIsMobileTourOpen(false); }}
                        >
                          <div className="w-5 h-3 rounded overflow-hidden shadow-sm flex-shrink-0">
                            <img
                              src={`https://flagicons.lipis.dev/flags/4x3/${country.flag}.svg`}
                              alt={`${country.name} flag`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span>{country.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Mobile Flash Sale Link */}
              <Link 
                href="/flash-sale"
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/flash-sale') ? 'text-red-600 bg-red-50' : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="animate-bounce text-xl mr-1">🔥</span> ทัวร์ไฟไหม้
              </Link>
              
              <Link 
                href="/api-tours"
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/api-tours') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                ทัวร์ API
              </Link>
              <Link 
                href="/wholesale-tours"
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/wholesale-tours') ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Wholesale Tours
              </Link>
              
              <Link 
                href="/product-pool"
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/product-pool') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Product Pool
              </Link>
              
              <Link 
                href="/tourwow-blog"
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/tourwow-blog') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog (Tourwow)
              </Link>
              
              <Link 
                href="/gallery"
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/gallery') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                แกลเลอรี่
              </Link>
              
              {/* Mobile Contact & CTA */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg">
                  <Phone size={16} className="text-blue-600" />
                  <span className="font-medium">02-674-1500</span>
                </div>
                <Link 
                  href="/booking" 
                  className="block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg font-semibold text-center shadow-lg transition-all duration-200" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  จองทัวร์
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}