import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wholesale Tours Enhanced - TourWow',
  description: 'ค้นหาโปรแกรมทัวร์จากแหล่งข้อมูลโฮลเซลทั่วโลก พร้อมข้อมูลเต็มรูปแบบ ราคาดีที่สุด อัปเดตแบบเรียลไทม์',
  keywords: 'wholesale tours, ทัวร์โฮลเซล, TTN, Superb Holiday, Bestindo, ทัวร์ราคาถูก, ทัวร์ยุโรป, ทัวร์เอเชีย, ทัวร์อเมริกา',
  openGraph: {
    title: 'Wholesale Tours Enhanced - TourWow',
    description: 'ค้นหาโปรแกรมทัวร์จากแหล่งข้อมูลโฮลเซลทั่วโลก พร้อมข้อมูลเต็มรูปแบบ ราคาดีที่สุด',
    type: 'website',
    locale: 'th_TH',
    siteName: 'TourWow',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wholesale Tours Enhanced - TourWow'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wholesale Tours Enhanced - TourWow',
    description: 'ค้นหาโปรแกรมทัวร์จากแหล่งข้อมูลโฮลเซลทั่วโลก พร้อมข้อมูลเต็มรูปแบบ',
    images: ['/opengraph-image.jpg']
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
    canonical: 'https://tourwow.com/wholesale-tours-2',
  },
}

export default function WholesaleTours2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}