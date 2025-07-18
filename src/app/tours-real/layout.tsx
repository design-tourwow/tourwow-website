import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ทัวร์จริงจาก API | TourWow - ข้อมูลแบบเรียลไทม์',
  description: 'ทัวร์จากข้อมูล API จริง อัปเดตแบบเรียลไทม์ พร้อมรายละเอียดครบครัน ราคา วันเดินทาง เที่ยวบิน และกำหนดการท่องเที่ยว',
  keywords: 'ทัวร์, API, เรียลไทม์, ราคาถูก, จองทัวร์, ต่างประเทศ, TourWow',
  openGraph: {
    title: 'ทัวร์จริงจาก API | TourWow',
    description: 'ทัวร์จากข้อมูล API จริง อัปเดตแบบเรียลไทม์ พร้อมรายละเอียดครบครัน',
    url: 'https://tourwow.com/tours-real',
    siteName: 'TourWow',
    images: [
      {
        url: '/og-tours-real.jpg',
        width: 1200,
        height: 630,
        alt: 'ทัวร์จริงจาก API TourWow',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ทัวร์จริงจาก API | TourWow',
    description: 'ทัวร์จากข้อมูล API จริง อัปเดตแบบเรียลไทม์',
    images: ['/og-tours-real.jpg'],
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
    canonical: '/tours-real',
  },
}

export default function ToursRealLayout({
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