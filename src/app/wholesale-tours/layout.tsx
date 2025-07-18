import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ทัวร์จาก Wholesale API - TourWow',
  description: 'เลือกดู Program Tour จาก Wholesale API ต่างๆ เช่น TTN Connect, ZEGO Travel พร้อมข้อมูลอัปเดตแบบเรียลไทม์ และการเปรียบเทียบราคาจากหลาย Wholesale',
  keywords: 'ทัวร์ต่างประเทศ, Wholesale API, TTN Connect, ZEGO Travel, เปรียบเทียบราคา, ทัวร์ราคาส่ง, API ทัวร์',
  openGraph: {
    title: 'ทัวร์จาก Wholesale API - TourWow',
    description: 'เลือกดู Program Tour จาก Wholesale API ต่างๆ พร้อมข้อมูลอัปเดตแบบเรียลไทม์',
    url: 'https://tourwow.com/wholesale-tours',
    siteName: 'TourWow',
    images: [
      {
        url: '/og-wholesale-tours.jpg',
        width: 1200,
        height: 630,
        alt: 'ทัวร์จาก Wholesale API TourWow',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ทัวร์จาก Wholesale API - TourWow',
    description: 'เลือกดู Program Tour จาก Wholesale API ต่างๆ พร้อมข้อมูลอัปเดตแบบเรียลไทม์',
    images: ['/og-wholesale-tours.jpg'],
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
    canonical: '/wholesale-tours',
  },
  other: {
    'theme-color': '#4f46e5',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  }
}

export default function WholesaleToursLayout({
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