// ข้อมูลทัวร์ทั้งหมด
export const mockTours = [
  // ทัวร์ญี่ปุ่น (45 ทัวร์)
  {
    id: 1,
    title: "ญี่ปุ่น 7 วัน 6 คืน โตเกียว-เกียวโต-โอซาก้า",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    price: 45900,
    originalPrice: 52900,
    duration: "7 วัน 6 คืน",
    rating: 4.8,
    reviews: 127,
    highlights: ["วัดคิโยมิซุ", "ภูเขาฟูจิ", "ชินจูกุ", "ดาเตะบาชิ"],
    destinations: ["โตเกียว", "เกียวโต", "โอซาก้า"],
    discount: 13,
    groupSize: "2-15 คน",
    departureDate: "มี.ค. - พ.ค. 67"
  },
  {
    id: 7,
    title: "ญี่ปุ่น 5 วัน 4 คืน โอซาก้า-เกียวโต-นารา",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
    price: 32900,
    originalPrice: 38900,
    duration: "5 วัน 4 คืน",
    rating: 4.7,
    reviews: 95,
    highlights: ["ปราสาทโอซาก้า", "วัดโทไดจิ", "กวางนารา", "ศาลเจ้าฟูชิมิอินาริ"],
    destinations: ["โอซาก้า", "เกียวโต", "นารา"],
    discount: 15,
    groupSize: "2-16 คน",
    departureDate: "ก.พ. - เม.ย. 67"
  },
  {
    id: 8,
    title: "ญี่ปุ่น 6 วัน 5 คืน ฮอกไกโด ซัปโปโร-โอตารุ",
    image: "https://images.unsplash.com/photo-1569163139394-de4798e9a8c0?w=400&h=300&fit=crop",
    price: 42900,
    originalPrice: 48900,
    duration: "6 วัน 5 คืน",
    rating: 4.8,
    reviews: 112,
    highlights: ["เทศกาลหิมะซัปโปโร", "คลองโอตารุ", "ฟาร์มโทมิตะ", "บ่อน้ำพุร้อนโนโบริเบ็ตสึ"],
    destinations: ["ซัปโปโร", "โอตารุ", "ฟูราโน่"],
    discount: 12,
    groupSize: "2-20 คน",
    departureDate: "ก.พ. - มี.ค. 67"
  },
  {
    id: 9,
    title: "ญี่ปุ่น 8 วัน 7 คืน ทาคายาม่า-ชิราคาวาโกะ-คานาซาว่า",
    image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&h=300&fit=crop",
    price: 55900,
    originalPrice: 65900,
    duration: "8 วัน 7 คืน",
    rating: 4.9,
    reviews: 87,
    highlights: ["หมู่บ้านชิราคาวาโกะ", "ตลาดเช้าทาคายาม่า", "สวนเคนโรคุเอ็น", "ปราสาททอง"],
    destinations: ["ทาคายาม่า", "ชิราคาวาโกะ", "คานาซาว่า"],
    discount: 15,
    groupSize: "2-12 คน",
    departureDate: "มี.ค. - พ.ค. 67"
  },
  {
    id: 10,
    title: "ญี่ปุ่น 4 วัน 3 คืน โตเกียวดิสนีย์แลนด์",
    image: "https://images.unsplash.com/photo-1590766940554-634a7ed41d69?w=400&h=300&fit=crop",
    price: 28900,
    originalPrice: 32900,
    duration: "4 วัน 3 คืน",
    rating: 4.6,
    reviews: 156,
    highlights: ["โตเกียวดิสนีย์แลนด์", "โตเกียวดิสนีย์ซี", "ช้อปปิ้งชิบูย่า", "วัดเซนโซจิ"],
    destinations: ["โตเกียว"],
    discount: 12,
    groupSize: "2-15 คน",
    departureDate: "ทุกเดือน"
  },
  // Continue with more Japan tours to reach 45...
  {
    id: 27,
    title: "ญี่ปุ่น 9 วัน 8 คืน เกียวชู คุมาโมโต้-ฟุกุโอกะ",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop",
    price: 48900,
    originalPrice: 56900,
    duration: "9 วัน 8 คืน",
    rating: 4.8,
    reviews: 78,
    highlights: ["ปราสาทคุมาโมโต้", "ภูเขาไฟอาโซะ", "เมืองเก่าฟุกุโอกะ", "บ่อน้ำพุร้อนเบปปุ"],
    destinations: ["คุมาโมโต้", "ฟุกุโอกะ", "เบปปุ"],
    discount: 14,
    groupSize: "2-18 คน",
    departureDate: "เม.ย. - มิ.ย. 67"
  },
  // Add 38 more Japan tours...
  // For brevity, I'll add a few more key ones and indicate the pattern

  // เกาหลีใต้ (32 ทัวร์)
  {
    id: 2,
    title: "เกาหลีใต้ 6 วัน 5 คืน โซล-ปูซาน-เชจู",
    image: "https://images.unsplash.com/photo-1538485399081-7c8ed7f69c91?w=400&h=300&fit=crop",
    price: 38900,
    originalPrice: 45900,
    duration: "6 วัน 5 คืน",
    rating: 4.7,
    reviews: 89,
    highlights: ["พระราชวังเคียงบกกุง", "เกาะเชจู", "ตลาดนัมแดมุน", "หอคอยเอ็นโซล"],
    destinations: ["โซล", "ปูซาน", "เชจู"],
    discount: 15,
    groupSize: "2-12 คน",
    departureDate: "เม.ย. - มิ.ย. 67"
  },
  {
    id: 11,
    title: "เกาหลีใต้ 5 วัน 4 คืน โซล-เอเวอร์แลนด์",
    image: "https://images.unsplash.com/photo-1546874177-31bfa593f693?w=400&h=300&fit=crop",
    price: 29900,
    originalPrice: 35900,
    duration: "5 วัน 4 คืน",
    rating: 4.5,
    reviews: 134,
    highlights: ["สวนสนุกเอเวอร์แลนด์", "พระราชวังชางด๊อก", "ตลาดเมียงดง", "ภูเขานัมซาน"],
    destinations: ["โซล", "ยงอิน"],
    discount: 17,
    groupSize: "2-18 คน",
    departureDate: "มี.ค. - พ.ค. 67"
  },
  // Add 30 more Korea tours...

  // จีน (28 ทัวร์)
  {
    id: 14,
    title: "จีน 7 วัน 6 คืน ปักกิ่ง-เซี่ยงไฮ้",
    image: "https://images.unsplash.com/photo-1508804052814-cd3ba865a116?w=400&h=300&fit=crop",
    price: 38900,
    originalPrice: 45900,
    duration: "7 วัน 6 คืน",
    rating: 4.7,
    reviews: 92,
    highlights: ["กำแพงเมืองจีน", "พระราชวังต้องห้าม", "หอไข่มุก", "เซี่ยงไฮ้ดิสนีย์แลนด์"],
    destinations: ["ปักกิ่ง", "เซี่ยงไฮ้"],
    discount: 15,
    groupSize: "2-20 คน",
    departureDate: "พ.ค. - ส.ค. 67"
  },
  // Add 27 more China tours...

  // ไต้หวัน (22 ทัวร์)
  {
    id: 16,
    title: "ไต้หวัน 5 วัน 4 คืน ไทเป-อาลีซาน",
    image: "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=400&h=300&fit=crop",
    price: 26900,
    originalPrice: 31900,
    duration: "5 วัน 4 คืน",
    rating: 4.6,
    reviews: 103,
    highlights: ["ตึกไทเป 101", "อาลีซาน", "ทะเลสาบสุริยันจันทรา", "หมู่บ้านจิ่วเฟิ่น"],
    destinations: ["ไทเป", "เจียอี้", "หนานโถว"],
    discount: 16,
    groupSize: "2-18 คน",
    departureDate: "มี.ค. - พ.ค. 67"
  },
  // Add 21 more Taiwan tours...

  // ยุโรป (35 ทัวร์)
  {
    id: 3,
    title: "ยุโรป 12 วัน 11 คืน ฝรั่งเศส-อิตาลี-สวิตเซอร์แลนด์",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop",
    price: 129900,
    originalPrice: 149900,
    duration: "12 วัน 11 คืน",
    rating: 4.9,
    reviews: 203,
    highlights: ["หอไอเฟล", "โคลอสเซียม", "หอเอนปิซา", "เทือกเขาแอลป์"],
    destinations: ["ปารีส", "โรม", "มิลาน", "ซูริค"],
    discount: 13,
    groupSize: "2-20 คน",
    departureDate: "พ.ค. - ธ.ค. 68"
  },
  // Add 34 more Europe tours...

  // ออสเตรเลีย (23 ทัวร์)
  {
    id: 4,
    title: "ออสเตรเลีย 8 วัน 7 คืน ซิดนีย์-เมลเบิร์น-โกลด์โคสต์",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop",
    price: 78900,
    originalPrice: 89900,
    duration: "8 วัน 7 คืน",
    rating: 4.6,
    reviews: 156,
    highlights: ["โอเปร่าเฮาส์", "เกรทบาร์รีฟ", "ทาสเมเนีย", "แอร์ร็อค"],
    destinations: ["ซิดนีย์", "เมลเบิร์น", "โกลด์โคสต์"],
    discount: 12,
    groupSize: "2-18 คน",
    departureDate: "มิ.ย. - ก.ย. 67"
  },
  // Add 22 more Australia tours...

  // นิวซีแลนด์ (18 ทัวร์)
  {
    id: 5,
    title: "นิวซีแลนด์ 10 วัน 9 คืน ออกแลนด์-ควีนส์ทาวน์-เวลลิงตัน",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    price: 98900,
    originalPrice: 115900,
    duration: "10 วัน 9 คืน",
    rating: 4.8,
    reviews: 94,
    highlights: ["มิลฟอร์ดซาวด์", "โรโตรัว", "เทาโป", "ไบรท์วอเตอร์"],
    destinations: ["ออกแลนด์", "ควีนส์ทาวน์", "เวลลิงตัน"],
    discount: 15,
    groupSize: "2-16 คน",
    departureDate: "ก.ค. - ต.ค. 67"
  },
  // Add 17 more New Zealand tours...

  // แคนาดา (15 ทัวร์)
  {
    id: 6,
    title: "แคนาดา 9 วัน 8 คืน แวนคูเวอร์-แคลกะรี-โตรอนโต",
    image: "https://images.unsplash.com/photo-1519832979-6fa011b87667?w=400&h=300&fit=crop",
    price: 115900,
    originalPrice: 135900,
    duration: "9 วัน 8 คืน",
    rating: 4.7,
    reviews: 78,
    highlights: ["แบนฟ์", "ไนแอการาฟอลส์", "สแตนลีย์พาร์ค", "ซีแอตเทิล"],
    destinations: ["แวนคูเวอร์", "แคลกะรี", "โตรอนโต"],
    discount: 15,
    groupSize: "2-14 คน",
    departureDate: "ส.ค. - พ.ย. 67"
  },
  // Add 14 more Canada tours...
]

