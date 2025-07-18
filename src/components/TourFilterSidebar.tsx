import { Filter, X, Globe, Briefcase, BadgeCheck, Calendar, Hotel, Plane, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState, useMemo } from 'react';

interface Wholesaler {
  id: string;
  name: string;
  color: string;
}

interface TourFilterSidebarProps {
  categories?: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  priceRanges: Array<{ name: string; count: number }>;
  selectedPriceRange: string;
  onPriceChange: (range: string) => void;
  countries: Array<{ name: string; count: number }>;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  onClearFilters: () => void;
  // Wholesale props
  wholesalers?: Wholesaler[];
  selectedWholesalers?: string[];
  onWholesalerToggle?: (wholesalerId: string) => void;
  getTotalCountForWholesaler?: (id: string) => number;
  getTotalSelectedCount?: () => number;
  // New filter props
  days?: Array<{ name: string; count: number }>;
  selectedDays?: string;
  onDaysChange?: (days: string) => void;
  nights?: Array<{ name: string; count: number }>;
  selectedNights?: string;
  onNightsChange?: (nights: string) => void;
  hotelStars?: Array<{ name: string; count: number }>;
  selectedHotelStar?: string;
  onHotelStarChange?: (star: string) => void;
  airlines?: Array<{ name: string; count: number }>;
  selectedAirline?: string;
  onAirlineChange?: (airline: string) => void;
}

