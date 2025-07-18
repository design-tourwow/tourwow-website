import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'สินค้าและบริการ | TourWow - ทัวร์ในฝัน',
  description: 'ค้นหาสินค้าและบริการที่คุณต้องการจากข้อมูลจริง พร้อมระบบค้นหาและกรองที่ครบครัน เลือกสินค้าคุณภาพในราคาที่เหมาะสม',
  keywords: 'สินค้า, บริการ, ทัวร์, ออนไลน์, ราคาดี, คุณภาพ, TourWow',
  openGraph: {
    title: 'สินค้าและบริการ | TourWow',
    description: 'ค้นหาสินค้าและบริการที่คุณต้องการจากข้อมูลจริง พร้อมระบบค้นหาและกรองที่ครบครัน',
    url: 'https://tourwow.com/products',
    siteName: 'TourWow',
    images: [
      {
        url: '/og-products.jpg',
        width: 1200,
        height: 630,
        alt: 'สินค้าและบริการ TourWow',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'สินค้าและบริการ | TourWow',
    description: 'ค้นหาสินค้าและบริการที่คุณต้องการจากข้อมูลจริง',
    images: ['/og-products.jpg'],
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
    canonical: '/products',
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}