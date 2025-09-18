#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Types for seed data
const DepartureStatus = {
  AVAILABLE: 'available',
  LOW: 'low', 
  SOLDOUT: 'soldout'
};

// Sample tour data from /tour-search-22 page
const baseTourData = [
  {
    id: 'tour-jp-001',
    title: 'ทัวร์ญี่ปุ่น โตเกียว เกียวโต',
    destination: 'ญี่ปุ่น',
    duration: '5 วัน 4 คืน',
    price: 45900,
    originalPrice: 52900,
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
    highlights: ['ชมซากุระ', 'วัดเก่าแก่', 'รถไฟความเร็วสูง'],
    available: true,
    availableSeats: 8,
    travelPeriod: 'ม.ค. - เม.ย. 68'
  },
  {
    id: 'tour-kr-002', 
    title: 'ทัวร์เกาหลีใต้ โซล ปูซาน',
    destination: 'เกาหลีใต้',
    duration: '6 วัน 5 คืน',
    price: 38500,
    rating: 4.7,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop',
    highlights: ['วัฒนธรรมเกาหลี', 'ตลาดมยองดง', 'ชิมอาหารท้องถิ่น'],
    available: true,
    availableSeats: 15,
    travelPeriod: 'เม.ย. - ส.ค. 68'
  },
  {
    id: 'tour-tw-003',
    title: 'ทัวร์ไต้หวัน ไทเป เกาสง',
    destination: 'ไต้หวัน', 
    duration: '4 วัน 3 คืน',
    price: 19900,
    rating: 4.6,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=600&fit=crop',
    highlights: ['ตลาดกลางคืน', 'น้ำพุร้อน', 'รถไฟความเร็วสูง'],
    available: true,
    availableSeats: 3
  },
  {
    id: 'tour-sg-004',
    title: 'ทัวร์สิงคโปร์ มาเลเซีย',
    destination: 'สิงคโปร์',
    duration: '5 วัน 4 คืน', 
    price: 24900,
    rating: 4.5,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop',
    highlights: ['สวนสนุก', 'ช้อปปิ้ง', 'อาหารหลากหลาย'],
    available: true,
    availableSeats: 12
  },
  {
    id: 'tour-vn-005',
    title: 'ทัวร์เวียดนาม ฮานอย โฮจิมินห์',
    destination: 'เวียดนาม',
    duration: '5 วัน 4 คืน',
    price: 16900,
    rating: 4.3,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop',
    highlights: ['ถ้ำฮาลอง', 'อาหารเวียดนาม', 'วัฒนธรรมโบราณ'],
    available: false,
    availableSeats: 0
  },
  {
    id: 'tour-eu-006',
    title: 'ทัวร์ยุโรป อิตาลี สวิส ฝรั่งเศส',
    destination: 'ยุโรป',
    duration: '10 วัน 8 คืน',
    price: 89900,
    originalPrice: 99900,
    rating: 4.9,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop',
    highlights: ['หอไอเฟล', 'โคลอสเซียม', 'ยอดเขาจุงเฟรา'],
    available: true,
    availableSeats: 5
  },
  {
    id: 'tour-dubai-007',
    title: 'ทัวร์ดูไบ อาบูดาบี',
    destination: 'ดูไบ',
    duration: '6 วัน 4 คืน',
    price: 42900,
    rating: 4.7,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    highlights: ['เบิร์จญ์คาลิฟา', 'ช้อปปิ้งมอลล์', 'ทะเลทรายซาฟารี'],
    available: true,
    availableSeats: 9
  },
  {
    id: 'tour-aus-008',
    title: 'ทัวร์ออสเตรเลีย ซิดนีย์ เมลเบิร์น',
    destination: 'ออสเตรเลีย',
    duration: '8 วัน 6 คืน',
    price: 78900,
    rating: 4.6,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    highlights: ['โอเปร่าเฮาส์', 'เกรท โอเชี่ยน โรด', 'กรีท แบร์ริเออร์ รีฟ'],
    available: true,
    availableSeats: 6
  },
  {
    id: 'tour-turkey-009',
    title: 'ทัวร์ตุรกี อิสตันบูล คัปปาโดเชีย',
    destination: 'ตุรกี',
    duration: '9 วัน 7 คืน',
    price: 59900,
    originalPrice: 65900,
    rating: 4.8,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop',
    highlights: ['บอลลูนคัปปาโดเชีย', 'พระราชวังโทปคาปี', 'บลูมอสก์'],
    available: true,
    availableSeats: 11
  },
  {
    id: 'tour-egypt-010',
    title: 'ทัวร์อียิปต์ ไคโร ลักซอร์',
    destination: 'อียิปต์',
    duration: '8 วัน 6 คืน',
    price: 54900,
    rating: 4.4,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73862?w=800&h=600&fit=crop',
    highlights: ['ปิรามิดกีซ่า', 'สฟิงซ์', 'ลองเทลไนล์'],
    available: true,
    availableSeats: 7
  },
  {
    id: 'tour-india-011',
    title: 'ทัวร์อินเดีย เดลี อักรา',
    destination: 'อินเดีย',
    duration: '7 วัน 5 คืน',
    price: 34900,
    rating: 4.3,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop',
    highlights: ['ทัชมาฮาล', 'ราชวังแดงเดลี', 'วัฒนธรรมอินเดีย'],
    available: true,
    availableSeats: 13
  },
  {
    id: 'tour-us-012',
    title: 'ทัวร์อเมริกา นิวยอร์ก ลาสเวกัส',
    destination: 'อเมริกา',
    duration: '10 วัน 8 คืน',
    price: 125900,
    originalPrice: 135900,
    rating: 4.7,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
    highlights: ['รูปปั้นเสรีภาพ', 'แกรนด์แคนยอน', 'ไนแอการา'],
    available: true,
    availableSeats: 4
  },
  {
    id: 'tour-russia-013',
    title: 'ทัวร์รัสเซีย มอสโก ซางต์ปีเตอร์สเบิร์ก',
    destination: 'รัสเซีย',
    duration: '9 วัน 7 คืน',
    price: 89900,
    rating: 4.5,
    reviewCount: 123,
    image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&h=600&fit=crop',
    highlights: ['จัตุรัสแดง', 'พระราชวังฤดูหนาว', 'ทรานส์ไซบีเรียน'],
    available: true,
    availableSeats: 8
  },
  {
    id: 'tour-nz-014',
    title: 'ทัวร์นิวซีแลนด์ เกาะเหนือ เกาะใต้',
    destination: 'นิวซีแลนด์',
    duration: '8 วัน 6 คืน',
    price: 95900,
    originalPrice: 105900,
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=600&fit=crop',
    highlights: ['ฟยอร์ดแลนด์', 'เมืองควีนส์ทาวน์', 'ธารน้ำแข็งฟรานซ์ โจเซฟ'],
    available: true,
    availableSeats: 10
  },
  {
    id: 'tour-spain-015',
    title: 'ทัวร์สเปน มาดริด บาร์เซโลนา',
    destination: 'สเปน',
    duration: '8 วัน 6 คืน',
    price: 69900,
    rating: 4.6,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&h=600&fit=crop',
    highlights: ['ซากราดา ฟามีเลีย', 'พิพิธภัณฑ์พราโด', 'ปาร์ค กูเอล'],
    available: true,
    availableSeats: 14
  },
  {
    id: 'tour-canada-016',
    title: 'ทัวร์แคนาดา โตรอนโต้ แวนคูเวอร์',
    destination: 'แคนาดา',
    duration: '9 วัน 7 คืน',
    price: 98900,
    originalPrice: 108900,
    rating: 4.7,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=600&fit=crop',
    highlights: ['น้ำตกไนแอการา', 'เขตตัวเมืองโตรอนโต้', 'ภูเขาร็อกกี'],
    available: true,
    availableSeats: 6
  },
  {
    id: 'tour-iceland-017',
    title: 'ทัวร์ไอซ์แลนด์ เรคยาวิก',
    destination: 'ไอซ์แลนด์',
    duration: '6 วัน 4 คืน',
    price: 89900,
    rating: 4.8,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    highlights: ['แสงเหนือ', 'น้ำพุร้อนบลูลากูน', 'น้ำตกกูลล์ฟอส'],
    available: true,
    availableSeats: 12
  },
  {
    id: 'tour-morocco-018',
    title: 'ทัวร์โมร็อกโก มาราเกช คาซาบลังกา',
    destination: 'โมร็อกโก',
    duration: '7 วัน 5 คืน',
    price: 52900,
    rating: 4.5,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae436d4?w=800&h=600&fit=crop',
    highlights: ['เมืองเก่ามาราเกช', 'ทะเลทรายซาฮารา', 'จัตุรัสยามา เอล ฟนา'],
    available: true,
    availableSeats: 9
  },
  {
    id: 'tour-peru-019',
    title: 'ทัวร์เปรู มาชูปิชชู คูสโก',
    destination: 'เปรู',
    duration: '8 วัน 6 คืน',
    price: 79900,
    originalPrice: 89900,
    rating: 4.9,
    reviewCount: 134,
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop',
    highlights: ['มาชูปิชชู', 'ทะเลสาบติติกากา', 'เมืองโบราณอินคา'],
    available: true,
    availableSeats: 7
  },
  {
    id: 'tour-greece-020',
    title: 'ทัวร์กรีซ เอเธนส์ ซานโตรินี',
    destination: 'กรีซ',
    duration: '7 วัน 5 คืน',
    price: 62900,
    originalPrice: 69900,
    rating: 4.7,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1503152394-c571994fd383?w=800&h=600&fit=crop',
    highlights: ['อะโครโพลิส', 'พระอาทิตย์ตกซานโตรินี', 'เกาะมิโคนอส'],
    available: true,
    availableSeats: 14
  }
];

