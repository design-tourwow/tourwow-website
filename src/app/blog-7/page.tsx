'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Minimal Clean Icons
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const HeartIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
)

const ArrowIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
)

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

// Blog post interface
interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    role: string
  }
  publishedAt: string
  readingTime: number
  image: string
  category: string
  tags: string[]
  featured: boolean
  views: number
}

// Mock blog data for tour company
const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "ญี่ปุ่น 10 สถานที่ต้องไป สำหรับมือใหม่",
    slug: "japan-must-visit-places",
    excerpt: "โตเกียว เกียวโต โอซาก้า ฟูจิ พร้อมเคล็ดลับเที่ยวญี่ปุ่นแบบประหยัด",
    content: "...",
    author: {
      name: "สมศรี",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      role: "Japan Expert"
    },
    publishedAt: "2024-01-20",
    readingTime: 5,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    category: "คู่มือเที่ยว",
    tags: ["ญี่ปุ่น", "โตเกียว", "เกียวโต"],
    featured: true,
    views: 4250
  },
  {
    id: "2", 
    title: "เกาหลี 5 วัน 4 คืน งบ 25,000 บาท",
    slug: "korea-5days-budget",
    excerpt: "เที่ยวโซล ช้อปปิ้งเมียงดง กินอาหารสตรีทฟู้ด ในงบประหยัด",
    content: "...",
    author: {
      name: "นิดา",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      role: "Korea Lover"
    },
    publishedAt: "2024-01-18",
    readingTime: 7,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    category: "แพ็คเกจทัวร์",
    tags: ["เกาหลี", "โซล", "ประหยัด"],
    featured: true,
    views: 3180
  },
  {
    id: "3",
    title: "ยุโรป 10 วัน ฝรั่งเศส-สวิส-อิตาลี",
    slug: "europe-10days",
    excerpt: "ปารีส หอไอเฟล ยอดเขาจุงเฟรา เวนิส โรม คอลอสเซียม",
    content: "...",
    author: {
      name: "สมชาย",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      role: "Europe Guide"
    },
    publishedAt: "2024-01-16",
    readingTime: 10,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop",
    category: "แพ็คเกจทัวร์",
    tags: ["ยุโรป", "ฝรั่งเศส", "อิตาลี"],
    featured: true,
    views: 2890
  },
  {
    id: "4",
    title: "เตรียมตัวไปเที่ยวหน้าหนาว",
    slug: "winter-travel-packing",
    excerpt: "รายการของที่ต้องเตรียม เสื้อผ้า อุปกรณ์กันหนาว ยาที่จำเป็น",
    content: "...",
    author: {
      name: "พิมพ์ชนก",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      role: "Travel Blogger"
    },
    publishedAt: "2024-01-14",
    readingTime: 4,
    image: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=800&h=600&fit=crop",
    category: "เทคนิค",
    tags: ["หน้าหนาว", "เตรียมตัว"],
    featured: false,
    views: 2456
  },
  {
    id: "5",
    title: "สิงคโปร์ 3 วัน 2 คืน เที่ยวครบ",
    slug: "singapore-3days",
    excerpt: "Marina Bay, Sentosa, Gardens by the Bay, Universal Studios",
    content: "...",
    author: {
      name: "อารยา",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      role: "Singapore Expert"
    },
    publishedAt: "2024-01-12",
    readingTime: 6,
    image: "https://images.unsplash.com/photo-1525625293386-3147d1e524eb?w=800&h=600&fit=crop",
    category: "คู่มือเที่ยว",
    tags: ["สิงคโปร์", "Sentosa"],
    featured: false,
    views: 1890
  },
  {
    id: "6",
    title: "ดูไบ สัมผัสความหรูหรา",
    slug: "dubai-luxury",
    excerpt: "Burj Khalifa, Desert Safari, Gold Souk, Dubai Mall",
    content: "...",
    author: {
      name: "อาหมัด",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      role: "Middle East Expert"
    },
    publishedAt: "2024-01-10",
    readingTime: 8,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
    category: "แพ็คเกจทัวร์",
    tags: ["ดูไบ", "UAE"],
    featured: false,
    views: 1634
  }
]

// Category styles
const categoryStyles: { [key: string]: string } = {
  'คู่มือเที่ยว': 'bg-blue-50 text-blue-700 border-blue-200',
  'แพ็คเกจทัวร์': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'เทคนิค': 'bg-purple-50 text-purple-700 border-purple-200',
  'รีวิว': 'bg-orange-50 text-orange-700 border-orange-200',
  'โปรโมชั่น': 'bg-red-50 text-red-700 border-red-200'
}

