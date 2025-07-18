export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  publishedAt: string
  readingTime: number
  image: string
  category: string
  tags: string[]
  featured: boolean
  views: number;
  countries?: string[]
  faqs?: { q: string; a: string }[]
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'คู่มือสมบูรณ์แบบสำหรับการวางแผนเที่ยวญี่ปุ่นครั้งแรก',
    slug: 'ultimate-guide-planning-first-trip-japan',
    excerpt: 'ค้นพบทุกสิ่งที่คุณต้องรู้สำหรับการผจญภัยในญี่ปุ่นที่ไม่รู้ลืม ตั้งแต่มารยาทวัฒนธรรมไปจนถึงจุดหมายปลายทางที่ห้ามพลาด',
    content: `# The Ultimate Guide to Planning Your First Trip to Japan...`,
    author: {
      name: 'ซาร่าห์ จอห์นสัน',
      avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      bio: 'นักเขียนท่องเที่ยวและผู้เชี่ยวชาญญี่ปุ่นที่มีประสบการณ์สำรวจเอเชียมากกว่า 10 ปี'
    },
    publishedAt: '2024-06-10',
    readingTime: 8,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=95',
    category: 'คู่มือการเดินทาง',
    tags: ['ทัวร์ญี่ปุ่น', 'เที่ยวญี่ปุ่น', 'ซากุระ', 'ฤดูใบไม้ผลิ', 'ถ่ายรูป'],
    featured: true,
    views: 15203,
    countries: ["ญี่ปุ่น", "Japan"]
  },
  {
    id: '2',
    title: '10 อัญมณีลับในเอเชียตะวันออกเฉียงใต้ที่คุณต้องไป',
    slug: 'hidden-gems-southeast-asia',
    excerpt: 'สำรวจจุดหมายปลายทางที่น่าทึ่งนอกเส้นทางในเอเชียตะวันออกเฉียงใต้ ตั้งแต่หาดลับไปจนถึงวัดโบราณ',
    content: `# 10 Hidden Gems in Southeast Asia You Need to Visit...`,
    author: {
      name: 'มานะ สิทธิ์พร',
      avatar: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      bio: 'ช่างภาพการเดินทางผจญภัยผู้เชี่ยวชาญเอเชียตะวันออกเฉียงใต้และการท่องเที่ยวอย่างยั่งยืน'
    },
    publishedAt: '2024-01-10',
    readingTime: 6,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=95',
    category: 'ปลายทาง',
    tags: ['เอเชียตะวันออกเฉียงใต้', 'ที่เที่ยวลับ', 'ผจญภัย', 'นอกเส้นทาง'],
    featured: true,
    views: 12100,
    countries: ["ไทย", "Thailand", "เวียดนาม", "กัมพูชา", "อินโดนีเซีย", "พม่า"]
  },
  {
    id: '3',
    title: 'เที่ยวอย่างยั่งยืน: วิธีลดผลกระทบต่อสิ่งแวดล้อม',
    slug: 'sustainable-travel-minimize-environmental-impact',
    excerpt: 'เรียนรู้เคล็ดลับที่เป็นประโยชน์สำหรับการท่องเที่ยวอย่างมีความรับผิดชอบ ซึ่งเป็นประโยชน์ต่อชุมชนท้องถิ่นและปกป้องสิ่งแวดล้อม',
    content: `# เที่ยวอย่างยั่งยืน: วิธีลดผลกระทบต่อสิ่งแวดล้อม...`,
    author: {
      name: 'เอมิลี่ คาร์เตอร์',
      avatar: 'https://images.unsplash.com/photo-1589156280159-27698a703392?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      bio: 'ผู้สนับสนุนการท่องเที่ยวอย่างยั่งยืนและนักอนุรักษ์สิ่งแวดล้อม'
    },
    publishedAt: '2023-09-22',
    readingTime: 7,
    image: 'https://images.unsplash.com/photo-1518481851411-9d413c4626b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=95',
    category: 'เคล็ดลับการเดินทาง',
    tags: ['ท่องเที่ยวอย่างยั่งยืน', 'รักษ์โลก', 'ท่องเที่ยวเชิงอนุรักษ์'],
    featured: false,
    views: 8900
  },
  {
    id: '4',
    title: 'ตะลุยกินในกรุงโรม: 10 สุดยอดอาหารที่ต้องลอง',
    slug: 'food-tour-rome-10-dishes-must-try',
    excerpt: 'เริ่มต้นการเดินทางแห่งรสชาติผ่านเมืองหลวงของอิตาลี ค้นพบอาหารจานเด็ดตั้งแต่พาสต้าคลาสสิกไปจนถึงสตรีทฟู้ดที่ไม่ควรพลาด',
    content: `# ตะลุยกินในกรุงโรม: 10 สุดยอดอาหารที่ต้องลอง...`,
    author: {
      name: 'อเลสซานโดร รอสซี่',
      avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      bio: 'เชฟชาวโรมและนักวิจารณ์อาหารผู้หลงใหลในมรดกทางอาหารของอิตาลี'
    },
    publishedAt: '2024-05-20',
    readingTime: 6,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=95',
    category: 'อาหารและเครื่องดื่ม',
    tags: ['อาหารอิตาเลียน', 'โรม', 'ทัวร์กิน', 'พาสต้า', 'เจลาโต้'],
    featured: true,
    views: 18540,
    countries: ["อิตาลี"]
  },
  {
    id: '5',
    title: 'ผจญภัยในดินแดนไอซ์แลนด์: ขับรถเที่ยววงแหวนทองคำ (Golden Circle)',
    slug: 'icelandic-adventure-driving-the-golden-circle',
    excerpt: 'คู่มือฉบับสมบูรณ์สำหรับการขับรถเที่ยวเส้นทาง Golden Circle อันโด่งดังของไอซ์แลนด์ พบกับน้ำพุร้อน, น้ำตก และอุทยานแห่งชาติที่น่าทึ่ง',
    content: `# ผจญภัยในดินแดนไอซ์แลนด์: ขับรถเที่ยววงแหวนทองคำ (Golden Circle)...`,
    author: {
      name: 'บียอร์นสสัน',
      avatar: 'https://images.unsplash.com/photo-1610216705422-caa3fc269d95?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      bio: 'ไกด์ท้องถิ่นและช่างภาพทิวทัศน์ชาวไอซ์แลนด์'
    },
    publishedAt: '2024-03-15',
    readingTime: 7,
    image: 'https://images.unsplash.com/photo-1509395062183-035f084f87a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=95',
    category: 'เดินทางด้วยรถ',
    tags: ['ไอซ์แลนด์', 'Golden Circle', 'แสงเหนือ', 'น้ำตก', 'ขับรถเที่ยว'],
    featured: false,
    views: 11200,
    countries: ["ไอซ์แลนด์"]
  },
  {
    id: '6',
    title: 'มหานครที่ไม่เคยหลับใหล: คู่มือเที่ยวนิวยอร์ก 3 วัน',
    slug: 'new-york-city-3-day-itinerary',
    excerpt: 'สัมผัสพลังของนิวยอร์กด้วยแผนการเดินทาง 3 วันที่อัดแน่น ตั้งแต่ไทม์สแควร์ไปจนถึงเซ็นทรัลพาร์ค',
    content: `# มหานครที่ไม่เคยหลับใหล: คู่มือเที่ยวนิวยอร์ก 3 วัน...`,
    author: {
      name: 'เจสสิก้า เฉิน',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      bio: 'บล็อกเกอร์ท่องเที่ยวและชาวนิวยอร์กโดยกำเนิด'
    },
    publishedAt: '2024-02-28',
    readingTime: 9,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=95',
    category: 'เที่ยวเมือง',
    tags: ['นิวยอร์ก', 'อเมริกา', 'ไทม์สแควร์', 'คู่มือเที่ยว'],
    featured: true,
    views: 22500,
    countries: ["สหรัฐอเมริกา"]
  },
  {
    id: '7',
    title: 'ศิลปะการจัดกระเป๋า: วิธีจัดกระเป๋าเหมือนมือโปร',
    slug: 'art-of-packing-like-a-pro',
    excerpt: 'เปลี่ยนวิธีคิดเรื่องการจัดกระเป๋าเดินทางด้วยเคล็ดลับและเทคนิคเหล่านี้เพื่อประหยัดพื้นที่และเดินทางเบาขึ้น',
    content: `# ศิลปะการจัดกระเป๋า: วิธีจัดกระเป๋าเหมือนมือโปร...`,
    author: {
      name: 'มานะ สิทธิ์พร',
      avatar: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      bio: 'ช่างภาพการเดินทางผจญภัยผู้เชี่ยวชาญเอเชียตะวันออกเฉียงใต้และการท่องเที่ยวอย่างยั่งยืน'
    },
    publishedAt: '2023-11-12',
    readingTime: 5,
    image: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2b53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=95',
    category: 'เคล็ดลับการเดินทาง',
    tags: ['จัดกระเป๋า', 'เคล็ดลับการเดินทาง', 'ท่องเที่ยว'],
    featured: false,
    views: 7300
  },
  {
    id: '8',
    title: 'สำรวจซานโตรินี: มากกว่าแค่พระอาทิตย์ตกดิน',
    slug: 'exploring-santorini-beyond-sunsets',
    excerpt: 'ดำดิ่งสู่เกาะซานโตรินี ค้นพบหมู่บ้านที่มีเสน่ห์ ชายหาดที่ไม่เหมือนใคร และประวัติศาสตร์อันยาวนานนอกเหนือจากจุดชมวิวพระอาทิตย์ตกที่โด่งดัง',
    content: `# สำรวจซานโตรินี: มากกว่าแค่พระอาทิตย์ตกดิน...`,
    author: {
      name: 'เอเลนี ปาปาส',
      avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      bio: 'ผู้เชี่ยวชาญด้านการเดินทางในกรีซและชาวเกาะซานโตรินี'
    },
    publishedAt: '2024-04-18',
    readingTime: 7,
    image: 'https://images.unsplash.com/photo-1533105079780-52b9be4ac20d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=95',
    category: 'เกาะ',
    tags: ['กรีซ', 'ซานโตรินี', 'ทะเลเมดิเตอร์เรเนียน', 'เที่ยวเกาะ'],
    featured: true,
    views: 19800,
    countries: ["กรีซ"]
  },
  {
    id: '9',
    title: 'เดินป่าเส้นทางอินคาเทรลสู่มาจูปิกจู: สิ่งที่ควรรู้',
    slug: 'hiking-inca-trail-machu-picchu',
    excerpt: 'เตรียมพร้อมสำหรับการเดินทางครั้งหนึ่งในชีวิตบนเส้นทางอินคาเทรลสู่เมืองสาบสูญของชาวอินคา พร้อมคำแนะนำเกี่ยวกับการเตรียมตัวและสิ่งที่คาดหวัง',
    content: `# เดินป่าเส้นทางอินคาเทรลสู่มาจูปิกจู: สิ่งที่ควรรู้...`,
    author: {
      name: 'คาร์ลอส รามิเรซ',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      bio: 'ไกด์เดินป่าผู้มีประสบการณ์และผู้เชี่ยวชาญด้านประวัติศาสตร์อินคา'
    },
    publishedAt: '2023-10-05',
    readingTime: 8,
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=95',
    category: 'เดินป่า',
    tags: ['เปรู', 'มาจูปิกจู', 'เดินป่า', 'อเมริกาใต้', 'อินคาเทรล'],
    featured: false,
    views: 9500,
    countries: ["เปรู"]
  },
  {
    id: '10',
    title: 'เที่ยวคนเดียวอย่างปลอดภัย: สุดยอดเคล็ดลับสำหรับนักเดินทางหญิง',
    slug: 'safe-solo-female-travel-tips',
    excerpt: 'เสริมพลังให้ตัวเองด้วยเคล็ดลับและคำแนะนำที่จำเป็นสำหรับการเดินทางคนเดียวของผู้หญิง เพื่อให้การผจญภัยของคุณปลอดภัยและน่าจดจำ',
    content: `# เที่ยวคนเดียวอย่างปลอดภัย: สุดยอดเคล็ดลับสำหรับนักเดินทางหญิง...`,
    author: {
      name: 'ซาร่าห์ จอห์นสัน',
      avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      bio: 'นักเขียนท่องเที่ยวและผู้เชี่ยวชาญญี่ปุ่นที่มีประสบการณ์สำรวจเอเชียมากกว่า 10 ปี'
    },
    publishedAt: '2024-07-01',
    readingTime: 6,
    image: 'https://images.unsplash.com/photo-1542347582-e616262145b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=95',
    category: 'เคล็ดลับการเดินทาง',
    tags: ['เที่ยวคนเดียว', 'ผู้หญิงเที่ยวคนเดียว', 'ความปลอดภัย', 'เคล็ดลับ'],
    featured: false,
    views: 13250
  }
]

export const categories = [
  'ทั้งหมด',
  'คู่มือการเดินทาง',
  'จุดหมายปลายทาง',
  'อาหารและวัฒนธรรม',
  'ท่องเที่ยวยั่งยืน',
  'ท่องเที่ยวผจญภัย',
  'การถ่ายภาพ'
]

export const tags = [
  'ญี่ปุ่น',
  'ไทย',
  'เอเชียตะวันออกเฉียงใต้',
  'เอเชีย',
  'ท่องเที่ยวผจญภัย',
  'ท่องเที่ยวเชิงวัฒนธรรม',
  'อาหาร',
  'ความยั่งยืน',
  'อัญมณีลับ',
  'เที่ยวครั้งแรก',
  'การถ่ายภาพ',
  'วัฒนธรรมท้องถิ่น'
]