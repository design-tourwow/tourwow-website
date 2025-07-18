import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const sortBy = searchParams.get('sortBy') || 'latest';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      isActive: 1,
      hasContent: 1,
      seoArticleTypeId: 2, // Only show Support Articles (blog content)
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Build order by clause
    let orderBy: any = {};
    switch (sortBy) {
      case 'latest':
        orderBy.createdAt = 'desc';
        break;
      case 'oldest':
        orderBy.createdAt = 'asc';
        break;
      case 'title':
        orderBy.name = 'asc';
        break;
      default:
        orderBy.createdAt = 'desc';
    }

    // Get total count
    const total = await prisma.seoArticle.count({ where });

    // Get articles
    const articles = await prisma.seoArticle.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        urlPath: true,
        content: true,
        tags: true,
        createdAt: true,
        desktopCoverImageFileName: true,
        mobileCoverImageFileName: true,
        coverImageAltText: true,
        metaDescription: true,
      },
    });

    // Transform data to match frontend interface
    const transformedArticles = articles.map(article => {
      // Extract slug from urlPath and clean it
      let slug = article.urlPath?.replace('/blog/', '') || article.id.toString();
      // Remove leading and trailing slashes
      slug = slug.replace(/^\/+|\/+$/g, '');
      
      // Extract excerpt from content (first 200 characters)
      const excerpt = article.content 
        ? article.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'
        : '';

      // Generate cover image URL from agcy_seo_articles
      let image = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'; // Default fallback
      
      if (article.desktopCoverImageFileName) {
        // Remove file extension from desktop_cover_image_file_name
        const fileNameWithoutExt = article.desktopCoverImageFileName.replace(/\.(jpg|jpeg|png|webp)$/i, '');
        // Format: https://media-prod.twbits.com/seo_articles/[id]/[desktop_cover_image_file_name (without extension)]_preview.webp
        image = `https://media-prod.twbits.com/seo_articles/${article.id}/${fileNameWithoutExt}_preview.webp`;
      }

      // Parse tags
      let tags: string[] = [];
      if (article.tags) {
        try {
          tags = JSON.parse(article.tags);
        } catch (e) {
          tags = [];
        }
      }

      return {
        id: article.id.toString(),
        title: article.name,
        slug: slug,
        excerpt: excerpt,
        content: article.content || '',
        author: {
          name: 'TourWow Team',
          avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
          bio: 'ทีมงาน TourWow ผู้เชี่ยวชาญด้านการท่องเที่ยว'
        },
        publishedAt: article.createdAt?.toISOString() || new Date().toISOString(),
        readingTime: Math.ceil((article.content?.length || 0) / 200), // Rough estimate
        image: image,
        category: 'บทความท่องเที่ยว',
        tags: tags,
        featured: false,
        views: 0,
      };
    });

    return NextResponse.json({
      articles: transformedArticles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching blog articles:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 