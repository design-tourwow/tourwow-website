'use client'

import { useState, useEffect, useMemo, Suspense, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, Hotel, Star, Plane, Award, Eye, Heart, ArrowUpDown, Check } from 'lucide-react'
import TourFilterSidebar from '@/components/TourFilterSidebar'
import { Button } from '@/components/ui/Button'
import StarRating from '@/components/StarRating'
import LoadingScreen from '@/components/LoadingScreen'

interface ProductPoolTourRaw {
  id: number
  productName: string
  productTourCode: string
  productTourwowCode: string
  productPrice: number
  productPriceCompare?: number
  productMainCountryNameTh: string
  productMainCountryNameEn: string
  productCountries: string
  productDurationDay: number
  productDurationNight: number
  productDurationDayAndNight?: string
  productHotelStar: number
  productMealAmount: number
  productHilightDescription: string
  productBannerUrl: string
  productIsRecommended: number
  productStartAt: string
  productTags: string
  periodStartAt: string
  periodEndAt: string
  periodPriceAdultDouble: number
  periodPriceAdultDoubleCompare?: number
  periodQuantityRemaining: number
  periodIsActive: number
  periodGoTransportationNameEn: string
  periodGoTransportationCode: string
  periodBackTransportationNameEn: string
  periodBackTransportationCode: string
}

interface Period {
  startAt: string
  endAt: string
  price: number
  comparePrice?: number
  available: number
  isActive: number
  goTransport: string
  goTransportCode: string
  backTransport: string
  backTransportCode: string
}

interface ProductPoolTour {
  id: string
  name: string
  code: string
  price: number
  originalPrice?: number
  image: string
  location: string
  country: string
  days: number
  nights: number
  duration: {
    days: number
    nights: number
    dayAndNight: string
  }
  hotelStar: number
  meals: number
  highlights: string[]
  tags: string[]
  periods: Period[]
  isRecommended: boolean
  tourwowCode: string
  quantityRemaining: number
}

function mapRawToTourWithPeriods(raw: ProductPoolTourRaw, periods: Period[]): ProductPoolTour {
  // แปลง product_duration_day_and_night format
  let dayAndNight = '';
  let days = raw.productDurationDay;
  let nights = raw.productDurationNight;

  if (raw.productDurationDayAndNight) {
    // Check for different formats: "5D4N", "5วัน4คืน", "5 วัน 4 คืน"
    const formats = [
      /(\d+)D(\d+)N/i,                    // 5D4N format
      /(\d+)\s*วัน\s*(\d+)\s*คืน/,        // 5วัน4คืน or 5 วัน 4 คืน
      /(\d+)\s*day[s]?\s*(\d+)\s*night[s]?/i // 5day4night format
    ];

    for (const format of formats) {
      const match = raw.productDurationDayAndNight.match(format);
      if (match) {
        days = parseInt(match[1]);
        nights = parseInt(match[2]);
        break;
      }
    }
    
    // Always format as Thai
    dayAndNight = `${days} วัน ${nights} คืน`;
  } else {
    dayAndNight = `${days} วัน ${nights} คืน`;
  }

  return {
    id: raw.id.toString(),
    name: raw.productName,
    code: raw.productTourCode,
    price: Math.min(...periods.filter(p => p.price > 0).map(p => p.price)) || raw.productPrice,
    originalPrice: raw.productPriceCompare,
    image: raw.productBannerUrl,
    location: raw.productMainCountryNameTh,
    country: raw.productMainCountryNameTh,
    days: days,
    nights: nights,
    duration: {
      days: days,
      nights: nights,
      dayAndNight: dayAndNight
    },
    hotelStar: raw.productHotelStar,
    meals: raw.productMealAmount,
    highlights: raw.productHilightDescription ? raw.productHilightDescription.split(/,|\n|\|/).map(s => s.trim()).filter(Boolean) : [],
    tags: raw.productTags ? raw.productTags.split(/,|\n|\|/).map(s => s.trim()).filter(Boolean) : [],
    periods: periods,
    isRecommended: raw.productIsRecommended === 1,
    tourwowCode: raw.productTourwowCode,
    quantityRemaining: Math.max(...periods.map(p => p.available)),
  };
}

function mapRawToTour(raw: ProductPoolTourRaw): ProductPoolTour {
  // แปลง product_duration_day_and_night format
  let dayAndNight = '';
  let days = raw.productDurationDay;
  let nights = raw.productDurationNight;

  if (raw.productDurationDayAndNight) {
    // Check for different formats: "5D4N", "5วัน4คืน", "5 วัน 4 คืน"
    const formats = [
      /(\d+)D(\d+)N/i,                    // 5D4N format
      /(\d+)\s*วัน\s*(\d+)\s*คืน/,        // 5วัน4คืน or 5 วัน 4 คืน
      /(\d+)\s*day[s]?\s*(\d+)\s*night[s]?/i // 5day4night format
    ];

    for (const format of formats) {
      const match = raw.productDurationDayAndNight.match(format);
      if (match) {
        days = parseInt(match[1]);
        nights = parseInt(match[2]);
        break;
      }
    }
    
    // Always format as Thai
    dayAndNight = `${days} วัน ${nights} คืน`;
  } else {
    dayAndNight = `${days} วัน ${nights} คืน`;
  }

  return {
    id: raw.id.toString(),
    name: raw.productName,
    code: raw.productTourCode,
    price: raw.periodPriceAdultDouble || raw.productPrice,
    originalPrice: raw.periodPriceAdultDoubleCompare,
    image: raw.productBannerUrl,
    location: raw.productMainCountryNameTh,
    country: raw.productMainCountryNameTh,
    days: days,
    nights: nights,
    duration: {
      days: days,
      nights: nights,
      dayAndNight: dayAndNight
    },
    hotelStar: raw.productHotelStar,
    meals: raw.productMealAmount,
    highlights: raw.productHilightDescription ? raw.productHilightDescription.split(/,|\n|\|/).map(s => s.trim()).filter(Boolean) : [],
    tags: raw.productTags ? raw.productTags.split(/,|\n|\|/).map(s => s.trim()).filter(Boolean) : [],
    periods: [
      {
        startAt: raw.periodStartAt,
        endAt: raw.periodEndAt,
        price: raw.periodPriceAdultDouble,
        comparePrice: raw.periodPriceAdultDoubleCompare,
        available: raw.periodQuantityRemaining,
        isActive: raw.periodIsActive,
        goTransport: raw.periodGoTransportationNameEn || 'สายการบินชั้นนำ',
        goTransportCode: raw.periodGoTransportationCode || 'TG',
        backTransport: raw.periodBackTransportationNameEn,
        backTransportCode: raw.periodBackTransportationCode,
      }
    ],
    isRecommended: raw.productIsRecommended === 1,
    tourwowCode: raw.productTourwowCode,
    quantityRemaining: raw.periodQuantityRemaining,
  }
}

