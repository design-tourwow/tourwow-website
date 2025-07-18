"use client";

import { tours } from '@/lib/tour-data';
import countryList from '@/lib/country-list-th.json';
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { Search, Star, MapPin, Clock, Users, Filter, X, Grid, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import TourFilterSidebar from '@/components/TourFilterSidebar';
import { Button } from '@/components/ui/Button';
import StarRating from '@/components/StarRating';
import LoadingScreen from '@/components/LoadingScreen';
import InlineLoadingSpinner from '@/components/InlineLoadingSpinner';

export default function CountryTourPage({ params }: { params: Promise<{ country: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ country: string } | null>(null);
  
  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (!resolvedParams) {
    return (
      <LoadingScreen 
        title="กำลังโหลดข้อมูลประเทศ" 
        subtitle="โปรดรอสักครู่... กำลังค้นหาทัวร์ในประเทศที่เลือก" 
      />
    );
  }

  // Convert dash-case to normal case for matching
  const countryParam = resolvedParams.country.replace(/-tour$/, '').replace(/-/g, ' ');
  // Find the country English name (case-insensitive)
  const countryObj = countryList.find(c => c.enName.toLowerCase().replace(/\s+/g, '-') === countryParam);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [priceRange, setPriceRange] = useState('ทั้งหมด');
  const [selectedCountry, setSelectedCountry] = useState('ทั้งหมด');
  const [sortBy, setSortBy] = useState('ยอดนิยม');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [displayedTours, setDisplayedTours] = useState(20);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const toursPerLoad = 20;

  const categories = useMemo(() => ['ทั้งหมด', ...Array.from(new Set(tours.map(t => t.category)))], []);
  const priceRanges = ['ทั้งหมด', 'ต่ำกว่า 15,000', '15,000 - 25,000', '25,000 - 35,000', '35,000 - 50,000', '50,000+'];
  const countries = useMemo(() => {
    const countryCount = tours.reduce((acc, tour) => {
      acc[tour.country] = (acc[tour.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return [{ name: 'ทั้งหมด', count: tours.length }, ...Object.entries(countryCount)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, count]) => ({ name, count }))]
      .filter(country => country.name !== 'ทั้งหมด' || country.count > 0);
  }, []);
  const sortOptions = ['ยอดนิยม', 'ราคาต่ำ-สูง', 'ราคาสูง-ต่ำ', 'คะแนนรีวิว'];

  const filteredAndSortedTours = useMemo(() => {
    let filtered = Array.isArray(tours) ? tours.filter(tour => {
      const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'ทั้งหมด' || tour.category === selectedCategory;
      const matchesCountry = selectedCountry === 'ทั้งหมด' || tour.country === selectedCountry;
      const matchesPrice = priceRange === 'ทั้งหมด' ||
        (priceRange === 'ต่ำกว่า 15,000' && tour.price < 15000) ||
        (priceRange === '15,000 - 25,000' && tour.price >= 15000 && tour.price <= 25000) ||
        (priceRange === '25,000 - 35,000' && tour.price >= 25000 && tour.price <= 35000) ||
        (priceRange === '35,000 - 50,000' && tour.price >= 35000 && tour.price <= 50000) ||
        (priceRange === '50,000+' && tour.price >= 50000);
      return matchesSearch && matchesCategory && matchesCountry && matchesPrice;
    }) : [];
    const sorted = [...filtered];
    switch (sortBy) {
      case 'ราคาต่ำ-สูง':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'ราคาสูง-ต่ำ':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'คะแนนรีวิว':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }
    return sorted;
  }, [searchTerm, selectedCategory, selectedCountry, priceRange, sortBy]);

  const displayedToursData = useMemo(() => {
    return filteredAndSortedTours.slice(0, displayedTours);
  }, [filteredAndSortedTours, displayedTours]);

  const hasMoreTours = displayedTours < filteredAndSortedTours.length;

  const loadMoreTours = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedTours(prev => prev + toursPerLoad);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setDisplayedTours(toursPerLoad);
  }, [searchTerm, selectedCategory, selectedCountry, priceRange, sortBy, toursPerLoad]);

  if (!countryObj) {
    return (
      <main className="bg-blue-50/30 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-900 mt-6 mb-2">ไม่พบโปรแกรมทัวร์สำหรับประเทศนี้</h3>
            <p className="text-blue-700 mb-6">ขออภัย ยังไม่มีทัวร์สำหรับประเทศนี้</p>
            <Link href="/tours" className="inline-block bg-blue-100 text-blue-700 px-6 py-2 rounded-lg hover:bg-blue-200 transition">ดูทัวร์ทั้งหมด</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-blue-50/30">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">แพ็คเกจทัวร์ {countryObj.name}</h1>
          <p className="text-lg text-blue-700">{countryObj.enName} ({countryObj.name})</p>
        </div>
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar */}
          <aside className={`lg:col-span-1 lg:block ${isSidebarOpen ? 'block' : 'hidden'} mb-8 lg:mb-0`}>
            <TourFilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRanges={priceRanges}
              selectedPriceRange={priceRange}
              onPriceChange={setPriceRange}
              countries={countries}
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
              sortOptions={sortOptions}
              selectedSortBy={sortBy}
              onSortByChange={setSortBy}
              onClearFilters={() => {
                setSearchTerm('');
                setSelectedCategory('ทั้งหมด');
                setPriceRange('ทั้งหมด');
                setSelectedCountry('ทั้งหมด');
                setSortBy('ยอดนิยม');
              }}
            />
          </aside>
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Mobile Filter Toggle */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ค้นหาทัวร์ตามชื่อหรือสถานที่..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-blue-900"
                />
              </div>
              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="secondary"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden w-full sm:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                {isSidebarOpen ? 'ซ่อนตัวกรอง' : 'แสดงตัวกรอง'}
              </Button>
              <div className="hidden sm:block text-sm text-blue-700 whitespace-nowrap">
                พบ {filteredAndSortedTours.length} โปรแกรม
              </div>
            </div>
            {/* Tours Grid */}
            {filteredAndSortedTours.length > 0 ? (
              <>
                <div className={`grid gap-8 ${
                  viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :
                  viewMode === 'list' ? 'grid-cols-1 md:grid-cols-2' :
                  'grid-cols-1'
                }`}>
                  {displayedToursData.map(tour => (
                    <div key={tour.id} className={`bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden flex flex-col group ${
                      tour.availability === 'เต็ม'
                        ? 'opacity-50 cursor-not-allowed'
                        : tour.availability === 'เหลือน้อย'
                        ? 'cursor-pointer hover:shadow-2xl ring-2 ring-red-200 hover:ring-red-300 hover:scale-[1.02] transform'
                        : 'cursor-pointer hover:shadow-2xl hover:scale-[1.01] transform'
                    }`}>
                      <div className="relative h-56">
                        <Image
                          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                          alt={tour.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {tour.availability === 'เต็ม' && (
                          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                            <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg">
                              เต็มแล้ว
                            </div>
                          </div>
                        )}
                        {tour.availability === 'เหลือน้อย' && (
                          <div className="absolute top-2 left-2 z-10">
                            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-sm font-bold animate-pulse shadow-lg">
                              🔥 เหลือน้อย! จองด่วน
                            </div>
                            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-30"></div>
                          </div>
                        )}
                        <div className={`absolute top-0 right-0 text-white px-3 py-1.5 rounded-bl-lg text-sm font-semibold ${
                          tour.availability === 'เต็ม'
                            ? 'bg-gray-400'
                            : 'bg-gradient-to-r from-blue-600 to-cyan-500'
                        }`}>
                          {tour.category}
                        </div>
                        {tour.originalPrice && tour.availability !== 'เต็ม' && (
                          <div className={`absolute bottom-2 right-2 text-white px-2 py-1 rounded-md text-sm font-semibold shadow-md ${
                            tour.availability === 'เหลือน้อย'
                              ? 'bg-gradient-to-r from-green-500 to-green-600 animate-pulse'
                              : 'bg-green-500'
                          }`}>
                            ประหยัด ฿{(tour.originalPrice - tour.price).toLocaleString()}
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h2 className="text-xl font-bold text-blue-900 mb-2 line-clamp-2">{tour.title}</h2>
                        {tour.availability === 'เหลือน้อย' && (
                          <div className="mb-2 text-xs text-red-600 font-semibold bg-red-50 px-2 py-1 rounded-full inline-block animate-pulse">
                            เหลือที่นั่งเพียง {tour.availableSlots} ที่! รีบจองก่อนหมด
                          </div>
                        )}
                        {tour.availability === 'ว่าง' && tour.originalPrice && (
                          <div className="mb-2 text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full inline-block">
                            โปรโมชั่นพิเศษ! ประหยัดสูงสุด {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
                          </div>
                        )}
                        <div className="flex items-center text-gray-500 mb-3 text-sm">
                          <MapPin className="w-4 h-4 mr-1.5 text-blue-500 flex-shrink-0" />
                          <span>{tour.location}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4 border-t border-b border-gray-100 py-3">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1.5 text-blue-500" />
                            <span>{tour.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1.5 text-blue-500" />
                            <span>
                              {tour.availability === 'เต็ม' ? 'เต็มแล้ว' :
                                tour.availableSlots ? `ว่าง ${tour.availableSlots} ที่นั่ง` : tour.groupSize}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center mb-4">
                          <StarRating rating={tour.rating} size="md" />
                          <span className="text-sm text-blue-800 ml-2 font-semibold">{tour.rating.toFixed(1)} ({tour.reviews} รีวิว)</span>
                        </div>
                        <div className="mt-auto">
                          <div className="text-right mb-4">
                            {tour.originalPrice && tour.availability !== 'เต็ม' && (
                              <div className="mb-1">
                                <span className="text-gray-400 line-through text-sm mr-2">฿{tour.originalPrice.toLocaleString()}</span>
                                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-semibold">
                                  ลด {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
                                </span>
                              </div>
                            )}
                            <div className={`text-2xl font-bold ${
                              tour.availability === 'เต็ม'
                                ? 'text-gray-400'
                                : tour.availability === 'เหลือน้อย'
                                ? 'text-red-600'
                                : 'text-blue-800'
                            }`}>
                              ฿{tour.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ต่อท่าน</span>
                            </div>
                            {tour.originalPrice && tour.availability !== 'เต็ม' && (
                              <div className="mt-1 text-xs text-green-600 font-semibold">
                                ประหยัด ฿{(tour.originalPrice - tour.price).toLocaleString()}
                              </div>
                            )}
                          </div>
                          {tour.availability === 'เต็ม' ? (
                            <Button variant="outline" size="default" className="w-full opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-300" disabled>
                              เต็มแล้ว
                            </Button>
                          ) : tour.availability === 'เหลือน้อย' ? (
                            <Link href={`/tours/${tour.id}`}>
                              <Button size="default" className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold animate-pulse shadow-lg">
                                🔥 จองด่วน! เหลือน้อย
                              </Button>
                            </Link>
                          ) : (
                            <Link href={`/tours/${tour.id}`}>
                              <Button variant="primary" size="default" className="w-full">
                                ดูรายละเอียด
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Infinite Scroll Loading Indicator */}
                {isLoading && (
                  <InlineLoadingSpinner message="กำลังโหลดทัวร์เพิ่มเติม..." color="blue" />
                )}
                {/* Load More Button (Backup) */}
                {hasMoreTours && !isLoading && (
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="outline"
                      onClick={loadMoreTours}
                      size="lg"
                      className="px-8 py-3 text-blue-600 hover:bg-blue-50"
                    >
                      โหลดเพิ่มเติม (คลิกหากไม่โหลดอัตโนมัติ)
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <div className="mx-auto bg-blue-100 rounded-full h-20 w-20 flex items-center justify-center">
                  <Search className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-2xl font-semibold text-blue-900 mt-6 mb-2">ไม่พบโปรแกรมทัวร์</h3>
                <p className="text-blue-700 mb-6">ขออภัย เราไม่พบทัวร์ที่ตรงกับเงื่อนไขของคุณ</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('ทั้งหมด');
                    setPriceRange('ทั้งหมด');
                    setSortBy('ยอดนิยม');
                  }}
                >
                  ล้างตัวกรองทั้งหมด
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 