const TourFilterSidebar = ({
  categories = [],
  selectedCategory = '',
  onCategoryChange = () => {},
  priceRanges,
  selectedPriceRange,
  onPriceChange,
  countries,
  selectedCountry,
  onCountryChange,
  onClearFilters,
  // Wholesale props
  wholesalers,
  selectedWholesalers,
  onWholesalerToggle,
  getTotalCountForWholesaler,
  getTotalSelectedCount,
  // New filter props
  days,
  selectedDays,
  onDaysChange,
  nights,
  selectedNights,
  onNightsChange,
  hotelStars,
  selectedHotelStar,
  onHotelStarChange,
  airlines,
  selectedAirline,
  onAirlineChange,
}: TourFilterSidebarProps) => {
  const [countrySearch, setCountrySearch] = useState('')
  const [airlineSearch, setAirlineSearch] = useState('')
  const [priceSearch, setPriceSearch] = useState('')

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 h-fit sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h3 className="text-xl font-semibold text-blue-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          ตัวกรอง
        </h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-sm text-blue-600 hover:text-blue-800">
          ล้างทั้งหมด
        </Button>
      </div>

      {/* Wholesale APIs Filter */}
      {wholesalers && selectedWholesalers && onWholesalerToggle && getTotalCountForWholesaler && getTotalSelectedCount && (
        <div>
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            Wholesale APIs
            <span className="ml-2 text-xs text-gray-500 font-normal">(เลือกได้หลายค่า)</span>
          </h4>
          <div className="space-y-2">
            {wholesalers.map((wholesaler) => {
              const isSelected = selectedWholesalers.includes(wholesaler.id)
              const isAll = wholesaler.id === 'all'
              const count = getTotalCountForWholesaler(wholesaler.id)
              
              return (
                <div
                  key={wholesaler.id}
                  onClick={() => onWholesalerToggle(wholesaler.id)}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-100 text-blue-800 font-semibold'
                      : 'text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center ${
                        isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span>{wholesaler.name}</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {count.toLocaleString()}
                  </span>
                </div>
              )
            })}
          </div>
          
          {/* Selected Summary */}
          {!selectedWholesalers.includes('all') && selectedWholesalers.length > 1 && (
            <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-700 font-medium">
                  แสดงจาก {selectedWholesalers.length} APIs รวม {getTotalSelectedCount()} โปรแกรม
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Country Filter */}
      <div>
        <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
          <Globe className="w-4 h-4 mr-2" />
          ประเทศ
        </h4>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="ค้นหาประเทศ..."
            value={countrySearch}
            onChange={(e) => setCountrySearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
          />
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {useMemo(() => {
            const filteredCountries = countries.filter(country => 
              countrySearch.length === 0 || 
              country.name.toLowerCase().includes(countrySearch.toLowerCase())
            )
            return filteredCountries
              .sort((a, b) => {
                if (a.name === 'ทั้งหมด') return -1
                if (b.name === 'ทั้งหมด') return 1
                return a.name.localeCompare(b.name, 'th')
              })
              .map((country) => (
                <div
                  key={country.name}
                  onClick={() => onCountryChange(country.name)}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedCountry === country.name
                      ? 'bg-blue-100 text-blue-800 font-semibold'
                      : 'text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                        selectedCountry === country.name ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                      }`}
                    ></div>
                    <span>{country.name}</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {country.count}
                  </span>
                </div>
              ))
          }, [countries, countrySearch, selectedCountry, onCountryChange])}
        </div>
      </div>

      {/* Days Filter */}
      {days && onDaysChange && (
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            จำนวนวัน
          </h4>
          <div className="space-y-2">
            {days.map((day) => (
              <div
                key={day.name}
                onClick={() => onDaysChange(day.name)}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  selectedDays === day.name
                    ? 'bg-blue-100 text-blue-800 font-semibold'
                    : 'text-gray-600 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                      selectedDays === day.name ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                    }`}
                  ></div>
                  <span>{day.name === 'ทั้งหมด' ? day.name : `${day.name} วัน`}</span>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {day.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nights Filter - แสดงเฉพาะเมื่อเลือกวันแล้ว */}
      {nights && onNightsChange && selectedDays && selectedDays !== 'ทั้งหมด' && (
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            จำนวนคืน (สำหรับ {selectedDays} วัน)
          </h4>
          <div className="space-y-2">
            {nights.map((night) => (
              <div
                key={night.name}
                onClick={() => onNightsChange(night.name)}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  selectedNights === night.name
                    ? 'bg-blue-100 text-blue-800 font-semibold'
                    : 'text-gray-600 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                      selectedNights === night.name ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                    }`}
                  ></div>
                  <span>{night.name === 'ทั้งหมด' ? night.name : `${night.name} คืน`}</span>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {night.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hotel Star Filter */}
      {hotelStars && onHotelStarChange && (
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
            <Hotel className="w-4 h-4 mr-2" />
            ระดับโรงแรม
          </h4>
          <div className="space-y-2">
            {hotelStars.map((star) => (
              <div
                key={star.name}
                onClick={() => onHotelStarChange(star.name)}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  selectedHotelStar === star.name
                    ? 'bg-blue-100 text-blue-800 font-semibold'
                    : 'text-gray-600 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                      selectedHotelStar === star.name ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                    }`}
                  ></div>
                  <span>{star.name}</span>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {star.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Airline Filter */}
      {airlines && onAirlineChange && (
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
            <Plane className="w-4 h-4 mr-2" />
            สายการบิน
          </h4>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="ค้นหาสายการบิน..."
              value={airlineSearch}
              onChange={(e) => setAirlineSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
            />
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {useMemo(() => {
              const filteredAirlines = airlines.filter(airline => 
                airlineSearch.length === 0 || 
                airline.name.toLowerCase().includes(airlineSearch.toLowerCase())
              )
              return filteredAirlines.map((airline) => (
                <div
                  key={airline.name}
                  onClick={() => onAirlineChange(airline.name)}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedAirline === airline.name
                      ? 'bg-blue-100 text-blue-800 font-semibold'
                      : 'text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                        selectedAirline === airline.name ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                      }`}
                    ></div>
                    <span>{airline.name}</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {airline.count}
                  </span>
                </div>
              ))
            }, [airlines, airlineSearch, selectedAirline, onAirlineChange])}
          </div>
        </div>
      )}

      {/* Price Range Filter */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-semibold text-blue-800 mb-3">ช่วงราคา (บาท)</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {priceRanges.map((range) => (
             <div
             key={range.name}
             onClick={() => onPriceChange(range.name)}
             className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
               selectedPriceRange === range.name
                 ? 'bg-blue-100 text-blue-800 font-semibold'
                 : 'text-gray-600 hover:bg-blue-50'
             }`}
           >
             <div className="flex items-center space-x-2">
               <div
                 className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                   selectedPriceRange === range.name ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                 }`}
               ></div>
               <span>{range.name}</span>
             </div>
             <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
               {range.count}
             </span>
           </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TourFilterSidebar; 