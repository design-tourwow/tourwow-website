'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TourCard {
  id: number
  image: string
  alt: string
  title: string
  airline: string
  description: string
  rating: number
  reviewCount: number
  originalPrice: number
  salePrice: number
  code: string
}

// QuotedText Component
const QuotedText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <span className="relative">
      <svg className="inline-block w-3 h-3 align-text-top" viewBox="0 0 24 24" fill="none">
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" fill="white" opacity="0.9"/>
      </svg>
      {children}
      <svg className="inline-block w-3 h-3 align-text-top" viewBox="0 0 24 24" fill="none">
        <path d="M19.417 6.679C20.447 7.773 21 9 21 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311-1.804-.167-3.226-1.648-3.226-3.489a3.5 3.5 0 013.5-3.5c1.073 0 2.099.49 2.748 1.179z" fill="white" opacity="0.9"/>
      </svg>
    </span>
  )
}

// StarRating Component
const StarRating: React.FC<{ rating: number; reviewCount: number }> = ({ rating, reviewCount }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)
  
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm font-semibold text-white">{rating}</span>
      <div className="flex">
        {stars.map((star) => {
          const fillPercentage = Math.min(100, Math.max(0, (rating - star + 1) * 100))
          return (
            <div key={star} className="relative inline-block w-4 h-4">
              <svg className="absolute top-0 left-0 w-4 h-4" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill="#E5E7EB"/>
              </svg>
              <svg className="absolute top-0 left-0 w-4 h-4" viewBox="0 0 20 20" style={{clipPath: `inset(0px ${100-fillPercentage}% 0px 0px)`}}>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill="#FBBF24"/>
              </svg>
            </div>
          )
        })}
      </div>
      <span className="text-xs text-white/70 ml-1">({reviewCount.toLocaleString()})</span>
    </div>
  )
}

const TourCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const tourCards: TourCard[] = [
    // Japan Tokyo
    {
      id: 1,
      image: "https://drive.google.com/uc?export=view&id=1FAWWv71hU8V3VJdz1ap-QVyM4GEWFQ5I",
      alt: "ทัวร์ญี่ปุ่น โตเกียว ซากุระ",
      title: "ทัวร์ญี่ปุ่น 5 วัน 4 คืน",
      airline: "By TG Airways",
      description: "ชมซากุระบานสะพรั่ง ขึ้นโตเกียวทาวเวอร์ ช้อปปิ้งฮาราจูกุ-ชิบูย่า เที่ยวภูเขาไฟฟูจิชั้น 5 ล่องเรือทะเลสาบอาชิ แช่ออนเซนต้นตำรับ",
      rating: 4.8,
      reviewCount: 7842,
      originalPrice: 59900,
      salePrice: 39900,
      code: "Japan Tokyo"
    },
    // Japan Kyoto
    {
      id: 2,
      image: "https://drive.google.com/uc?export=view&id=1HAl4iXIeimYtUgs2_LtNoiqpHfc3bQgM",
      alt: "ทัวร์ญี่ปุ่น เกียวโต เทศกาล",
      title: "ทัวร์ญี่ปุ่น 4 วัน 3 คืน",
      airline: "By NH Airways",
      description: "วัดทองคำสีทองค่าตอนรุ่ง, พิธีการชาไทย และเชิญชมคิมโนะยืนตอนกลางคืน สวมชุดไกตะสีสันติๆ และถ่ายรูปทิวทัศน์กับป่าไผ่บามบู",
      rating: 4.9,
      reviewCount: 9234,
      originalPrice: 44900,
      salePrice: 32900,
      code: "Japan Kyoto"
    },
    // Japan Hiroshima
    {
      id: 3,
      image: "https://drive.google.com/uc?export=view&id=1HiIpWCDN2K--GluZ03KxgaWkl-dccCRa",
      alt: "ทัวร์ญี่ปุ่น ฮิโรชิมา มิยาจิมา",
      title: "ทัวร์ญี่ปุ่น 4 วัน 3 คืน",
      airline: "By TG Airways",
      description: "อนุสาวรีย์สันติภาพ และพิพิธภัณฑ์สันติภาพหิโรชิมา, เดินบนหอมทะเลทราย และขึ้นเกาะมิยาจิมา เพื่อไปจุดธูปสังเคราะห์",
      rating: 4.7,
      reviewCount: 6789,
      originalPrice: 37900,
      salePrice: 29900,
      code: "Japan Hiroshima"
    },
    // Japan Nara
    {
      id: 4,
      image: "https://drive.google.com/uc?export=view&id=1JBTIXjitgqFQAaUUOC_-MBb-LaMg4s_m",
      alt: "ทัวร์ญี่ปุ่น นารา กวาง",
      title: "ทัวร์ญี่ปุ่น 4 วัน 3 คืน",
      airline: "By NH Airways",
      description: "กวางนาราคู่ใจนักท่องเที่ยว เคียงข้างกับกวางไผ่เขียวแห่งคาซูก๋า เที่ยววัดโทไดจิอันโบราณ พร้อมสัมผัสกวางน้อยกวางใหญ่",
      rating: 4.6,
      reviewCount: 5432,
      originalPrice: 34900,
      salePrice: 26900,
      code: "Japan Nara"
    },
    // Japan Osaka
    {
      id: 5,
      image: "https://drive.google.com/uc?export=view&id=1Ld7aEqZapdQ_StuEXdcrIA8LIaSYJ-TU",
      alt: "ทัวร์ญี่ปุ่น โอซาก้า ปราสาท",
      title: "ทัวร์ญี่ปุ่น 4 วัน 3 คืน",
      airline: "By JL Airways",
      description: "ปราสาทโอซาก้าใหญ่ที่สุดในแดนอินชีโอน เยี่ยมและลิ้มลองทาโกยากิแต่เดิม ชมวิวเมืองยามสีค๋า และเดินช้อปปิ้งที่มินามิเซะ",
      rating: 4.5,
      reviewCount: 4567,
      originalPrice: 28900,
      salePrice: 22900,
      code: "Japan Osaka"
    },
    // Korea Seoul
    {
      id: 6,
      image: "/images/countries/korea-1.jpg",
      alt: "ทัวร์เกาหลี โซล เมียงดง",
      title: "ทัวร์เกาหลี 4 วัน 3 คืน",
      airline: "By TG Airways",
      description: "ช้อปปิ้งเมียงดง ใสใสโซล แฟชั่นโซล เที่ยวตลาดดองแดมุน ชิมกิมจิแท้ๆ และสวมใส่ฮันบกถ่ายรูปที่พระราชวังเก็ยงบกกุง",
      rating: 4.8,
      reviewCount: 8765,
      originalPrice: 59900,
      salePrice: 39900,
      code: "Korea Seoul"
    },
    // Korea Busan
    {
      id: 7,
      image: "/images/countries/korea-2.jpg",
      alt: "ทัวร์เกาหลี ปูซาน หาดชายทะเล",
      title: "ทัวร์เกาหลี 4 วัน 3 คืน",
      airline: "By KE Airways",
      description: "ปูซานกลางทะเล เที่ยวหาดแฮอุนแด และชุมชนโบราณคัมช็อน ชิมซีฟู้ดสด ๆ จากท่าเรือจาการัลชี และล่องเรือชมวิวเมือง",
      rating: 4.7,
      reviewCount: 6543,
      originalPrice: 37900,
      salePrice: 29900,
      code: "Korea Busan"
    },
    // China Beijing
    {
      id: 8,
      image: "/images/countries/china-1.jpg",
      alt: "ทัวร์จีน ปักกิ่ง กำแพงเมืองจีน",
      title: "ทัวร์จีน 4 วัน 3 คืน",
      airline: "By CA Airways",
      description: "กำแพงเมืองจีน เที่ยวพระราชวังต้องห้าม วัดเทียนถาน และสวนซิ่วหอพระจันทร์ ชิมอาหารปักกิ่งแท้ และช้อปปิ้งตลาดผ้าไหมเซียงซู",
      rating: 4.6,
      reviewCount: 7234,
      originalPrice: 26900,
      salePrice: 22900,
      code: "China Beijing"
    },
    // Thailand Chiang Mai
    {
      id: 9,
      image: "/images/countries/thailand-1.jpg",
      alt: "ทัวร์เชียงใหม่ วัด ดอยสุเทพ",
      title: "ทัวร์เชียงใหม่ 3 วัน 2 คืน",
      airline: "By WE Airways",
      description: "ดอยสุเทพมหัศจรรย์ วัดพระธาตุศักดิ์สิทธิ์ สวนสัตว์เชียงใหม่ ช้อปปิ้งกาดสวนแก้ว และชิมข้าวซอยแท้ ๆ ที่ถนนคนเดิน",
      rating: 4.9,
      reviewCount: 12345,
      originalPrice: 15900,
      salePrice: 39900,
      code: "Thailand ChiangMai"
    },
    // Vietnam Hanoi
    {
      id: 10,
      image: "/images/countries/vietnam-1.jpg",
      alt: "ทัวร์เวียดนาม ฮานอย ฮาลองเบย์",
      title: "ทัวร์เวียดนาม 4 วัน 3 คืน",
      airline: "By VN Airways",
      description: "ฮาลองเบย์สุดอลังการ ล่องเรือชมถ้ำงุ่นในทะเล เที่ยวนครโฮจิมินห์ และชิมบันมี่แท้ ๆ กิน phở ที่ถนนคนเดินเก่าแก่",
      rating: 4.7,
      reviewCount: 5678,
      originalPrice: 29900,
      salePrice: 29900,
      code: "Vietnam Hanoi"
    },
    // Singapore
    {
      id: 11,
      image: "/images/countries/singapore-1.jpg",
      alt: "ทัวร์สิงคโปร์ มาริน่าเบย์",
      title: "ทัวร์สิงคโปร์ 3 วัน 2 คืน",
      airline: "By SQ Airways",
      description: "มาริน่าเบย์แซนด์สุดอลังการ สวนป่าคลาวด์ฟอเรสต์ เที่ยวยูนิเวอร์แซลสตูดิโอ และช้อปปิ้งออชาร์ดโร้ด ชิมลักซา และ ไก่ไหหลำ",
      rating: 4.8,
      reviewCount: 8901,
      originalPrice: 26900,
      salePrice: 26900,
      code: "Singapore"
    },
    // Malaysia
    {
      id: 12,
      image: "/images/countries/malaysia-1.jpg",
      alt: "ทัวร์มาเลเซีย กัวลาลัมเปอร์",
      title: "ทัวร์มาเลเซีย 3 วัน 2 คืน",
      airline: "By MH Airways",
      description: "ปีโตรนาสทวินทาวเวอร์สุดอลังการ เที่ยวเมืองเก่าของมะละกา ช้อปปิ้งเซ็นทรัลมาร์เก็ต และชิมโรตีปราต้า และ บักกุตเต๋ห์",
      rating: 4.6,
      reviewCount: 4321,
      originalPrice: 32900,
      salePrice: 32900,
      code: "Malaysia"
    },
    // Taiwan
    {
      id: 13,
      image: "/images/countries/taiwan-1.jpg",
      alt: "ทัวร์ไทหวัน ไทเป ตลาดกลางคืน",
      title: "ทัวร์ไทหวัน 4 วัน 3 คืน",
      airline: "By CI Airways",
      description: "ตลาดกลางคืนกาสฟคเฟอ โซนช้อปปิ้งไทเป 101 เที่ยวซีเมิง และเจียวฉี ชิมกว่าเตี๊ยวซด้า ไต้หวันเสียวหลงเปา และน้ำแข็งใส",
      rating: 4.5,
      reviewCount: 3456,
      originalPrice: 22900,
      salePrice: 22900,
      code: "Taiwan"
    },
    // Hong Kong
    {
      id: 14,
      image: "/images/countries/hongkong-1.jpg",
      alt: "ทัวร์ฮ่องกง วิคตอเรียพีค",
      title: "ทัวร์ฮ่องกง 3 วัน 2 คืน",
      airline: "By CX Airways",
      description: "วิคตอเรียพีคชมวิว ฮาร์เบอร์ซิตี้ ช้อปปิ้งแลนด์มาร์ก มงก๊กแลนด์ และชิมติ่มซำแท้ ๆ เที่ยวสตาร์เฟอร์รี่ข้ามฮาร์เบอร์",
      rating: 4.4,
      reviewCount: 2345,
      originalPrice: 15900,
      salePrice: 15900,
      code: "Hong Kong"
    },
    // Macau
    {
      id: 15,
      image: "/images/countries/macau-1.jpg",
      alt: "ทัวร์มาเก๊า เซเนโด",
      title: "ทัวร์มาเก๊า 2 วัน 1 คืน",
      airline: "By NX Airways",
      description: "เซเนโดหลังสีสวยงาม โรงแรมเวเนเชียนที่มีฟ้าเทียมและคลื่นเทียม คาสิโนหลากหลาย และชิมพาสเต็ลเดอนาต้า เอ็กทาร์ต",
      rating: 4.3,
      reviewCount: 1234,
      originalPrice: 13900,
      salePrice: 13900,
      code: "Macau"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % tourCards.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + tourCards.length) % tourCards.length)
  }

  const generateTourCode = (code: string): string => {
    const hash = code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return String(10000 + (hash % 90000)).padStart(5, '0')
  }

  return (
    <div className="relative w-full">
      {/* Carousel wrapper */}
      <div className="relative h-96 overflow-hidden rounded-lg">
        {/* Tour Card Items */}
        {tourCards.map((tour, index) => (
          <div 
            key={tour.id}
            className={`${index === currentSlide ? 'block' : 'hidden'} duration-700 ease-in-out w-full h-full`}
          >
            <div className="group cursor-pointer w-full h-full">
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full">
                <img 
                  src={tour.image}
                  alt={tour.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Tour Code Badge - Top Right - Corner Ribbon */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                    <p className="text-base font-semibold tracking-wide">
                      TW{generateTourCode(tour.code)}
                    </p>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="text-white bg-gradient-to-b from-black/2 via-black/30 via-10% via-black/20 via-black/50 to-black/90 pt-12 pb-4 px-4">
                    <h3 className="font-bold text-xl mb-1">{tour.title} <span className="text-xl font-bold text-white">{tour.airline}</span></h3>
                    <div className="text-base font-semibold text-white">
                      <QuotedText><span>{tour.description}</span></QuotedText>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <StarRating rating={tour.rating} reviewCount={tour.reviewCount} />
                      <div className="text-right space-y-1">
                        <div className="flex items-center justify-end gap-2">
                          <div className="text-sm text-white font-medium">เริ่มต้น</div>
                          <div className="relative inline-block">
                            <span className="text-base text-white font-medium">฿{tour.originalPrice.toLocaleString()}</span>
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-400 transform -translate-y-1/2 rotate-[-12deg]"></div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-yellow-400 leading-tight">฿{tour.salePrice.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 space-x-2 bottom-5 left-1/2">
          {tourCards.map((_, index) => (
            <button 
              key={index}
              type="button" 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Previous button */}
        <button 
          type="button" 
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={prevSlide}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none transition-all duration-300">
            <ChevronLeft className="w-5 h-5 text-white" />
            <span className="sr-only">Previous</span>
          </span>
        </button>
        
        {/* Next button */}
        <button 
          type="button" 
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={nextSlide}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none transition-all duration-300">
            <ChevronRight className="w-5 h-5 text-white" />
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  )
}

export default TourCarousel