// Helper functions
function createSlug(title) {
  // For URL safety, use the tour ID as slug
  return null; // This will make us use the ID as slug instead
}

function extractCountryAndCities(title, destination) {
  const countryMap = {
    'ญี่ปุ่น': { country: 'Japan', cities: ['Tokyo', 'Kyoto', 'Osaka'] },
    'เกาหลีใต้': { country: 'South Korea', cities: ['Seoul', 'Busan', 'Jeju'] },
    'ไต้หวัน': { country: 'Taiwan', cities: ['Taipei', 'Kaohsiung', 'Taichung'] },
    'สิงคโปร์': { country: 'Singapore', cities: ['Singapore', 'Marina Bay'] },
    'เวียดนาม': { country: 'Vietnam', cities: ['Hanoi', 'Ho Chi Minh', 'Da Nang'] },
    'ยุโรป': { country: 'Europe', cities: ['Paris', 'Rome', 'Zurich'] },
    'ดูไบ': { country: 'UAE', cities: ['Dubai', 'Abu Dhabi'] },
    'ออสเตรเลีย': { country: 'Australia', cities: ['Sydney', 'Melbourne', 'Brisbane'] },
    'ตุรกี': { country: 'Turkey', cities: ['Istanbul', 'Cappadocia', 'Pamukkale'] },
    'อียิปต์': { country: 'Egypt', cities: ['Cairo', 'Luxor', 'Aswan'] },
    'อินเดีย': { country: 'India', cities: ['Delhi', 'Agra', 'Mumbai'] },
    'อเมริกา': { country: 'USA', cities: ['New York', 'Las Vegas', 'Los Angeles'] },
    'รัสเซีย': { country: 'Russia', cities: ['Moscow', 'St. Petersburg'] },
    'นิวซีแลนด์': { country: 'New Zealand', cities: ['Auckland', 'Queenstown', 'Wellington'] },
    'สเปน': { country: 'Spain', cities: ['Madrid', 'Barcelona', 'Seville'] },
    'แคนาดา': { country: 'Canada', cities: ['Toronto', 'Vancouver', 'Montreal'] },
    'ไอซ์แลนด์': { country: 'Iceland', cities: ['Reykjavik', 'Blue Lagoon'] },
    'โมร็อกโก': { country: 'Morocco', cities: ['Marrakech', 'Casablanca', 'Fez'] },
    'เปรู': { country: 'Peru', cities: ['Lima', 'Cusco', 'Machu Picchu'] },
    'กรีซ': { country: 'Greece', cities: ['Athens', 'Santorini', 'Mykonos'] }
  };

  return countryMap[destination] || { country: 'International', cities: [] };
}

