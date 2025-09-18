#!/usr/bin/env tsx

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

// Types matching the Zod schema from the prompt
type DepartureStatus = "available" | "low" | "soldout";

interface Departure {
  id: string;
  start_date: string;
  end_date: string;
  date_label: string;
  price: number;
  seats_left: number;
  status: DepartureStatus;
}

interface Addon {
  code: string;
  label: string;
  price: number;
}

interface FAQ {
  q: string;
  a: string;
}

interface TourSeed {
  id: string;
  slug: string;
  title: string;
  country: string;
  cities: string[];
  duration_days: number;
  nights: number;
  price_from: number;
  currency: "THB";
  badges: string[];
  rating: number;
  reviews_count: number;
  hero_images: string[];
  highlights: string[];
  itinerary: { day: number; title: string; details: string[] }[];
  gallery: string[];
  included: string[];
  excluded: string[];
  policies: {
    deposit: number;
    cancellation: string;
    payment_options: string[];
  };
  departures: Departure[];
  addons: Addon[];
  faqs: FAQ[];
  related: { id: string; title: string; price_from: number; thumb: string }[];
  licenses: { tourism_license?: string; airline_partners?: string[] };
  seo?: { title?: string; description?: string; og_image?: string };
}

// Extract tour data from the existing tour-search-24 page
function extractTourData(): any[] {
  const filePath = join(process.cwd(), 'src/app/tour-search-24/page.tsx');
  
  if (!existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  const content = readFileSync(filePath, 'utf-8');
  
  // Extract the tourData array from the file content
  const tourDataMatch = content.match(/const tourData\s*=\s*\[([\s\S]*?)\];/);
  
  if (!tourDataMatch) {
    console.log('Could not find tourData, using fallback data');
    // Fallback to comprehensive tour data
    return [
      {
        id: 'tour-jp-001',
        title: 'ทัวร์ญี่ปุ่น โตเกียว เกียวโต 5 วัน 4 คืน',
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
        title: 'ทัวร์เกาหลีใต้ โซล ปูซาน 6 วัน 4 คืน',
        destination: 'เกาหลีใต้',
        duration: '6 วัน 4 คืน',
        price: 35900,
        originalPrice: 42900,
        rating: 4.7,
        reviewCount: 203,
        image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop',
        highlights: ['พระราชวังเก็ยองบก', 'ย่าน Hongdae', 'เกาะเจจู'],
        available: true,
        availableSeats: 12,
        travelPeriod: 'ตลอดปี'
      },
      {
        id: 'tour-tw-003',
        title: 'ทัวร์ไทหวัน ไทเป ดาเอี่ยน 5 วัน 3 คืน',
        destination: 'ไทหวัน',
        duration: '5 วัน 3 คืน',
        price: 19900,
        originalPrice: 24900,
        rating: 4.6,
        reviewCount: 89,
        image: 'https://images.unsplash.com/photo-1605807646983-377bc5a76493?w=800&h=600&fit=crop',
        highlights: ['ตลาดกลางคืนเจืองจิ', 'เขตไทเป 101', 'ซนหน้า'],
        available: true,
        availableSeats: 15,
        travelPeriod: 'ตลอดปี'
      },
      {
        id: 'tour-tr-004',
        title: 'ทัวร์ตุรกี อิสตันบูล คัปปาโดเกีย 9 วัน 7 คืน',
        destination: 'ตุรกี',
        duration: '9 วัน 7 คืน',
        price: 39999,
        originalPrice: 45999,
        rating: 4.9,
        reviewCount: 126,
        image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop',
        highlights: ['บินบอลลูน', 'โบสถ์ฮาเกียโซเฟีย', 'พระราชวังโทปคาปึ'],
        available: true,
        availableSeats: 6,
        travelPeriod: 'ต.ค. - เม.ย.'
      },
      {
        id: 'tour-eu-005',
        title: 'ทัวร์ยุโรป อิตาลี ฝรั่งเศส สวิส 10 วัน 7 คืน',
        destination: 'ยุโรป',
        duration: '10 วัน 7 คืน',
        price: 89900,
        originalPrice: 99900,
        rating: 4.8,
        reviewCount: 245,
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop',
        highlights: ['หอเอนปิซา', 'หอไอเฟล', 'ยุงเฟราว์ยอค'],
        available: true,
        availableSeats: 10,
        travelPeriod: 'เม.ย. - ต.ค.'
      },
      {
        id: 'tour-cn-006',
        title: 'ทัวร์จีน ปักกิ่ง เซี่ยงไฮ้ 6 วัน 4 คืน',
        destination: 'จีน',
        duration: '6 วัน 4 คืน',
        price: 28900,
        originalPrice: 32900,
        rating: 4.5,
        reviewCount: 178,
        image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=600&fit=crop',
        highlights: ['กำแพงเมืองจีน', 'พระราชวังต้องห้าม', 'เที่ยนอันเหม็น'],
        available: true,
        availableSeats: 18,
        travelPeriod: 'ตลอดปี'
      },
      {
        id: 'tour-sg-007',
        title: 'ทัวร์สิงคโปร์ เซนโตซ่า 4 วัน 3 คืน',
        destination: 'สิงคโปร์',
        duration: '4 วัน 3 คืน',
        price: 22900,
        originalPrice: 25900,
        rating: 4.7,
        reviewCount: 312,
        image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop',
        highlights: ['Marina Bay Sands', 'Universal Studios', 'Gardens by the Bay'],
        available: true,
        availableSeats: 14,
        travelPeriod: 'ตลอดปี'
      },
      {
        id: 'tour-my-008',
        title: 'ทัวร์มาเลเซีย กัวลาลัมเปอร์ เพนันง 5 วัน 3 คืน',
        destination: 'มาเลเซีย',
        duration: '5 วัน 3 คืน',
        price: 18900,
        originalPrice: 21900,
        rating: 4.4,
        reviewCount: 156,
        image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=600&fit=crop',
        highlights: ['หอคอยแฝด', 'ถ้ำบาตู', 'จอร์จทาวน์'],
        available: true,
        availableSeats: 22,
        travelPeriod: 'ตลอดปี'
      },
      {
        id: 'tour-id-009',
        title: 'ทัวร์อินโดนีเซีย บาหลี จาการ์ตา 6 วัน 4 คืน',
        destination: 'อินโดนีเซีย',
        duration: '6 วัน 4 คืน',
        price: 26900,
        originalPrice: 29900,
        rating: 4.6,
        reviewCount: 198,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
        highlights: ['วัดทานาห์ล็อต', 'อุบุด', 'ชายหาดกุตะ'],
        available: true,
        availableSeats: 9,
        travelPeriod: 'เม.ย. - ต.ค.'
      },
      {
        id: 'tour-ph-010',
        title: 'ทัวร์ฟิลิปปินส์ มะนิลา เซบู 7 วัน 5 คืน',
        destination: 'ฟิลิปปินส์',
        duration: '7 วัน 5 คืน',
        price: 31900,
        originalPrice: 35900,
        rating: 4.5,
        reviewCount: 167,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
        highlights: ['เกาะโบราเคย์', 'ช็อคโกเลตฮิลส์', 'มหาวิหารซานอากุสติน'],
        available: true,
        availableSeats: 11,
        travelPeriod: 'พ.ย. - เม.ย.'
      },
      {
        id: 'tour-vn-011',
        title: 'ทัวร์เวียดนาม ฮานอย โฮจิมินห์ 6 วัน 5 คืน',
        destination: 'เวียดนาม',
        duration: '6 วัน 5 คืน',
        price: 23900,
        originalPrice: 27900,
        rating: 4.3,
        reviewCount: 234,
        image: 'https://images.unsplash.com/photo-1559592413-7cec4d0d5d92?w=800&h=600&fit=crop',
        highlights: ['อ่าวฮาลอง', 'อุโมงค์กู่จี', 'ตลาดเบนธานห์'],
        available: true,
        availableSeats: 16,
        travelPeriod: 'ตลอดปี'
      },
      {
        id: 'tour-kh-012',
        title: 'ทัวร์กัมพูชา เสียมเรียบ นครวัด 4 วัน 3 คืน',
        destination: 'กัมพูชา',
        duration: '4 วัน 3 คืน',
        price: 16900,
        originalPrice: 19900,
        rating: 4.4,
        reviewCount: 143,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
        highlights: ['นครวัด', 'นครธม', 'ตาพรหม'],
        available: true,
        availableSeats: 20,
        travelPeriod: 'ตลอดปี'
      }
    ];
  }
  
  // In production, you'd parse the actual data from the match
  // For now, we'll use the fallback data above
  console.log('Using comprehensive tour data set');
  return [
    {
      id: 'tour-jp-001',
      title: 'ทัวร์ญี่ปุ่น โตเกียว เกียวโต 5 วัน 4 คืน',
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
      title: 'ทัวร์เกาหลีใต้ โซล ปูซาน 6 วัน 4 คืน',
      destination: 'เกาหลีใต้',
      duration: '6 วัน 4 คืน',
      price: 35900,
      originalPrice: 42900,
      rating: 4.7,
      reviewCount: 203,
      image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop',
      highlights: ['พระราชวังเก็ยองบก', 'ย่าน Hongdae', 'เกาะเจจู'],
      available: true,
      availableSeats: 12,
      travelPeriod: 'ตลอดปี'
    },
    {
      id: 'tour-tw-003',
      title: 'ทัวร์ไทหวัน ไทเป ดาเอี่ยน 5 วัน 3 คืน',
      destination: 'ไทหวัน',
      duration: '5 วัน 3 คืน',
      price: 19900,
      originalPrice: 24900,
      rating: 4.6,
      reviewCount: 89,
      image: 'https://images.unsplash.com/photo-1605807646983-377bc5a76493?w=800&h=600&fit=crop',
      highlights: ['ตลาดกลางคืนเจืองจิ', 'เขตไทเป 101', 'ซนหน้า'],
      available: true,
      availableSeats: 15,
      travelPeriod: 'ตลอดปี'
    },
    {
      id: 'tour-tr-004',
      title: 'ทัวร์ตุรกี อิสตันบูล คัปปาโดเกีย 9 วัน 7 คืน',
      destination: 'ตุรกี',
      duration: '9 วัน 7 คืน',
      price: 39999,
      originalPrice: 45999,
      rating: 4.9,
      reviewCount: 126,
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop',
      highlights: ['บินบอลลูน', 'โบสถ์ฮาเกียโซเฟีย', 'พระราชวังโทปคาปึ'],
      available: true,
      availableSeats: 6,
      travelPeriod: 'ต.ค. - เม.ย.'
    },
    {
      id: 'tour-eu-005',
      title: 'ทัวร์ยุโรป อิตาลี ฝรั่งเศส สวิส 10 วัน 7 คืน',
      destination: 'ยุโรป',
      duration: '10 วัน 7 คืน',
      price: 89900,
      originalPrice: 99900,
      rating: 4.8,
      reviewCount: 245,
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop',
      highlights: ['หอเอนปิซา', 'หอไอเฟล', 'ยุงเฟราว์ยอค'],
      available: true,
      availableSeats: 10,
      travelPeriod: 'เม.ย. - ต.ค.'
    },
    {
      id: 'tour-cn-006',
      title: 'ทัวร์จีน ปักกิ่ง เซี่ยงไฮ้ 6 วัน 4 คืน',
      destination: 'จีน',
      duration: '6 วัน 4 คืน',
      price: 28900,
      originalPrice: 32900,
      rating: 4.5,
      reviewCount: 178,
      image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=600&fit=crop',
      highlights: ['กำแพงเมืองจีน', 'พระราชวังต้องห้าม', 'เที่ยนอันเหม็น'],
      available: true,
      availableSeats: 18,
      travelPeriod: 'ตลอดปี'
    },
    {
      id: 'tour-sg-007',
      title: 'ทัวร์สิงคโปร์ เซนโตซ่า 4 วัน 3 คืน',
      destination: 'สิงคโปร์',
      duration: '4 วัน 3 คืน',
      price: 22900,
      originalPrice: 25900,
      rating: 4.7,
      reviewCount: 312,
      image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop',
      highlights: ['Marina Bay Sands', 'Universal Studios', 'Gardens by the Bay'],
      available: true,
      availableSeats: 14,
      travelPeriod: 'ตลอดปี'
    },
    {
      id: 'tour-my-008',
      title: 'ทัวร์มาเลเซีย กัวลาลัมเปอร์ เพนันง 5 วัน 3 คืน',
      destination: 'มาเลเซีย',
      duration: '5 วัน 3 คืน',
      price: 18900,
      originalPrice: 21900,
      rating: 4.4,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=600&fit=crop',
      highlights: ['หอคอยแฝด', 'ถ้ำบาตู', 'จอร์จทาวน์'],
      available: true,
      availableSeats: 22,
      travelPeriod: 'ตลอดปี'
    },
    {
      id: 'tour-id-009',
      title: 'ทัวร์อินโดนีเซีย บาหลี จาการ์ตา 6 วัน 4 คืน',
      destination: 'อินโดนีเซีย',
      duration: '6 วัน 4 คืน',
      price: 26900,
      originalPrice: 29900,
      rating: 4.6,
      reviewCount: 198,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
      highlights: ['วัดทานาห์ล็อต', 'อุบุด', 'ชายหาดกุตะ'],
      available: true,
      availableSeats: 9,
      travelPeriod: 'เม.ย. - ต.ค.'
    },
    {
      id: 'tour-ph-010',
      title: 'ทัวร์ฟิลิปปินส์ มะนิลา เซบู 7 วัน 5 คืน',
      destination: 'ฟิลิปปินส์',
      duration: '7 วัน 5 คืน',
      price: 31900,
      originalPrice: 35900,
      rating: 4.5,
      reviewCount: 167,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      highlights: ['เกาะโบราเคย์', 'ช็อคโกเลตฮิลส์', 'มหาวิหารซานอากุสติน'],
      available: true,
      availableSeats: 11,
      travelPeriod: 'พ.ย. - เม.ย.'
    },
    {
      id: 'tour-vn-011',
      title: 'ทัวร์เวียดนาม ฮานอย โฮจิมินห์ 6 วัน 5 คืน',
      destination: 'เวียดนาม',
      duration: '6 วัน 5 คืน',
      price: 23900,
      originalPrice: 27900,
      rating: 4.3,
      reviewCount: 234,
      image: 'https://images.unsplash.com/photo-1559592413-7cec4d0d5d92?w=800&h=600&fit=crop',
      highlights: ['อ่าวฮาลอง', 'อุโมงค์กู่จี', 'ตลาดเบนธานห์'],
      available: true,
      availableSeats: 16,
      travelPeriod: 'ตลอดปี'
    },
    {
      id: 'tour-kh-012',
      title: 'ทัวร์กัมพูชา เสียมเรียบ นครวัด 4 วัน 3 คืน',
      destination: 'กัมพูชา',
      duration: '4 วัน 3 คืน',
      price: 16900,
      originalPrice: 19900,
      rating: 4.4,
      reviewCount: 143,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      highlights: ['นครวัด', 'นครธม', 'ตาพรหม'],
      available: true,
      availableSeats: 20,
      travelPeriod: 'ตลอดปี'
    }
  ];
}

// Create URL-safe slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ทัวร์/g, 'tour')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 50);
}

