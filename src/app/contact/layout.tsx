import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact TourWow - Get Travel Help & Support',
  description: 'Contact TourWow for travel inquiries, booking assistance, and customer support. Our travel experts are here to help plan your perfect adventure.',
  keywords: 'contact tourwow, travel support, booking help, customer service',
  openGraph: {
    title: 'Contact TourWow - Get Travel Help & Support',
    description: 'Contact TourWow for travel inquiries, booking assistance, and customer support. Our travel experts are here to help plan your perfect adventure.',
    url: 'https://tourwow.com/contact',
    siteName: 'TourWow',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Contact TourWow - Get Travel Help & Support',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact TourWow - Get Travel Help & Support',
    description: 'Contact TourWow for travel inquiries, booking assistance, and customer support. Our travel experts are here to help plan your perfect adventure.',
    images: ['https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 