function extractDuration(durationStr) {
  const match = durationStr.match(/(\d+)\s*วัน\s*(\d+)\s*คืน/);
  if (match) {
    return {
      days: parseInt(match[1]),
      nights: parseInt(match[2])
    };
  }
  return { days: 6, nights: 4 }; // Default
}

function generateDepartures(priceFrom, durationDays) {
  const departures = [];
  const today = new Date();
  
  for (let i = 0; i < 8; i++) {
    const startDate = new Date(today);
    startDate.setMonth(today.getMonth() + i + 1);
    // Set to second Wednesday of the month
    startDate.setDate(1);
    const firstDay = startDate.getDay();
    const secondWednesday = 8 + (3 - firstDay + 7) % 7;
    startDate.setDate(secondWednesday);
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationDays - 1);
    
    const priceVariation = Math.floor(Math.random() * 0.15 * priceFrom);
    const price = priceFrom + (Math.random() > 0.5 ? priceVariation : -priceVariation);
    
    const seatsLeft = Math.floor(Math.random() * 25);
    let status = DepartureStatus.AVAILABLE;
    if (seatsLeft === 0) status = DepartureStatus.SOLDOUT;
    else if (seatsLeft <= 5) status = DepartureStatus.LOW;
    
    const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const dateLabel = `${startDate.getDate()}–${endDate.getDate()} ${thaiMonths[startDate.getMonth()]} ${startDate.getFullYear() + 543}`;
    
    departures.push({
      id: `dep-${startDate.toISOString().split('T')[0]}`,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      date_label: dateLabel,
      price: Math.round(price),
      seats_left: seatsLeft,
      status: status
    });
  }
  
  return departures;
}

