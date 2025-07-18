import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ 'tour-code': string }>
}

// Helper function to get tour data for metadata
async function getTourData(tourCode: string) {
  try {
    // Try to fetch from TTN API first for metadata
    const response = await fetch("https://online.ttnconnect.com/api/agency/get-allprogram")
    if (response.ok) {
      const data = await response.json()
      if (Array.isArray(data)) {
        for (const item of data) {
          const program = item.program?.[0]
          if (program?.P_CODE === tourCode) {
            return {
              title: program.P_NAME || 'ทัวร์',
              location: program.P_LOCATION || '',
              price: parseInt(program.P_PRICE) || 0,
              days: parseInt(program.P_DAY) || 0,
              nights: parseInt(program.P_NIGHT) || 0,
              image: program.BANNER || '',
              highlights: program.P_HIGHLIGHT || ''
            }
          }
        }
      }
    }
    return null
  } catch (error) {
    console.error('Error fetching tour data for metadata:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const tourCode = resolvedParams['tour-code']
  
  // Try to get tour data for dynamic metadata
  const tourData = await getTourData(tourCode)
  
  if (!tourData) {
    return {
      title: 'ไม่พบข้อมูลทัวร์ - TourWow',
      description: 'ขออภัย ไม่พบข้อมูลทัวร์ที่ท่านค้นหา กรุณาตรวจสอบรหัสทัวร์อีกครั้ง',
    }
  }

  const title = `${tourData.title} - ${tourData.location} ${tourData.days}วัน${tourData.nights}คืน - TourWow`
  const description = `เที่ยว${tourData.location} ${tourData.days}วัน${tourData.nights}คืน ราคาเริ่มต้น ฿${tourData.price.toLocaleString()} ${tourData.highlights ? `ไฮไลท์: ${tourData.highlights.substring(0, 100)}...` : ''} จองง่าย ราคาดี มีใบอนุญาต`
  
  return {
    title,
    description,
    keywords: `ทัวร์${tourData.location}, ${tourData.location} tour, ${tourData.days}วัน${tourData.nights}คืน, ทัวร์ราคาถูก, จองทัวร์, ${tourCode}`,
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'th_TH',
      siteName: 'TourWow',
      images: tourData.image ? [
        {
          url: tourData.image,
          width: 1200,
          height: 630,
          alt: tourData.title,
        }
      ] : [
        {
          url: '/opengraph-image.jpg',
          width: 1200,
          height: 630,
          alt: tourData.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: tourData.image ? [tourData.image] : ['/opengraph-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://tourwow.com/tours-detail-2/${tourCode}`,
    },
    other: {
      'tour:code': tourCode,
      'tour:price': tourData.price.toString(),
      'tour:duration': `${tourData.days}วัน${tourData.nights}คืน`,
      'tour:location': tourData.location,
    },
  }
}

export default function TourDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}