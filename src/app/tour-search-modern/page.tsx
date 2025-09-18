'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, MapPin, Calendar, Star, Heart, Users, Clock, TrendingUp, Sparkles, Award, Shield, ChevronRight, Zap, Globe, Camera, Plane } from 'lucide-react';

interface Tour {
  id: string;
  title: string;
  destination: string;
  location: string;
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  highlights: string[];
  available: boolean;
  availableSeats: number;
  category: string;
  isHot?: boolean;
  badge?: string;
  discount?: number;
}

const modernTours: Tour[] = [
  {
    id: 'modern-001',
    title: 'Maldives Luxury Escape',
    destination: 'มัลดีฟส์',
    location: 'Overwater Villa Resort',
    duration: '5 วัน 4 คืน',
    price: 189000,
    originalPrice: 259000,
    rating: 4.9,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop',
    highlights: ['Private Villa', 'All Inclusive', 'Spa Credit', 'Sunset Cruise'],
    available: true,
    availableSeats: 3,
    category: 'luxury',
    isHot: true,
    badge: 'BEST SELLER',
    discount: 27
  },
  {
    id: 'modern-002',
    title: 'Japan Cherry Blossom',
    destination: 'ญี่ปุ่น',
    location: 'Tokyo • Kyoto • Osaka',
    duration: '7 วัน 6 คืน',
    price: 89900,
    originalPrice: 119000,
    rating: 4.8,
    reviewCount: 567,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
    highlights: ['Sakura Season', 'Mt. Fuji', 'Onsen Experience', 'Bullet Train'],
    available: true,
    availableSeats: 12,
    category: 'cultural',
    badge: 'LIMITED TIME',
    discount: 25
  },
  {
    id: 'modern-003',
    title: 'Swiss Alps Adventure',
    destination: 'สวิตเซอร์แลนด์',
    location: 'Interlaken • Jungfrau',
    duration: '6 วัน 5 คืน',
    price: 145000,
    originalPrice: 175000,
    rating: 4.7,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    highlights: ['Glacier Express', 'Alpine Villages', 'Cable Car', 'Swiss Chocolate'],
    available: true,
    availableSeats: 8,
    category: 'adventure',
    isHot: true,
    badge: 'TRENDING',
    discount: 17
  }
];

export default function ModernTourSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories = [
    { id: 'all', name: 'ทั้งหมด', icon: Globe, color: 'from-purple-500 to-pink-500' },
    { id: 'luxury', name: 'Luxury', icon: Sparkles, color: 'from-amber-500 to-orange-500' },
    { id: 'cultural', name: 'วัฒนธรรม', icon: Camera, color: 'from-blue-500 to-cyan-500' },
    { id: 'adventure', name: 'ผจญภัย', icon: Plane, color: 'from-green-500 to-teal-500' }
  ];

  const filteredTours = modernTours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tour.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Hero Section with Glassmorphism */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-90" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
        
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000" />
        
        <div className="relative z-10 px-6 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              <span className="inline-block hover:scale-105 transition-transform">Discover</span>{' '}
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                Amazing
              </span>{' '}
              <span className="inline-block hover:scale-105 transition-transform">Tours</span>
            </h1>
            <p className="text-xl text-white/90 mb-12 font-light">
              เที่ยวทั่วโลกในสไตล์ที่เป็นคุณ
            </p>

            {/* Modern Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className={`relative group transition-all duration-500 ${isSearchFocused ? 'scale-105' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-white/20">
                  <div className="flex items-center gap-4 px-4">
                    <Search className="w-6 h-6 text-purple-500" />
                    <input
                      type="text"
                      placeholder="ค้นหาจุดหมายในฝัน..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      className="flex-1 py-4 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-lg"
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all">
                      ค้นหา
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-full font-medium whitespace-nowrap
                    transition-all duration-300 hover:scale-105
                    ${selectedCategory === cat.id 
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-lg` 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tour Cards Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              onMouseEnter={() => setHoveredCard(tour.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
            >
              {/* Card Container with Glass Effect */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                      hoveredCard === tour.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {tour.badge && (
                      <span className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                        {tour.badge}
                      </span>
                    )}
                    {tour.discount && (
                      <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                        -{tour.discount}%
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all hover:scale-110">
                    <Heart className="w-5 h-5 text-white" />
                  </button>

                  {/* Location Tag */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{tour.destination}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                    {tour.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {tour.availableSeats} ที่ว่าง
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-gray-800">{tour.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({tour.reviewCount} รีวิว)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      {tour.originalPrice && (
                        <p className="text-sm text-gray-400 line-through">฿{tour.originalPrice.toLocaleString()}</p>
                      )}
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ฿{tour.price.toLocaleString()}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">ต่อคน</span>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 group">
                    <span>ดูรายละเอียด</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-purple-500/25">
        <TrendingUp className="w-6 h-6" />
      </button>
    </div>
  );
}