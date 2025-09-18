'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Safari Adventure icons
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const BinocularsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

// Mock safari blog data
interface BlogPost {
  id: string
  title: string
  titleEn: string
  excerpt: string
  content: string
  image: string
  author: string
  authorEn: string
  publishDate: string
  readTime: string
  category: string
  categoryEn: string
  tags: string[]
  difficulty: string
  wildlife: string[]
}

const blogPosts: BlogPost[] = [
  {
    id: "safari001",
    title: "Big 5 คืออะไร? รู้จักสัตว์ป่า 5 ชนิดในแอฟริกา",
    titleEn: "🦁 What are the Big 5? Meet Africa's Legendary Wildlife",
    excerpt: "ค้นพบเรื่องราวของสัตว์ป่า 5 ชนิดที่นักล่าเรียกว่า 'Big 5' และเหตุผลที่ทำให้พวกมันกลายเป็นตำนานแห่งแอฟริกา",
    content: "Big 5 ไม่ได้หมายถึงสัตว์ที่ใหญ่ที่สุด แต่เป็นสัตว์ที่อันตรายที่สุดสำหรับนักล่า...",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop",
    author: "ดร.ไมเคิล ผู้เชี่ยวชาญสัตว์ป่า",
    authorEn: "Dr. Michael Wildlife Expert",
    publishDate: "2024-01-20",
    readTime: "8 minutes",
    category: "สัตว์ป่า",
    categoryEn: "Wildlife",
    tags: ["Big 5", "Lions", "Elephants", "Rhinos"],
    difficulty: "Beginner",
    wildlife: ["🦁", "🐘", "🦏", "🐆", "🐃"]
  },
  {
    id: "safari002",
    title: "Great Migration: การอพยพครั้งยิ่งใหญ่ในเซเรนเกตี",
    titleEn: "🦓 The Great Migration: Nature's Greatest Show",
    excerpt: "ติดตามขบวนการอพยพของสัตว์ป่ากว่า 2 ล้านตัว ในการเดินทางที่ยิ่งใหญ่ที่สุดในโลก",
    content: "ทุกปีสัตว์ป่าในเซเรนเกตีจะเริ่มการเดินทางที่ยิ่งใหญ่เพื่อตามหาอาหารและน้ำ...",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop",
    author: "จอห์น เรนเจอร์อาวุโส",
    authorEn: "John Senior Ranger",
    publishDate: "2024-01-15",
    readTime: "12 minutes",
    category: "ธรรมชาติ",
    categoryEn: "Nature",
    tags: ["Migration", "Serengeti", "Wildebeest", "Zebras"],
    difficulty: "Intermediate",
    wildlife: ["🦓", "🦌", "🐊", "🦅"]
  },
  {
    id: "safari003",
    title: "ช่างภาพสัตว์ป่า: เทคนิคการถ่ายภาพในซาฟารี",
    titleEn: "📸 Wildlife Photography: Mastering Safari Shots",
    excerpt: "เรียนรู้เทคนิคและเคล็ดลับในการถ่ายภาพสัตว์ป่าในแอฟริกา จากมืออาชีพ",
    content: "การถ่ายภาพสัตว์ป่าต้องใช้ความอดทน ทักษะ และอุปกรณ์ที่เหมาะสม...",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=400&fit=crop",
    author: "ซาร่าห์ ช่างภาพสัตว์ป่า",
    authorEn: "Sarah Wildlife Photographer",
    publishDate: "2024-01-10",
    readTime: "15 minutes",
    category: "การถ่ายภาพ",
    categoryEn: "Photography",
    tags: ["Photography", "Tips", "Equipment", "Techniques"],
    difficulty: "Advanced",
    wildlife: ["📸", "🦁", "🐘", "🦒"]
  },
  {
    id: "safari004",
    title: "Conservation Heroes: ผู้พิทักษ์แห่งสัตว์ป่า",
    titleEn: "🛡️ Conservation Heroes: Guardians of the Wild",
    excerpt: "พบกับเรื่องราวของผู้ที่อุทิศชีวิตเพื่อรักษาสัตว์ป่าและระบบนิเวศในแอฟริกา",
    content: "เบื้องหลังความงามของสัตว์ป่าแอฟริกา มีผู้คนที่อุทิศชีวิตเพื่อปกป้องพวกมัน...",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop",
    author: "เดวิด นักอนุรักษ์",
    authorEn: "David Conservationist",
    publishDate: "2024-01-05",
    readTime: "10 minutes",
    category: "อนุรักษ์",
    categoryEn: "Conservation",
    tags: ["Conservation", "Heroes", "Protection", "Community"],
    difficulty: "Intermediate",
    wildlife: ["🛡️", "🌍", "❤️", "🙏"]
  },
  {
    id: "safari005",
    title: "Night Safari: ชีวิตยามค่ำคืนในป่าแอฟริกา",
    titleEn: "🌙 Night Safari: After Dark in the African Bush",
    excerpt: "ค้นพบโลกลับที่เปิดเผยเมื่อพระอาทิตย์ตกดิน และสัตว์กลางคืนเริ่มออกล่า",
    content: "เมื่อความมืดปกคลุมซาวานนา โลกสัตว์ป่าจะเปลี่ยนไปโดยสิ้นเชิง...",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop",
    author: "มาร์ค ไกด์กลางคืน",
    authorEn: "Mark Night Guide",
    publishDate: "2024-01-01",
    readTime: "9 minutes",
    category: "ผจญภัย",
    categoryEn: "Adventure",
    tags: ["Night Safari", "Nocturnal", "Predators", "Adventure"],
    difficulty: "Advanced",
    wildlife: ["🌙", "🦉", "🐆", "🦇"]
  },
  {
    id: "safari006",
    title: "Luxury Safari: ความหรูหราท่ามกลางธรรมชาติ",
    titleEn: "✨ Luxury Safari: Glamping in the Wild",
    excerpt: "สัมผัสประสบการณ์ซาฟารีแบบหรูหรา ที่ผสมผสานความสะดวกสบายกับการผจญภัย",
    content: "Luxury Safari ไม่ได้หมายความว่าต้องสูญเสียความตื่นเต้นของการผจญภัย...",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop",
    author: "อเล็กซ์ ผจญภัยหรูหรา",
    authorEn: "Alex Luxury Adventure",
    publishDate: "2023-12-28",
    readTime: "11 minutes",
    category: "หรูหรา",
    categoryEn: "Luxury",
    tags: ["Luxury", "Glamping", "Comfort", "Premium"],
    difficulty: "Luxury",
    wildlife: ["✨", "🥂", "🛏️", "🦁"]
  }
]

