'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Icons
const SearchIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const BookOpenIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A6.64 6.64 0 016.042 12 6.64 6.64 0 0112 17.958 6.64 6.64 0 0117.958 12 6.64 6.64 0 0112 6.042zM12 2v4m0 12v4m10-10h-4M6 12H2" />
  </svg>
)

const StarIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
)

const CommentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
  </svg>
)

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935 2.186z" />
  </svg>
)

const XMarkIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const FireIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.441a3.945 3.945 0 01.923-2.417 3.5 3.5 0 013.316-4.123 2.5 2.5 0 014.092.15 2.5 2.5 0 01.263 1.102c0 .497-.263.943-.692 1.086.069.154.15.299.249.429.22.29.609.324.854.118.278-.234.592-.455.923-.661.332-.207.786.049.773.441-.013.392-.169.766-.413 1.061.069.154.15.299.249.429.22.29.609.324.854.118a7.5 7.5 0 00-.263-1.102z" clipRule="evenodd" />
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
    bio: string
  }
  publishedAt: string
  readingTime: number
  image: string
  category: string
  tags: string[]
  featured: boolean
  views: number
  likes: number
  comments: number
  rating: number
  trending?: boolean
}

// Story-style blog data
const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "เมืองซากุระ: ชีวิตในหุบเขาที่เวลาหยุดนิ่ง",
    slug: "sakura-valley-timeless",
    excerpt: "เรื่องราวจากหมู่บ้านเล็กๆ ในญี่ปุ่นที่ดูเหมือนเวลาจะไม่เดินหน้า ที่นี่ใบซากุระบานทั้งปี และผู้คนยังคงใช้ชีวิตอย่างเรียบง่าย",
    content: "...",
    author: {
      name: "Akira Yamamoto",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      role: "Travel Storyteller",
      bio: "นักเขียนเรื่องเล่าการเดินทางที่หลงใหลในความงดงามของธรรมชาติและวัฒนธรรมท้องถิ่น"
    },
    publishedAt: "2024-02-25",
    readingTime: 15,
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1400&h=900&fit=crop",
    category: "Stories",
    tags: ["Japan", "Culture", "Sakura", "Village Life"],
    featured: true,
    views: 25400,
    likes: 1580,
    comments: 324,
    rating: 4.9,
    trending: true
  },
  {
    id: "2",
    title: "แสงแรกของวัน: การปีนภูเขาฟูจิในยามรุ่งอรุณ",
    slug: "mount-fuji-sunrise",
    excerpt: "การเดินทางขึ้นสู่จุดสูงสุดของญี่ปุ่นในตอนกลางคืน เพื่อเป็นพยานแสงแรกของวันใหม่ที่ปรากฏเหนือเมฆ",
    content: "...",
    author: {
      name: "Hiroshi Tanaka", 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      role: "Mountain Guide",
      bio: "ไกด์นำเที่ยวภูเขาที่มีประสบการณ์กว่า 20 ปี เชี่ยวชาญเส้นทางปีนเขาในญี่ปุ่น"
    },
    publishedAt: "2024-02-22",
    readingTime: 12,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&h=900&fit=crop",
    category: "Adventure",
    tags: ["Mount Fuji", "Hiking", "Sunrise", "Challenge"],
    featured: false,
    views: 18900,
    likes: 945,
    comments: 187,
    rating: 4.7,
    trending: true
  },
  {
    id: "3",
    title: "เสียงคลื่น เสียงใจ: 7 วันบนเกาะร้างในมัลดีฟส์",
    slug: "maldives-solitude",
    excerpt: "เมื่อโลกภายนอกหายไป เหลือเพียงเสียงคลื่นและเสียงใจตัวเอง บนเกาะเล็กๆ ที่ไม่มีใครอื่นนอกจากธรรมชาติ",
    content: "...",
    author: {
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      role: "Solo Traveler",
      bio: "นักเดินทางคนเดียวที่ชื่นชอบการค้นหาสถานที่ที่เงียบสงบและสัมผัสกับตัวเองอย่างลึกซึ้ง"
    },
    publishedAt: "2024-02-20",
    readingTime: 18,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=900&fit=crop",
    category: "Mindfulness",
    tags: ["Maldives", "Solitude", "Island", "Meditation"],
    featured: true,
    views: 22100,
    likes: 1234,
    comments: 289,
    rating: 4.8,
    trending: false
  },
  {
    id: "4",
    title: "รสชาติของความทรงจำ: อาหารข้างทางในเวียดนาม",
    slug: "vietnam-street-food-memories",
    excerpt: "ทุกจานอาหารข้างทางล้วนเล่าเรื่องราว ทุกคำนึงถึงความทรงจำ เดินตามกลิ่นหอมในตรอกซอกซอย",
    content: "...",
    author: {
      name: "Linh Nguyen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      role: "Food Explorer",
      bio: "นักสำรวจอาหารที่เชื่อว่ารสชาติคือประตูสู่วัฒนธรรมและความทรงจำของผู้คน"
    },
    publishedAt: "2024-02-18",
    readingTime: 10,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&h=900&fit=crop",
    category: "Culture",
    tags: ["Vietnam", "Street Food", "Culture", "Local Life"],
    featured: false,
    views: 16700,
    likes: 823,
    comments: 156,
    rating: 4.6,
    trending: false
  },
  {
    id: "5",
    title: "ใต้แสงออโรรา: คืนที่ไม่มีวันลืมในลาปแลนด์",
    slug: "lapland-northern-lights",
    excerpt: "เมื่อท้องฟ้ามืดกลืนกลายเป็นผืนผ้าใบสีเขียว แสงออโรราเต้นรำในคืนที่เย็นยะเยือก บนแผ่นดินที่ปกคลุมด้วยหิมะขาว",
    content: "...",
    author: {
      name: "Erik Nordström",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      role: "Aurora Chaser",
      bio: "ช่างภาพและนักล่าแสงออโรราที่ใช้ชีวิตในภาคเหนือของสแกนดิเนเวีย"
    },
    publishedAt: "2024-02-15",
    readingTime: 14,
    image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=1400&h=900&fit=crop",
    category: "Nature",
    tags: ["Finland", "Northern Lights", "Winter", "Photography"],
    featured: false,
    views: 31200,
    likes: 1789,
    comments: 402,
    rating: 4.9,
    trending: true
  },
  {
    id: "6",
    title: "เส้นทางสายไหม: เดินตามรอยประวัติศาสตร์ในอุซเบกิสถาน",
    slug: "silk-road-uzbekistan",
    excerpt: "เดินตามเส้นทางการค้าโบราณที่เชื่อมต่อตะวันออกและตะวันตก สัมผัสสถาปัตยกรรมอิสลามที่งดงามในซามาร์กันด์และบุคารา",
    content: "...",
    author: {
      name: "Jamshid Karimov",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      role: "History Explorer",
      bio: "นักประวัติศาสตร์และไกด์ท้องถิ่นที่หลงใหลในเรื่องราวของเส้นทางสายไหม"
    },
    publishedAt: "2024-02-12",
    readingTime: 16,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&h=900&fit=crop",
    category: "History",
    tags: ["Uzbekistan", "Silk Road", "Architecture", "History"],
    featured: false,
    views: 13500,
    likes: 654,
    comments: 128,
    rating: 4.5,
    trending: false
  }
]