// Function to format date from YYYY-MM-DD to Thai format (DD MMM YYYY)
function formatDateToThai(dateString: string): string {
  if (!dateString) return 'รอประกาศ'
  
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'รอประกาศ'
    
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear() + 543 // Convert to Buddhist era
    
    const thaiMonths = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ]
    
    return `${day} ${thaiMonths[month]} ${year}`
  } catch (error) {
    return 'รอประกาศ'
  }
}

// Function to get month from date string for grouping
function getMonthFromDate(dateStr: string): string | null {
  if (!dateStr || dateStr === 'รอประกาศ') return null
  
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return null
    
    return (date.getMonth() + 1).toString().padStart(2, '0')
  } catch (error) {
    return null
  }
}

// Function to check if tour is full - all periods must have no available seats
function isTourFull(periods: any[]): boolean {
  if (!periods || periods.length === 0) return true
  
  // Check if ALL periods have 0 available seats
  const allPeriodsAreFull = periods.every(period => {
    try {
      return period.available === 0
    } catch (error) {
      return true
    }
  })
  
  console.log('isTourFull check:', {
    periodsCount: periods.length,
    samplePeriods: periods.slice(0, 3).map(p => ({
      startAt: p.startAt, 
      available: p.available,
      isFull: p.available === 0
    })),
    allPeriodsAreFull
  })
  
  return allPeriodsAreFull
}

