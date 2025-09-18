'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Custom icons - Clean Minimalist style
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

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
  </svg>
)

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 713 7V4z" />
  </svg>
)

const BookIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)

// Mock blog data - same as Template A
interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
  }
  publishedAt: string
  readingTime: number
  image: string
  category: string
  tags: string[]
  featured: boolean
  views: number
}

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 เคล็ดลับการเดินทางญี่ปุ่นสำหรับมือใหม่",
    slug: "japan-travel-tips-beginners",
    excerpt: "คำแนะนำสำคัญที่จะทำให้การเดินทางครั้งแรกในญี่ปุ่นของคุณเป็นประสบการณ์ที่น่าจดจำ",
    content: "...",
    author: {
      name: "สมชาย ใจดี",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    publishedAt: "2024-01-15",
    readingTime: 8,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop",
    category: "คู่มือการเดินทาง",
    tags: ["ญี่ปุ่น", "มือใหม่", "เคล็ดลับ"],
    featured: true,
    views: 2845
  },
  {
    id: "2",
    title: "ประสบการณ์ดูใบไม้เปลี่ยนสีในเกาหลีใต้",
    slug: "korea-autumn-leaves-experience",
    excerpt: "เส้นทางท่องเที่ยวชมใบไม้เปลี่ยนสีที่สวยที่สุดในเกาหลีใต้",
    content: "...",
    author: {
      name: "อลิสา ปาร์ค",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face"
    },
    publishedAt: "2024-01-12",
    readingTime: 6,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
    category: "ประสบการณ์การเดินทาง",
    tags: ["เกาหลีใต้", "ใบไม้เปลี่ยนสี", "ธรรมชาติ"],
    featured: true,
    views: 1923
  },
  {
    id: "3",
    title: "อาหารข้างถนนสิงคโปร์ที่ห้ามพลาด",
    slug: "singapore-street-food-guide", 
    excerpt: "รีวิวอาหารข้างถนนสิงคโปร์จากฮอว์เกอร์เซ็นเตอร์ชื่อดัง",
    content: "...",
    author: {
      name: "เจมส์ ลิม",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    publishedAt: "2024-01-10",
    readingTime: 5,
    image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600&h=400&fit=crop",
    category: "อาหารและการกิน",
    tags: ["สิงคโปร์", "อาหารข้างถนน", "ฮอว์เกอร์"],
    featured: false,
    views: 1654
  },
  {
    id: "4",
    title: "เส้นทางท่องเที่ยวเชียงใหม่ 3 วัน 2 คืน",
    slug: "chiang-mai-3-days-itinerary",
    excerpt: "แผนการเดินทางฉบับสมบูรณ์สำหรับสำรวจเชียงใหม่ในระยะเวลา 3 วัน",
    content: "...",
    author: {
      name: "นภัสสร สุขใส",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    publishedAt: "2024-01-08",
    readingTime: 7,
    image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=600&h=400&fit=crop",
    category: "คู่มือการเดินทาง",
    tags: ["เชียงใหม่", "ท่องเที่ยวในประเทศ", "วัฒนธรรม"],
    featured: false,
    views: 3421
  },
  {
    id: "5",
    title: "ยุโรปด้วยงบประมาณประหยัด",
    slug: "budget-europe-travel-guide",
    excerpt: "เคล็ดลับการเดินทางยุโรปแบบประหยัดโดยไม่ลดคุณภาพประสบการณ์",
    content: "...",
    author: {
      name: "มาร์ค ชมิธ",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    publishedAt: "2024-01-05",
    readingTime: 12,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=400&fit=crop",
    category: "คู่มือการเดินทาง",
    tags: ["ยุโรป", "ประหยัด", "แบ็คแพ็ค"],
    featured: true,
    views: 4532
  },
  {
    id: "6",
    title: "สถานที่ถ่ายรูปสวยในนิวยอร์ค",
    slug: "instagram-spots-new-york",
    excerpt: "รวมสถานที่ถ่ายรูปสุดปังในนิวยอร์คที่จะทำให้ฟีดของคุณเด่น",
    content: "...",
    author: {
      name: "เอมิลี่ โจนส์",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    },
    publishedAt: "2024-01-03",
    readingTime: 4,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop",
    category: "ประสบการณ์การเดินทาง",
    tags: ["นิวยอร์ค", "ถ่ายรูป", "Instagram"],
    featured: false,
    views: 2187
  }
]

export default function BlogCleanPage() {
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')
  const [sortBy, setSortBy] = useState('ล่าสุด')

  useEffect(() => {
    // Simulate loading
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
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'ทั้งหมด' || post.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })

    // Sort
    switch (sortBy) {
      case 'เก่าสุด':
        filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
        break
      case 'ยอดนิยม':
        filtered.sort((a, b) => b.views - a.views)
        break
      case 'อ่านเร็ว':
        filtered.sort((a, b) => a.readingTime - b.readingTime)
        break
      default: // ล่าสุด
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    }

    return filtered
  }, [posts, searchTerm, selectedCategory, sortBy])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600 text-sm">กำลังโหลดบทความ...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-6">
              <BookIcon />
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
              บล็อกท่องเที่ยว
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              เรื่องราวการเดินทาง คำแนะนำจากผู้เชี่ยวชาญ และข้อมูลที่จะทำให้ทริปต่อไปของคุณสมบูรณ์แบบ
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
              <h2 className="text-3xl font-light text-gray-900">บทความแนะนำ</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <Link 
                  key={post.id} 
                  href={`/blog-clean/${post.slug}`}
                  className={`group ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                >
                  <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className={`relative ${index === 0 ? 'h-80' : 'h-64'} overflow-hidden`}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Featured badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                          แนะนำ
                        </span>
                      </div>

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-200">
                          <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <ClockIcon />
                            <span>{post.readingTime} นาที</span>
                          </div>
                        </div>
                        
                        <h3 className={`font-semibold mb-2 line-clamp-2 ${index === 0 ? 'text-2xl' : 'text-lg'}`}>
                          {post.title}
                        </h3>
                        
                        <p className={`text-gray-200 line-clamp-2 mb-3 ${index === 0 ? 'text-base' : 'text-sm'}`}>
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                            <span className="text-sm">{post.author.name}</span>
                          </div>
                          <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <ArrowRightIcon />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search & Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="ค้นหาบทความที่สนใจ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors text-base"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">หมวดหมู่</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">เรียงตาม</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              >
                <option value="ล่าสุด">ล่าสุด</option>
                <option value="เก่าสุด">เก่าสุด</option>
                <option value="ยอดนิยม">ยอดนิยม</option>
                <option value="อ่านเร็ว">อ่านเร็ว</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('ทั้งหมด')
                  setSortBy('ล่าสุด')
                }}
                className="w-full p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <FilterIcon />
                รีเซ็ต
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8">
          <p className="text-gray-600">
            พบ <span className="text-blue-600 font-semibold">{filteredPosts.length}</span> บทความ
            {searchTerm && (
              <span> สำหรับ "<span className="text-gray-900 font-semibold">{searchTerm}</span>"</span>
            )}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog-clean/${post.slug}`}
              className="group"
            >
              <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                      {post.category}
                    </span>
                  </div>

                  {/* Views */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-2 py-1 rounded-full border border-gray-200">
                      <EyeIcon />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full border border-gray-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

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
                        <p className="text-sm text-gray-900 font-medium">{post.author.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(post.publishedAt).toLocaleDateString('th-TH')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-gray-600 text-sm">
                      <div className="flex items-center gap-1">
                        <ClockIcon />
                        <span>{post.readingTime} นาที</span>
                      </div>
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <ArrowRightIcon />
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
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <SearchIcon />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">ไม่พบบทความ</h3>
              <p className="text-gray-600 mb-6">
                ลองปรับเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่น
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('ทั้งหมด')
                  setSortBy('ล่าสุด')
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                รีเซ็ตการค้นหา
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}