// Tour data interface
export interface Tour {
  id: number
  title: string
  location: string
  city: string
  duration: string
  durationCode: string
  days: number
  nights: number
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  groupSize: string
  hotelStar: number
  airline: string
  airlineName: string
  airportName: string
  availableSeats: number
  travelSeason: string
  nextDate: string
  highlights: string
  departureDates?: {
    [key: string]: string[]
  }
  accommodation?: Array<{
    day: number
    hotel: string
    star: number
    location: string
    facilities: string[]
  }>
  detailedItinerary?: Array<{
    day: number
    title: string
    activities: string[]
    meals: {
      breakfast: { location: string; type: string }
      lunch: { location: string; type: string }
      dinner: { location: string; type: string }
    }
  }>
}

// Tours data
export const toursData: Tour[] = [
  {
    id: 1,
    title: 'ทัวร์ญี่ปุ่น โตเกียว สกายทรี 5 วัน 3 คืน',
    location: 'ญี่ปุ่น',
    city: 'โตเกียว',
    duration: '5 วัน',
    durationCode: '5D4N',
    days: 5,
    nights: 4,
    price: 29900,
    originalPrice: 35900,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 234,
    groupSize: '15-20',
    hotelStar: 4,
    airline: 'TG',
    airlineName: 'Thai Airways',
    airportName: 'สุวรรณภูมิ (BKK)',
    availableSeats: 8,
    travelSeason: 'ม.ค.-มี.ค.',
    nextDate: '15 ก.พ. 2567',
    highlights: 'สัมผัสความตื่นตาตื่นใจที่โตเกียวสกายทรี ชมวิวสุดอลังการจากความสูง 634 เมตร เยี่ยมชมวัดเซ็นโซจิอันศักดิ์สิทธิ์ในย่านอาซากุสะ',
    departureDates: {
      'ม.ค.': ['15 ม.ค. 68 - 19 ม.ค. 68', '22 ม.ค. 68 - 26 ม.ค. 68', '29 ม.ค. 68 - 2 ก.พ. 68'],
      'ก.พ.': ['5 ก.พ. 68 - 9 ก.พ. 68', '12 ก.พ. 68 - 16 ก.พ. 68', '19 ก.พ. 68 - 23 ก.พ. 68', '26 ก.พ. 68 - 2 มี.ค. 68'],
      'มี.ค.': ['5 มี.ค. 68 - 9 มี.ค. 68', '12 มี.ค. 68 - 16 มี.ค. 68', '19 มี.ค. 68 - 23 มี.ค. 68', '26 มี.ค. 68 - 30 มี.ค. 68']
    },
    accommodation: [
      { day: 1, hotel: 'Shinjuku Washington Hotel', star: 4, location: 'ย่านชินจูกุ', facilities: ['WiFi ฟรี', 'ห้องอาหาร', 'ฟิตเนส'] },
      { day: 2, hotel: 'Shinjuku Washington Hotel', star: 4, location: 'ย่านชินจูกุ', facilities: ['WiFi ฟรี', 'ห้องอาหาร', 'ฟิตเนส'] },
      { day: 3, hotel: 'Shinjuku Washington Hotel', star: 4, location: 'ย่านชินจูกุ', facilities: ['WiFi ฟรี', 'ห้องอาหาร', 'ฟิตเนส'] },
      { day: 4, hotel: 'Shinjuku Washington Hotel', star: 4, location: 'ย่านชินจูกุ', facilities: ['WiFi ฟรี', 'ห้องอาหาร', 'ฟิตเนส'] }
    ],
    detailedItinerary: [
      {
        day: 1,
        title: 'วันที่ 1: เดินทางสู่โตเกียว',
        activities: [
          '06:00 - เช็คอินสนามบินสุวรรณภูมิ',
          '09:00 - ออกเดินทางโดยสายการบิน Thai Airways เที่ยวบิน TG640',
          '17:30 - ถึงสนามบินนาริตะ ประเทศญี่ปุ่น',
          '18:30 - รถรับจากสนามบิน เดินทางสู่โรงแรม',
          '20:00 - เช็คอินโรงแรม Shinjuku Washington Hotel',
          '21:00 - พักผ่อนตามอัธยาศัย'
        ],
        meals: {
          breakfast: { location: 'อิสระ', type: 'ไม่รวม' },
          lunch: { location: 'บนเครื่องบิน', type: 'อาหารเที่ยง Set Menu' },
          dinner: { location: 'ร้าน Yoshinoya', type: 'ข้าวหน้าเนื้อ' }
        }
      },
      {
        day: 2,
        title: 'วันที่ 2: โตเกียว สกายทรี - อาซากุสะ',
        activities: [
          '07:00 - อาหารเช้าที่โรงแรม',
          '08:30 - ออกเดินทางโดยรถโค้ช',
          '09:30 - ขึ้นชมวิวบนโตเกียวสกายทรี ชั้น 350',
          '11:30 - เดินทางสู่วัดเซ็นโซจิ',
          '12:00 - อาหารกลางวัน',
          '13:30 - เดินเล่นถนนนากามิเซะ ช้อปปิ้งของที่ระลึก',
          '16:00 - เดินทางสู่ย่านชิบูย่า',
          '17:00 - อิสระช้อปปิ้งที่ชิบูย่า',
          '19:00 - อาหารเย็น',
          '20:30 - กลับโรงแรม'
        ],
        meals: {
          breakfast: { location: 'โรงแรม', type: 'บุฟเฟ่ต์นานาชาติ' },
          lunch: { location: 'ร้าน Tempura Daikokuya', type: 'เทมปุระข้าวหน้าเทมปุระ' },
          dinner: { location: 'ร้าน Ichiran Ramen', type: 'ราเมนต้นตำรับ' }
        }
      }
    ]
  },
  {
    id: 2,
    title: 'ทัวร์ญี่ปุ่น โอซาก้า ปราสาท 4 วัน 3 คืน',
    location: 'ญี่ปุ่น',
    city: 'โอซาก้า',
    duration: '4 วัน',
    durationCode: '4D3N',
    days: 4,
    nights: 3,
    price: 26900,
    originalPrice: 31900,
    image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&h=600&fit=crop',
    rating: 4.7,
    reviews: 189,
    groupSize: '20-25',
    hotelStar: 4,
    airline: 'NH',
    airlineName: 'All Nippon Airways',
    airportName: 'นาริตะ (NRT)',
    availableSeats: 15,
    travelSeason: 'ก.พ.-เม.ย.',
    nextDate: '20 ก.พ. 2567',
    highlights: 'เดินทางสู่ปราสาทโอซาก้าอันงดงาม สัญลักษณ์แห่งความยิ่งใหญ่ของเมืองโอซาก้า สำรวจวัดคิโยมิซุเดระในเกียวโต',
    departureDates: {
      'ก.พ.': ['8 ก.พ. 68 - 11 ก.พ. 68', '15 ก.พ. 68 - 18 ก.พ. 68', '22 ก.พ. 68 - 25 ก.พ. 68'],
      'มี.ค.': ['1 มี.ค. 68 - 4 มี.ค. 68', '8 มี.ค. 68 - 11 มี.ค. 68', '15 มี.ค. 68 - 18 มี.ค. 68', '22 มี.ค. 68 - 25 มี.ค. 68', '29 มี.ค. 68 - 1 เม.ย. 68'],
      'เม.ย.': ['5 เม.ย. 68 - 8 เม.ย. 68', '12 เม.ย. 68 - 15 เม.ย. 68', '19 เม.ย. 68 - 22 เม.ย. 68', '26 เม.ย. 68 - 29 เม.ย. 68']
    },
    accommodation: [
      { day: 1, hotel: 'Osaka Marriott Miyako Hotel', star: 4, location: 'ย่านเท็นโนจิ', facilities: ['WiFi ฟรี', 'ห้องอาหาร', 'สระว่ายน้ำ'] },
      { day: 2, hotel: 'Osaka Marriott Miyako Hotel', star: 4, location: 'ย่านเท็นโนจิ', facilities: ['WiFi ฟรี', 'ห้องอาหาร', 'สระว่ายน้ำ'] },
      { day: 3, hotel: 'Osaka Marriott Miyako Hotel', star: 4, location: 'ย่านเท็นโนจิ', facilities: ['WiFi ฟรี', 'ห้องอาหาร', 'สระว่ายน้ำ'] }
    ],
    detailedItinerary: [
      {
        day: 1,
        title: 'วันที่ 1: เดินทางสู่โอซาก้า',
        activities: [
          '06:00 - เช็คอินสนามบินสุวรรณภูมิ',
          '09:00 - ออกเดินทางโดยสายการบิน All Nippon Airways',
          '17:30 - ถึงสนามบินคันไซ ประเทศญี่ปุ่น',
          '18:30 - รถรับจากสนามบิน เดินทางสู่โรงแรม',
          '20:00 - เช็คอินโรงแรม Osaka Marriott Miyako Hotel',
          '21:00 - พักผ่อนตามอัธยาศัย'
        ],
        meals: {
          breakfast: { location: 'อิสระ', type: 'ไม่รวม' },
          lunch: { location: 'บนเครื่องบิน', type: 'อาหารเที่ยง Set Menu' },
          dinner: { location: 'ร้านอาหารในโรงแรม', type: 'อาหารญี่ปุ่น' }
        }
      },
      {
        day: 2,
        title: 'วันที่ 2: ปราสาทโอซาก้า - โดทงโบริ',
        activities: [
          '07:00 - อาหารเช้าที่โรงแรม',
          '08:30 - ออกเดินทางโดยรถโค้ช',
          '09:30 - เยี่ยมชมปราสาทโอซาก้า',
          '12:00 - อาหารกลางวัน',
          '13:30 - เดินเล่นถนนโดทงโบริ',
          '16:00 - ช้อปปิ้งในย่านชินไซบาชิ',
          '19:00 - อาหารเย็น',
          '20:30 - กลับโรงแรม'
        ],
        meals: {
          breakfast: { location: 'โรงแรม', type: 'บุฟเฟ่ต์นานาชาติ' },
          lunch: { location: 'ร้านอาหารในปราสาท', type: 'อาหารญี่ปุ่น' },
          dinner: { location: 'ร้านอาหารในโดทงโบริ', type: 'อาหารท้องถิ่น' }
        }
      }
    ]
  },
  {
    id: 3,
    title: 'ทัวร์เกาหลี โซล เมืองหลวง 4 วัน 3 คืน',
    location: 'เกาหลีใต้',
    city: 'โซล',
    duration: '4 วัน',
    durationCode: '4D3N',
    days: 4,
    nights: 3,
    price: 25900,
    originalPrice: 30900,
    image: 'https://images.unsplash.com/photo-1538485399081-7c8ce013b933?w=800&h=600&fit=crop',
    rating: 4.6,
    reviews: 156,
    groupSize: '20-25',
    hotelStar: 4,
    airline: 'KE',
    airlineName: 'Korean Air',
    airportName: 'อินชอน (ICN)',
    availableSeats: 12,
    travelSeason: 'ก.พ.-เม.ย.',
    nextDate: '18 ก.พ. 2567',
    highlights: 'สัมผัสวัฒนธรรมเกาหลีที่พระราชวังเคียงบกกุง สถานที่สำคัญทางประวัติศาสตร์ของโซล เดินเล่นในย่านมยองดง',
    departureDates: {
      'ก.พ.': ['10 ก.พ. 68 - 13 ก.พ. 68', '17 ก.พ. 68 - 20 ก.พ. 68', '24 ก.พ. 68 - 27 ก.พ. 68'],
      'มี.ค.': ['3 มี.ค. 68 - 6 มี.ค. 68', '10 มี.ค. 68 - 13 มี.ค. 68', '17 มี.ค. 68 - 20 มี.ค. 68', '24 มี.ค. 68 - 27 มี.ค. 68', '31 มี.ค. 68 - 3 เม.ย. 68'],
      'เม.ย.': ['7 เม.ย. 68 - 10 เม.ย. 68', '14 เม.ย. 68 - 17 เม.ย. 68', '21 เม.ย. 68 - 24 เม.ย. 68', '28 เม.ย. 68 - 1 พ.ค. 68']
    },
    accommodation: [
      { day: 1, hotel: 'Seoul Marriott Hotel', star: 4, location: 'ย่านมยองดง', facilities: ['WiFi ฟรี', 'ห้องอาหาร', 'ฟิตเนส'] },
      { day: 2, hotel: 'Seoul Marriott Hotel', star: 4, location: 'ย่านมยองดง', facilities: ['WiFi ฟรี', 'ห้องอาหาร', 'ฟิตเนส'] },
      { day: 3, hotel: 'Seoul Marriott Hotel', star: 4, location: 'ย่านมยองดง', facilities: ['WiFi ฟรี', 'ห้องอาหาร', 'ฟิตเนส'] }
    ],
    detailedItinerary: [
      {
        day: 1,
        title: 'วันที่ 1: เดินทางสู่โซล',
        activities: [
          '06:00 - เช็คอินสนามบินสุวรรณภูมิ',
          '09:00 - ออกเดินทางโดยสายการบิน Korean Air',
          '17:30 - ถึงสนามบินอินชอน ประเทศเกาหลีใต้',
          '18:30 - รถรับจากสนามบิน เดินทางสู่โรงแรม',
          '20:00 - เช็คอินโรงแรม Seoul Marriott Hotel',
          '21:00 - พักผ่อนตามอัธยาศัย'
        ],
        meals: {
          breakfast: { location: 'อิสระ', type: 'ไม่รวม' },
          lunch: { location: 'บนเครื่องบิน', type: 'อาหารเที่ยง Set Menu' },
          dinner: { location: 'ร้านอาหารในโรงแรม', type: 'อาหารเกาหลี' }
        }
      },
      {
        day: 2,
        title: 'วันที่ 2: พระราชวังเคียงบกกุง - มยองดง',
        activities: [
          '07:00 - อาหารเช้าที่โรงแรม',
          '08:30 - ออกเดินทางโดยรถโค้ช',
          '09:30 - เยี่ยมชมพระราชวังเคียงบกกุง',
          '12:00 - อาหารกลางวัน',
          '13:30 - เดินเล่นย่านมยองดง',
          '16:00 - ช้อปปิ้งในย่านมยองดง',
          '19:00 - อาหารเย็น',
          '20:30 - กลับโรงแรม'
        ],
        meals: {
          breakfast: { location: 'โรงแรม', type: 'บุฟเฟ่ต์นานาชาติ' },
          lunch: { location: 'ร้านอาหารในพระราชวัง', type: 'อาหารเกาหลี' },
          dinner: { location: 'ร้านอาหารในมยองดง', type: 'อาหารท้องถิ่น' }
        }
      }
    ]
  }
]

