import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Find article by slug (urlPath) or ID
    const article = await prisma.seoArticle.findFirst({
      where: {
        OR: [
          { urlPath: `/blog/${slug}` },
          { urlPath: `/${slug}` },
          { id: parseInt(slug) || 0 }
        ],
        isActive: 1,
        hasContent: 1,
        seoArticleTypeId: 2, // Only show Support Articles (blog content)
      },
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

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Extract slug from urlPath and clean it
    let articleSlug = article.urlPath?.replace('/blog/', '') || article.id.toString();
    // Remove leading and trailing slashes
    articleSlug = articleSlug.replace(/^\/+|\/+$/g, '');
    
    // Extract excerpt from content
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

    const transformedArticle = {
      id: article.id.toString(),
      title: article.name,
      slug: articleSlug,
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

    return NextResponse.json(transformedArticle);

  } catch (error) {
    console.error('Error fetching blog article:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 