// Parse duration from text
function parseDuration(duration: string): { days: number; nights: number } {
  const daysMatch = duration.match(/(\d+)\s*วัน/);
  const nightsMatch = duration.match(/(\d+)\s*คืน/);
  
  return {
    days: daysMatch ? parseInt(daysMatch[1]) : 6,
    nights: nightsMatch ? parseInt(nightsMatch[1]) : 4
  };
}

// Guess country and cities from destination and title
function parseLocation(destination: string, title: string): { country: string; cities: string[] } {
  const locationMap: { [key: string]: { country: string; cities: string[] } } = {
    'ญี่ปุ่น': { country: 'Japan', cities: ['Tokyo', 'Kyoto', 'Osaka'] },
    'เกาหลีใต้': { country: 'South Korea', cities: ['Seoul', 'Busan', 'Jeju'] },
    'ไทหวัน': { country: 'Taiwan', cities: ['Taipei', 'Taichung', 'Kaohsiung'] },
    'ตุรกี': { country: 'Turkey', cities: ['Istanbul', 'Cappadocia', 'Pamukkale'] },
    'ยุโรป': { country: 'Europe', cities: ['Paris', 'Rome', 'Zurich'] },
    'จีน': { country: 'China', cities: ['Beijing', 'Shanghai', 'Guangzhou'] },
    'สิงคโปร์': { country: 'Singapore', cities: ['Singapore'] },
    'มาเลเซีย': { country: 'Malaysia', cities: ['Kuala Lumpur', 'Penang'] },
    'อินโดนีเซีย': { country: 'Indonesia', cities: ['Jakarta', 'Bali'] },
    'ฟิลิปปินส์': { country: 'Philippines', cities: ['Manila', 'Cebu'] },
    'เวียดนาม': { country: 'Vietnam', cities: ['Ho Chi Minh', 'Hanoi'] },
    'กัมพูชา': { country: 'Cambodia', cities: ['Phnom Penh', 'Siem Reap'] },
    'พม่า': { country: 'Myanmar', cities: ['Yangon', 'Mandalay'] },
    'อินเดีย': { country: 'India', cities: ['Delhi', 'Mumbai', 'Agra'] }
  };

  return locationMap[destination] || { country: 'International', cities: [] };
}

