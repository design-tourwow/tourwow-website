'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Search, Filter, Calendar, User, Clock, Eye, ArrowRight,
  Grid, List, TrendingUp, Star, BookOpen, Globe, MapPin,
  ChevronDown, X, Hash, ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Author {
  name: string
  avatar: string
  bio: string
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: Author
  publishedAt: string
  readingTime: number
  image: string
  category: string
  tags: string[]
  featured: boolean
  views: number
  countries?: string[]
}

export default function TourWowBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')
  const [selectedTag, setSelectedTag] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const POSTS_PER_PAGE = 20
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Load more posts function
  const loadMorePosts = useCallback(() => {
    if (loadingMore || !hasMore || searchTerm || selectedCategory !== 'ทั้งหมด' || selectedTag) return
    
    setLoadingMore(true)
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      const nextPage = currentPage + 1
      const startIndex = 0
      const endIndex = nextPage * POSTS_PER_PAGE
      const newPosts = allPosts.slice(startIndex, endIndex)
      
      setPosts(newPosts)
      setCurrentPage(nextPage)
      setHasMore(endIndex < allPosts.length)
      setLoadingMore(false)
    }, 500)
  }, [loadingMore, hasMore, searchTerm, selectedCategory, selectedTag, currentPage, allPosts])

  const lastPostElementRef = useCallback((node: HTMLElement | null) => {
    if (loadingMore) return
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !searchTerm && selectedCategory === 'ทั้งหมด' && !selectedTag) {
        loadMorePosts()
      }
    }, {
      threshold: 0.1,
      rootMargin: '100px'
    })
    if (node) observerRef.current.observe(node)
  }, [loadingMore, hasMore, searchTerm, selectedCategory, selectedTag, loadMorePosts])

  // Load all posts initially
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(`/api/blog?limit=1000`) // Get all posts
        if (response.ok) {
          const data = await response.json()
          const articles = data.articles || data || []
          setAllPosts(articles)
          setPosts(articles) // Show all posts immediately
          setFeaturedPosts(articles.filter((post: BlogPost) => post.featured).slice(0, 3))
          setHasMore(false) // No pagination needed
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllPosts()
  }, [])

  // Get unique categories and tags from all posts
  const categories = useMemo(() => {
    const cats = ['ทั้งหมด', ...new Set(allPosts.map(post => post.category).filter(Boolean))]
    return cats
  }, [allPosts])

  const tags = useMemo(() => {
    const allTags = allPosts.flatMap(post => post.tags || [])
    return [...new Set(allTags)].slice(0, 20) // Top 20 tags
  }, [allPosts])

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    // Always use all posts since we removed pagination
    const postsToFilter = allPosts

    let filtered = postsToFilter.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'ทั้งหมด' || post.category === selectedCategory
      const matchesTag = selectedTag === '' || (post.tags && post.tags.includes(selectedTag))
      
      return matchesSearch && matchesCategory && matchesTag
    })

    // Sort posts
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
        break
      case 'reading-time':
        filtered.sort((a, b) => a.readingTime - b.readingTime)
        break
      default: // latest
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    }

    return filtered
  }, [posts, allPosts, searchTerm, selectedCategory, selectedTag, sortBy])

  // Reset pagination when search/filter changes
  useEffect(() => {
    // Always show all posts - no pagination
    setPosts(allPosts) 
    setCurrentPage(1)
    setHasMore(false)
  }, [searchTerm, selectedCategory, selectedTag, allPosts])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg mb-8 w-96"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            TourWow Blog
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            เรื่องราวการเดินทาง
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}ที่น่าสนใจ
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ค้นพบเรื่องราวการเดินทางที่น่าตื่นเต้น คำแนะนำจากผู้เชี่ยวชาญ และข้อมูลท่องเที่ยวที่จะทำให้การเดินทางของคุณน่าจดจำ
          </p>
        </div>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <Star className="w-6 h-6 text-yellow-500 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">บทความแนะนำ</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <Link 
                  key={post.id} 
                  href={`/tourwow-blog/${post.slug}`}
                  className={`group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 ${
                    index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                  }`}
                >
                  <div className={`relative ${index === 0 ? 'h-96' : 'h-64'}`}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          แนะนำ
                        </div>
                        <div className="ml-auto flex items-center text-sm opacity-90">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readingTime} นาที
                        </div>
                      </div>
                      <h3 className={`font-bold mb-2 line-clamp-2 ${index === 0 ? 'text-2xl' : 'text-lg'}`}>
                        {post.title}
                      </h3>
                      <p className={`opacity-90 line-clamp-2 ${index === 0 ? 'text-base' : 'text-sm'}`}>
                        {post.excerpt}
                      </p>
                      <div className="flex items-center mt-4">
                        <span className="text-sm opacity-75">{post.author.name}</span>
                        <span className="mx-2 opacity-50">•</span>
                        <span className="text-sm opacity-75">
                          {new Date(post.publishedAt).toLocaleDateString('th-TH')}
                        </span>
                        <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ค้นหาบทความ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                />
              </div>
            </div>


            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-2xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-md text-blue-600' : 'text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-md text-blue-600' : 'text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">หมวดหมู่</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">เรียงลำดับ</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    <option value="latest">ล่าสุด</option>
                    <option value="oldest">เก่าสุด</option>
                    <option value="popular">ยอดนิยม</option>
                    <option value="reading-time">เวลาอ่านสั้น</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('ทั้งหมด')
                      setSelectedTag('')
                      setSortBy('latest')
                    }}
                    className="w-full p-3 rounded-xl"
                  >
                    ล้างตัวกรอง
                  </Button>
                </div>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">แท็กยอดนิยม</label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedTag === tag
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Hash className="w-3 h-3 mr-1 inline" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600">
            {searchTerm ? (
              <>
                ผลการค้นหา "<span className="font-medium text-gray-900">{searchTerm}</span>" 
                พบ <span className="font-semibold text-blue-600">{filteredAndSortedPosts.length}</span> บทความ
              </>
            ) : (
              <>
                แสดง <span className="font-semibold text-blue-600">{filteredAndSortedPosts.length}</span> บทความทั้งหมด
              </>
            )}
          </p>
          
          {/* Active Filters */}
          <div className="flex items-center gap-2">
            {selectedCategory !== 'ทั้งหมด' && (
              <span className="inline-flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('ทั้งหมด')} className="ml-2">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedTag && (
              <span className="inline-flex items-center bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                #{selectedTag}
                <button onClick={() => setSelectedTag('')} className="ml-2">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Blog Posts Grid/List */}
        {filteredAndSortedPosts.length > 0 ? (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-8'
          }`}>
            {filteredAndSortedPosts.map((post, index) => (
              <article 
                key={post.id} 
                className={`group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                  viewMode === 'grid' 
                    ? 'transform hover:-translate-y-2' 
                    : 'flex items-center p-6'
                }`}
              >
                <Link href={`/tourwow-blog/${post.slug}`} className="block h-full">
                  {viewMode === 'grid' ? (
                    // Grid View
                    <>
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {post.featured && (
                          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            แนะนำ
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <User className="w-4 h-4 mr-2" />
                          <span className="mr-auto">{post.author.name}</span>
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{new Date(post.publishedAt).toLocaleDateString('th-TH')}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                          {post.excerpt}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(post.tags || []).slice(0, 3).map(tag => (
                            <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{post.readingTime} นาที</span>
                            {post.views && (
                              <>
                                <Eye className="w-4 h-4 ml-3 mr-1" />
                                <span>{post.views.toLocaleString()}</span>
                              </>
                            )}
                          </div>
                          <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </>
                  ) : (
                    // List View - Compact Design
                    <div className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors">
                      {/* Compact Image */}
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                        {post.featured && (
                          <div className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                          {post.title}
                        </h3>
                        
                        {/* Meta info */}
                        <div className="flex items-center text-xs text-gray-500 mb-2 flex-wrap gap-2">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{post.author.name}</span>
                          </div>
                          <span className="text-gray-300">•</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(post.publishedAt).toLocaleDateString('th-TH')}</span>
                          </div>
                          <span className="text-gray-300">•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readingTime} นาที</span>
                          </div>
                          {post.views && (
                            <>
                              <span className="text-gray-300">•</span>
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>{post.views.toLocaleString()}</span>
                              </div>
                            </>
                          )}
                        </div>
                        
                        {/* Excerpt */}
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {(post.tags || []).slice(0, 2).map(tag => (
                              <span key={tag} className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
                                <Hash className="w-2 h-2 mr-1 inline" />
                                {tag}
                              </span>
                            ))}
                            {(post.tags || []).length > 2 && (
                              <span className="text-xs text-gray-400 px-2 py-1">
                                +{(post.tags || []).length - 2} เพิ่มเติม
                              </span>
                            )}
                          </div>
                          <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        </div>
                      </div>
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
            <div className="max-w-md mx-auto">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-700 mb-4">ไม่พบบทความ</h3>
              <p className="text-gray-500 mb-8">
                ขออภัย, ไม่พบบทความที่ตรงกับเงื่อนไขการค้นหาของคุณ ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองใหม่
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('ทั้งหมด')
                  setSelectedTag('')
                  setShowFilters(false)
                }}
                className="px-8 py-3 rounded-2xl"
              >
                ล้างตัวกรองทั้งหมด
              </Button>
            </div>
          </div>
        )}

        {/* Show total count */}
        <div className="text-center mt-16 text-gray-600">
          <p>แสดงผลลัพธ์ทั้งหมด {filteredAndSortedPosts.length} บทความ</p>
        </div>

      </div>
    </div>
  )
}