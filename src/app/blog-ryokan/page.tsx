'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Japanese-inspired icons
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

// Mock blog data with Japanese theme
interface BlogPost {
  id: string
  title: string
  titleJp: string
  excerpt: string
  content: string
  image: string
  author: string
  authorJp: string
  publishDate: string
  readTime: string
  category: string
  categoryJp: string
  tags: string[]
  season: string
}

const blogPosts: BlogPost[] = [
  {
    id: "blog001",
    title: "ศิลปะแห่งการอาบออนเซ็น: คู่มือสำหรับมือใหม่",
    titleJp: "温泉の芸術：初心者のためのガイド",
    excerpt: "ค้นพบความลึกลับและประโยชน์ของออนเซ็น บ่อน้ำร้อนธรรมชาติที่เป็นหัวใจของวัฒนธรรมญี่ปุ่น",
    content: "ออนเซ็นไม่ใช่เพียงแค่การอาบน้ำธรรมดา แต่เป็นพิธีกรรมที่ลึกซึ้งของการชำระล้างจิตใจและร่างกาย...",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
    author: "สกุลดา นักเขียนท่องเที่ยว",
    authorJp: "桜田 旅行作家",
    publishDate: "2024-01-15",
    readTime: "5 นาที",
    category: "วัฒนธรรม",
    categoryJp: "文化",
    tags: ["温泉", "文化", "健康"],
    season: "春"
  },
  {
    id: "blog002",
    title: "โรยกัน โฮเท็ลแบบญี่ปุ่นดั้งเดิม ที่พักในฝัน",
    titleJp: "旅館：日本の伝統的な宿泊体験",
    excerpt: "สัมผัสความหรูหราแบบญี่ปุ่นดั้งเดิม พร้อมบริการอันเป็นเอกลักษณ์ที่ไม่เหมือนใคร",
    content: "โรยกันคือมากกว่าที่พัก เป็นประสบการณ์ทางวัฒนธรรมที่สมบูรณ์แบบ...",
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&h=400&fit=crop",
    author: "ทาคาฮิโระ ไกด์ท้องถิ่น",
    authorJp: "高広 現地ガイド",
    publishDate: "2024-01-10",
    readTime: "7 นาที",
    category: "ที่พัก",
    categoryJp: "宿泊",
    tags: ["旅館", "伝統", "おもてなし"],
    season: "夏"
  },
  {
    id: "blog003",
    title: "เทศกาลซากุระ: ชมความงามของดอกซากุระ",
    titleJp: "桜祭り：桜の美しさを楽しむ",
    excerpt: "เรียนรู้ศิลปะการชม hanami และค้นหาจุดชมซากุระที่สวยที่สุดในญี่ปุ่น",
    content: "Hanami ไม่ใช่เพียงการดูดอกไม้ แต่เป็นการเฉลิมฉลองชีวิตและความงาม...",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&h=400&fit=crop",
    author: "มิซูกิ ช่างภาพ",
    authorJp: "美月 写真家",
    publishDate: "2024-01-05",
    readTime: "6 นาที",
    category: "เทศกาล",
    categoryJp: "祭り",
    tags: ["桜", "花見", "春"],
    season: "春"
  },
  {
    id: "blog004",
    title: "ศิลปะชาเซรีโมนี: จิตใจแห่งความสงบ",
    titleJp: "茶道：心の静寂の芸術",
    excerpt: "เข้าใจปรัชญาที่อยู่เบื้องหลังชาเซรีโมนี พิธีกรรมที่สอนให้เราใช้ชีวิตอย่างมีสติ",
    content: "ชาเซรีโมนีคือการเรียนรู้ที่จะใช้ชีวิตในปัจจุบันขณะ...",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=400&fit=crop",
    author: "เคน อาจารย์ชาเซรีโมนี",
    authorJp: "健 茶道師",
    publishDate: "2024-01-01",
    readTime: "8 นาที",
    category: "ศิลปะ",
    categoryJp: "芸術",
    tags: ["茶道", "禅", "精神"],
    season: "秋"
  },
  {
    id: "blog005",
    title: "อาหารไกเซกิ: ประสบการณ์การรับประทานแบบญี่ปุ่น",
    titleJp: "懐石料理：日本の究極の食体験",
    excerpt: "ค้นพบศิลปะการรับประทานอาหารแบบญี่ปุ่นที่ผสมผสานรสชาติ ความงาม และปรัชญา",
    content: "ไกเซกิไม่ใช่เพียงมื้ออาหาร แต่เป็นศิลปะการใช้ชีวิตที่สมบูรณ์แบบ...",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&h=400&fit=crop",
    author: "ชิเงรุ เชฟ",
    authorJp: "茂 料理長",
    publishDate: "2023-12-28",
    readTime: "10 นาที",
    category: "อาหาร",
    categoryJp: "料理",
    tags: ["懐石", "料理", "芸術"],
    season: "冬"
  },
  {
    id: "blog006",
    title: "การเดินทางแบบ Slow Travel ในญี่ปุ่น",
    titleJp: "日本でのスローな旅",
    excerpt: "เรียนรู้การเดินทางแบบช้าๆ เพื่อซึมซับวัฒนธรรมญี่ปุ่นอย่างลึกซึ้ง",
    content: "Slow Travel คือการเดินทางที่เน้นคุณภาพมากกว่าปริมาณ...",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop",
    author: "ฮิโรมิ นักเขียน",
    authorJp: "寛美 作家",
    publishDate: "2023-12-25",
    readTime: "12 นาที",
    category: "การเดินทาง",
    categoryJp: "旅行",
    tags: ["スロー", "体験", "文化"],
    season: "冬"
  }
]

