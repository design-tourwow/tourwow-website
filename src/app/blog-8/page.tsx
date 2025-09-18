'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Icons
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
)

const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
)

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
  </svg>
)

const FireIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.032z" />
  </svg>
)

const TagIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
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
  likes: number
  hot?: boolean
}

// Magazine-style blog data
const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "ฮอกไกโด ฤดูหนาว 2024: สัมผัสหิมะแรกของปี",
    slug: "hokkaido-winter-2024",
    excerpt: "เดินทางไปสัมผัสความงดงามของฮอกไกโดในฤดูหนาว ชมแสงเหนือ ลิงแช่น้ำร้อน และอาหารทะเลสดใหม่",
    content: "...",
    author: {
      name: "Yuki Tanaka",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      role: "Winter Travel Specialist"
    },
    publishedAt: "2024-02-20",
    readingTime: 12,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop",
    category: "Adventure",
    tags: ["Japan", "Winter", "Snow", "Hot Springs"],
    featured: true,
    views: 18500,
    likes: 1240,
    hot: true
  },
  {
    id: "2", 
    title: "เซี่ยงไฮ้ 48 ชั่วโมง: เมืองที่ไม่เคยหลับ",
    slug: "shanghai-48-hours",
    excerpt: "สำรวจเซี่ยงไฮ้ในรูปแบบใหม่ จากตึกระฟ้าใน Pudong ไปจนถึงตรอกเก่าใน French Concession",
    content: "...",
    author: {
      name: "Li Wei",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      role: "Urban Explorer"
    },
    publishedAt: "2024-02-18",
    readingTime: 8,
    image: "https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=1200&h=800&fit=crop",
    category: "City Guide",
    tags: ["China", "Urban", "Architecture", "Food"],
    featured: true,
    views: 15200,
    likes: 890,
    hot: true
  },
  {
    id: "3",
    title: "ไอซ์แลนด์: การผจญภัยบนเกาะน้ำแข็ง",
    slug: "iceland-adventure",
    excerpt: "ชมแสงเหนือ เดินทางรอบ Ring Road และแช่น้ำร้อนธรรมชาติใน Blue Lagoon",
    content: "...",
    author: {
      name: "Erik Magnusson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      role: "Nordic Guide"
    },
    publishedAt: "2024-02-15",
    readingTime: 15,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d1f46f?w=1200&h=800&fit=crop",
    category: "Nature",
    tags: ["Iceland", "Northern Lights", "Glacier", "Hot Springs"],
    featured: false,
    views: 12800,
    likes: 756,
    hot: false
  },
  {
    id: "4",
    title: "Photography: เทคนิคถ่ายรูป Golden Hour",
    slug: "golden-hour-photography",
    excerpt: "เปิดเคล็ดลับการถ่ายรูปในช่วง Golden Hour ให้ได้ภาพสวยแบบมืออาชีพ",
    content: "...",
    author: {
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      role: "Travel Photographer"
    },
    publishedAt: "2024-02-12",
    readingTime: 6,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    category: "Photography",
    tags: ["Photography", "Tips", "Golden Hour", "Techniques"],
    featured: false,
    views: 9400,
    likes: 520,
    hot: false
  },
  {
    id: "5",
    title: "บาลี เกาะสวรรค์ที่ไม่มีวันเบื่อ",
    slug: "bali-paradise-island",
    excerpt: "สำรวจความงดงามของบาลี จากวัดโบราณไปจนถึงชายหาดสวยๆ และวัฒนธรรมที่เป็นเอกลักษณ์",
    content: "...",
    author: {
      name: "Kadek Sari",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      role: "Local Guide"
    },
    publishedAt: "2024-02-10",
    readingTime: 10,
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1200&h=800&fit=crop",
    category: "Culture",
    tags: ["Indonesia", "Bali", "Temple", "Beach"],
    featured: false,
    views: 11200,
    likes: 670,
    hot: false
  },
  {
    id: "6",
    title: "สวิตเซอร์แลนด์: ความงามของเทือกเขาแอลป์",
    slug: "switzerland-alps",
    excerpt: "เดินทางไปยังหัวใจของยุโรป ชมวิวภูเขาที่งดงาม และสัมผัสวัฒนธรรมสวิส",
    content: "...",
    author: {
      name: "Hans Mueller",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      role: "Mountain Guide"
    },
    publishedAt: "2024-02-08",
    readingTime: 11,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    category: "Nature",
    tags: ["Switzerland", "Alps", "Mountains", "Hiking"],
    featured: false,
    views: 8900,
    likes: 445,
    hot: false
  }
]