// Generate departures for the next 6-12 months
function generateDepartures(priceFrom: number, durationDays: number): Departure[] {
  const departures: Departure[] = [];
  const now = new Date();
  
  for (let i = 0; i < 8; i++) {
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() + (i * 14) + 7); // Every 2 weeks starting next week
    
    // Set to Wednesday
    const dayOfWeek = startDate.getDay();
    const daysUntilWednesday = (3 - dayOfWeek + 7) % 7;
    startDate.setDate(startDate.getDate() + daysUntilWednesday);
    
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + durationDays - 1);
    
    // Generate price with 0-15% variation
    const priceVariation = (Math.random() - 0.5) * 0.3; // -15% to +15%
    const price = Math.round(priceFrom * (1 + priceVariation));
    
    // Generate seats left
    const seatsLeft = Math.floor(Math.random() * 25);
    
    let status: DepartureStatus = "available";
    if (seatsLeft === 0) status = "soldout";
    else if (seatsLeft <= 5) status = "low";
    
    const dateLabel = `${startDate.getDate()}–${endDate.getDate()} ${getThaiMonth(startDate.getMonth())} ${startDate.getFullYear() + 543}`;
    
    departures.push({
      id: `dep-${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      date_label: dateLabel,
      price,
      seats_left: seatsLeft,
      status
    });
  }
  
  return departures;
}

// Thai month names
function getThaiMonth(monthIndex: number): string {
  const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 
                  'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  return months[monthIndex];
}

// Generate standard addons
function generateAddons(): Addon[] {
  return [
    { code: "INS10", label: "ประกันการเดินทาง", price: 899 },
    { code: "HKUP", label: "อัปเกรดโรงแรม", price: 2500 },
    { code: "SEAT", label: "เลือกที่นั่งเครื่องบิน", price: 500 },
    { code: "MEAL", label: "อาหารพิเศษ", price: 300 },
    { code: "WIFI", label: "SIM การ์ดท่องเที่ยว", price: 750 }
  ];
}

// Generate standard FAQs
function generateFAQs(country: string): FAQ[] {
  const baseFAQs: FAQ[] = [
    {
      q: "ต้องขอวีซ่าหรือไม่?",
      a: "สัญชาติไทยไม่ต้องขอวีซ่าล่วงหน้า สามารถใช้หนังสือเดินทางที่มีอายุเหลือมากกว่า 6 เดือน"
    },
    {
      q: "อาหารฮาลาล/เจ มีหรือไม่?",
      a: "มีบริการอาหารพิเศษตามความต้องการ กรุณาแจ้งล่วงหน้าขณะทำการจอง"
    },
    {
      q: "น้ำหนักสัมภาระที่อนุญาต?",
      a: "สัมภาระโหลด 20-30 กก. และสัมภาระติดตัว 7 กก. (ขึ้นอยู่กับสายการบิน)"
    },
    {
      q: "นโยบายการยกเลิก/คืนเงิน?",
      a: "สามารถยกเลิกฟรีภายใน 7 วันหลังจองสำหรับทัวร์ที่ออกเดินทางมากกว่า 45 วัน"
    }
  ];
  
  // Add country-specific FAQs
  if (country === 'Japan') {
    baseFAQs.push({
      q: "ช่วงไหนเหมาะกับการชมซากุระ?",
      a: "เดือนมีนาคม-พฤษภาคม เป็นช่วงซากุระบาน โดยช่วงเวลาจะแตกต่างกันไปตามเมือง"
    });
  }
  
  return baseFAQs;
}

// Generate itinerary based on duration and country
function generateItinerary(durationDays: number, country: string, cities: string[]): any[] {
  const itinerary = [];
  
  for (let day = 1; day <= durationDays; day++) {
    let title = `วันที่ ${day}`;
    let details = [];
    
    if (day === 1) {
      title = "ออกเดินทางจากกรุงเทพฯ";
      details = ["เช็คอินที่สนามบิน", "ออกเดินทางสู่จุดหมายปลายทาง"];
    } else if (day === durationDays) {
      title = "เดินทางกลับกรุงเทพฯ";
      details = ["ช้อปปิ้งของฝาก", "เดินทางสู่สนามบิน", "บินกลับกรุงเทพฯ"];
    } else {
      const city = cities[Math.min(day - 2, cities.length - 1)] || cities[0] || "เมืองหลัก";
      title = `เที่ยวชม ${city}`;
      
      if (country === 'Japan') {
        details = ["เที่ยวชมวัดเก่าแก่", "ชิมอาหารท้องถิ่น", "ช้อปปิ้งย่านใจกลางเมือง"];
      } else if (country === 'Turkey') {
        details = ["เที่ยวชมแหล่งประวัติศาสตร์", "ล่องเรือบอสฟอรัส", "ชิมอาหารตุรกี"];
      } else {
        details = ["เที่ยวชมสถานที่สำคัญ", "ชิมอาหารท้องถิ่น", "ช้อปปิ้งของฝาก"];
      }
    }
    
    itinerary.push({ day, title, details });
  }
  
  return itinerary;
}

// Convert tour card data to full seed format
function convertToSeed(tourCard: any): TourSeed {
  const slug = tourCard.id; // Use existing ID as slug
  const { days, nights } = parseDuration(tourCard.duration);
  const { country, cities } = parseLocation(tourCard.destination, tourCard.title);
  
  const seed: TourSeed = {
    id: tourCard.id,
    slug: slug,
    title: tourCard.title,
    country: country,
    cities: cities,
    duration_days: days,
    nights: nights,
    price_from: tourCard.price,
    currency: "THB",
    badges: tourCard.originalPrice ? ["Hot", "Promotion"] : ["Popular"],
    rating: tourCard.rating,
    reviews_count: tourCard.reviewCount,
    hero_images: [
      tourCard.image,
      tourCard.image.replace('w=800', 'w=1200'),
      tourCard.image.replace('photo-', 'photo-1')
    ],
    highlights: tourCard.highlights || [],
    itinerary: generateItinerary(days, country, cities),
    gallery: [
      tourCard.image,
      tourCard.image.replace('photo-', 'photo-1'),
      tourCard.image.replace('photo-', 'photo-2'),
      tourCard.image.replace('photo-', 'photo-3')
    ],
    included: [
      "ตั๋วเครื่องบินไป-กลับ",
      "ที่พักโรงแรม 4 ดาว",
      "อาหารตามรายการ",
      "รถรับส่งและนำเที่ยว",
      "ไกด์ท้องถิ่น",
      "ประกันอุบัติเหตุ"
    ],
    excluded: [
      "ทิปไกด์และคนขับรถ",
      "ค่าใช้จ่ายส่วนตัว",
      "อาหารและเครื่องดื่มนอกรายการ",
      "ค่าวีซ่า (ถ้ามี)",
      "ประกันการเดินทางเสริม"
    ],
    policies: {
      deposit: 3000,
      cancellation: "ยกเลิกฟรีภายใน 7 วันหลังจอง",
      payment_options: ["บัตรเครดิต", "โอนเงิน", "ผ่อน 0% 6 เดือน"]
    },
    departures: generateDepartures(tourCard.price, days),
    addons: generateAddons(),
    faqs: generateFAQs(country),
    related: [], // Will be filled later
    licenses: {
      tourism_license: "11/2567",
      airline_partners: ["TG", "TK", "QR", "KE"]
    },
    seo: {
      title: `${tourCard.title} ราคาเริ่ม ${tourCard.price.toLocaleString()}`,
      description: `${tourCard.title} ${tourCard.highlights.join(', ')}`,
      og_image: tourCard.image
    }
  };
  
  return seed;
}

// Main function to generate seeds
async function generateSeeds() {
  console.log('🚀 Starting tour seed generation...');
  
  try {
    // Extract tour data from existing page
    const tourCards = extractTourData();
    console.log(`📊 Found ${tourCards.length} tour cards`);
    
    // Convert to seed format
    const seeds = tourCards.map(convertToSeed);
    
    // Add related tours (cross-reference)
    seeds.forEach(seed => {
      const related = seeds
        .filter(s => s.id !== seed.id && (s.country === seed.country || Math.random() > 0.7))
        .slice(0, 3)
        .map(s => ({
          id: s.id,
          title: s.title,
          price_from: s.price_from,
          thumb: s.hero_images[0]
        }));
      seed.related = related;
    });
    
    // Create index file
    const index = seeds.map(seed => ({
      id: seed.id,
      slug: seed.slug,
      title: seed.title,
      price_from: seed.price_from,
      country: seed.country,
      duration_days: seed.duration_days,
      rating: seed.rating,
      hero_image: seed.hero_images[0]
    }));
    
    // Write files
    writeFileSync(
      join(process.cwd(), 'data/tours/index.json'),
      JSON.stringify(index, null, 2),
      'utf-8'
    );
    
    seeds.forEach(seed => {
      writeFileSync(
        join(process.cwd(), `data/tours/${seed.slug}.json`),
        JSON.stringify(seed, null, 2),
        'utf-8'
      );
    });
    
    console.log('✅ Successfully generated:');
    console.log(`   📁 data/tours/index.json (${seeds.length} tours)`);
    console.log(`   📄 ${seeds.length} individual tour files`);
    
    return seeds;
    
  } catch (error) {
    console.error('❌ Error generating seeds:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  generateSeeds().catch(console.error);
}

export { generateSeeds };