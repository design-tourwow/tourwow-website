import { notFound } from 'next/navigation';
import { LoadingProvider } from '@/components/LoadingProvider';
import TableOfContents from '@/components/TableOfContents';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, User, Clock, ArrowLeft, Tag, Share2, BookOpen, 
  Eye, Heart, MessageCircle, ChevronRight, Hash, TrendingUp,
  Star, Globe, MapPin, Coffee, PenTool, ThumbsUp
} from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  publishedAt: string
  readingTime: number
  image: string
  category: string
  tags: string[]
  featured: boolean
  views: number;
  countries?: string[]
  faqs?: { q: string; a: string }[]
}

interface TableOfContentsItem {
  id: string
  title: string
  level: number
}

type Props = {
  params: Promise<{ slug: string }>
}

// Function to extract headings from HTML content
function extractHeadings(content: string): TableOfContentsItem[] {
  const headings: TableOfContentsItem[] = [];
  const headingRegex = /<h2[^>]*>(.*?)<\/h2>/gi;
  let match;
  let idCounter = 1;

  while ((match = headingRegex.exec(content)) !== null) {
    const title = match[1].replace(/<[^>]*>/g, '').trim();
    
    if (title) {
      headings.push({
        id: `heading-${idCounter}`,
        title,
        level: 2
      });
      idCounter++;
    }
  }

  return headings;
}

// Function to add IDs to headings in content
function addHeadingIds(content: string): string {
  let idCounter = 1;
  return content.replace(/<h2[^>]*>(.*?)<\/h2>/gi, (match, title) => {
    const cleanTitle = title.replace(/<[^>]*>/g, '').trim();
    if (cleanTitle) {
      const id = `heading-${idCounter}`;
      idCounter++;
      return `<h2 id="${id}">${title}</h2>`;
    }
    return match;
  });
}

// Generate metadata for the page
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/${slug}`);
    if (!response.ok) {
      return {
        title: 'ไม่พบบทความ',
        description: 'ขออภัย ไม่พบบทความที่คุณกำลังค้นหา',
      }
    }
    
    const post: BlogPost = await response.json();

    const previousImages = (await parent).openGraph?.images || []

    return {
      title: `${post.title} - TourWow Blog`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `https://tourwow.com/tourwow-blog/${post.slug}`,
        images: [
          {
            url: post.image,
            width: 1200,
            height: 630,
            alt: post.title,
          },
          ...previousImages,
        ],
      },
    }
  } catch (error) {
    return {
      title: 'ไม่พบบทความ',
      description: 'ขออภัย ไม่พบบทความที่คุณกำลังค้นหา',
    }
  }
}

