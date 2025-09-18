'use client'

import { X, Star, Clock, Users, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface CompareModalProps {
  compareList: number[]
  tours: any[]
  onClose: () => void
  onRemoveFromCompare: (tourId: number) => void
}

export function CompareModal({ compareList, tours, onClose, onRemoveFromCompare }: CompareModalProps) {
  const compareTours = tours.filter(tour => compareList.includes(tour.id))

  if (compareTours.length === 0) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900">เปรียบเทียบทัวร์ ({compareTours.length})</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className={`grid gap-6 ${compareTours.length === 1 ? 'grid-cols-1' : compareTours.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
            {compareTours.map((tour) => (
              <div key={tour.id} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all">
                <div className="relative h-48">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <button
                    onClick={() => onRemoveFromCompare(tour.id)}
                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-5">
                  <h4 className="font-bold text-lg text-slate-900 mb-3 line-clamp-2">{tour.title}</h4>
                  
                  {/* Comparison Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-slate-600">คะแนน</span>
                      </div>
                      <span className="font-semibold">{tour.rating}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-slate-600">ระยะเวลา</span>
                      </div>
                      <span className="font-semibold">{tour.duration}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-slate-600">รีวิว</span>
                      </div>
                      <span className="font-semibold">{tour.reviews}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-slate-600">สถานที่</span>
                      </div>
                      <span className="font-semibold text-sm">{tour.location}</span>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="border-t border-slate-200 pt-4">
                    {tour.originalPrice && (
                      <p className="text-sm text-slate-400 line-through">฿{tour.originalPrice.toLocaleString()}</p>
                    )}
                    <p className="text-2xl font-bold text-blue-600 mb-2">฿{tour.price.toLocaleString()}</p>
                    
                    <Link
                      href={`/tour-search-15/${tour.id}`}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-center block"
                      onClick={onClose}
                    >
                      เลือกทัวร์นี้
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}