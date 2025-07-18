import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book Your Tour - TourWow Secure Booking System',
  description: 'Secure online booking for TourWow international tours. Easy step-by-step process with instant confirmation and 24/7 support.',
  keywords: 'book tour, secure booking, tour reservation, travel booking online',
  openGraph: {
    title: 'Book Your Tour - TourWow Secure Booking System',
    description: 'Secure online booking for TourWow international tours. Easy step-by-step process with instant confirmation and 24/7 support.',
    url: 'https://tourwow.com/booking',
    siteName: 'TourWow',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Book Your Tour - TourWow Secure Booking System',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Your Tour - TourWow Secure Booking System',
    description: 'Secure online booking for TourWow international tours. Easy step-by-step process with instant confirmation and 24/7 support.',
    images: ['https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'],
  },
}

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 