// Category colors
const categoryColors: { [key: string]: string } = {
  'Adventure': 'bg-red-500 text-white',
  'City Guide': 'bg-blue-500 text-white',
  'Nature': 'bg-green-500 text-white',
  'Photography': 'bg-purple-500 text-white',
  'Culture': 'bg-orange-500 text-white',
  'Food': 'bg-yellow-500 text-white'
}

export default function Blog8Page() {
  const [posts] = useState<BlogPost[]>(mockBlogPosts)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showSearch, setShowSearch] = useState(false)
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
    // Load liked posts and search history
    const savedLikes = localStorage.getItem('blog-liked-posts')
    const savedHistory = localStorage.getItem('blog-search-history')
    if (savedLikes) setLikedPosts(JSON.parse(savedLikes))
    if (savedHistory) setSearchHistory(JSON.parse(savedHistory))
  }, [])

  const categories = useMemo(() => {
    return ['All', ...new Set(posts.map(post => post.category))]
  }, [posts])

  const featuredPost = useMemo(() => {
    return posts.find(post => post.featured)
  }, [posts])

  const trendingPosts = useMemo(() => {
    return posts.filter(post => post.hot).slice(0, 3)
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

  const toggleLike = (postId: string) => {
    const newLikedPosts = likedPosts.includes(postId) 
      ? likedPosts.filter(id => id !== postId)
      : [...likedPosts, postId]
    
    setLikedPosts(newLikedPosts)
    localStorage.setItem('blog-liked-posts', JSON.stringify(newLikedPosts))
  }

  const addToSearchHistory = (term: string) => {
    if (term.trim() && !searchHistory.includes(term)) {
      const newHistory = [term, ...searchHistory.slice(0, 4)]
      setSearchHistory(newHistory)
      localStorage.setItem('blog-search-history', JSON.stringify(newHistory))
    }
  }

  const performSearch = (term: string) => {
    setSearchTerm(term)
    addToSearchHistory(term)
    setShowSearch(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing stories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Magazine-style Header */}
      <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-600 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-lg">TM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Travel Magazine</h1>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Explore • Discover • Experience</p>
              </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search stories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:border-red-500 focus:outline-none transition-colors"
                />
                <SearchIcon />
              </div>
            </div>

            {/* Mobile Search */}
            <button
              onClick={() => setShowSearch(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <SearchIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay (Mobile) */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="p-4">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-3 pl-12 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-red-500 focus:outline-none text-lg"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <SearchIcon />
                </div>
              </div>
              <button
                onClick={() => setShowSearch(false)}
                className="px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
            </div>

            {!searchTerm ? (
              <div className="space-y-6">
                {/* Search History */}
                {searchHistory.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Recent Searches</h3>
                    <div className="space-y-2">
                      {searchHistory.map((term, index) => (
                        <button
                          key={index}
                          onClick={() => performSearch(term)}
                          className="block w-full text-left p-3 hover:bg-gray-100 rounded transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Categories */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Browse by Category</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.filter(cat => cat !== 'All').map(category => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category)
                          setShowSearch(false)
                        }}
                        className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-left"
                      >
                        <div className="font-medium">{category}</div>
                        <div className="text-sm text-gray-600">
                          {posts.filter(post => post.category === category).length} stories
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trending */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <FireIcon />
                    <span className="ml-2">Trending Now</span>
                  </h3>
                  <div className="space-y-3">
                    {trendingPosts.map(post => (
                      <button
                        key={post.id}
                        onClick={() => performSearch(post.title)}
                        className="flex items-center space-x-3 w-full p-3 hover:bg-gray-100 rounded transition-colors text-left"
                      >
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={48}
                          height={48}
                          className="rounded object-cover"
                        />
                        <div className="flex-1">
                          <div className="font-medium line-clamp-1">{post.title}</div>
                          <div className="text-sm text-gray-600">{post.views.toLocaleString()} views</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <p className="text-gray-600">
                    Found {filteredPosts.length} stories for "{searchTerm}"
                  </p>
                </div>
                <div className="space-y-4">
                  {filteredPosts.map(post => (
                    <Link
                      key={post.id}
                      href={`/blog-8/${post.slug}`}
                      onClick={() => setShowSearch(false)}
                      className="flex items-center space-x-4 p-3 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={64}
                        height={64}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold line-clamp-1">{post.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span className={`px-2 py-1 rounded text-xs ${categoryColors[post.category] || 'bg-gray-600'}`}>
                            {post.category}
                          </span>
                          <span>{post.readingTime} min read</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section - Magazine Style */}
        {featuredPost && selectedCategory === 'All' && (
          <section className="mb-12">
            <Link href={`/blog-8/${featuredPost.slug}`} className="group">
              <div className="relative h-[600px] rounded-lg overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`px-3 py-1 rounded text-sm font-medium ${categoryColors[featuredPost.category]}`}>
                      {featuredPost.category}
                    </span>
                    {featuredPost.hot && (
                      <span className="flex items-center space-x-1 px-2 py-1 bg-red-600 text-white rounded text-xs">
                        <FireIcon />
                        <span>HOT</span>
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    {featuredPost.title}
                  </h1>
                  
                  <p className="text-xl text-gray-200 mb-6 line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium">{featuredPost.author.name}</div>
                        <div className="text-sm text-gray-400">{featuredPost.author.role}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-gray-600">
                      <span className="flex items-center space-x-1">
                        <CalendarIcon />
                        <span>{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <ClockIcon />
                        <span>{featuredPost.readingTime} min</span>
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          toggleLike(featuredPost.id)
                        }}
                        className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                      >
                        <HeartIcon filled={likedPosts.includes(featuredPost.id)} />
                        <span>{featuredPost.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <FilterIcon />
            <h2 className="text-xl font-bold">Browse Stories</h2>
          </div>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
                {category !== 'All' && (
                  <span className="ml-2 opacity-75">
                    ({posts.filter(post => post.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-700">
              Found <span className="font-bold text-gray-900">{filteredPosts.length}</span> stories for 
              <span className="font-bold text-red-400"> "{searchTerm}"</span>
            </p>
          </div>
        )}

        {/* Posts Grid - Magazine Layout */}
        <div className="space-y-8">
          {filteredPosts.map((post, index) => (
            <Link 
              key={post.id} 
              href={`/blog-8/${post.slug}`}
              className="group block"
            >
              <article className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center space-x-8 p-6 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200`}>
                {/* Image */}
                <div className="w-1/3 relative h-64 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {post.hot && (
                    <div className="absolute top-3 left-3">
                      <span className="flex items-center space-x-1 px-2 py-1 bg-red-600 text-white rounded-full text-xs font-medium">
                        <FireIcon />
                        <span>HOT</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category]}`}>
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <CalendarIcon />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold group-hover:text-red-500 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex items-center space-x-2">
                    <TagIcon />
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <div className="text-sm font-medium">{post.author.name}</div>
                        <div className="text-xs text-gray-500">{post.author.role}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <ClockIcon />
                        <span>{post.readingTime} min</span>
                      </span>
                      <span>{post.views.toLocaleString()} views</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          toggleLike(post.id)
                        }}
                        className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${
                          likedPosts.includes(post.id) ? 'text-red-500' : ''
                        }`}
                      >
                        <HeartIcon filled={likedPosts.includes(post.id)} />
                        <span>{post.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <SearchIcon />
            </div>
            <h3 className="text-xl font-bold mb-2">No stories found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or browse different categories</p>
            <div className="flex space-x-3 justify-center">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
              >
                Show All Stories
              </button>
              <button
                onClick={() => setShowSearch(true)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded transition-colors"
              >
                New Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}