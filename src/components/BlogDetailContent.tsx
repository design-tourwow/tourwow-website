'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User, Tag, ArrowLeft, Heart, Share2, Facebook, Twitter, Copy, Check, Menu, X } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ReactMarkdown from 'react-markdown'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface BlogDetailContentProps {
  post: any
  relatedPosts: any[]
}

export default function BlogDetailContent({ post, relatedPosts }: BlogDetailContentProps) {
  const [toc, setToc] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)
  const [tocOpen, setTocOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  // Generate Table of Contents
  useEffect(() => {
    if (!contentRef.current) return
    
    const headings = Array.from(contentRef.current.querySelectorAll('h2, h3'))
    const tocItems = headings.map((el) => {
      const text = el.textContent || ''
      const id = text.replace(/\s+/g, '-').toLowerCase().replace(/[^\w\-ภาษาไทย]/g, '')
      el.id = id
      return {
        id,
        text,
        level: el.tagName === 'H2' ? 2 : 3,
      }
    })
    setToc(tocItems)
  }, [post.content])

  // Scroll spy and progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current || toc.length === 0) return
      
      // Update scroll progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setScrollProgress(scrolled)
      
      // Update active TOC item
      const headings = Array.from(contentRef.current.querySelectorAll('h2, h3'))
      let currentActiveId = ''
      
      for (const heading of headings) {
        const rect = heading.getBoundingClientRect()
        if (rect.top <= 120) {
          currentActiveId = heading.id
        }
      }
      
      setActiveId(currentActiveId)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    return () => window.removeEventListener('scroll', handleScroll)
  }, [toc])

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}/tourwow-blog/${post.slug}`
      await navigator.clipboard.writeText(url)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = `${window.location.origin}/tourwow-blog/${post.slug}`
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  // Social sharing URLs
  const getShareUrls = () => {
    const url = encodeURIComponent(`${window.location.origin}/tourwow-blog/${post.slug}`)
    const text = encodeURIComponent(post.title)
    
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      line: `https://social-plugins.line.me/lineit/share?url=${url}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`,
    }
  }

  const shareUrls = getShareUrls()

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "description": post.author.bio
    },
    "publisher": {
      "@type": "Organization",
      "name": "TourWow",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tourwow.com/logo.png"
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tourwow.com/tourwow-blog/${post.slug}`
    },
    "keywords": post.tags.join(", "),
    "articleSection": post.category,
    "wordCount": post.content.split(' ').length,
    "timeRequired": `PT${post.readingTime}M`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile TOC Toggle */}
      <button
        onClick={() => setTocOpen(!tocOpen)}
        className="fixed bottom-6 right-6 z-40 lg:hidden bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label={tocOpen ? "ปิดสารบัญ" : "เปิดสารบัญ"}
        aria-expanded={tocOpen}
        aria-controls="mobile-toc"
      >
        {tocOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile TOC Overlay */}
      {tocOpen && (
        <div className="fixed inset-0 z-30 lg:hidden" role="dialog" aria-modal="true" aria-labelledby="mobile-toc-title">
          <div className="absolute inset-0 bg-black/50" onClick={() => setTocOpen(false)} />
          <div id="mobile-toc" className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 id="mobile-toc-title" className="text-lg font-bold">📑 สารบัญ</h2>
              <button 
                onClick={() => setTocOpen(false)}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
                aria-label="ปิดสารบัญ"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <nav className="space-y-2" role="navigation" aria-label="สารบัญบทความ">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setTocOpen(false)}
                  className={`block py-2 px-3 rounded-md text-sm transition-all ${
                    item.level === 3 ? 'ml-4' : ''
                  } ${
                    activeId === item.id
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop TOC Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-lg">
                <h2 className="text-base font-bold mb-3 text-gray-900 border-b border-blue-100 pb-2 flex items-center">
                  📑 <span className="ml-2">สารบัญ</span>
                </h2>
                <nav className="space-y-1 max-h-80 overflow-y-auto">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-2 px-3 rounded-lg text-sm transition-all duration-200 leading-tight ${
                        item.level === 3 ? 'ml-3 text-xs' : ''
                      } ${
                        activeId === item.id
                          ? 'bg-blue-50 text-blue-700 font-semibold border-l-3 border-blue-500 shadow-sm'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-25'
                      }`}
                      title={item.text}
                    >
                      <div className="truncate">
                        {item.level === 3 ? '• ' : ''}{item.text}
                      </div>
                    </a>
                  ))}
                </nav>
                
                {/* Progress indicator */}
                <div className="mt-4 pt-3 border-t border-blue-100">
                  <div className="text-xs text-gray-500 mb-2">ความคืบหน้า</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${scrollProgress}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">{Math.round(scrollProgress)}%</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center mb-6 text-sm text-gray-600 bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100">
              <Link href="/" className="hover:text-blue-600 transition-colors">🏠 หน้าหลัก</Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link href="/tourwow-blog" className="hover:text-blue-600 transition-colors">📝 บล็อก</Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900 truncate font-medium">{post.title}</span>
            </nav>
            
            {/* Back Button */}
            <Link 
              href="/tourwow-blog"
              className="inline-flex items-center text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-3 rounded-xl mb-8 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> 
              กลับหน้าบล็อก
            </Link>

            {/* Article Header */}
            <header className="mb-10 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                  📂 {post.category}
                </span>
                <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(post.publishedAt).toLocaleDateString('th-TH', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-full">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>⏱️ {post.readingTime} นาทีในการอ่าน</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
              
              {/* Author Info */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 ring-2 ring-blue-100">
                    <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">✍️ {post.author.name}</p>
                    <p className="text-sm text-gray-600">{post.author.bio}</p>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm font-medium">ถูกใจ</span>
                  </button>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden mb-10 shadow-2xl">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-500" 
                priority
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Article Content */}
            <div ref={contentRef} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-10">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 
                      className="text-3xl font-bold mt-8 mb-6 text-gray-900 border-b border-gray-200 pb-3" 
                      id={String(children).replace(/\s+/g, '-').toLowerCase().replace(/[^\w\-ภาษาไทย]/g, '')}
                    >
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 
                      className="text-2xl font-bold mt-10 mb-5 text-gray-900 flex items-center scroll-mt-24" 
                      id={String(children).replace(/\s+/g, '-').toLowerCase().replace(/[^\w\-ภาษาไทย]/g, '')}
                    >
                      <span className="w-1 h-8 bg-blue-500 mr-3 rounded-full"></span>
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 
                      className="text-xl font-bold mt-8 mb-4 text-gray-900 scroll-mt-24" 
                      id={String(children).replace(/\s+/g, '-').toLowerCase().replace(/[^\w\-ภาษาไทย]/g, '')}
                    >
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-6 text-gray-700 leading-relaxed text-lg">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-none mb-6 text-gray-700 space-y-3">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-6 text-gray-700 space-y-3 ml-4">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                      <span>{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900 bg-yellow-100 px-1 rounded">{children}</strong>
                  ),
                  em: ({ children }) => <em className="italic text-gray-600">{children}</em>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-6 my-8 bg-blue-50 py-4 rounded-r-lg italic text-gray-700 text-lg">
                      {children}
                    </blockquote>
                  ),
                  img: ({ src, alt }) => (
                    <div className="my-8 rounded-2xl overflow-hidden shadow-xl">
                      <Image 
                        src={src || ''} 
                        alt={alt || ''} 
                        width={800} 
                        height={400} 
                        className="object-cover w-full h-auto"
                        quality={95}
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* FAQ Product Snippets */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="mb-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center flex items-center justify-center">
                    <span className="text-3xl mr-3">💡</span>
                    คำถามที่พบบ่อย
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {post.faqs.map((faq: any, idx: number) => (
                      <div key={idx} className="group relative">
                        {/* Product Snippet Card */}
                        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl p-6 border border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                          {/* Header */}
                          <div className="flex items-start mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                              <span className="text-2xl">🎯</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">FAQ #{idx + 1}</span>
                                <span className="ml-auto text-xs text-gray-500">💬 คำถาม</span>
                              </div>
                              <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors">
                                {faq.q}
                              </h3>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1">
                            <p className="text-gray-700 leading-relaxed text-base mb-4">
                              {faq.a}
                            </p>
                          </div>
                          
                          {/* Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              ตอบแล้ว
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform">
                              อ่านเพิ่มเติม
                              <span className="ml-1">→</span>
                            </button>
                          </div>
                        </div>
                        
                        {/* Structured Data */}
                        <script 
                          type="application/ld+json"
                          dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                              "@context": "https://schema.org",
                              "@type": "Question",
                              "name": faq.q,
                              "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.a
                              }
                            })
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Call to Action */}
                  <div className="mt-8 text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">มีคำถามเพิ่มเติม?</h3>
                      <p className="text-blue-100 mb-4">ทีมงานผู้เชี่ยวชาญพร้อมให้คำปรึกษาฟรี</p>
                      <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                        💬 ถามคำถาม
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Tags */}
            <div className="mb-10 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="text-2xl mr-3">🏷️</span>
                แท็กที่เกี่ยวข้อง
              </h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag: string, index: number) => (
                  <Link
                    key={index}
                    href={`/tourwow-blog?tag=${encodeURIComponent(tag)}`}
                    className="flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:from-blue-200 hover:to-purple-200 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Social Sharing */}
            <div className="mb-12 bg-blue-50 rounded-2xl p-6 border border-blue-100 shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center justify-center mb-2">
                  <Share2 className="w-5 h-5 mr-2 text-blue-600" />
                  แชร์บทความนี้
                </h3>
                <p className="text-gray-600 text-sm">แบ่งปันเรื่องราวดีๆ ให้เพื่อนๆ ได้อ่านกัน</p>
              </div>
              <div className="flex justify-center gap-3 flex-wrap">
                <a
                  href={shareUrls.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg text-sm font-medium"
                  title="แชร์ใน Facebook"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </a>
                <a
                  href={shareUrls.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors duration-200 shadow-md hover:shadow-lg text-sm font-medium"
                  title="แชร์ใน Twitter"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </a>
                <a
                  href={shareUrls.line}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-md hover:shadow-lg text-sm font-medium"
                  title="แชร์ใน Line"
                >
                  <span className="text-base mr-2">💬</span>
                  Line
                </a>
                <a
                  href={shareUrls.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg text-sm font-medium"
                  title="แชร์ใน WhatsApp"
                >
                  <span className="text-base mr-2">📱</span>
                  WhatsApp
                </a>
                <button
                  onClick={handleCopyLink}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium ${
                    copySuccess
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                  title="คัดลอกลิงก์"
                >
                  {copySuccess ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      คัดลอกแล้ว!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      คัดลอกลิงก์
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Author Bio */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12 border border-blue-100 shadow-lg">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white shadow-lg">
                  <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 flex items-center">
                    <span className="text-2xl mr-2">👨‍💼</span>
                    เกี่ยวกับ {post.author.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-4">{post.author.bio}</p>
                  <div className="flex flex-wrap gap-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium bg-white px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                      📧 ติดตามนักเขียน
                    </button>
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium bg-white px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
                      📝 บทความอื่นๆ
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mb-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center flex items-center justify-center">
                    <span className="text-3xl mr-3">📚</span>
                    บทความที่น่าสนใจอื่นๆ
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/tourwow-blog/${relatedPost.slug}`} className="group">
                        <article className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 h-full flex flex-col">
                          <div className="relative h-48 overflow-hidden">
                            <Image 
                              src={relatedPost.image} 
                              alt={relatedPost.title} 
                              fill 
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              quality={90}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                                {relatedPost.category}
                              </span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight flex-shrink-0">
                              {relatedPost.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed flex-1">
                              {relatedPost.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-3 border-t border-gray-200">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  <span>{relatedPost.readingTime} นาที</span>
                                </div>
                                <div className="flex items-center">
                                  <User className="w-3 h-3 mr-1" />
                                  <span>{relatedPost.author.name}</span>
                                </div>
                              </div>
                              <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                                อ่านต่อ →
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                  
                  {/* View All Posts Button */}
                  <div className="text-center mt-8">
                    <Link 
                      href="/tourwow-blog"
                      className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
                    >
                      <span className="mr-2">📖</span>
                      ดูบทความทั้งหมด
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* Enhanced Comments Section */}
            <section className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center flex items-center justify-center">
                <span className="text-3xl mr-3">💬</span>
                แสดงความคิดเห็น
              </h2>
              
              {/* Functional Comment Form */}
              <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold mb-4 text-blue-900">เขียนความคิดเห็นของคุณ</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="ชื่อของคุณ *"
                      className="px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200 hover:border-blue-400"
                    />
                    <input
                      type="email"
                      placeholder="อีเมลของคุณ *"
                      className="px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200 hover:border-blue-400"
                    />
                  </div>
                  <textarea
                    placeholder="แบ่งปันความคิดเห็น ประสบการณ์ หรือคำถามของคุณ..."
                    rows={4}
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-white transition-all duration-200 hover:border-blue-400"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input type="checkbox" id="notify" className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500" />
                      <label htmlFor="notify" className="ml-2 text-sm text-gray-600">แจ้งเตือนเมื่อมีการตอบกลับ</label>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center">
                      <span className="mr-2">💬</span>
                      โพสต์ความคิดเห็น
                    </button>
                  </div>
                </div>
              </div>

              {/* Sample Comments */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-start space-x-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                      <span className="text-xl">👤</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">สมชาย นักเดินทาง</h4>
                        <span className="text-sm text-gray-500">2 วันที่แล้ว</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        บทความนี้มีประโยชน์มากเลยครับ! ได้ข้อมูลใหม่ๆ เยอะ โดยเฉพาะเรื่องการเตรียมตัวก่อนเดินทาง ขอบคุณที่แชร์ประสบการณ์ดีๆ แบบนี้
                      </p>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">ตอบกลับ</button>
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-start space-x-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center">
                      <span className="text-xl">👩</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">มาลี ทราเวล</h4>
                        <span className="text-sm text-gray-500">1 สัปดาห์ที่แล้ว</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        ขอบคุณสำหรับเคล็ดลับดีๆ เหล่านี้ค่ะ ได้ลองใช้แล้วจริงๆ และได้ผลมาก ทำให้การเดินทางสนุกและคุ้มค่ามากขึ้น
                      </p>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">ตอบกลับ</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            </div>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}