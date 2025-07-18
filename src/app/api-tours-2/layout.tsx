import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ทัวร์พิเศษจาก TTN Connect API | TourWow - ข้อมูลอัปเดตเรียลไทม์',
  description: 'ค้นพบทัวร์สุดพิเศษจาก TTN Connect API ด้วยข้อมูลอัปเดตแบบเรียลไทม์ พร้อมโปรแกรมครบครัน ราคาดี บริการระดับพรีเมียม ทัวร์ญี่ปุ่น เกาหลี ยุโรป',
  keywords: 'TTN Connect API, ทัวร์, เรียลไทม์, ราคาพิเศษ, จองทัวร์, ต่างประเทศ, TourWow, ทัวร์คุณภาพ, ทัวร์ญี่ปุ่น, ทัวร์เกาหลี, ทัวร์ยุโรป',
  openGraph: {
    title: 'ทัวร์พิเศษจาก TTN Connect API | TourWow',
    description: 'ค้นพบทัวร์สุดพิเศษจาก TTN Connect API ด้วยข้อมูลอัปเดตแบบเรียลไทม์ พร้อมโปรแกรมครบครัน ราคาดี บริการระดับพรีเมียม',
    url: 'https://tourwow.com/api-tours',
    siteName: 'TourWow',
    images: [
      {
        url: '/og-api-tours.jpg',
        width: 1200,
        height: 630,
        alt: 'ทัวร์สุดพิเศษจาก API TourWow',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ทัวร์พิเศษจาก TTN Connect API | TourWow',
    description: 'ค้นพบทัวร์สุดพิเศษจาก TTN Connect API ด้วยข้อมูลอัปเดตแบบเรียลไทม์',
    images: ['/og-api-tours.jpg'],
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
    canonical: '/api-tours',
  },
  other: {
    'theme-color': '#4f46e5',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  }
}

export default function ApiToursLayout({
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