const difficultyColors = {
  "Beginner": "bg-green-100 text-green-700 border-green-200",
  "Intermediate": "bg-yellow-100 text-yellow-700 border-yellow-200", 
  "Advanced": "bg-orange-100 text-orange-700 border-orange-200",
  "Luxury": "bg-purple-100 text-purple-700 border-purple-200"
}

export default function BlogSafariPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')
  const [selectedDifficulty, setSelectedDifficulty] = useState('ทั้งหมด')

  const categories = useMemo(() => {
    return ['ทั้งหมด', ...new Set(blogPosts.map(post => post.category))]
  }, [])

  const difficulties = useMemo(() => {
    return ['ทั้งหมด', ...new Set(blogPosts.map(post => post.difficulty))]
  }, [])

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'ทั้งหมด' || post.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === 'ทั้งหมด' || post.difficulty === selectedDifficulty
      
      return matchesSearch && matchesCategory && matchesDifficulty
    })
  }, [searchTerm, selectedCategory, selectedDifficulty])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-orange-50 to-yellow-100">
      {/* Safari Background Animals */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-15">
        <div className="absolute top-32 right-16 text-6xl animate-bounce" style={{animationDelay: '0s'}}>🦒</div>
        <div className="absolute bottom-40 left-12 text-4xl animate-bounce" style={{animationDelay: '2s'}}>🦓</div>
        <div className="absolute top-1/2 left-1/3 text-5xl animate-bounce" style={{animationDelay: '4s'}}>🐘</div>
        <div className="absolute bottom-1/4 right-1/4 text-3xl animate-bounce" style={{animationDelay: '1s'}}>🦁</div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 bg-gradient-to-r from-amber-800 via-orange-700 to-red-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
        
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/30 backdrop-blur-sm rounded-full mb-6 animate-pulse">
            <span className="text-2xl">📖</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-yellow-100 mb-4 tracking-wide">
            SAFARI CHRONICLES
          </h1>
          <p className="text-xl text-orange-200 mb-2 font-semibold">
            Wild Adventures & Conservation Stories
          </p>
          <p className="text-lg text-orange-100 mb-8 leading-relaxed max-w-2xl mx-auto">
            🌍 เรื่องราวการผจญภัยและการอนุรักษ์จากใจกลางแอฟริกาป่า
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="text-2xl font-bold text-yellow-300">50+</div>
              <div className="text-orange-200 text-sm">Stories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="text-2xl font-bold text-yellow-300">15</div>
              <div className="text-orange-200 text-sm">Countries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="text-2xl font-bold text-yellow-300">100+</div>
              <div className="text-orange-200 text-sm">Species</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="text-2xl font-bold text-yellow-300">5⭐</div>
              <div className="text-orange-200 text-sm">Expert</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-orange-200 p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BinocularsIcon />
                </div>
                <input
                  type="text"
                  placeholder="🔍 Track safari stories and adventures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-orange-300 rounded-xl text-amber-900 placeholder-amber-600 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all text-lg font-medium"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-bold text-amber-800 mb-2">🌍 หมวดหมู่</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border-2 border-orange-300 rounded-lg text-amber-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all font-medium"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-amber-800 mb-2">🎯 ระดับ</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-3 border-2 border-orange-300 rounded-lg text-amber-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all font-medium"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty === 'ทั้งหมด' ? difficulty : `${difficulty} Level`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('ทั้งหมด')
                    setSelectedDifficulty('ทั้งหมด')
                  }}
                  className="w-full p-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all font-bold transform hover:scale-105"
                >
                  🔄 RESET TRACKING
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 text-center">
          <p className="text-amber-800 text-lg font-bold">
            🎯 Tracked <span className="text-orange-600 text-xl">{filteredPosts.length}</span> amazing safari stories! 📚
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {filteredPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog-safari/${post.id}`}
              className="block group"
            >
              <article className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-orange-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:rotate-1 transform">
                {/* Image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Difficulty Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border-2 ${difficultyColors[post.difficulty as keyof typeof difficultyColors]}`}>
                      🎯 {post.difficulty}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {post.categoryEn}
                    </span>
                  </div>

                  {/* Wildlife Icons */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex gap-1">
                      {post.wildlife.slice(0, 4).map((animal, index) => (
                        <span key={index} className="text-lg bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center border border-white/50">
                          {animal}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-amber-900 mb-2 line-clamp-2 group-hover:text-orange-700 transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-sm text-orange-600 font-bold mb-3">
                      {post.titleEn}
                    </p>
                  </div>

                  {/* Excerpt */}
                  <p className="text-amber-700 text-sm mb-4 line-clamp-3 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-2 py-1 rounded-full border border-orange-200 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-amber-700 mb-4 font-medium">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <UserIcon />
                        <span>{post.authorEn}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-amber-700 font-medium">
                    <CalendarIcon />
                    <time dateTime={post.publishDate}>
                      {new Date(post.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>

                  {/* Read More */}
                  <div className="pt-4 border-t-2 border-orange-100 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-800 text-sm font-bold">🎯 READ EXPEDITION</span>
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-orange-200 p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">🦁</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">No Stories Found!</h3>
              <p className="text-amber-700 mb-6 font-medium">
                The stories are hiding in the bush! Try adjusting your tracking filters to discover amazing safari adventures! 🔍
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('ทั้งหมด')
                  setSelectedDifficulty('ทั้งหมด')
                }}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-bold transform hover:scale-105 shadow-lg"
              >
                🔄 RESET TRACKING
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}