export default function BlogRyokanPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')
  const [selectedSeason, setSelectedSeason] = useState('ทั้งหมด')

  const categories = useMemo(() => {
    return ['ทั้งหมด', ...new Set(blogPosts.map(post => post.category))]
  }, [])

  const seasons = useMemo(() => {
    return ['ทั้งหมด', ...new Set(blogPosts.map(post => post.season))]
  }, [])

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.titleJp.includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'ทั้งหมด' || post.category === selectedCategory
      const matchesSeason = selectedSeason === 'ทั้งหมด' || post.season === selectedSeason
      
      return matchesSearch && matchesCategory && matchesSeason
    })
  }, [searchTerm, selectedCategory, selectedSeason])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-stone-50 to-amber-50">
      {/* Zen Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 right-10 w-32 h-32 rounded-full border border-amber-200" style={{animation: 'float 6s ease-in-out infinite'}}></div>
        <div className="absolute bottom-32 left-8 w-24 h-24 rounded-full border border-stone-300" style={{animation: 'float 8s ease-in-out infinite reverse'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full border border-amber-300" style={{animation: 'float 10s ease-in-out infinite'}}></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 bg-gradient-to-b from-stone-800 via-stone-700 to-stone-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 backdrop-blur-sm rounded-full mb-6">
            <span className="text-2xl">📚</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-amber-100 mb-4 tracking-wide">
            旅の随筆
          </h1>
          <p className="text-xl text-stone-200 mb-2 font-light">
            Tabi no Zuihitsu - Travel Essays
          </p>
          <p className="text-lg text-stone-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            บันทึกการเดินทางแห่งจิตใจ ผ่านเรื่องราวและประสบการณ์อันล้ำค่า
          </p>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200 p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="記事を探す... (ค้นหาบทความ)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-stone-300 rounded-xl text-stone-900 placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 transition-all text-lg"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">📂 หมวดหมู่</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-stone-300 rounded-lg text-stone-900 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-100 transition-all"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">🌸 ฤดูกาล</label>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="w-full p-3 border border-stone-300 rounded-lg text-stone-900 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-100 transition-all"
                >
                  {seasons.map(season => (
                    <option key={season} value={season}>
                      {season === 'ทั้งหมด' ? season : `${season} (${
                        season === '春' ? 'Spring' : 
                        season === '夏' ? 'Summer' : 
                        season === '秋' ? 'Autumn' : 'Winter'
                      })`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('ทั้งหมด')
                    setSelectedSeason('ทั้งหมด')
                  }}
                  className="w-full p-3 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-medium"
                >
                  リセット
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 text-center">
          <p className="text-stone-600 text-lg">
            <span className="text-amber-600 font-medium text-xl">{filteredPosts.length}</span> の記事が見つかりました
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {filteredPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog-ryokan/${post.id}`}
              className="block group"
            >
              <article className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Season Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-500/90 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full">
                      {post.season}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-stone-800/80 backdrop-blur-sm text-amber-200 text-xs font-medium px-3 py-1 rounded-full">
                      {post.categoryJp}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <div className="mb-4">
                    <h2 className="text-xl font-medium text-stone-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors leading-relaxed">
                      {post.title}
                    </h2>
                    <p className="text-sm text-amber-600 font-medium mb-3">
                      {post.titleJp}
                    </p>
                  </div>

                  {/* Excerpt */}
                  <p className="text-stone-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full border border-amber-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <UserIcon />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-stone-500">
                    <CalendarIcon />
                    <time dateTime={post.publishDate}>
                      {new Date(post.publishDate).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>

                  {/* Read More */}
                  <div className="pt-4 border-t border-stone-100 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-600 text-sm font-medium">続きを読む</span>
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                        <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
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
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200 p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">🍂</div>
              <h3 className="text-xl font-medium text-stone-900 mb-4">記事が見つかりません</h3>
              <p className="text-stone-600 mb-6">
                検索条件を調整して、興味深い記事を見つけてください
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('ทั้งหมด')
                  setSelectedSeason('ทั้งหมด')
                }}
                className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors font-medium"
              >
                リセット
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  )
}