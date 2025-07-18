import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Test database connection with a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`
    
    // Get table counts for verification
    const counts = await Promise.all([
      prisma.productPool.count(),
      prisma.seoArticle.count(),
      prisma.agencyBlog.count(),
      prisma.twPage.count(),
      prisma.blogDescription.count()
    ])

    const [productPoolCount, seoArticleCount, agencyBlogCount, twPageCount, blogDescriptionCount] = counts

    return NextResponse.json({
      status: 'ok',
      database: {
        connected: true,
        test_query: result,
        tables: {
          product_pools: productPoolCount,
          agcy_seo_articles: seoArticleCount,
          agcy_blogs: agencyBlogCount,
          tw_pages: twPageCount,
          agcy_blog_descriptions: blogDescriptionCount
        }
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database health check failed:', error)
    return NextResponse.json(
      {
        status: 'error',
        database: {
          connected: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        },
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}