function generateItinerary(country, durationDays) {
  const itineraryMap = {
    'Japan': [
      { day: 1, title: 'ออกเดินทางจากกรุงเทพฯ', details: ['เช็คอินสนามบิน', 'บินตรงสู่โตเกียว'] },
      { day: 2, title: 'โตเกียว - ชิบูยา', details: ['ชิบูยา ครอสซิ่ง', 'ย่านฮาราจูกุ', 'วัดเมจิ'] },
      { day: 3, title: 'โตเกียว - อาซากุสะ', details: ['วัดเซนโซจิ', 'ถนนนากามิเซะ', 'สวนอุเอโนะ'] },
      { day: 4, title: 'ฟูจิซัน', details: ['ขึ้นภูเขาไฟฟูจิ', 'ทะเลสาบคาวากุจิ', 'ชมซากุระ'] },
      { day: 5, title: 'เดินทางกลับ', details: ['ช้อปปิ้งกิ๊นซ่า', 'เดินทางกลับประเทศไทย'] }
    ],
    'South Korea': [
      { day: 1, title: 'ออกเดินทางจากกรุงเทพฯ', details: ['เช็คอินสนามบิน', 'บินตรงสู่โซล'] },
      { day: 2, title: 'โซล - มยองดง', details: ['ย่านมยองดง', 'ตลาดมยองดง', 'ชิม K-BBQ'] },
      { day: 3, title: 'โซล - คังนัม', details: ['ย่านคังนัม', 'COEX Mall', 'บันไดสีรุ้ง'] },
      { day: 4, title: 'ปูซาน', details: ['หาดฮายอนแด', 'ตลาดจากัลชิ', 'วัดแฮดง ยงกุงซา'] },
      { day: 5, title: 'เจจูโด', details: ['เกาะเจจู', 'ฮัลลาซัน', 'พิพิธภัณฑ์หินหลา'] },
      { day: 6, title: 'เดินทางกลับ', details: ['ช้อปปิ้งโซล', 'เดินทางกลับประเทศไทย'] }
    ],
    // Add more countries...
  };

  const baseItinerary = itineraryMap[country] || [
    { day: 1, title: 'ออกเดินทาง', details: ['เดินทางจากกรุงเทพฯ'] },
    { day: 2, title: 'เมืองหลัก', details: ['ชมเมืองและสถานที่สำคัญ'] },
    { day: 3, title: 'สถานที่ท่องเที่ยว', details: ['เที่ยวชมสถานที่สำคัญ'] },
    { day: 4, title: 'วัฒนธรรมท้องถิ่น', details: ['สัมผัสวัฒนธรรมและอาหาร'] },
    { day: 5, title: 'ช้อปปิ้ง', details: ['ซื้อของฝาก'] },
    { day: 6, title: 'เดินทางกลับ', details: ['เดินทางกลับประเทศไทย'] }
  ];

  return baseItinerary.slice(0, durationDays);
}

function generateStandardAddons() {
  return [
    { code: 'INS10', label: 'ประกันการเดินทาง', price: 899 },
    { code: 'HKUP', label: 'อัปเกรดโรงแรม', price: 2500 },
    { code: 'SEAT', label: 'เลือกที่นั่งเครื่องบิน', price: 500 },
    { code: 'WIFI', label: 'WiFi ไม่จำกัด', price: 299 }
  ];
}

function generateStandardFAQs() {
  return [
    { q: 'ต้องขอวีซ่าหรือไม่?', a: 'สัญชาติไทยสามารถเดินทางได้โดยไม่ต้องขอวีซ่าล่วงหน้า หรือขอวีซ่าตอนถึงแล้วแต่ประเทศปลายทาง' },
    { q: 'อาหารฮาลาล/เจ มีหรือไม่?', a: 'แจ้งความต้องการพิเศษล่วงหน้าได้ เราจะประสานงานให้ตามความต้องการ' },
    { q: 'น้ำหนักกระเป๋าเท่าไหร่?', a: 'กระเป๋าใต้ท้องเครื่อง 23 กก. กระเป๋าถือขึ้นเครื่อง 7 กก.' },
    { q: 'สามารถยกเลิก/คืนเงินได้หรือไม่?', a: 'สามารถยกเลิกได้ตามเงื่อนไขของแต่ละโปรแกรม โดยอาจมีค่าธรรมเนียมตามระยะเวลาที่ยกเลิก' }
  ];
}