function ProductPoolPageContent() {
  const [tours, setTours] = useState<ProductPoolTour[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const [selectedCountry, setSelectedCountry] = useState('ทั้งหมด')
  const [priceRange, setPriceRange] = useState('ทั้งหมด')
  const [sortBy, setSortBy] = useState('ยอดนิยม')
  const [selectedDays, setSelectedDays] = useState('ทั้งหมด')
  const [selectedNights, setSelectedNights] = useState('ทั้งหมด')
  const [selectedHotelStar, setSelectedHotelStar] = useState('ทั้งหมด')
  const [selectedAirline, setSelectedAirline] = useState('ทั้งหมด')
  const [viewMode] = useState<'grid' | 'list'>('grid')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [displayedTours, setDisplayedTours] = useState(12)
  const [isLoading, setIsLoading] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([])
  const [notifications, setNotifications] = useState<string[]>([])
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const sortDropdownRef = useRef<HTMLDivElement>(null)
  const toursPerLoad = 200

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/product-pool?limit=15000')
        if (response.ok) {
          const result = await response.json()
          const data: ProductPoolTourRaw[] = result.data || result
          console.log('Raw API response:', result)
          console.log('Raw API data length:', data.length)
          console.log('Sample tw5640 data:', data.filter(item => item.productTourwowCode === 'tw5640').slice(0, 3))
          console.log('Sample period data:', data.slice(0, 5).map(item => ({
            code: item.productTourwowCode,
            startAt: item.periodStartAt,
            available: item.periodQuantityRemaining,
            isActive: item.periodIsActive,
            country: item.productMainCountryNameTh
          })))
          console.log('Active periods count:', data.filter(item => item.periodIsActive === 1).length)
          console.log('Inactive periods count:', data.filter(item => item.periodIsActive === 0).length)
          console.log('Available periods count:', data.filter(item => item.periodQuantityRemaining > 0).length)
          console.log('Unique periodIsActive values in frontend:', [...new Set(data.map(item => item.periodIsActive))])
          
          // Group by tour code to combine periods
          const groupedTours = new Map<string, ProductPoolTourRaw[]>()
          
          data.forEach((tour: ProductPoolTourRaw) => {
            const key = tour.productTourwowCode || tour.productTourCode
            if (!groupedTours.has(key)) {
              groupedTours.set(key, [])
            }
            groupedTours.get(key)!.push(tour)
          })
          
          // Convert grouped data to tours with combined periods
          const uniqueTours = Array.from(groupedTours.values()).map((tourGroup) => {
            const firstTour = tourGroup[0]
            // Create periods from all group members
            const periods = tourGroup.map(raw => ({
              startAt: raw.periodStartAt,
              endAt: raw.periodEndAt,
              price: raw.periodPriceAdultDouble,
              comparePrice: raw.periodPriceAdultDoubleCompare,
              available: raw.periodQuantityRemaining,
              isActive: raw.periodIsActive,
              goTransport: raw.periodGoTransportationNameEn || 'สายการบินชั้นนำ',
              goTransportCode: raw.periodGoTransportationCode || 'TG',
              backTransport: raw.periodBackTransportationNameEn,
              backTransportCode: raw.periodBackTransportationCode,
            }))
            
            return mapRawToTourWithPeriods(firstTour, periods)
          })
          
          console.log('Unique tours count:', uniqueTours.length)
          setTours(uniqueTours)
        } else {
          console.error('Failed to fetch tours:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching tours:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTours()
  }, [])


  const addToWishlist = (tourId: string) => {
    setWishlist(prev => {
      if (prev.includes(tourId)) {
        return prev.filter(id => id !== tourId)
      } else {
        setNotifications(prev => [...prev, 'เพิ่มในรายการโปรดแล้ว!'])
        setTimeout(() => setNotifications(prev => prev.slice(1)), 3000)
        return [...prev, tourId]
      }
    })
  }

  const addToRecentlyViewed = (tourId: string) => {
    setRecentlyViewed(prev => {
      const newList = prev.filter(id => id !== tourId)
      return [tourId, ...newList].slice(0, 10)
    })
  }


  // Group tours by productTourCode (code)
  const groupedTours = useMemo(() => {
    const groups: Record<string, ProductPoolTour & { periods: Period[], hasComparePrice: boolean, comparePrice?: number }> = {}
    
    // First pass: collect all periods for each tour code
    tours.forEach(tour => {
      if (!groups[tour.code]) {
        // Get all periods for this tour code from all rows (ไม่กรอง period ใดๆ)
        const sameCodeTours = tours.filter(t => t.code === tour.code)
        const allPeriods = sameCodeTours.flatMap(t => t.periods) // << ไม่กรอง period
        
        // Find the lowest period_price_adult_double (ราคาเริ่มต้น)
        const validPrices = allPeriods
          .map(p => p.price)
          .filter(price => price && price > 0 && !isNaN(price))
        const lowestPrice = validPrices.length > 0 ? Math.min(...(validPrices as number[])) : (tour.price || 0)
        
        // Find the lowest period_price_adult_double_compare (ราคาตั้ง)
        const validComparePrices = allPeriods
          .map(p => p.comparePrice)
          .filter(price => price && price > 0 && !isNaN(price))
        const lowestComparePrice = validComparePrices.length > 0 ? Math.min(...(validComparePrices as number[])) : undefined
        
        const hasComparePrice = lowestComparePrice !== undefined
        
        groups[tour.code] = { 
          ...tour, 
          price: lowestPrice,
          periods: allPeriods, // << ไม่กรอง period
          hasComparePrice,
          comparePrice: lowestComparePrice
        }
      }
      // No else block needed since we collect all periods in the first pass
    })
    
    return Object.values(groups)
  }, [tours])

  const filteredAndSortedTours = useMemo(() => {
    let filtered = groupedTours.filter(tour => {
      // กรองออกทัวร์ที่มี 0 วัน 0 คืน
      const hasDuration = (tour.duration?.days > 0) || (tour.duration?.nights > 0)
      if (!hasDuration) return false

      const matchesSearch = searchTerm === '' || 
        tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        tour.highlights.some(highlight => highlight.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCountry = selectedCountry === 'ทั้งหมด' || 
        tour.country === selectedCountry

      const matchesPrice = priceRange === 'ทั้งหมด' || (() => {
        const price = tour.price
        switch (priceRange) {
          case 'ต่ำกว่า 10,000': return price < 10000
          case '10,001-15,000': return price >= 10001 && price <= 15000
          case '15,001-20,000': return price >= 15001 && price <= 20000
          case '20,001-25,000': return price >= 20001 && price <= 25000
          case '25,001-30,000': return price >= 25001 && price <= 30000
          case '30,001-35,000': return price >= 30001 && price <= 35000
          case '35,001-40,000': return price >= 35001 && price <= 40000
          case '40,001-45,000': return price >= 40001 && price <= 45000
          case '45,001-50,000': return price >= 45001 && price <= 50000
          case '50,001-60,000': return price >= 50001 && price <= 60000
          case '60,001-70,000': return price >= 60001 && price <= 70000
          case '70,001-80,000': return price >= 70001 && price <= 80000
          case '80,001-90,000': return price >= 80001 && price <= 90000
          case '90,001-100,000': return price >= 90001 && price <= 100000
          case '100,001 ขึ้นไป': return price > 100000
          default: return true
        }
      })()

      const matchesDays = selectedDays === 'ทั้งหมด' || (() => {
        const tourDays = tour.duration?.days || 0
        return tourDays.toString() === selectedDays
      })()

      const matchesNights = selectedNights === 'ทั้งหมด' || (() => {
        const tourNights = tour.duration?.nights || 0
        return tourNights.toString() === selectedNights
      })()

      const matchesHotelStar = selectedHotelStar === 'ทั้งหมด' || (() => {
        const stars = tour.hotelStar || 0
        switch (selectedHotelStar) {
          case '5 ดาว': return stars >= 5
          case '4 ดาว': return stars >= 4 && stars < 5
          case '3 ดาว': return stars >= 3 && stars < 4
          default: return true
        }
      })()

      const matchesAirline = selectedAirline === 'ทั้งหมด' || 
        tour.periods.some(period => {
          const airline = period.goTransport
          return airline && 
                 airline.trim() !== '' && 
                 airline.toLowerCase() !== 'null' && 
                 airline.toLowerCase() !== 'undefined' &&
                 airline !== 'NULL' &&
                 airline !== 'null' &&
                 airline === selectedAirline
        })

      return matchesSearch && matchesCountry && matchesPrice && matchesDays && matchesNights && matchesHotelStar && matchesAirline && tour.periods.length > 0
    })

    switch (sortBy) {
      case 'ราคาต่ำสุด':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'ราคาสูงสุด':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'วันที่ใหม่':
        filtered.sort((a, b) => {
          const aDate = a.periods[0]?.startAt ? new Date(a.periods[0].startAt).getTime() : 0
          const bDate = b.periods[0]?.startAt ? new Date(b.periods[0].startAt).getTime() : 0
          return bDate - aDate
        })
        break
      case 'วันเดินทางใกล้สุด':
        filtered.sort((a, b) => {
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          
          // หา period ที่เปิดขายอยู่และใกล้ที่สุด
          const getEarliestAvailablePeriod = (tour: any) => {
            const availablePeriods = tour.periods.filter((p: any) => {
              const startDate = new Date(p.startAt)
              return p.isActive === 1 && p.available > 0 && startDate >= today
            })
            
            if (availablePeriods.length === 0) return null
            
            return availablePeriods.reduce((earliest: any, current: any) => {
              const earliestDate = new Date(earliest.startAt).getTime()
              const currentDate = new Date(current.startAt).getTime()
              return currentDate < earliestDate ? current : earliest
            })
          }
          
          const aPeriod = getEarliestAvailablePeriod(a)
          const bPeriod = getEarliestAvailablePeriod(b)
          
          // ถ้าไม่มี period ที่เปิดขาย ให้เอาไปไว้ท้าย
          if (!aPeriod && !bPeriod) return 0
          if (!aPeriod) return 1
          if (!bPeriod) return -1
          
          const aDate = new Date(aPeriod.startAt).getTime()
          const bDate = new Date(bPeriod.startAt).getTime()
          return aDate - bDate
        })
        break
      case 'แนะนำ':
        filtered.sort((a, b) => (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0))
        break
      default:
        filtered.sort((a, b) => (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0))
        break
    }

    return filtered
  }, [groupedTours, searchTerm, selectedCountry, priceRange, sortBy, selectedDays, selectedNights, selectedHotelStar, selectedAirline])

  // Helper function to get filtered tours for calculating dynamic filters
  const getFilteredToursForCalculation = (excludeFilter: string) => {
    return groupedTours.filter(tour => {
      const matchesSearch = searchTerm === '' || 
        tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        tour.highlights.some(highlight => highlight.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCountry = excludeFilter === 'country' || selectedCountry === 'ทั้งหมด' || 
        tour.country === selectedCountry

      const matchesPrice = excludeFilter === 'price' || priceRange === 'ทั้งหมด' || (() => {
        const price = tour.price
        switch (priceRange) {
          case 'ต่ำกว่า 10,000': return price < 10000
          case '10,001-15,000': return price >= 10001 && price <= 15000
          case '15,001-20,000': return price >= 15001 && price <= 20000
          case '20,001-25,000': return price >= 20001 && price <= 25000
          case '25,001-30,000': return price >= 25001 && price <= 30000
          case '30,001-35,000': return price >= 30001 && price <= 35000
          case '35,001-40,000': return price >= 35001 && price <= 40000
          case '40,001-45,000': return price >= 40001 && price <= 45000
          case '45,001-50,000': return price >= 45001 && price <= 50000
          case '50,001-60,000': return price >= 50001 && price <= 60000
          case '60,001-70,000': return price >= 60001 && price <= 70000
          case '70,001-80,000': return price >= 70001 && price <= 80000
          case '80,001-90,000': return price >= 80001 && price <= 90000
          case '90,001-100,000': return price >= 90001 && price <= 100000
          case '100,001 ขึ้นไป': return price > 100000
          default: return true
        }
      })()

      // Real-time filtering: เมื่อกรอง days จะแสดงเฉพาะ nights ที่เข้ากันได้
      const matchesDays = excludeFilter === 'days' || selectedDays === 'ทั้งหมด' || (() => {
        const tourDays = tour.duration?.days || 0
        return tourDays.toString() === selectedDays
      })()

      const matchesNights = excludeFilter === 'nights' || selectedNights === 'ทั้งหมด' || (() => {
        const tourNights = tour.duration?.nights || 0
        return tourNights.toString() === selectedNights
      })()

      // กรองออกทัวร์ที่มี 0 วัน 0 คืน สำหรับ calculation
      const hasDuration = (tour.duration?.days > 0) || (tour.duration?.nights > 0)
      if (!hasDuration) return false

      const matchesHotelStar = excludeFilter === 'hotelStar' || selectedHotelStar === 'ทั้งหมด' || (() => {
        const stars = tour.hotelStar || 0
        switch (selectedHotelStar) {
          case '5 ดาว': return stars >= 5
          case '4 ดาว': return stars >= 4 && stars < 5
          case '3 ดาว': return stars >= 3 && stars < 4
          default: return true
        }
      })()

      const matchesAirline = excludeFilter === 'airline' || selectedAirline === 'ทั้งหมด' || 
        tour.periods.some(period => {
          const airline = period.goTransport
          return airline && 
                 airline.trim() !== '' && 
                 airline.toLowerCase() !== 'null' && 
                 airline.toLowerCase() !== 'undefined' &&
                 airline !== 'NULL' &&
                 airline !== 'null' &&
                 airline === selectedAirline
        })

      return matchesSearch && matchesCountry && matchesPrice && matchesDays && matchesNights && matchesHotelStar && matchesAirline && tour.periods.length > 0
    })
  }

  const countries = useMemo(() => {
    const countryMap = new Map<string, number>()
    const filteredTours = getFilteredToursForCalculation('country')
    filteredTours.forEach(tour => {
      const country = tour.country
      countryMap.set(country, (countryMap.get(country) || 0) + 1)
    })
    
    // Calculate actual sum of countries (excluding "ทั้งหมด")
    const totalCountriesSum = Array.from(countryMap.values()).reduce((sum, count) => sum + count, 0)
    countryMap.set('ทั้งหมด', totalCountriesSum)
    
    return Array.from(countryMap.entries()).map(([name, count]) => ({ name, count }))
  }, [groupedTours, searchTerm, priceRange, selectedDays, selectedNights, selectedHotelStar, selectedAirline])

  const days = useMemo(() => {
    const dayMap = new Map<string, number>()
    const filteredTours = getFilteredToursForCalculation('days')
    filteredTours.forEach(tour => {
      const tourDays = tour.duration?.days || 0
      if (tourDays > 0) {
        dayMap.set(tourDays.toString(), (dayMap.get(tourDays.toString()) || 0) + 1)
      }
    })
    
    const totalDaysSum = Array.from(dayMap.values()).reduce((sum, count) => sum + count, 0)
    dayMap.set('ทั้งหมด', totalDaysSum)
    
    return Array.from(dayMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => {
        if (a.name === 'ทั้งหมด') return -1
        if (b.name === 'ทั้งหมด') return 1
        return parseInt(a.name) - parseInt(b.name)
      })
  }, [groupedTours, searchTerm, selectedCountry, priceRange, selectedNights, selectedHotelStar, selectedAirline])

  const nights = useMemo(() => {
    const nightMap = new Map<string, number>()
    const filteredTours = getFilteredToursForCalculation('nights')
    filteredTours.forEach(tour => {
      const tourNights = tour.duration?.nights || 0
      if (tourNights >= 0) {
        nightMap.set(tourNights.toString(), (nightMap.get(tourNights.toString()) || 0) + 1)
      }
    })
    
    const totalNightsSum = Array.from(nightMap.values()).reduce((sum, count) => sum + count, 0)
    nightMap.set('ทั้งหมด', totalNightsSum)
    
    return Array.from(nightMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => {
        if (a.name === 'ทั้งหมด') return -1
        if (b.name === 'ทั้งหมด') return 1
        return parseInt(a.name) - parseInt(b.name)
      })
  }, [groupedTours, searchTerm, selectedCountry, priceRange, selectedDays, selectedHotelStar, selectedAirline])

  const hotelStars = useMemo(() => {
    const starMap = new Map<string, number>()
    const filteredTours = getFilteredToursForCalculation('hotelStar')
    filteredTours.forEach(tour => {
      const stars = tour.hotelStar || 0
      let starLabel = ''
      if (stars >= 5) {
        starLabel = '5 ดาว'
      } else if (stars >= 4) {
        starLabel = '4 ดาว'
      } else if (stars >= 3) {
        starLabel = '3 ดาว'
      }
      if (starLabel) {
        starMap.set(starLabel, (starMap.get(starLabel) || 0) + 1)
      }
    })
    
    // Calculate actual sum of hotel stars (excluding "ทั้งหมด")
    const totalStarsSum = Array.from(starMap.values()).reduce((sum, count) => sum + count, 0)
    starMap.set('ทั้งหมด', totalStarsSum)
    
    return Array.from(starMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => {
        if (a.name === 'ทั้งหมด') return -1
        if (b.name === 'ทั้งหมด') return 1
        
        // Extract star number for sorting (5 ดาว -> 5)
        const getStarNumber = (str: string) => {
          const match = str.match(/(\d+)\s*ดาว/)
          return match ? parseInt(match[1]) : 0
        }
        
        return getStarNumber(b.name) - getStarNumber(a.name) // Sort desc (5->4->3)
      })
  }, [groupedTours, searchTerm, selectedCountry, priceRange, selectedDays, selectedNights, selectedAirline])

  const airlines = useMemo(() => {
    const airlineMap = new Map<string, number>()
    const filteredTours = getFilteredToursForCalculation('airline')
    
    filteredTours.forEach(tour => {
      const tourAirlines = new Set<string>()
      tour.periods.forEach(period => {
        const airline = period.goTransport
        if (airline && 
            airline.trim() !== '' && 
            airline.toLowerCase() !== 'null' && 
            airline.toLowerCase() !== 'undefined' &&
            airline !== 'NULL' &&
            airline !== 'null'
        ) {
          tourAirlines.add(airline)
        }
      })
      
      tourAirlines.forEach(airline => {
        airlineMap.set(airline, (airlineMap.get(airline) || 0) + 1)
      })
    })
    
    // Calculate actual sum of airlines (excluding "ทั้งหมด")
    const totalAirlinesSum = Array.from(airlineMap.values()).reduce((sum, count) => sum + count, 0)
    airlineMap.set('ทั้งหมด', totalAirlinesSum)
    
    return Array.from(airlineMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => {
        if (a.name === 'ทั้งหมด') return -1
        if (b.name === 'ทั้งหมด') return 1
        return a.name.localeCompare(b.name, 'en') // Sort A-Z
      })
  }, [groupedTours, searchTerm, selectedCountry, priceRange, selectedDays, selectedNights, selectedHotelStar])

  const priceRanges = useMemo(() => {
    const ranges = [
      'ทั้งหมด', 
      'ต่ำกว่า 10,000', 
      '10,001-15,000', 
      '15,001-20,000', 
      '20,001-25,000', 
      '25,001-30,000', 
      '30,001-35,000', 
      '35,001-40,000', 
      '40,001-45,000', 
      '45,001-50,000', 
      '50,001-60,000', 
      '60,001-70,000', 
      '70,001-80,000', 
      '80,001-90,000', 
      '90,001-100,000', 
      '100,001 ขึ้นไป'
    ]

    const filteredTours = getFilteredToursForCalculation('price')
    
    const priceMap = new Map<string, number>()
    
    ranges.forEach(range => {
      if (range !== 'ทั้งหมด') {
        const count = filteredTours.filter(tour => {
          const price = tour.price
          switch (range) {
            case 'ต่ำกว่า 10,000': return price < 10000
            case '10,001-15,000': return price >= 10001 && price <= 15000
            case '15,001-20,000': return price >= 15001 && price <= 20000
            case '20,001-25,000': return price >= 20001 && price <= 25000
            case '25,001-30,000': return price >= 25001 && price <= 30000
            case '30,001-35,000': return price >= 30001 && price <= 35000
            case '35,001-40,000': return price >= 35001 && price <= 40000
            case '40,001-45,000': return price >= 40001 && price <= 45000
            case '45,001-50,000': return price >= 45001 && price <= 50000
            case '50,001-60,000': return price >= 50001 && price <= 60000
            case '60,001-70,000': return price >= 60001 && price <= 70000
            case '70,001-80,000': return price >= 70001 && price <= 80000
            case '80,001-90,000': return price >= 80001 && price <= 90000
            case '90,001-100,000': return price >= 90001 && price <= 100000
            case '100,001 ขึ้นไป': return price > 100000
            default: return false
          }
        }).length
        priceMap.set(range, count)
      }
    })
    
    // Calculate actual sum of price ranges (excluding "ทั้งหมด")
    const totalPricesSum = Array.from(priceMap.values()).reduce((sum, count) => sum + count, 0)
    priceMap.set('ทั้งหมด', totalPricesSum)
    
    return ranges.map(range => ({
      name: range,
      count: priceMap.get(range) || 0
    })).filter(range => range.count > 0 || range.name === 'ทั้งหมด')
  }, [groupedTours, searchTerm, selectedCountry, selectedDays, selectedNights, selectedHotelStar, selectedAirline])
  const sortOptions = ['ยอดนิยม', 'ราคาต่ำสุด', 'ราคาสูงสุด', 'วันที่ใหม่', 'วันเดินทางใกล้สุด', 'แนะนำ']


  const displayedToursData = useMemo(() => {
    return filteredAndSortedTours.slice(0, displayedTours)
  }, [filteredAndSortedTours, displayedTours])

  const hasMoreTours = displayedTours < filteredAndSortedTours.length

  const loadMoreTours = () => {
    setIsLoading(true)
    setTimeout(() => {
      setDisplayedTours(prev => prev + toursPerLoad)
      setIsLoading(false)
    }, 1000)
  }

  useEffect(() => {
    setDisplayedTours(toursPerLoad)
  }, [searchTerm, selectedCountry, priceRange, sortBy, selectedDays, selectedNights, selectedHotelStar, selectedAirline, toursPerLoad])

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false)
      }
    }

    if (showSortDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSortDropdown])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        if (hasMoreTours && !isLoading) {
          loadMoreTours()
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasMoreTours, isLoading])

  const handleClearFilters = () => {
    setSearchTerm('')
    setPriceRange('ทั้งหมด')
    setSelectedCountry('ทั้งหมด')
    setSortBy('ยอดนิยม')
    setSelectedDays('ทั้งหมด')
    setSelectedNights('ทั้งหมด')
    setSelectedHotelStar('ทั้งหมด')
    setSelectedAirline('ทั้งหมด')
  }

  if (loading) {
    return (
      <LoadingScreen 
        title="กำลังโหลดข้อมูล Product Pool" 
        subtitle="โปรดรอสักครู่... กำลังดึงข้อมูลจากฐานข้อมูล" 
      />
    )
  }

  return (
    <main className="bg-blue-50/30">
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification, idx) => (
            <div key={idx} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
              <div className="flex items-center">{notification}</div>
            </div>
          ))}
        </div>
      )}
      <div className="container mx-auto px-4 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <aside className={`lg:col-span-1 lg:block ${isSidebarOpen ? 'block' : 'hidden'} mb-8 lg:mb-0`}>
                        <TourFilterSidebar
              priceRanges={priceRanges}
              selectedPriceRange={priceRange}
              onPriceChange={setPriceRange}
              countries={countries}
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
              onClearFilters={handleClearFilters}
              days={days}
              selectedDays={selectedDays}
              onDaysChange={setSelectedDays}
              nights={nights}
              selectedNights={selectedNights}
              onNightsChange={setSelectedNights}
              hotelStars={hotelStars}
              selectedHotelStar={selectedHotelStar}
              onHotelStarChange={setSelectedHotelStar}
              airlines={airlines}
              selectedAirline={selectedAirline}
              onAirlineChange={setSelectedAirline}
            />
          </aside>
          <section className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              {/* Single Row with Search, Results, and Sort */}
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Left Side - Search and Mobile Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-center flex-1 min-w-0">
                  {/* Search Input - Takes all available space */}
                  <div className="relative flex-1 w-full min-w-0">
                    <input
                      type="text"
                      placeholder="ค้นหาทัวร์ตามชื่อหรือสถานที่..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-blue-900"
                    />
                  </div>
                  
                  {/* Mobile Filter Button - Fixed width */}
                  <Button 
                    variant="secondary"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden w-full sm:w-auto flex-shrink-0"
                  >
                    {isSidebarOpen ? 'ซ่อนตัวกรอง' : 'แสดงตัวกรอง'}
                  </Button>
                  
                  {/* Wishlist Button - Fixed width */}
                  {wishlist.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchTerm(wishlist.map(id => filteredAndSortedTours.find(t => t.id === id)?.name).filter(Boolean).join(' '))}
                      className="text-red-600 border-red-200 hover:bg-red-50 whitespace-nowrap flex-shrink-0"
                    >
                      <Heart className="w-4 h-4 mr-1 fill-current" />
                      ดูรายการโปรด ({wishlist.length})
                    </Button>
                  )}
                </div>
                
                {/* Right Side - Results Count and Sort - Fixed width */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  {/* Results Count */}
                  <div className="text-sm text-blue-700 font-semibold whitespace-nowrap">
                    พบ <span className="text-blue-800">{filteredAndSortedTours.length}</span> โปรแกรม
                  </div>
                  
                  {/* Sort Dropdown */}
                  <div className="relative" ref={sortDropdownRef}>
                    <button
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200 hover:border-blue-300 whitespace-nowrap"
                    >
                      <span className="font-medium">เรียง: {sortBy}</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                    
                    {showSortDropdown && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <div className="py-2">
                          {sortOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setSortBy(option)
                                setShowSortDropdown(false)
                              }}
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 flex items-center justify-between ${
                                sortBy === option ? 'text-blue-700 bg-blue-50 font-medium' : 'text-gray-700'
                              }`}
                            >
                              <span>{option}</span>
                              {sortBy === option && <Check className="w-4 h-4 text-blue-600" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {filteredAndSortedTours.length > 0 ? (
              <>
                <div className={`grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
                  {displayedToursData.map((tour, index) => {
                    // ตรวจสอบสถานะจาก periods ทั้งหมด
                    const hasAvailableSeats = tour.periods.some(p => p.available > 0)
                    const hasLowStockSeats = tour.periods.some(p => p.available > 0 && p.available < 5)
                    const isLowStock = hasLowStockSeats && hasAvailableSeats
                    const isFull = isTourFull(tour.periods)
                    const borderClass = isLowStock
                      ? 'border-2 border-red-500 hover:border-red-600 focus-within:border-red-700'
                      : 'border-2 border-blue-200 hover:border-blue-500/80 focus-within:border-blue-600'
                    if (isFull) {
                      return (
                        <div key={`${tour.id}-${index}`} className={`bg-white rounded-2xl ${borderClass} shadow-lg overflow-hidden flex flex-col opacity-50 cursor-not-allowed border-gray-300`}> 
                          <div className="relative h-56">
                            <Image
                              src={tour.image || "/plane.svg"}
                              alt={tour.name || "Tour Image"}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                              <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg">
                                เต็มแล้ว
                              </div>
                            </div>
                            <div className="absolute top-0 right-0 text-white px-3 py-1.5 rounded-bl-lg text-sm font-semibold bg-gray-400">
                              {tour.days} วัน {tour.nights} คืน
                            </div>
                          </div>
                          <div className="flex-1 p-6 flex flex-col">
                            <div className="mb-3">
                              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                                {tour.name}
                              </h3>
                              <div className="flex items-center text-blue-600 mb-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span className="text-sm">{tour.location}</span>
                              </div>
                            </div>
                            <div className="space-y-3 mb-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  <span className="text-sm">{tour.days} วัน {tour.nights} คืน</span>
                                </div>
                                {tour.hotelStar > 0 && (
                                  <div className="flex items-center">
                                    <Hotel className="w-4 h-4 mr-1 text-orange-500" />
                                    <StarRating rating={tour.hotelStar || 0} />
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-600">
                                  <Plane className="w-4 h-4 mr-2" />
                                  <span className="text-sm">{tour.periods[0].goTransport}</span>
                                </div>
                              </div>
                              {tour.highlights.length > 0 && (
                                <div className="text-sm text-gray-600 line-clamp-2">
                                  <strong>ไฮไลท์:</strong> {tour.highlights.join(', ')}
                                </div>
                              )}
                              {tour.periods && tour.periods.length > 0 && (() => {
                                const sortedPeriods = tour.periods
                                  .sort((a: any, b: any) => {
                                    const dateA = new Date(a.startAt).getTime()
                                    const dateB = new Date(b.startAt).getTime()
                                    return dateA - dateB
                                  })
                                const groupedByDate = sortedPeriods.reduce((groups: any, period: any) => {
                                  const dateKey = `${period.startAt}-${period.endAt}`
                                  if (!groups[dateKey]) {
                                    groups[dateKey] = []
                                  }
                                  groups[dateKey].push(period)
                                  return groups
                                }, {})
                                const finalPeriods = Object.values(groupedByDate).map((periods: any) => {
                                  const validPrices = periods
                                    .map((p: any) => p.price)
                                    .filter((price: any) => price && price > 0 && !isNaN(price))
                                  const lowestPrice = validPrices.length > 0 ? Math.min(...(validPrices as number[])) : periods[0].price
                                  return {
                                    ...periods[0],
                                    price: lowestPrice,
                                    comparePrice: periods[0].comparePrice
                                  }
                                })
                                return (
                                  <div className="mt-3">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 shadow-sm">
                                      <div className="text-xs font-semibold text-blue-800 mb-2 flex items-center">
                                        <Calendar className="w-3 h-3 mr-1 text-blue-600" />
                                        รอบการเดินทาง ({finalPeriods.length} รอบ)
                                      </div>
                                      <div className="max-h-24 overflow-y-auto space-y-1">
                                        {finalPeriods.map((period: any, idx: number) => {
                                          const currentDate = new Date()
                                          currentDate.setHours(0, 0, 0, 0)
                                          const periodStartDate = new Date(period.startAt)
                                          periodStartDate.setHours(0, 0, 0, 0)
                                          const isExpired = periodStartDate < currentDate;
                                          
                                          // Debug log สำหรับ period แรกเท่านั้น
                                          if (idx === 0) {
                                            console.log('Date comparison:', {
                                              currentDate: currentDate.toISOString().split('T')[0],
                                              periodStartDate: periodStartDate.toISOString().split('T')[0],
                                              periodStartRaw: period.startAt,
                                              isExpired: isExpired,
                                              comparison: `${periodStartDate.toISOString().split('T')[0]} < ${currentDate.toISOString().split('T')[0]} = ${isExpired}`
                                            })
                                          }
                                          return (
                                            <div key={idx} className="text-xs">
                                              <div className={`flex justify-between items-start rounded px-2 py-1 border ${isExpired ? 'bg-gray-50 border-gray-200' : 'bg-white/60 border-blue-100'}`}>
                                                <div className="flex-1">
                                                  <div className={`font-medium text-xs ${isExpired ? 'text-gray-600' : 'text-blue-800'}`}>
                                                    {formatDateToThai(period.startAt)} - {formatDateToThai(period.endAt)}
                                                  </div>
                                                  <div className="flex items-center gap-2 mt-0.5">
                                                    {period.comparePrice && period.comparePrice > 0 && (
                                                      <div className={`line-through text-xs font-medium ${isExpired ? 'text-gray-500' : 'text-gray-900'}`}>
                                                        ฿{period.comparePrice.toLocaleString()}
                                                      </div>
                                                    )}
                                                    {period.price && (
                                                      <div className={`font-semibold text-xs ${isExpired ? 'text-gray-600' : (period.comparePrice && period.comparePrice > 0 ? 'text-red-600' : 'text-emerald-600')}`}>
                                                        ฿{period.price.toLocaleString()}
                                                      </div>
                                                    )}
                                                  </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                  {period.available === 0 ? (
                                                    <div className={`text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap font-medium ${isExpired ? 'bg-gray-500 text-white' : 'bg-red-100 text-red-700'}`}>
                                                      เต็ม
                                                    </div>
                                                  ) : period.available > 0 && period.available < 5 ? (
                                                    <div className={`text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap font-medium ${isExpired ? 'bg-gray-300 text-gray-600' : 'bg-orange-100 text-orange-700'}`}>
                                                      เหลือน้อย {period.available}
                                                    </div>
                                                  ) : (
                                                    <div className={`text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap font-medium ${isExpired ? 'bg-gray-300 text-gray-600' : 'bg-emerald-100 text-emerald-700'}`}>
                                                      ว่าง {period.available}
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                )
                              })()}
                            </div>
                            <div className="space-y-3 mt-auto">
                              <div className="flex items-center justify-between">
                                <div>
                                  {tour.hasComparePrice && tour.comparePrice && (
                                    <div className="text-sm text-gray-900 line-through font-medium">
                                      ฿{tour.comparePrice.toLocaleString()}
                                    </div>
                                  )}
                                  <div className={`text-2xl font-bold ${tour.hasComparePrice ? 'text-red-600' : 'text-blue-600'}`}>
                                    ฿{tour.price.toLocaleString()}
                                  </div>
                                  <div className="text-sm text-gray-500">ต่อคน</div>
                                </div>
                                {tour.isRecommended && (
                                  <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
                                    <Award className="w-3 h-3 inline mr-1" />
                                    แนะนำ
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center justify-end">
                                <div className="text-sm text-blue-600">
                                  รหัส: {tour.tourwowCode}
                                </div>
                              </div>
                              <Button variant="outline" size="default" className="w-full opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-300 mt-2" disabled>
                                เต็มแล้ว
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <Link 
                          key={`${tour.id}-${index}`} 
                          href={`/product-pool/${encodeURIComponent(tour.tourwowCode)}`} 
                          className={`bg-white rounded-2xl ${borderClass} shadow-lg overflow-hidden flex flex-col cursor-pointer`}
                          onClick={() => {
                            console.log('Navigating to tour:', tour.tourwowCode)
                            addToRecentlyViewed(tour.id)
                          }}
                        >
                          <div className="relative h-56">
                            <Image
                              src={tour.image || "/plane.svg"}
                              alt={tour.name || "Tour Image"}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover"
                            />
                            {isLowStock && (
                              <div className="absolute top-2 left-2 z-10">
                                <div className="bg-orange-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                                  🔥 เหลือน้อย! จองด่วน
                                </div>
                              </div>
                            )}
                            <div className="absolute top-0 right-0 text-white px-3 py-1.5 rounded-bl-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500">
                              {tour.days} วัน {tour.nights} คืน
                            </div>
                            <div className="absolute top-2 right-2 flex flex-col gap-2">
                              <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  addToWishlist(tour.id)
                                }}
                                className={`p-2 rounded-full shadow-lg ${
                                  wishlist.includes(tour.id)
                                    ? 'bg-red-500 text-white'
                                    : 'bg-white/80 text-gray-600'
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${wishlist.includes(tour.id) ? 'fill-current' : ''}`} />
                              </button>
                            </div>
                          </div>
                          <div className="flex-1 p-6">
                            <div className="mb-3">
                              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                                {tour.name}
                              </h3>
                              <div className="flex items-center text-blue-600 mb-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span className="text-sm">{tour.location}</span>
                              </div>
                            </div>
                            <div className="space-y-3 mb-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  <span className="text-sm">{tour.days} วัน {tour.nights} คืน</span>
                                </div>
                                {tour.hotelStar > 0 && (
                                  <div className="flex items-center">
                                    <Hotel className="w-4 h-4 mr-1 text-orange-500" />
                                    <StarRating rating={tour.hotelStar || 0} />
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-600">
                                  <Plane className="w-4 h-4 mr-2" />
                                  <span className="text-sm">{tour.periods[0].goTransport}</span>
                                </div>
                              </div>
                              {tour.highlights.length > 0 && (
                                <div className="text-sm text-gray-600 line-clamp-2">
                                  <strong>ไฮไลท์:</strong> {tour.highlights.join(', ')}
                                </div>
                              )}
                              {tour.periods && tour.periods.length > 0 && (() => {
                                const sortedPeriods = tour.periods
                                  .sort((a: any, b: any) => {
                                    const dateA = new Date(a.startAt).getTime()
                                    const dateB = new Date(b.startAt).getTime()
                                    return dateA - dateB
                                  })
                                const groupedByDate = sortedPeriods.reduce((groups: any, period: any) => {
                                  const dateKey = `${period.startAt}-${period.endAt}`
                                  if (!groups[dateKey]) {
                                    groups[dateKey] = []
                                  }
                                  groups[dateKey].push(period)
                                  return groups
                                }, {})
                                const finalPeriods = Object.values(groupedByDate).map((periods: any) => {
                                  const validPrices = periods
                                    .map((p: any) => p.price)
                                    .filter((price: any) => price && price > 0 && !isNaN(price))
                                  const lowestPrice = validPrices.length > 0 ? Math.min(...(validPrices as number[])) : periods[0].price
                                  return {
                                    ...periods[0],
                                    price: lowestPrice,
                                    comparePrice: periods[0].comparePrice
                                  }
                                })
                                return (
                                  <div className="mt-3">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 shadow-sm">
                                      <div className="text-xs font-semibold text-blue-800 mb-2 flex items-center">
                                        <Calendar className="w-3 h-3 mr-1 text-blue-600" />
                                        รอบการเดินทาง ({finalPeriods.length} รอบ)
                                      </div>
                                      <div className="max-h-24 overflow-y-auto space-y-1">
                                        {finalPeriods.map((period: any, idx: number) => {
                                          const currentDate = new Date()
                                          currentDate.setHours(0, 0, 0, 0)
                                          const periodStartDate = new Date(period.startAt)
                                          periodStartDate.setHours(0, 0, 0, 0)
                                          const isExpired = periodStartDate < currentDate;
                                          
                                          // Debug log สำหรับ period แรกเท่านั้น
                                          if (idx === 0) {
                                            console.log('Date comparison:', {
                                              currentDate: currentDate.toISOString().split('T')[0],
                                              periodStartDate: periodStartDate.toISOString().split('T')[0],
                                              periodStartRaw: period.startAt,
                                              isExpired: isExpired,
                                              comparison: `${periodStartDate.toISOString().split('T')[0]} < ${currentDate.toISOString().split('T')[0]} = ${isExpired}`
                                            })
                                          }
                                          return (
                                            <div key={idx} className="text-xs">
                                              <div className={`flex justify-between items-start rounded px-2 py-1 border ${isExpired ? 'bg-gray-50 border-gray-200' : 'bg-white/60 border-blue-100'}`}>
                                                <div className="flex-1">
                                                  <div className={`font-medium text-xs ${isExpired ? 'text-gray-600' : 'text-blue-800'}`}>
                                                    {formatDateToThai(period.startAt)} - {formatDateToThai(period.endAt)}
                                                  </div>
                                                  <div className="flex items-center gap-2 mt-0.5">
                                                    {period.comparePrice && period.comparePrice > 0 && (
                                                      <div className={`line-through text-xs font-medium ${isExpired ? 'text-gray-500' : 'text-gray-900'}`}>
                                                        ฿{period.comparePrice.toLocaleString()}
                                                      </div>
                                                    )}
                                                    {period.price && (
                                                      <div className={`font-semibold text-xs ${isExpired ? 'text-gray-600' : (period.comparePrice && period.comparePrice > 0 ? 'text-red-600' : 'text-emerald-600')}`}>
                                                        ฿{period.price.toLocaleString()}
                                                      </div>
                                                    )}
                                                  </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                  {period.available === 0 ? (
                                                    <div className={`text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap font-medium ${isExpired ? 'bg-gray-500 text-white' : 'bg-red-100 text-red-700'}`}>
                                                      เต็ม
                                                    </div>
                                                  ) : period.available > 0 && period.available < 5 ? (
                                                    <div className={`text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap font-medium ${isExpired ? 'bg-gray-300 text-gray-600' : 'bg-orange-100 text-orange-700'}`}>
                                                      เหลือน้อย {period.available}
                                                    </div>
                                                  ) : (
                                                    <div className={`text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap font-medium ${isExpired ? 'bg-gray-300 text-gray-600' : 'bg-emerald-100 text-emerald-700'}`}>
                                                      ว่าง {period.available}
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                )
                              })()}
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  {tour.hasComparePrice && tour.comparePrice && (
                                    <div className="text-sm text-gray-900 line-through font-medium">
                                      ฿{tour.comparePrice.toLocaleString()}
                                    </div>
                                  )}
                                  <div className={`text-2xl font-bold ${tour.hasComparePrice ? 'text-red-600' : 'text-blue-600'}`}>
                                    ฿{tour.price.toLocaleString()}
                                  </div>
                                  <div className="text-sm text-gray-500">ต่อคน</div>
                                </div>
                                {tour.isRecommended && (
                                  <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
                                    <Award className="w-3 h-3 inline mr-1" />
                                    แนะนำ
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center justify-end">
                                <div className="text-sm text-blue-600">
                                  รหัส: {tour.tourwowCode}
                                </div>
                              </div>
                              <Button 
                                variant="primary" 
                                size="default" 
                                className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                ดูรายละเอียด
                              </Button>
                            </div>
                          </div>
                        </Link>
                      )
                    }
                  })}
                </div>
                {hasMoreTours && (
                  <div className="text-center mt-12 flex flex-col items-center gap-2">
                    <div className="text-sm text-gray-500 mb-2">
                      แสดง {displayedToursData.length} จาก {filteredAndSortedTours.length} โปรแกรม
                    </div>
                    <Button 
                      onClick={loadMoreTours}
                      disabled={isLoading}
                      variant="primary"
                      size="lg"
                      className="flex items-center gap-2 px-8 py-3 text-lg font-semibold rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                          </svg>
                          กำลังโหลด...
                        </>
                      ) : (
                        <>
                          <svg className="h-6 w-6 mr-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                          โหลดเพิ่มเติม 200 โปรแกรม
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  {priceRange && priceRange !== 'ทั้งหมด' ? (
                    <>
                      <h3 className="text-xl font-semibold mb-2">ไม่พบทัวร์ในช่วงราคา "{priceRange}"</h3>
                      <p>ลองเลือกช่วงราคาอื่นหรือปรับเปลี่ยนตัวกรองอื่นๆ</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold mb-2">ไม่พบทัวร์ที่ตรงกับเงื่อนไขการค้นหา</h3>
                      <p>ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองอื่นๆ</p>
                    </>
                  )}
                </div>
                <Button onClick={handleClearFilters} variant="outline">
                  ล้างตัวกรองทั้งหมด
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default function ProductPoolPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">กำลังโหลดข้อมูล Product Pool...</div>}>
      <ProductPoolPageContent />
    </Suspense>
  )
}