export default function Blog7Page() {
  const [posts] = useState<BlogPost[]>(mockBlogPosts)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')
  const [showSearch, setShowSearch] = useState(false)
  const [likedPosts, setLikedPosts] = useState<string[]>([])

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  const categories = useMemo(() => {
    return ['ทั้งหมด', ...new Set(posts.map(post => post.category))]
  }, [posts])

  const featuredPosts = useMemo(() => {
    return posts.filter(post => post.featured).slice(0, 3)
  }, [posts])

  const filteredPosts = useMemo(() => {
    let filtered = posts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'ทั้งหมด' || post.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })

    return filtered
  }, [posts, searchTerm, selectedCategory])

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">กำลังโหลด...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <h1 className="text-xl font-bold text-gray-900">Travel Blog</h1>
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <SearchIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay (Mobile) */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-white animate-in slide-in-from-top duration-300">
            {/* Search Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="ค้นหาบทความ, ประเทศ, สถานที่..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-base"
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <SearchIcon />
                  </div>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setShowSearch(false)}
                  className="p-3 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <span className="text-sm font-medium">ยกเลิก</span>
                </button>
              </div>
            </div>

            {/* Search Content */}
            <div className="flex-1 overflow-y-auto">
              {!searchTerm ? (
                /* Quick Suggestions */
                <div className="p-4 space-y-6">
                  {/* Popular Searches */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">ค้นหายอดนิยม</h3>
                    <div className="flex flex-wrap gap-2">
                      {['ญี่ปุ่น', 'เกาหลี', 'ยุโรป', 'สิงคโปร์', 'ดูไบ'].map(term => (
                        <button
                          key={term}
                          onClick={() => {
                            setSearchTerm(term)
                          }}
                          className="px-4 py-2 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-full text-sm font-medium transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">หมวดหมู่</h3>
                    <div className="space-y-2">
                      {categories.filter(cat => cat !== 'ทั้งหมด').map(category => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category)
                            setShowSearch(false)
                          }}
                          className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                          <span className="font-medium text-gray-900">{category}</span>
                          <span className="text-sm text-gray-500">
                            {posts.filter(post => post.category === category).length} บทความ
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recent Posts */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">บทความล่าสุด</h3>
                    <div className="space-y-3">
                      {posts.slice(0, 3).map(post => (
                        <button
                          key={post.id}
                          onClick={() => {
                            setSearchTerm(post.title)
                          }}
                          className="flex items-start gap-3 w-full p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                        >
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={48}
                            height={48}
                            className="rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 line-clamp-1">{post.title}</h4>
                            <p className="text-sm text-gray-500 line-clamp-1 mt-1">{post.excerpt}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Search Results */
                <div className="p-4">
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      พบ <span className="font-semibold text-gray-900">{filteredPosts.length}</span> บทความ
                    </p>
                  </div>
                  
                  {filteredPosts.length > 0 ? (
                    <div className="space-y-3">
                      {filteredPosts.map(post => (
                        <Link
                          key={post.id}
                          href={`/blog-7/${post.slug}`}
                          onClick={() => setShowSearch(false)}
                          className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 line-clamp-2 mb-1">{post.title}</h4>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{post.excerpt}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${categoryStyles[post.category] || 'bg-gray-100 text-gray-600'}`}>
                                {post.category}
                              </span>
                              <span className="flex items-center gap-1">
                                <ClockIcon />
                                {post.readingTime} นาที
                              </span>
                              <span>{post.views.toLocaleString()} views</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    /* No Results */
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <SearchIcon />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">ไม่พบบทความ</h3>
                      <p className="text-gray-600 mb-6">ลองค้นหาด้วยคำอื่น หรือเลือกหมวดหมู่</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {['ญี่ปุ่น', 'เกาหลี', 'ยุโรป'].map(term => (
                          <button
                            key={term}
                            onClick={() => setSearchTerm(term)}
                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        {/* Desktop Search (Hidden on mobile) */}
        <div className="hidden lg:block mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหาประเทศ, สถานที่, หรือแพ็คเกจทัวร์..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-50 transition-all"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mb-8 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Section */}
        {selectedCategory === 'ทั้งหมด' && featuredPosts.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4">แนะนำสำหรับคุณ</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {featuredPosts.map((post, index) => (
                <Link 
                  key={post.id} 
                  href={`/blog-7/${post.slug}`}
                  className={`group relative ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                >
                  <article className="relative h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className={`relative ${index === 0 ? 'h-64 lg:h-full min-h-[400px]' : 'h-48'}`}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Content Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                        <h3 className={`font-bold mb-2 ${index === 0 ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>
                          {post.title}
                        </h3>
                        
                        <p className={`text-gray-200 mb-3 ${index === 0 ? 'line-clamp-2' : 'line-clamp-1'}`}>
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Like Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          toggleLike(post.id)
                        }}
                        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      >
                        <HeartIcon />
                      </button>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Results */}
        {searchTerm && (
          <p className="text-sm text-gray-600 mb-4">
            พบ {filteredPosts.length} รายการ
          </p>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filteredPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog-7/${post.slug}`}
              className="group"
            >
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryStyles[post.category] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleLike(post.id)
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <HeartIcon />
                  </button>

                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <ClockIcon />
                            {post.readingTime} นาที
                          </span>
                          <span>{post.views.toLocaleString()} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <SearchIcon />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ไม่พบบทความ</h3>
            <p className="text-gray-600 mb-6">ลองค้นหาคำอื่น หรือเลือกหมวดหมู่ใหม่</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('ทั้งหมด')
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              ดูทั้งหมด
            </button>
          </div>
        )}

        {/* Quick Actions (Mobile) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 lg:hidden">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center gap-1 text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs">หน้าแรก</span>
            </button>
            
            <button 
              onClick={() => setShowSearch(true)}
              className="flex flex-col items-center gap-1 text-gray-600"
            >
              <SearchIcon />
              <span className="text-xs">ค้นหา</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 text-gray-600">
              <HeartIcon />
              <span className="text-xs">ถูกใจ</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs">บัญชี</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}