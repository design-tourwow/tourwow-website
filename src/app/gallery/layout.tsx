import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'แกลเลอรี่ภาพท่องเที่ยว - TourWow',
  description: 'ชมภาพสวยงามจากจุดหมายปลายทางต่างๆ ที่ลูกค้าของเราได้ไปเยือน ภาพถ่ายจากทัวร์ต่างประเทศและในประเทศ',
  keywords: 'แกลเลอรี่ท่องเที่ยว, ภาพท่องเที่ยว, ภาพทัวร์, ภาพสถานที่ท่องเที่ยว, TourWow Gallery',
  openGraph: {
    title: 'แกลเลอรี่ภาพท่องเที่ยว - TourWow',
    description: 'ชมภาพสวยงามจากจุดหมายปลายทางต่างๆ ที่ลูกค้าของเราได้ไปเยือน',
    type: 'website',
    locale: 'th_TH',
    url: 'https://tourwow.com/gallery',
    siteName: 'TourWow',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'แกลเลอรี่ภาพท่องเที่ยว - TourWow',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'แกลเลอรี่ภาพท่องเที่ยว - TourWow',
    description: 'ชมภาพสวยงามจากจุดหมายปลายทางต่างๆ ที่ลูกค้าของเราได้ไปเยือน',
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'],
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
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}