function generateRelatedTours(currentTour, allTours) {
  return allTours
    .filter(tour => tour.id !== currentTour.id)
    .slice(0, 4)
    .map(tour => ({
      id: tour.id,
      title: tour.title,
      price_from: tour.price,
      thumb: tour.image
    }));
}

// Main function to generate seed data
function generateTourSeed(baseTour) {
  const { country, cities } = extractCountryAndCities(baseTour.title, baseTour.destination);
  const { days, nights } = extractDuration(baseTour.duration);
  const slug = baseTour.id; // Use ID as slug for URL safety
  
  const badges = [];
  if (baseTour.originalPrice) badges.push('Promotion');
  if (baseTour.rating >= 4.7) badges.push('Hot');
  if (baseTour.availableSeats <= 5 && baseTour.available) badges.push('Limited');
  
  return {
    id: baseTour.id,
    slug: slug,
    title: baseTour.title,
    country: country,
    cities: cities,
    duration_days: days,
    nights: nights,
    price_from: baseTour.price,
    currency: 'THB',
    badges: badges,
    rating: baseTour.rating,
    reviews_count: baseTour.reviewCount,
    hero_images: [
      baseTour.image,
      baseTour.image.replace('w=800', 'w=1200'),
      baseTour.image.replace('photo-', 'photo-1').replace('w=800', 'w=1000')
    ],
    highlights: baseTour.highlights,
    itinerary: generateItinerary(country, days),
    gallery: [
      baseTour.image.replace('w=800', 'w=600&q=80'),
      baseTour.image.replace('photo-', 'photo-1').replace('w=800', 'w=600&q=80'),
      baseTour.image.replace('photo-', 'photo-2').replace('w=800', 'w=600&q=80')
    ],
    included: [
      'ตั๋วเครื่องบินไป-กลับ',
      'ที่พัก 4 ดาว',
      'อาหารตามรายการ',
      'รถรับส่งสนามบิน',
      'ไกด์ท้องถิ่นพูดไทย',
      'ประกันอุบัติเหตุ'
    ],
    excluded: [
      'ค่าทิปไกด์และคนขับรถ',
      'ค่าธรรมเนียมวีซ่า (ถ้ามี)',
      'ค่าใช้จ่ายส่วนตัว',
      'ประกันการเดินทางแบบครอบคลุม'
    ],
    policies: {
      deposit: 3000,
      cancellation: 'ยกเลิกฟรีภายใน 7 วันก่อนเดินทาง',
      payment_options: ['บัตรเครดิต', 'โอนเงิน', 'ผ่อนชำระ 0% 6 เดือน']
    },
    departures: generateDepartures(baseTour.price, days),
    addons: generateStandardAddons(),
    faqs: generateStandardFAQs(),
    related: generateRelatedTours(baseTour, baseTourData),
    licenses: {
      tourism_license: '11/2567',
      airline_partners: ['TG', 'QR', 'EK']
    },
    seo: {
      title: `${baseTour.title} ราคาเริ่ม ${baseTour.price.toLocaleString()}`,
      description: `${baseTour.title} ${baseTour.highlights.join(' ')} พร้อมไกด์ไทย`,
      og_image: baseTour.image
    }
  };
}

// Generate all seeds
console.log('🚀 Starting tour seed generation...');

const seeds = baseTourData.map(tour => generateTourSeed(tour));
const index = seeds.map(seed => ({
  id: seed.id,
  slug: seed.slug,
  title: seed.title,
  price_from: seed.price_from
}));

// Ensure directories exist
const toursDir = path.join(process.cwd(), 'data', 'tours');
if (!fs.existsSync(toursDir)) {
  fs.mkdirSync(toursDir, { recursive: true });
}

// Write index file
fs.writeFileSync(
  path.join(toursDir, 'index.json'),
  JSON.stringify(index, null, 2),
  'utf8'
);

// Write individual tour files
seeds.forEach(seed => {
  fs.writeFileSync(
    path.join(toursDir, `${seed.id}.json`),
    JSON.stringify(seed, null, 2),
    'utf8'
  );
});

console.log(`✅ Generated ${seeds.length} tour seeds successfully!`);
console.log(`📁 Files saved to: data/tours/`);
console.log(`📋 Index file: data/tours/index.json`);
console.log(`📄 Individual files: data/tours/{id}.json`);

console.log('\n🎯 Tour IDs generated:');
seeds.forEach(seed => {
  console.log(`  - ${seed.id} (${seed.title})`);
});