'use client'

import Image from "next/image";
import Link from "next/link";
import { Search, Star, MapPin, Clock, Users, ArrowRight, Plane, Calendar, Shield, Award, Globe, Heart, CheckCircle, TrendingUp, Zap, MessageSquare, BadgePercent } from "lucide-react";
import { tours } from "@/lib/tour-data";
import { blogPosts } from "@/lib/blog-data";
import { LoadingProvider } from '@/components/LoadingProvider';
import { Button } from "@/components/ui/Button";
import StarRating from '@/components/StarRating';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function HomeContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{type: 'tour' | 'country', title: string, country?: string, id?: string}>>([]);
  const router = useRouter();
  const featuredTours = Array.isArray(tours) ? tours.filter(tour => tour.featured && tour.availability !== 'เต็ม') : [];
  const latestBlogPosts = Array.isArray(blogPosts) ? blogPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 3) : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tours?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/tours');
    }
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length >= 3) {
      // Filter tours and countries
      const tourSuggestions = tours.filter(tour => 
        tour.title.toLowerCase().includes(query.toLowerCase()) ||
        tour.location.toLowerCase().includes(query.toLowerCase()) ||
        tour.country.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5).map(tour => ({
        type: 'tour' as const,
        title: tour.title,
        country: tour.country,
        id: tour.id
      }));

      const countries = Array.from(new Set(tours.map(tour => tour.country)))
        .filter(country => country.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3)
        .map(country => ({
          type: 'country' as const,
          title: country,
        }));

      setSuggestions([...tourSuggestions, ...countries]);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: typeof suggestions[0]) => {
    if (suggestion.type === 'tour') {
      // Find the tour to get its code
      const tour = tours.find(t => t.id === suggestion.id);
      const tourCode = suggestion.id;
      router.push(`/tours-detail-2/${tourCode}`);
    } else {
      router.push(`/tours?search=${encodeURIComponent(suggestion.title)}`);
    }
    setShowSuggestions(false);
    setSearchQuery('');
  };

  return (
    <main className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] bg-gradient-to-t from-black/50 to-transparent text-white">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="จุดหมายปลายทางสวยงาม"
              fill
              className="object-cover"
              priority
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-2xl animate-fade-in-down">
              เปิดโลกกว้าง สร้างเส้นทางของคุณ
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mb-8 drop-shadow-xl animate-fade-in-up">
              TourWow เปลี่ยนความฝันในการเดินทางให้เป็นจริง ด้วยโปรแกรมทัวร์คุณภาพทั่วโลก ที่คัดสรรมาเพื่อประสบการณ์สุดพิเศษของคุณ
            </p>
            <div className="animate-fade-in-up animation-delay-300">
              <Link href="/tours" passHref>
                <Button size="lg" className="text-lg">
                  <Globe className="w-6 h-6 mr-2" />
                  <span>ค้นหาโปรแกรมทัวร์ทั้งหมด</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Search Bar Section */}
        <section className="sticky top-[72px] z-30 py-4 bg-white/80 backdrop-blur-lg shadow-md">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-2 items-center p-2 bg-white rounded-full shadow-lg border border-gray-200">
              <div className="relative w-full">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => searchQuery.length >= 3 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="คุณอยากไปเที่ยวที่ไหน? (เช่น ญี่ปุ่น, ยุโรป, อเมริกา)"
                  className="w-full pl-12 pr-4 py-3 rounded-full border-none focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 bg-transparent"
                />
                
                {/* Search Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        {suggestion.type === 'tour' ? (
                          <>
                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                              <Globe className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{suggestion.title}</div>
                              <div className="text-sm text-gray-500">{suggestion.country}</div>
                            </div>
                            <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">ทัวร์</div>
                          </>
                        ) : (
                          <>
                            <div className="bg-green-100 p-2 rounded-full mr-3">
                              <MapPin className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{suggestion.title}</div>
                              <div className="text-sm text-gray-500">ดูทัวร์ทั้งหมดใน{suggestion.title}</div>
                            </div>
                            <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">ประเทศ</div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
               <Button type="submit" size="default" className="w-full sm:w-auto flex-shrink-0">
                  <Search className="w-5 h-5 mr-2" />
                  <span>ค้นหา</span>
              </Button>
            </form>
          </div>
        </section>


        {/* Featured Tours Section */}
        <section className="py-20 bg-blue-50/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
                <span className="text-blue-600">ทัวร์เด็ด</span> ที่ไม่ควรพลาด
              </h2>
              <p className="text-lg text-gray-600 mt-2">โปรแกรมทัวร์ยอดนิยมที่เราคัดสรรมาเพื่อสร้างความทรงจำที่ดีที่สุดให้คุณ</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              {featuredTours.length > 0 ? featuredTours.slice(0, 3).map(tour => (
                 <Link href={`/tours-detail-2/${tour.id}`} key={tour.id} className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100 transform hover:-translate-y-2">
                  <div className="relative h-64">
                    <Image src={tour.image} alt={tour.title} fill className="object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    {tour.originalPrice && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md animate-pulse">
                        <BadgePercent className="inline-block w-4 h-4 mr-1"/>
                        ลดราคาพิเศษ
                      </div>
                    )}
                     <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-2xl font-bold drop-shadow-lg">{tour.title}</h3>
                      <div className="flex items-center text-sm mt-1">
                        <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                        <span>{tour.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500"/>
                          <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500"/>
                          <span>
                            {tour.availability === 'เต็ม' ? 'เต็มแล้ว' : 
                             tour.availableSlots ? `ว่าง ${tour.availableSlots} ที่นั่ง` : tour.groupSize}
                          </span>
                        </div>
                    </div>

                    <div className="flex items-baseline justify-between mt-auto pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-gray-500 text-sm">เริ่มต้น</span>
                        <div className="flex items-center gap-2">
                          <p className="text-3xl font-bold text-green-600 drop-shadow-md">฿{tour.price.toLocaleString()}</p>
                          {tour.originalPrice && (
                             <span className="text-gray-400 line-through text-lg">฿{tour.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                        {tour.originalPrice && (
                          <div className="text-red-600 font-bold text-sm animate-pulse">
                            ประหยัด ฿{(tour.originalPrice - tour.price).toLocaleString()}!
                          </div>
                        )}
                      </div>
                      <div className="bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm">
                        <span>ดูรายละเอียด</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              )) : (
                <div className="col-span-full text-center text-gray-500 py-12">ขออภัย ขณะนี้ยังไม่มีโปรแกรมทัวร์แนะนำ</div>
              )}
            </div>
            {featuredTours.length > 0 && (
              <div className="text-center mt-16">
                 <Link href="/tours" passHref>
                    <Button variant="outline" size="lg">
                      ชมโปรแกรมทัวร์ทั้งหมด
                    </Button>
                 </Link>
              </div>
            )}
          </div>
        </section>

        {/* Why Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900">ทำไมต้องเลือกเดินทางกับ <span className="text-blue-600">TourWow?</span></h2>
              <p className="text-lg text-gray-600 mt-2">เรามอบประสบการณ์ที่มากกว่าการเดินทาง แต่คือความทรงจำที่จะอยู่กับคุณตลอดไป</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-blue-50 p-6 rounded-xl text-center transition-transform transform hover:scale-105 hover:shadow-lg">
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">ทัวร์คุณภาพพรีเมียม</h3>
                <p className="text-gray-600 text-sm">คัดสรรทุกเส้นทาง ที่พัก และกิจกรรมเพื่อความสมบูรณ์แบบ</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl text-center transition-transform transform hover:scale-105 hover:shadow-lg">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">ปลอดภัยทุกย่างก้าว</h3>
                <p className="text-gray-600 text-sm">มั่นใจด้วยประกันการเดินทางและทีมงานที่พร้อมดูแล 24 ชม.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl text-center transition-transform transform hover:scale-105 hover:shadow-lg">
                <Heart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">บริการด้วยหัวใจ</h3>
                <p className="text-gray-600 text-sm">ทีมงานของเราใส่ใจทุกรายละเอียด เพื่อให้ทริปของคุณพิเศษที่สุด</p>
              </div>
               <div className="bg-blue-50 p-6 rounded-xl text-center transition-transform transform hover:scale-105 hover:shadow-lg">
                <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">ประสบการณ์แปลกใหม่</h3>
                <p className="text-gray-600 text-sm">นำเสนอเส้นทางและกิจกรรมที่ไม่เหมือนใคร สร้างความประทับใจไม่รู้ลืม</p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Blog Posts Section */}
         <section className="py-20 bg-blue-50/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900">แรงบันดาลใจในการเดินทาง</h2>
              <p className="text-lg text-gray-600 mt-2">อ่านเรื่องราวและเคล็ดลับการเดินทางจากบล็อกของเรา</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestBlogPosts.map(post => (
                <Link href={`/tourwow-blog/${post.slug}`} key={post.id} className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || '/plane.svg'}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(post.date).toLocaleDateString('th-TH')}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-medium text-sm group-hover:text-blue-800 transition-colors">
                        อ่านเพิ่มเติม →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/tourwow-blog" passHref>
                  <Button variant="outline" size="lg">
                    อ่านบทความทั้งหมด
                  </Button>
                </Link>
             </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="relative py-20 bg-blue-700 text-white">
          <div className="absolute inset-0">
              <Image 
                src="https://images.unsplash.com/photo-1512100356356-de1b84283e18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                alt="Newsletter background"
                fill
                className="object-cover opacity-20"
              />
          </div>
          <div className="relative container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ไม่พลาดทุกโปรโมชั่นและทริปใหม่!</h2>
            <p className="mb-8 text-blue-100">สมัครรับข่าวสารจาก TourWow เพื่อรับข้อมูลทัวร์ ส่วนลดพิเศษ และแรงบันดาลใจในการเดินทางส่งตรงถึงอีเมลคุณ</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                name="email"
                type="email"
                placeholder="กรอกอีเมลของคุณ"
                className="w-full px-5 py-3 rounded-full border border-transparent focus:ring-2 focus:ring-white focus:outline-none text-gray-800"
                required
              />
              <Button type="submit" className="w-full sm:w-auto flex-shrink-0">
                สมัครเลย
              </Button>
            </form>
          </div>
        </section>
      </main>
  );
}

export default function Home() {
  return (
    <LoadingProvider>
      <HomeContent />
    </LoadingProvider>
  );
}