// Category colors - warm, earthy tones
const categoryColors: { [key: string]: { bg: string; text: string; border: string } } = {
  'Stories': { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200' },
  'Adventure': { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' },
  'Mindfulness': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
  'Culture': { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-200' },
  'Nature': { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-200' },
  'History': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' }
}

export default function Blog9Page() {
  const [posts] = useState<BlogPost[]>(mockBlogPosts)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showSearch, setShowSearch] = useState(false)
  const [savedPosts, setSavedPosts] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 3

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200)
    // Load saved posts
    const saved = localStorage.getItem('blog-9-saved-posts')
    if (saved) setSavedPosts(JSON.parse(saved))
  }, [])

  const categories = useMemo(() => {
    return ['All', ...new Set(posts.map(post => post.category))]
  }, [posts])

  const featuredPosts = useMemo(() => {
    return posts.filter(post => post.featured)
  }, [posts])

  const filteredPosts = useMemo(() => {
    let filtered = posts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })

    return filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }, [posts, searchTerm, selectedCategory])

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage
    return filteredPosts.slice(startIndex, startIndex + postsPerPage)
  }, [filteredPosts, currentPage])

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const toggleSave = (postId: string) => {
    const newSavedPosts = savedPosts.includes(postId) 
      ? savedPosts.filter(id => id !== postId)
      : [...savedPosts, postId]
    
    setSavedPosts(newSavedPosts)
    localStorage.setItem('blog-9-saved-posts', JSON.stringify(newSavedPosts))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-amber-200 rounded-full animate-pulse mx-auto mb-6"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto my-2"></div>
          </div>
          <h2 className="text-2xl font-light text-amber-800 mb-2">Stories Loading...</h2>
          <p className="text-amber-600">เตรียมตัวพบกับเรื่องราวน่าตื่นตา</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Elegant Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-amber-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <BookOpenIcon />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-light tracking-wide text-gray-800">Journey Tales</h1>
                <p className="text-sm text-amber-600 font-light italic">เรื่องเล่าจากการเดินทาง</p>
              </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="ค้นหาเรื่องราวที่น่าสนใจ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-3 pl-14 bg-white/60 backdrop-blur-sm border border-amber-200 rounded-full text-gray-700 placeholder-amber-500 focus:bg-white focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100 transition-all duration-300 shadow-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-amber-500">
                  <SearchIcon />
                </div>
              </div>
            </div>

            {/* Mobile Search */}
            <button
              onClick={() => setShowSearch(true)}
              className="md:hidden p-3 bg-amber-100 hover:bg-amber-200 rounded-full transition-colors text-amber-600"
            >
              <SearchIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-lg">
          <div className="max-w-2xl mx-auto p-8">
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="ค้นหาเรื่องราวที่คุณต้องการ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                  className="w-full px-8 py-4 pl-16 bg-white border-2 border-amber-200 rounded-2xl text-gray-800 placeholder-amber-400 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100 text-lg shadow-lg"
                />
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-amber-500">
                  <SearchIcon />
                </div>
              </div>
              <button
                onClick={() => setShowSearch(false)}
                className="p-3 text-amber-600 hover:bg-amber-100 rounded-xl transition-colors"
              >
                <XMarkIcon />
              </button>
            </div>

            {/* Search Results */}
            {searchTerm ? (
              <div className="space-y-4">
                <p className="text-amber-700 font-light">
                  พบ {filteredPosts.length} เรื่องราวสำหรับ "<span className="font-medium">{searchTerm}</span>"
                </p>
                {filteredPosts.slice(0, 5).map(post => (
                  <Link
                    key={post.id}
                    href={`/blog-9/${post.slug}`}
                    onClick={() => setShowSearch(false)}
                    className="block p-4 bg-white/80 hover:bg-white rounded-xl border border-amber-100 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-start space-x-4">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={80}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 mb-1">{post.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center space-x-3 mt-2 text-xs text-amber-600">
                          <span className={`px-2 py-1 rounded-full ${categoryColors[post.category]?.bg} ${categoryColors[post.category]?.text}`}>
                            {post.category}
                          </span>
                          <span>{post.readingTime} นาที</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpenIcon />
                <h3 className="text-xl font-light text-gray-700 mb-2">ค้นหาเรื่องราวที่คุณสนใจ</h3>
                <p className="text-amber-600">พิมพ์คำที่ต้องการค้นหาในช่องด้านบน</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-xl font-light text-gray-700 mb-6">เลือกอ่านตามประเภท</h2>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentPage(1)
                }}
                className={`px-6 py-3 rounded-full text-sm font-light whitespace-nowrap transition-all duration-300 border-2 ${
                  selectedCategory === category
                    ? 'bg-amber-200 text-amber-800 border-amber-300 shadow-md'
                    : 'bg-white/60 text-gray-600 border-amber-100 hover:bg-white hover:border-amber-200'
                }`}
              >
                {category === 'All' ? 'ทั้งหมด' : category}
                {category !== 'All' && (
                  <span className="ml-2 opacity-75">
                    ({posts.filter(post => post.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Stories Carousel */}
        {selectedCategory === 'All' && featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-light text-gray-800 mb-8 flex items-center">
              <StarIcon filled={true} />
              <span className="ml-2">เรื่องราวพิเศษ</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <Link 
                  key={post.id} 
                  href={`/blog-9/${post.slug}`}
                  className="group"
                >
                  <article className="bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Overlay content */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[post.category]?.bg} ${categoryColors[post.category]?.text} ${categoryColors[post.category]?.border}`}>
                            {post.category}
                          </span>
                          {post.trending && (
                            <span className="flex items-center space-x-1 px-2 py-1 bg-red-500 text-white rounded-full text-xs">
                              <FireIcon />
                              <span>ฮิต</span>
                            </span>
                          )}
                        </div>
                        <h3 className="text-white font-medium text-lg leading-tight">
                          {post.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Author */}
                      <div className="flex items-center space-x-3 mb-4">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-800">{post.author.name}</div>
                          <div className="text-xs text-gray-500">{post.author.role}</div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <ClockIcon />
                            <span>{post.readingTime} นาที</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <EyeIcon />
                            <span>{post.views.toLocaleString()}</span>
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon key={i} filled={i < Math.floor(post.rating)} />
                            ))}
                          </div>
                          <span className="ml-1">{post.rating}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Search Results Info */}
        {searchTerm && (
          <div className="mb-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-amber-200">
            <p className="text-amber-800">
              ผลการค้นหา "<span className="font-medium">{searchTerm}</span>" พบ {filteredPosts.length} เรื่องราว
            </p>
          </div>
        )}

        {/* Story List - Card Layout */}
        <div className="space-y-12">
          {paginatedPosts.map((post, index) => (
            <Link 
              key={post.id} 
              href={`/blog-9/${post.slug}`}
              className="group block"
            >
              <article className="bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-white/50">
                <div className="md:flex">
                  {/* Image */}
                  <div className="md:w-2/5 relative h-80 md:h-auto overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {post.trending && (
                      <div className="absolute top-4 left-4">
                        <span className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded-full text-sm font-medium shadow-lg">
                          <FireIcon />
                          <span>กำลังฮิต</span>
                        </span>
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleSave(post.id)
                      }}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <StarIcon filled={savedPosts.includes(post.id)} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="md:w-3/5 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${categoryColors[post.category]?.bg} ${categoryColors[post.category]?.text} ${categoryColors[post.category]?.border}`}>
                          {post.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(post.publishedAt).toLocaleDateString('th-TH')}
                        </span>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-light leading-tight text-gray-800 mb-4 group-hover:text-amber-700 transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-gray-600 leading-relaxed text-lg mb-6 line-clamp-4">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Author & Stats */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={48}
                          height={48}
                          className="rounded-full ring-2 ring-white shadow-sm"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{post.author.name}</div>
                          <div className="text-sm text-gray-500">{post.author.role}</div>
                          <div className="text-xs text-gray-400 line-clamp-1">{post.author.bio}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <ClockIcon />
                            <span>{post.readingTime} นาที</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <EyeIcon />
                            <span>{post.views.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <CommentIcon />
                            <span>{post.comments}</span>
                          </span>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-amber-500">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} filled={i < Math.floor(post.rating)} />
                              ))}
                            </div>
                            <span className="text-sm font-medium">{post.rating}</span>
                          </div>
                          <button className="p-2 text-gray-400 hover:text-amber-500 transition-colors">
                            <ShareIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white/60 text-gray-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
              >
                ก่อนหน้า
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full transition-colors ${
                    currentPage === i + 1
                      ? 'bg-amber-200 text-amber-800'
                      : 'bg-white/60 text-gray-600 hover:bg-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white/60 text-gray-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
              >
                ถัดไป
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-amber-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <BookOpenIcon />
            </div>
            <h3 className="text-2xl font-light text-gray-800 mb-4">ไม่พบเรื่องราวที่ตรงกับการค้นหา</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">ลองค้นหาด้วยคำอื่น หรือเลือกดูหมวดหมู่ที่น่าสนใจ</p>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                  setCurrentPage(1)
                }}
                className="px-8 py-3 bg-amber-200 hover:bg-amber-300 text-amber-800 rounded-full font-medium transition-colors"
              >
                ดูเรื่องราวทั้งหมด
              </button>
              <button
                onClick={() => setShowSearch(true)}
                className="px-8 py-3 bg-white/60 hover:bg-white text-gray-700 rounded-full font-medium transition-colors border border-amber-200"
              >
                ค้นหาใหม่
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}