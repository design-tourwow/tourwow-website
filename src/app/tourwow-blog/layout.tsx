import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Travel Blog - Tips, Guides & Inspiration | TourWow',
  description: 'Discover amazing travel tips, destination guides, and inspiring stories from around the world. Expert advice for your next adventure.',
  keywords: 'travel blog, travel tips, destination guides, travel inspiration, travel stories',
  openGraph: {
    title: 'Travel Blog - Tips, Guides & Inspiration | TourWow',
    description: 'Discover amazing travel tips, destination guides, and inspiring stories from around the world. Expert advice for your next adventure.',
    url: 'https://tourwow.com/blog',
    siteName: 'TourWow',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Travel Blog - Tips, Guides & Inspiration | TourWow',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Blog - Tips, Guides & Inspiration | TourWow',
    description: 'Discover amazing travel tips, destination guides, and inspiring stories from around the world. Expert advice for your next adventure.',
    images: ['https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'],
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 