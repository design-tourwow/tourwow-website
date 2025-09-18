import Image from 'next/image'
import { Star, MapPin, Clock, Users, Calendar, Check, ArrowLeft, Heart, Share2, ChevronDown, ChevronUp } from 'lucide-react'
import { LoadingProvider } from '@/components/LoadingProvider'
import { tours } from '@/lib/tour-data'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

interface TourDetailPageProps {
  params: Promise<{ id: string }>
}

// Generate metadata for the page
export async function generateMetadata({ params }: TourDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const tour = tours.find(t => t.id === id)
  
  if (!tour) {
    return {
      title: 'ไม่พบทัวร์ - TourWow',
      description: 'ขออภัย ไม่พบทัวร์ที่คุณกำลังค้นหา'
    }
  }

  return {
    title: `${tour.title} - TourWow`,
    description: `${tour.description} ${tour.duration} เริ่มต้น ฿${tour.price.toLocaleString()} รวม ${tour.highlights.slice(0, 3).join(', ')}`,
    keywords: `ทัวร์${tour.location}, ${tour.category}, ทัวร์${tour.duration}, ${tour.title}`,
    openGraph: {
      title: tour.title,
      description: tour.description,
      url: `https://tourwow.com/tours/${tour.id}`,
      images: [
        {
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: tour.title,
      description: tour.description,
      images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
    },
  }
}

import TourDetailClient from '@/components/TourDetailClient'

async function TourDetailContent({ params }: TourDetailPageProps) {
  const { id } = await params
  const tour = tours.find(t => t.id === id)
  
  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">ไม่พบทัวร์ที่คุณค้นหา</h2>
          <a href="/tours" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          กลับไปหน้าทัวร์
          </a>
        </div>
      </div>
    )
  }

  return (
    <TourDetailClient tour={tour} />
  )
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  return (
    <LoadingProvider>
      <TourDetailContent params={params} />
    </LoadingProvider>
  )
}