// For demonstration, I'll generate tours programmatically to reach the required numbers
const generateTours = () => {
  const tours = [...mockTours]
  let currentId = 100

  // Generate Japan tours to reach 45
  const japanTemplates = [
    { title: "ญี่ปุ่น {} วัน {} คืน โอกินาวา", destinations: ["โอกินาวา"], price: 45900, image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop" },
    { title: "ญี่ปุ่น {} วัน {} คืน เซนได", destinations: ["เซนได"], price: 38900, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop" },
    { title: "ญี่ปุ่น {} วัน {} คืน คุมาโมโต้", destinations: ["คุมาโมโต้"], price: 42900, image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop" },
    { title: "ญี่ปุ่น {} วัน {} คืน ฮิโรชิม่า", destinations: ["ฮิโรชิม่า"], price: 48900, image: "https://images.unsplash.com/photo-1604608672516-2c1177b10c92?w=400&h=300&fit=crop" },
    { title: "ญี่ปุ่น {} วัน {} คืน นาโกย่า", destinations: ["นาโกย่า"], price: 39900, image: "https://images.unsplash.com/photo-1565021993-2faea7a8113b?w=400&h=300&fit=crop" }
  ]

  // Add more Japan tours
  for (let i = 0; i < 40; i++) {
    const template = japanTemplates[i % japanTemplates.length]
    const days = 4 + (i % 8)
    tours.push({
      id: currentId++,
      title: template.title.replace('{}', days.toString()).replace('{}', (days - 1).toString()),
      image: template.image,
      price: template.price + (i * 1000),
      originalPrice: template.price + (i * 1000) + 7000,
      duration: `${days} วัน ${days - 1} คืน`,
      rating: 4.7,
      reviews: 123,
      highlights: ["สถานที่ 1", "สถานที่ 2", "สถานที่ 3", "สถานที่ 4"],
      destinations: template.destinations,
      discount: 12 + (i % 6),
      groupSize: "2-16 คน",
      departureDate: "มี.ค. - พ.ค. 67"
    })
  }

  // Generate Korea tours to reach 32
  const koreaImages = [
    "https://images.unsplash.com/photo-1538485399081-7c8ed7f69c91?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1546874177-31bfa593f693?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
  ]
  
  for (let i = 0; i < 30; i++) {
    tours.push({
      id: currentId++,
      title: `เกาหลีใต้ ${4 + (i % 6)} วัน ${3 + (i % 6)} คืน โซล-พิเศษ ${i + 1}`,
      image: koreaImages[i % koreaImages.length],
      price: 25900 + (i * 2000),
      originalPrice: 30900 + (i * 2000),
      duration: `${4 + (i % 6)} วัน ${3 + (i % 6)} คืน`,
      rating: 4.6,
      reviews: 98,
      highlights: ["เมียงดง", "ฮงแด", "กังนัม", "อีแทวอน"],
      destinations: ["โซล"],
      discount: 10 + (i % 8),
      groupSize: "2-18 คน",
      departureDate: "เม.ย. - มิ.ย. 67"
    })
  }

  // Similar pattern for other countries...
  // China (26 more tours)
  const chinaImages = [
    "https://images.unsplash.com/photo-1508804052814-cd3ba865a116?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
  ]
  
  for (let i = 0; i < 26; i++) {
    tours.push({
      id: currentId++,
      title: `จีน ${5 + (i % 6)} วัน ${4 + (i % 6)} คืน ปักกิ่ง-พิเศษ ${i + 1}`,
      image: chinaImages[i % chinaImages.length],
      price: 32900 + (i * 1500),
      originalPrice: 38900 + (i * 1500),
      duration: `${5 + (i % 6)} วัน ${4 + (i % 6)} คืน`,
      rating: 4.6,
      reviews: 87,
      highlights: ["กำแพงเมืองจีน", "พระราชวังต้องห้าม", "หอไข่มุก", "เซี่ยงไฮ้"],
      destinations: ["ปักกิ่ง", "เซี่ยงไฮ้"],
      discount: 12 + (i % 5),
      groupSize: "2-20 คน",
      departureDate: "พ.ค. - ส.ค. 67"
    })
  }

  // Taiwan (20 more tours)
  const taiwanImages = [
    "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=400&h=300&fit=crop"
  ]
  
  for (let i = 0; i < 20; i++) {
    tours.push({
      id: currentId++,
      title: `ไต้หวัน ${4 + (i % 5)} วัน ${3 + (i % 5)} คืน ไทเป-พิเศษ ${i + 1}`,
      image: taiwanImages[i % taiwanImages.length],
      price: 24900 + (i * 1200),
      originalPrice: 29900 + (i * 1200),
      duration: `${4 + (i % 5)} วัน ${3 + (i % 5)} คืน`,
      rating: 4.5,
      reviews: 72,
      highlights: ["ตึกไทเป 101", "อาลีซาน", "ทะเลสาบสุริยัน", "จิ่วเฟิ่น"],
      destinations: ["ไทเป"],
      discount: 14 + (i % 4),
      groupSize: "2-16 คน",
      departureDate: "มี.ค. - พ.ค. 67"
    })
  }

  // Europe (32 more tours)
  const europeImages = [
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1509023925912-6c96c1de6c9e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1546268060-2592ff93ee24?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop"
  ]
  
  for (let i = 0; i < 32; i++) {
    tours.push({
      id: currentId++,
      title: `ยุโรป ${8 + (i % 7)} วัน ${7 + (i % 7)} คืน ปารีส-พิเศษ ${i + 1}`,
      image: europeImages[i % europeImages.length],
      price: 89900 + (i * 3000),
      originalPrice: 105900 + (i * 3000),
      duration: `${8 + (i % 7)} วัน ${7 + (i % 7)} คืน`,
      rating: 4.7,
      reviews: 134,
      highlights: ["หอไอเฟล", "โคลอสเซียม", "ลูฟร์", "เวนิส"],
      destinations: ["ปารีส", "โรม"],
      discount: 10 + (i % 8),
      groupSize: "2-18 คน",
      departureDate: "มิ.ย. - ก.ย. 67"
    })
  }

  // Australia (20 more tours)
  const australiaImages = [
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=400&h=300&fit=crop"
  ]
  
  for (let i = 0; i < 20; i++) {
    tours.push({
      id: currentId++,
      title: `ออสเตรเลีย ${6 + (i % 5)} วัน ${5 + (i % 5)} คืน ซิดนีย์-พิเศษ ${i + 1}`,
      image: australiaImages[i % australiaImages.length],
      price: 65900 + (i * 2500),
      originalPrice: 75900 + (i * 2500),
      duration: `${6 + (i % 5)} วัน ${5 + (i % 5)} คืน`,
      rating: 4.6,
      reviews: 89,
      highlights: ["โอเปร่าเฮาส์", "สะพานซิดนีย์", "แอร์ร็อค", "โกลด์โคสต์"],
      destinations: ["ซิดนีย์"],
      discount: 11 + (i % 6),
      groupSize: "2-16 คน",
      departureDate: "ก.ค. - ก.ย. 67"
    })
  }

  // New Zealand (15 more tours)
  const newZealandImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1465056836041-7f43ac27ae62?w=400&h=300&fit=crop"
  ]
  
  for (let i = 0; i < 15; i++) {
    tours.push({
      id: currentId++,
      title: `นิวซีแลนด์ ${7 + (i % 5)} วัน ${6 + (i % 5)} คืน ออกแลนด์-พิเศษ ${i + 1}`,
      image: newZealandImages[i % newZealandImages.length],
      price: 78900 + (i * 2800),
      originalPrice: 89900 + (i * 2800),
      duration: `${7 + (i % 5)} วัน ${6 + (i % 5)} คืน`,
      rating: 4.7,
      reviews: 91,
      highlights: ["มิลฟอร์ดซาวด์", "ควีนส์ทาวน์", "โรโตรัว", "ฮอบบิตัน"],
      destinations: ["ออกแลนด์", "ควีนส์ทาวน์"],
      discount: 13 + (i % 5),
      groupSize: "2-14 คน",
      departureDate: "ส.ค. - พ.ย. 67"
    })
  }

  // Canada (12 more tours)
  const canadaImages = [
    "https://images.unsplash.com/photo-1519832979-6fa011b87667?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1609825488888-3a766db05542?w=400&h=300&fit=crop"
  ]
  
  for (let i = 0; i < 12; i++) {
    tours.push({
      id: currentId++,
      title: `แคนาดา ${7 + (i % 4)} วัน ${6 + (i % 4)} คืน แวนคูเวอร์-พิเศษ ${i + 1}`,
      image: canadaImages[i % canadaImages.length],
      price: 95900 + (i * 3500),
      originalPrice: 109900 + (i * 3500),
      duration: `${7 + (i % 4)} วัน ${6 + (i % 4)} คืน`,
      rating: 4.8,
      reviews: 103,
      highlights: ["แบนฟ์", "ไนแอการา", "โตรอนโต", "แวนคูเวอร์"],
      destinations: ["แวนคูเวอร์", "โตรอนโต"],
      discount: 12 + (i % 6),
      groupSize: "2-16 คน",
      departureDate: "ก.ย. - ธ.ค. 67"
    })
  }

  return tours
}

export const allTours = generateTours()