// Utility functions
export function getTourById(id: number): Tour | undefined {
  return toursData.find(tour => tour.id === id)
}

export function getToursByCountry(country: string): Tour[] {
  return toursData.filter(tour => tour.location.includes(country))
}

export function getToursByContinent(continent: string): Tour[] {
  const asiaCountries = ['ญี่ปุ่น', 'เกาหลีใต้', 'จีน', 'ไต้หวัน', 'ฮ่องกง', 'สิงคโปร์', 'มาเลเซีย', 'ไทย']
  const europeCountries = ['ฝรั่งเศส', 'อิตาลี', 'สวิตเซอร์แลนด์', 'เนเธอร์แลนด์', 'เบลเยียม', 'เยอรมนี', 'อังกฤษ', 'สเปน']
  
  if (continent === 'เอเชีย') {
    return toursData.filter(tour => asiaCountries.some(country => tour.location.includes(country)))
  } else if (continent === 'ยุโรป') {
    return toursData.filter(tour => europeCountries.some(country => tour.location.includes(country)))
  }
  
  return []
}

export const generateDeparturePeriods = (month: string, tour: Tour) => {
  return tour.departureDates?.[month] || []
}

export const getAvailabilityStatus = (availableSeats: number) => {
  if (availableSeats >= 15) return { text: `ว่าง ${availableSeats}`, style: 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-300' }
  if (availableSeats >= 8) return { text: `เหลือ ${availableSeats}`, style: 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border-yellow-300' }
  if (availableSeats >= 1) return { text: `ใกล้เต็ม ${availableSeats}`, style: 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-300' }
  return { text: 'เต็มแล้ว', style: 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-500 border-gray-300' }
}

// Export dummy allTours to prevent build errors
export const allTours: Tour[] = [] 