// Component to render the blog detail page
export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/${slug}`);
    if (!response.ok) {
      return notFound();
    }
    
    const post: BlogPost = await response.json();

    // Extract headings and add IDs to content
    const headings = extractHeadings(post.content);
    const contentWithIds = addHeadingIds(post.content);

    // Fetch related posts
    const relatedResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog?limit=10`);
    let relatedPosts: BlogPost[] = [];
    
    if (relatedResponse.ok) {
      const data = await relatedResponse.json();
      relatedPosts = (data.articles || [])
        .filter((p: BlogPost) => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
        .slice(0, 3);
    }

    return (
      <LoadingProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <main>
            {/* Hero Section with Image */}
            <div className="relative h-[70vh] overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
              
              {/* Breadcrumb */}
              <div className="absolute top-8 left-0 right-0 z-10">
                <div className="container mx-auto px-4">
                  <Link 
                    href="/tourwow-blog" 
                    className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white hover:bg-white/30 font-medium px-4 py-2 rounded-full transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    กลับไปหน้าบทความทั้งหมด
                  </Link>
                </div>
              </div>

              {/* Reading Progress Bar */}
              <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300" style={{width: '0%'}} id="reading-progress" />
              
              {/* Hero Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="container mx-auto">
                  <div className="max-w-4xl">
                    {/* Category & Tags */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                        {post.category}
                      </span>
                      {(post.tags || []).slice(0, 3).map(tag => (
                        <span key={tag} className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full">
                          <Hash className="w-3 h-3 mr-1 inline" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                      {post.title}
                    </h1>
                    
                    <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
                      {post.excerpt}
                    </p>
                    
                    {/* Article Meta */}
                    <div className="flex flex-wrap items-center gap-6 text-white/80">
                      <div className="flex items-center gap-3">
                        <Image 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          width={48} 
                          height={48} 
                          className="rounded-full ring-2 ring-white/30" 
                        />
                        <div>
                          <p className="font-semibold text-white">{post.author.name}</p>
                          <p className="text-sm text-white/70">{post.author.bio}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.publishedAt).toLocaleDateString('th-TH')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{post.readingTime} นาที</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span>{(post.views || 0).toLocaleString()} ครั้ง</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                
                {/* Main Content */}
                <div className="lg:col-span-3">
                  {/* Social Share Bar */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600 font-medium">แชร์บทความนี้:</span>
                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <Share2 className="w-4 h-4" />
                            Facebook
                          </button>
                          <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors">
                            <Share2 className="w-4 h-4" />
                            Twitter
                          </button>
                          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <Share2 className="w-4 h-4" />
                            LINE
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5" />
                          <span className="text-sm">42</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <ThumbsUp className="w-5 h-5" />
                          <span className="text-sm">128</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Article Content */}
                  <article className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="p-8 md:p-12">
                      <div className="prose prose-lg prose-blue max-w-none">
                        <div 
                          className="leading-relaxed text-gray-700 prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-img:rounded-2xl prose-img:shadow-lg prose-a:text-blue-600 prose-a:font-medium hover:prose-a:text-blue-800 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg"
                          dangerouslySetInnerHTML={{ __html: contentWithIds }} 
                          style={{ scrollBehavior: 'smooth' }}
                        />
                      </div>
                    </div>
                  </article>

                  {/* Tags Section */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-blue-600" />
                      แท็กที่เกี่ยวข้อง
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {(post.tags || []).map(tag => (
                        <Link
                          key={tag}
                          href={`/tourwow-blog?tag=${encodeURIComponent(tag)}`}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 text-blue-800 font-medium px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
                        >
                          <Hash className="w-3 h-3" />
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Author Bio Section */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-xl p-8 mt-8 text-white">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <PenTool className="w-6 h-6" />
                      เกี่ยวกับผู้เขียน
                    </h3>
                    <div className="flex items-start gap-6">
                      <Image 
                        src={post.author.avatar} 
                        alt={post.author.name} 
                        width={80} 
                        height={80} 
                        className="rounded-full ring-4 ring-white/30" 
                      />
                      <div className="flex-1">
                        <h4 className="text-xl font-bold mb-2">{post.author.name}</h4>
                        <p className="text-white/90 leading-relaxed mb-4">{post.author.bio}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="bg-white/20 px-3 py-1 rounded-full">ผู้เชี่ยวชาญด้านการท่องเที่ยว</span>
                          <span className="bg-white/20 px-3 py-1 rounded-full">นักเขียนมืออาชีพ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-1 space-y-8">
                  {/* Table of Contents */}
                  <TableOfContents headings={headings} />

                  {/* Quick Stats */}
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      สถิติบทความ
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">จำนวนผู้อ่าน</span>
                        <span className="font-bold text-blue-600">{(post.views || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">เวลาอ่าน</span>
                        <span className="font-bold text-purple-600">{post.readingTime} นาที</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">ความยาว</span>
                        <span className="font-bold text-green-600">{Math.floor((post.content?.length || 0) / 100)} ย่อหน้า</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">แท็ก</span>
                        <span className="font-bold text-orange-600">{(post.tags || []).length} แท็ก</span>
                      </div>
                    </div>
                  </div>

                  {/* Newsletter Signup */}
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                    <div className="text-center">
                      <Coffee className="w-12 h-12 mx-auto mb-4 text-white/80" />
                      <h3 className="text-lg font-bold mb-3">รับข่าวสารล่าสุด</h3>
                      <p className="text-white/90 text-sm mb-4">
                        สมัครรับบทความใหม่ๆ เคล็ดลับการเดินทาง และข้อเสนอพิเศษ
                      </p>
                      <button className="w-full bg-white text-blue-600 font-semibold py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors">
                        สมัครเลย (ฟรี)
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
              
              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <div className="mt-20">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full mb-6">
                      <Star className="w-4 h-4 mr-2" />
                      แนะนำสำหรับคุณ
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      บทความที่เกี่ยวข้อง
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                      ค้นพบเรื่องราวการเดินทางและคำแนะนำอื่นๆ ที่น่าสนใจ
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedPosts.map((relatedPost, index) => (
                      <Link 
                        href={`/tourwow-blog/${relatedPost.slug}`} 
                        key={relatedPost.id} 
                        className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <Image 
                            src={relatedPost.image} 
                            alt={relatedPost.title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-4 right-4">
                            <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
                              {index + 1}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(relatedPost.publishedAt).toLocaleDateString('th-TH')}</span>
                            <span className="mx-2">•</span>
                            <Clock className="w-4 h-4" />
                            <span>{relatedPost.readingTime} นาที</span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {relatedPost.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {(relatedPost.tags || []).slice(0, 2).map(tag => (
                                <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-2 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      </LoadingProvider>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return notFound();
  }
}