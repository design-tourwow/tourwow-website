'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, Search, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'ญี่ปุ่น - ซากุระบานในเกียวโต',
    location: 'เกียวโต, ญี่ปุ่น',
    date: '2024-04-15',
    category: 'ญี่ปุ่น'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'ยุโรป - หอไอเฟลในปารีส',
    location: 'ปารีส, ฝรั่งเศส',
    date: '2024-03-20',
    category: 'ยุโรป'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'ไทย - วัดพระแก้วกรุงเทพ',
    location: 'กรุงเทพ, ไทย',
    date: '2024-02-10',
    category: 'ไทย'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'เวียดนาม - อ่าวฮาลองเบย์',
    location: 'ฮาลองเบย์, เวียดนาม',
    date: '2024-01-25',
    category: 'เวียดนาม'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1555400493-6670c5d86f64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'เกาหลี - พระราชวังเคียงบกกุง',
    location: 'โซล, เกาหลีใต้',
    date: '2024-05-12',
    category: 'เกาหลี'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'สิงคโปร์ - มารีน่าเบย์แซนด์',
    location: 'สิงคโปร์',
    date: '2024-06-08',
    category: 'สิงคโปร์'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'อิตาลี - โคลอสเซียมโรม',
    location: 'โรม, อิตาลี',
    date: '2024-04-30',
    category: 'ยุโรป'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1524230659092-07f99a75c013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'ไต้หวัน - ตึกไทเป 101',
    location: 'ไทเป, ไต้หวัน',
    date: '2024-03-15',
    category: 'ไต้หวัน'
  }
]

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const categories = ['ทั้งหมด', ...Array.from(new Set(galleryImages.map(img => img.category)))]

  const filteredImages = galleryImages.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'ทั้งหมด' || image.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const nextImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
      const nextIndex = (currentIndex + 1) % filteredImages.length
      setSelectedImage(filteredImages[nextIndex].id)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
      const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1
      setSelectedImage(filteredImages[prevIndex].id)
    }
  }

  const selectedImageData = filteredImages.find(img => img.id === selectedImage)

  return (
    <main className="bg-blue-50/30">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-gradient-to-t from-black/50 to-transparent text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="แกลเลอรี่ภาพท่องเที่ยว"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl">
            แกลเลอรี่ภาพท่องเที่ยว
          </h1>
          <p className="text-lg md:text-xl max-w-3xl drop-shadow-xl">
            ชมภาพสวยงามจากจุดหมายปลายทางต่างๆ ที่ลูกค้าของเราได้ไปเยือน
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 sticky top-4 z-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="relative md:col-span-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ค้นหาภาพตามสถานที่หรือชื่อ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-white pl-4 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="text-right text-gray-600 font-medium">
              {filteredImages.length} ภาพ
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div 
                key={image.id} 
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                onClick={() => setSelectedImage(image.id)}
              >
                <div className="relative h-64">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-lg mb-1 drop-shadow-lg">{image.title}</h3>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{image.location}</span>
                    </div>
                    <div className="flex items-center text-sm mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(image.date).toLocaleDateString('th-TH')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <div className="mx-auto bg-blue-100 rounded-full h-20 w-20 flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-2xl font-semibold text-blue-900 mb-2">ไม่พบภาพ</h3>
            <p className="text-blue-700 mb-6">ขออภัย เราไม่พบภาพที่ตรงกับเงื่อนไขของคุณ</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('ทั้งหมด')
              }}
              className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && selectedImageData && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="relative">
                <Image
                  src={selectedImageData.src}
                  alt={selectedImageData.title}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[80vh] rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedImageData.title}</h2>
                  <div className="flex items-center text-white/90 mb-1">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{selectedImageData.location}</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{new Date(selectedImageData.date).toLocaleDateString('th-TH')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}