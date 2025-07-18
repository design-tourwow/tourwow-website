import { Metadata } from 'next'

const tourData = {
  1: {
    id: 1,
    title: "ทัวร์ญี่ปุ่นสุดมหัศจรรย์",
    location: "โตเกียว, เกียวโต และ โอซาก้า",
    duration: "10 วัน 8 คืน",
    price: 89000,
    originalPrice: 99000,
    rating: 4.9,
    reviews: 124,
    availability: "ว่าง",
    images: [
      "https://picsum.photos/1200/600?random=1",
      "https://picsum.photos/1200/600?random=2", 
      "https://picsum.photos/1200/600?random=3",
      "https://picsum.photos/1200/600?random=4"
    ],
    highlights: ["ภูเขาไฟฟูจิ", "วัดแบบดั้งเดิม", "ซากุระบาน", "รถไฟซินกันเซ็น", "อาหารญี่ปุ่นแท้"],
    groupSize: "12-16 คน",
    category: "เอเชีย",
    description: "สัมผัสความผสมผสานที่ลงตัวระหว่างประเพณีโบราณและความทันสมัยของญี่ปุ่น การเดินทาง 10 วันที่ออกแบบอย่างพิถีพิถันนี้จะพาคุณไปยังจุดหมายปลายทางที่เป็นสัญลักษณ์ของญี่ปุ่น ตั้งแต่ถนนที่คึกคักของโตเกียวไปจนถึงวัดที่เงียบสงบของเกียวโตและความอร่อยของโอซาก้า"
  },
  2: {
    id: 2,
    title: "ทัวร์ยุโรปสุดคลาสสิค",
    location: "ปารีส, โรม และ บาร์เซโลนา",
    duration: "14 วัน 12 คืน",
    price: 109000,
    originalPrice: 119000,
    rating: 4.8,
    reviews: 89,
    availability: "เหลือน้อย",
    images: [
      "https://picsum.photos/1200/600?random=11",
      "https://picsum.photos/1200/600?random=12",
      "https://picsum.photos/1200/600?random=13",
      "https://picsum.photos/1200/600?random=14"
    ],
    highlights: ["หอไอเฟล", "โคลอสเซียม", "ซากราดาแฟมิเลีย", "พิพิธภัณฑ์ลูฟร์", "อาหารยุโรป"],
    groupSize: "10-14 คน",
    category: "ยุโรป",
    description: "สัมผัสความโรแมนติกของปารีส ความยิ่งใหญ่ของโรม และความสร้างสรรค์ของบาร์เซโลนา ในทัวร์ยุโรป 14 วันที่จะพาคุณไปยังเมืองที่สวยที่สุดในโลก"
  },
  3: {
    id: 3,
    title: "ทัวร์ไทยแลนด์ครบรส",
    location: "กรุงเทพฯ, เชียงใหม่ และ ภูเก็ต",
    duration: "8 วัน 6 คืน",
    price: 45000,
    originalPrice: 55000,
    rating: 4.7,
    reviews: 156,
    availability: "ว่าง",
    images: [
      "https://picsum.photos/1200/600?random=21",
      "https://picsum.photos/1200/600?random=22",
      "https://picsum.photos/1200/600?random=23",
      "https://picsum.photos/1200/600?random=24"
    ],
    highlights: ["วัดพระศรีรัตนศาสดาราม", "ดอยสุเทพ", "หาดป่าตอง", "ตลาดน้ำ", "อาหารไทย"],
    groupSize: "15-20 คน",
    category: "ในประเทศ",
    description: "สำรวจความงามของประเทศไทย ตั้งแต่ความคึกคักของกรุงเทพฯ ไปจนถึงความสงบของเชียงใหม่ และความสวยงามของภูเก็ต"
  }
}

interface TourDetailLayoutProps {
  children: React.ReactNode
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: TourDetailLayoutProps): Promise<Metadata> {
  const { id } = await params
  const tour = tourData[parseInt(id) as keyof typeof tourData]
  
  if (!tour) {
    return {
      title: 'ไม่พบทัวร์ - TourWow',
      description: 'ไม่พบข้อมูลทัวร์ที่ต้องการ'
    }
  }

  return {
    title: `${tour.title} - TourWow`,
    description: tour.description,
    openGraph: {
      title: tour.title,
      description: tour.description,
      images: tour.images,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tour.title,
      description: tour.description,
      images: tour.images,
    },
  }
}

export default function TourDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 