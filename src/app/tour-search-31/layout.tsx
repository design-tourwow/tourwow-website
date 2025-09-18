import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'ค้นหาทัวร์ท่องเที่ยว - Tour Search 31',
  description: 'ค้นหาและเปรียบเทียบทัวร์ท่องเที่ยวจากหลายผู้ให้บริการ พร้อมราคาดีที่สุด ปลอดภัย และมีคุณภาพ',
  keywords: 'ทัวร์, ท่องเที่ยว, เที่ยวต่างประเทศ, ทัวร์ญี่ปุ่น, ทัวร์เกาหลี, ทัวร์ยุโรป, แพ็คเกจทัวร์, จองทัวร์',
  openGraph: {
    title: 'ค้นหาทัวร์ท่องเที่ยว - Tour Search 31',
    description: 'ค้นหาและเปรียบเทียบทัวร์ท่องเที่ยวจากหลายผู้ให้บริการ',
    type: 'website',
    locale: 'th_TH',
    url: '/tour-search-31',
    siteName: 'TourWow'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ค้นหาทัวร์ท่องเที่ยว - Tour Search 31',
    description: 'ค้นหาและเปรียบเทียบทัวร์ท่องเที่ยวจากหลายผู้ให้บริการ'
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
    canonical: '/tour-search-31',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover'
}

export default function TourSearch31Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* SEO JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Tour Search 31",
            "url": "/tour-search-31",
            "description": "ค้นหาและเปรียบเทียบทัวร์ท่องเที่ยวจากหลายผู้ให้บริการ",
            "applicationCategory": "TravelApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "THB",
              "lowPrice": 15000,
              "highPrice": 200000,
              "offerCount": 6
            },
            "provider": {
              "@type": "Organization",
              "name": "TourWow",
              "url": "/"
            }
          })
        }}
      />
      
      {/* Analytics */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Google Analytics 4 Events
            if (typeof gtag !== 'undefined') {
              gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: 'Tour Search 31',
                page_location: window.location.href
              });
            }
          `
        }}
      />
      
      {children}
    </>
  )
}