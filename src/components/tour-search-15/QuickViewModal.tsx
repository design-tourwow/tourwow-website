'use client'

import { X, Star, Users, Shield, AlertCircle, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface QuickViewModalProps {
  tourId: number
  tours: any[]
  onClose: () => void
}

export function QuickViewModal({ tourId, tours, onClose }: QuickViewModalProps) {
  const tour = tours.find(t => t.id === tourId)
  
  if (!tour) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="relative h-64 sm:h-80">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">{tour.title}</h3>
            <div className="flex items-center gap-4 text-lg">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{tour.rating}</span>
                <span className="text-white/80">({tour.reviews})</span>
              </div>
              <span>{tour.duration}</span>
            </div>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-slate-600">นักเดินทาง</p>
              <p className="text-xl font-bold text-blue-600">{tour.totalTravelers?.toLocaleString() || 'N/A'}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-slate-600">ความพึงพอใจ</p>
              <p className="text-xl font-bold text-green-600">{tour.satisfaction || 'N/A'}%</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <AlertCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-slate-600">ที่นั่งคงเหลือ</p>
              <p className="text-xl font-bold text-orange-600">{tour.availableSeats || 'N/A'}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-slate-900 mb-3">ไฮไลต์ของทัวร์</h4>
            <p className="text-slate-600 leading-relaxed">{tour.highlights}</p>
          </div>
          
          {tour.specialOffers && tour.specialOffers.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">สิทธิพิเศษ</h4>
              <ul className="space-y-2">
                {tour.specialOffers.map((offer: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {offer}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <div>
              {tour.originalPrice && (
                <p className="text-slate-400 line-through text-lg">฿{tour.originalPrice.toLocaleString()}</p>
              )}
              <p className="text-3xl font-bold text-blue-600">฿{tour.price.toLocaleString()}</p>
              <p className="text-slate-600">ต่อคน รวมทุกอย่าง</p>
            </div>
            <div className="flex gap-3">
              <button className="p-3 rounded-full border-2 border-slate-300 text-slate-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all">
                <Heart className="w-6 h-6" />
              </button>
              <Link
                href={`/tour-search-15/${tour.id}`}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={onClose}
              >
                ดูรายละเอียดและจอง
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}