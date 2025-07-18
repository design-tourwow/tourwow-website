import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'โปรแกรมทัวร์ทั้งหมด - TourWow',
  description: 'ค้นพบโปรแกรมทัวร์คุณภาพทั่วโลก แพ็คเกจทัวร์ที่คัดสรรมาอย่างดีพร้อมไกด์ผู้เชี่ยวชาญและประสบการณ์ที่น่าประทับใจ',
  keywords: 'ทัวร์ต่างประเทศ, แพ็คเกจทัวร์, ทัวร์พร้อมไกด์, ทัวร์ผจญภัย, ทัวร์วัฒนธรรม',
  openGraph: {
    title: 'โปรแกรมทัวร์ทั้งหมด - TourWow',
    description: 'ค้นพบโปรแกรมทัวร์คุณภาพทั่วโลก แพ็คเกจทัวร์ที่คัดสรรมาอย่างดี',
    url: 'https://tourwow-website-final.vercel.app/tours',
    siteName: 'TourWow',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'โปรแกรมทัวร์ต่างประเทศโดย TourWow',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'โปรแกรมทัวร์ทั้งหมด - TourWow',
    description: 'ค้นพบโปรแกรมทัวร์คุณภาพทั่วโลก แพ็คเกจทัวร์ที่คัดสรรมาอย่างดี',
    images: ['https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'],
  },
}

export default function ToursLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 