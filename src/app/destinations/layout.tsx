import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'จุดหมายปลายทางทั่วโลก - TourWow',
  description: 'ค้นพบความงามและเสน่ห์ของสถานที่ท่องเที่ยวชั้นนำทั่วโลกที่เราคัดสรรมาเพื่อคุณ พร้อมโปรแกรมทัวร์คุณภาพในราคาที่เหมาะสม',
  keywords: 'จุดหมายปลายทาง, ท่องเที่ยว, ทัวร์ต่างประเทศ, ทัวร์ในประเทศ, เที่ยวยุโรป, เที่ยวเอเชีย, เที่ยวอเมริกา, TourWow',
  openGraph: {
    title: 'จุดหมายปลายทางทั่วโลก - TourWow',
    description: 'ค้นพบความงามและเสน่ห์ของสถานที่ท่องเที่ยวชั้นนำทั่วโลกที่เราคัดสรรมาเพื่อคุณ',
    type: 'website',
    locale: 'th_TH',
    url: 'https://tourwow.com/destinations',
    siteName: 'TourWow',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'จุดหมายปลายทางทั่วโลก - TourWow',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'จุดหมายปลายทางทั่วโลก - TourWow',
    description: 'ค้นพบความงามและเสน่ห์ของสถานที่ท่องเที่ยวชั้นนำทั่วโลกที่เราคัดสรรมาเพื่อคุณ',
    images: ['https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'],
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

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}