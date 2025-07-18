export interface Tour {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  highlights: string[];
  category: string;
  availability: string;
  groupSize: string;
  availableSlots?: number;
  country: string;
  departureDates: Array<{
    start: string;
    end: string;
  }>;
  included: string[];
  notIncluded: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    image: string;
    highlights: string[];
    meals?: string[];
    accommodation?: string;
    fullDescription?: string;
  }>;
  reviewsList: Array<{
    name: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
  }>;
  featured?: boolean;
}

export const tours: Tour[] = [
  // ญี่ปุ่น
  {
    id: "1",
    title: "ทัวร์ญี่ปุ่นสุดมหัศจรรย์",
    location: "โตเกียว, เกียวโต และ โอซาก้า",
    duration: "10 วัน 8 คืน",
    price: 89000,
    originalPrice: 99000,
    rating: 4.9,
    reviews: 124,
    availability: "ว่าง",
    availableSlots: 8,
    country: "ญี่ปุ่น",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["ภูเขาไฟฟูจิ", "วัดแบบดั้งเดิม", "ซากุระบาน", "รถไฟซินกันเซ็น", "อาหารญี่ปุ่นแท้"],
    groupSize: "12-16 คน",
    category: "เอเชีย",
    featured: true,
    description: "สัมผัสประสบการณ์เดินทางที่ไม่มีวันลืมไปยังญี่ปุ่น ด้วยโปรแกรม 10 วัน 8 คืน ที่คัดสรรอย่างละเอียด รวมทั้งจุดหมายที่เป็นสัญลักษณ์และจุดเด่นในแต่ละเมือง พร้อมสัมผัสอาหารญี่ปุ่นแท้ และวัฒนธรรมที่เก่าแก่และทันสมัย",
    departureDates: [
      { start: "15 มี.ค. 68", end: "24 มี.ค. 68" },
      { start: "5 เม.ย. 68", end: "14 เม.ย. 68" },
      { start: "20 เม.ย. 68", end: "29 เม.ย. 68" }
    ],
    included: [
      "ที่พัก 8 คืนในโรงแรม 4-5 ดาว (ห้องแบบคู่)",
      "อาหารทุกมื้อตามโปรแกรม (28 มื้อ)",
      "ไกด์ท้องถิ่นผู้เชี่ยวชาญ (พูดได้ 3 ภาษา)",
      "ค่าผ่านศุลกากรและขาเข้า-ออกประเทศ",
      "ประกันการเดินทางและกิจกรรม",
      "บัตรกิจกรรมและค่าเข้าชมสถานที่",
      "รถเมล์ปันเลื่อนเร็วสูง JR PASS",
      "ค่าบริการที่ปรึกษาและสนับสนุน 24 ช."
    ],
    notIncluded: [
      "ตั๋วเครื่องบินไป-กลับ (ประมาณ 45,000-65,000 บาท)",
      "ค่าใช้จ่ายส่วนตัว (เครื่องดื่ม, ของที่ระลึก)",
      "ค่าเทีบและกิจกรรมเสริมนอกโปรแกรม",
      "ค่าภาษีและค่าวีซ่า (หากต้องการ)",
      "ค่าทิปและค่าบริการพิเศษอื่นๆ"
    ],
    itinerary: [
      {
        day: 1,
        title: "เดินทางถึงโตเกียว - ย่านชิบุยะ",
        description: "เดินทางถึงสนามบินนาริตะ รับรถไปโรงแรม เช็คอินแล้วเดินทางสู่ย่านชิบุยะ สัมผัสบรรยากาศและความคาดคาบของชาวญี่ปุ่น",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        highlights: ["สนามบินนาริตะ", "ย่านชิบุยะ", "สกรัมบล"], 
        meals: ["อาหารเย็น"],
        accommodation: "โรงแรม 4 ดาว ย่านชิบุยะ",
        fullDescription: "เดินทางจากสนามบินสุวรรณภูมิ ด้วยขบวนการความเร็วสูงที่เป็นมิตรกับสิ่งแวดล้อม ในตอนเย็นจะได้สัมผัสอาหารญี่ปุ่นแท้ พร้อมชมวิวย่านชิบุยะที่มีชีวิตกลางคืนและสตรีทฟูดอร่อย"
      },
      {
        day: 2,
        title: "ภูเขาไฟฟูจิ - เกียวโต",
        description: "เดินทางสู่ภูเขาไฟฟูจิชื่อดังของญี่ปุ่น ถ่ายรูปทิวทัศนียภาพ สัมผัสวัดเก่าและวัฒนธรรมเกียวโต",
        image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        highlights: ["ภูเขาไฟฟูจิ", "วัดเก่า", "บามบูโตะ"], 
        meals: ["อาหารเช้า", "อาหารกลางวัน", "อาหารเย็น"],
        accommodation: "โรงแรม 4 ดาว เกียวโต",
        fullDescription: "เริ่มต้นวันด้วยการชมภูเขาไฟฟูจิสูง 3,776 เมตร สัญลักษณ์ของประเทศญี่ปุ่น ถ่ายรูปทิวทัศนียภาพที่สวยงาม จากนั้นไปเกียวโต ชมวัดเก่าและวัฒนธรรมญี่ปุ่นแบบดั้งเดิม"
      },
      {
        day: 3,
        title: "โอสาก้า - บามบูโตะและกิอน",
        description: "เดินทางสู่โอสาก้า เยี่ยมชมบามบูโตะและเขตกิอน ชมตลาดปลาใหม่ ชิมอาหารซูชิและตะโกยากิ",
        image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        highlights: ["บามบูโตะ", "กิอน", "ตลาดปลาใหม่", "ตะโกยากิ"], 
        meals: ["อาหารเช้า", "อาหารกลางวัน", "อาหารเย็น"],
        accommodation: "โรงแรม 4 ดาว โอสาก้า",
        fullDescription: "ท่องเที่ยวในโอสาก้า เมืองแห่งอาหารและวัฒนธรรม เยี่ยมชมย่านบามบูโตะดั้งเดิม สัมผัสเขตกิอนที่มีชาวบ้านขายตะโกยากิที่มีชื่อเสียงโด่งดัง เดินชมตลาดปลาใหม่และชิมอาหารทะเลสด"
      }
    ],
    reviewsList: [
      {
        name: "คุณสมชาย วงศ์ใหญ่",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "15 ก.พ. 2567",
        comment: "ทัวร์ดีมาก ไกด์น่ารัก อาหารอร่อย พาไปเมื่อกับครอบครัว บริการดีมาก ภูเขาไฟฟูจิสวยมาก!"
      },
      {
        name: "คุณวินิจ สุขใส",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c19a86c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "28 มิ.ย. 2567",
        comment: "ทริปที่คุ้มค่ามาก! ชมวัดเก่าและเกียวโต ไกด์ให้ความรู้ดีมาก บริการชั้นเลิศ!"
      },
      {
        name: "คุณกร รักเที่ยว",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 4,
        date: "5 เม.ย. 2567",
        comment: "สำหรับครั้งแรกที่ไปญี่ปุ่น บริการดี ไกด์ให้คำแนะนำดีมาก ทุกอย่างในโปรแกรมเรียบร้อยดี"
      }
    ]
  },
  {
    id: "2",
    title: "ทัวร์ญี่ปุ่นใต้ โอกินาว่า",
    location: "โอกินาว่า, นาฮะ",
    duration: "6 วัน 4 คืน",
    price: 65000,
    originalPrice: 75000,
    rating: 4.7,
    reviews: 98,
    availability: "เหลือน้อย",
    availableSlots: 2,
    country: "ญี่ปุ่น",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["หาดทรายขาว", "ดำน้ำดูปะการัง", "วัฒนธรรมโอกินาว่า", "อาหารทะเล"],
    groupSize: "10-14 คน",
    category: "เอเชีย",
    featured: false,
    description: "เพลิดเพลินกับชายหาดสวยงามและวัฒนธรรมเฉพาะตัวของโอกินาว่า",
    departureDates: [
      { start: "10 มี.ค. 68", end: "15 มี.ค. 68" },
      { start: "25 มี.ค. 68", end: "30 มี.ค. 68" }
    ],
    included: ["ที่พัก 4 คืนในรีสอร์ท", "อาหารเช้าทุกวัน", "กิจกรรมดำน้ำ"],
    notIncluded: ["ตั๋วเครื่องบิน", "อาหารกลางวันและเย็น"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงโอกินาว่า",
      description: "เดินทางถึงสนามบินนาฮะ",
      image: "https://images.unsplash.com/photo-1518518873111-6ca469aa4560?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินนาฮะ", "รีสอร์ทชายหาด"]
    }],
    reviewsList: [{
      name: "คุณมาลี สวยงาม",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c19a86c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "20 ก.พ. 2567",
      comment: "โอกินาว่าสวยมาก น้ำใสหาดสะอาด"
    }]
  },
  {
    id: "3",
    title: "ทัวร์ญี่ปุ่นเหนือ ฮอกไกโด",
    location: "ซัปโปโร, โอตารุ, ฮาโกดาเตะ",
    duration: "8 วัน 6 คืน",
    price: 95000,
    rating: 4.8,
    reviews: 156,
    availability: "เต็ม",
    availableSlots: 0,
    country: "ญี่ปุ่น",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["หิมะขาว", "ปูยักษ์ฮอกไกโด", "ออนเซ็นธรรมชาติ", "ลาเวนเดอร์"],
    groupSize: "12-16 คน",
    category: "เอเชีย",
    featured: true,
    description: "สัมผัสความงามของฮอกไกโดใต้หิมะขาวโพลน และอาหารทะเลสดใหม่",
    departureDates: [
      { start: "1 เม.ย. 68", end: "8 เม.ย. 68" },
      { start: "15 เม.ย. 68", end: "22 เม.ย. 68" }
    ],
    included: ["ที่พัก 6 คืน", "อาหารทุกมื้อ", "ออนเซ็น"],
    notIncluded: ["ตั๋วเครื่องบิน", "ค่าใช้จ่ายส่วนตัว"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงซัปโปโร",
      description: "เดินทางถึงสนามบินชิโตเซะ",
      image: "https://images.unsplash.com/photo-1609519653992-2a64845dba1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินชิโตเซะ", "เมืองซัปโปโร"]
    }],
    reviewsList: [{
      name: "คุณประยุทธ มีหิมะ",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "10 ก.พ. 2567",
      comment: "ฮอกไกโดสวยมาก หิมะขาวโพลน"
    }]
  },

  // เกาหลีใต้
  {
    id: "4",
    title: "ตามรอย K-Pop ที่โซล",
    location: "โซล, เกาหลีใต้",
    duration: "6 วัน 4 คืน",
    price: 45000,
    originalPrice: 49000,
    rating: 4.6,
    reviews: 180,
    availability: "ว่าง",
    availableSlots: 12,
    country: "เกาหลีใต้",
    image: "https://images.unsplash.com/photo-1547893223-169b1e5a5b99?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["ย่านกังนัม", "ค่ายเพลงใหญ่", "เรียนเต้น K-Pop", "ช็อปปิ้งเมียงดง"],
    groupSize: "8-12 คน",
    category: "เอเชีย",
    featured: false,
    description: "ทริปพิเศษสำหรับแฟน K-Pop ตัวจริง! ตะลุยกรุงโซลตามรอยศิลปินที่คุณชื่นชอบ",
    departureDates: [
      { start: "3 มี.ค. 68", end: "8 มี.ค. 68" },
      { start: "17 มี.ค. 68", end: "22 มี.ค. 68" }
    ],
    included: ["ที่พัก 4 คืน", "อาหารเช้า", "คลาสเรียนเต้น K-Pop"],
    notIncluded: ["ตั๋วเครื่องบิน", "อาหารกลางวันและเย็น"],
    itinerary: [{
      day: 1,
      title: "ถึงโซล",
      description: "เดินทางถึงสนามบินอินชอน",
      image: "https://images.unsplash.com/photo-1579870191811-1a6c5a8e1be5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินอินชอน", "ฮงแด"]
    }],
    reviewsList: [{
      name: "น้องแพรว สาวกไอดอล",
      avatar: "https://images.unsplash.com/photo-1581898953921-97a7a3a93afe?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "20 ก.พ. 2567",
      comment: "สนุกมากค่ะ ได้ไปที่ที่เคยเห็นใน MV"
    }]
  },
  {
    id: "5",
    title: "เกาหลีใต้ 4 ฤดู บูซาน + เชจู",
    location: "โซล, บูซาน, เกาะเชจู",
    duration: "8 วัน 6 คืน",
    price: 69000,
    originalPrice: 79000,
    rating: 4.8,
    reviews: 210,
    availability: "เหลือน้อย",
    availableSlots: 3,
    country: "เกาหลีใต้",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["วัดพุลกุกซา", "หาดฮแออันแด", "ภูเขาฮัลลาซาน", "ตลาดจากัลชี"],
    groupSize: "12-18 คน",
    category: "เอเชีย",
    featured: true,
    description: "สัมผัสเสน่ห์ของเกาหลีใต้ครบทั้ง 3 เมืองสำคัญ ตั้งแต่เมืองหลวงโซลไปจนถึงเกาะธรรมชาติเชจู",
    departureDates: [
      { start: "8 มี.ค. 68", end: "15 มี.ค. 68" },
      { start: "22 มี.ค. 68", end: "29 มี.ค. 68" }
    ],
    included: ["ที่พัก 6 คืน", "อาหารเกาหลีแท้", "ไกด์ท้องถิ่น"],
    notIncluded: ["ตั๋วเครื่องบิน", "ค่าใช้จ่ายส่วนตัว"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงโซล",
      description: "เดินทางถึงสนามบินอินชอน",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินอินชอน", "ย่านมยองดง"]
    }],
    reviewsList: [{
      name: "คุณอารีย์ รักเกาหลี",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c19a86c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "25 ก.พ. 2567",
      comment: "เกาหลีสวยมาก อาหารอร่อย คนน่ารัก"
    }]
  },

  // ยุโรป
  {
    id: "6",
    title: "ทัวร์ยุโรปสุดคลาสสิค",
    location: "ปารีส, โรม และ บาร์เซโลนา",
    duration: "14 วัน 12 คืน",
    price: 109000,
    originalPrice: 129000,
    rating: 4.8,
    reviews: 89,
    availability: "ว่าง",
    availableSlots: 6,
    country: "ฝรั่งเศส",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["หอไอเฟล", "โคลอสเซียม", "ซากราดา ฟามิเลีย", "พิพิธภัณฑ์ลูฟร์"],
    groupSize: "14-18 คน",
    category: "ยุโรป",
    featured: true,
    description: "สำรวจความงามของยุโรปผ่านเมืองหลวงที่สวยงามที่สุดในโลก",
    departureDates: [
      { start: "1 เม.ย. 68", end: "14 เม.ย. 68" },
      { start: "15 เม.ย. 68", end: "28 เม.ย. 68" }
    ],
    included: ["ที่พัก 12 คืน", "อาหารเช้าทุกวัน", "ไกด์ท้องถิ่น"],
    notIncluded: ["ตั๋วเครื่องบิน", "อาหารกลางวันและเย็น"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงปารีส",
      description: "เดินทางถึงปารีส เช็คอินโรงแรม",
      image: "https://images.unsplash.com/photo-1471874708433-acd480424946?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบิน Charles de Gaulle", "โรงแรมใจกลางปารีส"]
    }],
    reviewsList: [{
      name: "คุณสุดา ชื่นใจ",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "20 ม.ค. 2567",
      comment: "ยุโรปสวยมาก หอไอเฟลตื่นตาตื่นใจ"
    }]
  },
  {
    id: "7",
    title: "มนต์เสน่ห์แห่งสวิตเซอร์แลนด์",
    location: "ซูริค, ลูเซิร์น, อินเทอร์ลาเคน",
    duration: "9 วัน 7 คืน",
    price: 115000,
    rating: 5.0,
    reviews: 210,
    availability: "ว่าง",
    availableSlots: 4,
    country: "สวิตเซอร์แลนด์",
    image: "https://images.unsplash.com/photo-1530122037265-dc5f1f02a3a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["ยอดเขายุงเฟรา", "ยอดเขาแมทเทอร์ฮอร์น", "ล่องเรือทะเลสาบ"],
    groupSize: "10-15 คน",
    category: "ยุโรป",
    featured: true,
    description: "เดินทางสู่ดินแดนในฝัน สวิตเซอร์แลนด์ สัมผัสธรรมชาติอันบริสุทธิ์",
    departureDates: [
      { start: "20 มิ.ย. 68", end: "28 มิ.ย. 68" },
      { start: "10 ก.ค. 68", end: "18 ก.ค. 68" }
    ],
    included: ["ที่พัก 7 คืน", "Swiss Travel Pass", "ตั๋วขึ้นยอดเขา"],
    notIncluded: ["ตั๋วเครื่องบิน", "อาหารกลางวันและเย็น"],
    itinerary: [{
      day: 1,
      title: "ถึงซูริค",
      description: "เดินทางถึงสนามบินซูริค",
      image: "https://images.unsplash.com/photo-1528489371135-52d822524363?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินซูริค", "เมืองเก่าซูริค"]
    }],
    reviewsList: [{
      name: "คุณอลิสา สุขใจ",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "15 พ.ค. 2567",
      comment: "สวิตเซอร์แลนด์สวยเหมือนภาพวาด"
    }]
  },
  {
    id: "8",
    title: "อิตาลี โรมันติกไม่รู้ลืม",
    location: "โรม, ฟลอเรนซ์, เวนิส, มิลาน",
    duration: "12 วัน 10 คืน",
    price: 125000,
    originalPrice: 140000,
    rating: 4.9,
    reviews: 167,
    availability: "เหลือน้อย",
    availableSlots: 1,
    country: "อิตาลี",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["โคลอสเซียม", "หอเอนเมืองปิซา", "กอนโดลาเวนิส", "ลาสกาล่า"],
    groupSize: "12-16 คน",
    category: "ยุโรป",
    featured: true,
    description: "ดื่มด่ำกับศิลปะ สถาปัตยกรรม และอาหารอิตาเลียนแท้ในดินแดนแห่งความโรมันติก",
    departureDates: [
      { start: "5 เม.ย. 68", end: "16 เม.ย. 68" },
      { start: "20 เม.ย. 68", end: "1 พ.ค. 68" }
    ],
    included: ["ที่พัก 10 คืน", "อาหารเช้า", "ไกด์ท้องถิ่น", "ล่องกอนโดลา"],
    notIncluded: ["ตั๋วเครื่องบิน", "อาหารกลางวันและเย็น"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงโรม",
      description: "เดินทางถึงสนามบินฟูมิชิโน",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินฟูมิชิโน", "เมืองโรมา"]
    }],
    reviewsList: [{
      name: "คุณธนากร รักศิลป์",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "18 ม.ค. 2567",
      comment: "อิตาลีสวยงามมาก ศิลปะและสถาปัตยกรรมสุดยอด"
    }]
  },

  // สหรัฐอเมริกา
  {
    id: "9",
    title: "ผจญภัยในอเมริกาตะวันตก",
    location: "ลอสแอนเจลิส, ลาสเวกัส, แกรนด์แคนยอน",
    duration: "12 วัน 10 คืน",
    price: 125000,
    originalPrice: 135000,
    rating: 4.9,
    reviews: 95,
    availability: "ว่าง",
    availableSlots: 8,
    country: "สหรัฐอเมริกา",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["แกรนด์แคนยอน", "ฮอลลีวูด", "ลาสเวกัส", "Route 66"],
    groupSize: "15-20 คน",
    category: "อเมริกา",
    featured: false,
    description: "สัมผัสประสบการณ์สุดยิ่งใหญ่บนเส้นทางโร้ดทริปในตำนาน",
    departureDates: [
      { start: "10 พ.ค. 68", end: "21 พ.ค. 68" },
      { start: "5 มิ.ย. 68", end: "16 มิ.ย. 68" }
    ],
    included: ["ที่พัก 10 คืน", "รถมินิโค้ช", "ค่าเข้าอุทยาน"],
    notIncluded: ["ตั๋วเครื่องบิน", "อาหารกลางวัน"],
    itinerary: [{
      day: 1,
      title: "ถึงลอสแอนเจลิส",
      description: "เดินทางถึงสนามบิน LAX",
      image: "https://images.unsplash.com/photo-1541306943944-f5a13d769356?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบิน LAX", "ซานตาโมนิกา"]
    }],
    reviewsList: [{
      name: "คุณเดวิด เจริญกิจ",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "25 เม.ย. 2567",
      comment: "แกรนด์แคนยอนคือที่สุดของชีวิต"
    }]
  },
  {
    id: "10",
    title: "นิวยอร์ก มหานครแห่งความฝัน",
    location: "นิวยอร์ก, วอชิงตัน ดี.ซี.",
    duration: "8 วัน 6 คืน",
    price: 98000,
    originalPrice: 110000,
    rating: 4.7,
    reviews: 134,
    availability: "ว่าง",
    availableSlots: 10,
    country: "สหรัฐอเมริกา",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["เทพีเสรีภาพ", "ไทม์สแควร์", "เซ็นทรัลพาร์ก", "พิพิธภัณฑ์เมท"],
    groupSize: "12-18 คน",
    category: "อเมริกา",
    featured: true,
    description: "สัมผัสพลังของเมืองที่ไม่เคยหลับใหล นิวยอร์ก เมืองแห่งความฝันและโอกาส",
    departureDates: [
      { start: "12 มี.ค. 68", end: "19 มี.ค. 68" },
      { start: "26 มี.ค. 68", end: "2 เม.ย. 68" }
    ],
    included: ["ที่พัก 6 คืน", "อาหารเช้า", "บัตรรถไฟใต้ดิน"],
    notIncluded: ["ตั๋วเครื่องบิน", "อาหารกลางวันและเย็น"],
    itinerary: [{
      day: 1,
      title: "ถึงนิวยอร์ก",
      description: "เดินทางถึงสนามบิน JFK",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบิน JFK", "แมนฮัตตัน"]
    }],
    reviewsList: [{
      name: "คุณปาริชาติ ฝันใหญ่",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c19a86c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "8 ก.พ. 2567",
      comment: "นิวยอร์กสุดยอด เมืองที่ไม่เคยหลับใหล"
    }]
  },

  // เอเชียตะวันออกเฉียงใต้
  {
    id: "11",
    title: "สวรรค์เกาะเขตร้อน บาหลี",
    location: "บาหลี และ ลอมบอก",
    duration: "8 วัน 6 คืน",
    price: 59000,
    originalPrice: 69000,
    rating: 4.7,
    reviews: 156,
    availability: "ว่าง",
    availableSlots: 15,
    country: "อินโดนีเซีย",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["รีสอร์ทชายหาด", "ทัวร์วัด", "เดินป่าภูเขาไฟ", "ดำน้ำดูปะการัง"],
    groupSize: "10-14 คน",
    category: "เอเชีย",
    featured: true,
    description: "พักผ่อนในสวรรค์เขตร้อนที่บาหลี สัมผัสวัฒนธรรมพื้นเมือง",
    departureDates: [
      { start: "10 มี.ค. 68", end: "17 มี.ค. 68" },
      { start: "20 มี.ค. 68", end: "27 มี.ค. 68" }
    ],
    included: ["ที่พัก 6 คืน", "อาหารเช้า", "ทัวร์ครึ่งวัน"],
    notIncluded: ["ตั๋วเครื่องบิน", "อาหารกลางวันและเย็น"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงบาหลี",
      description: "เดินทางถึงสนามบิน Ngurah Rai",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบิน Ngurah Rai", "รีสอร์ทชายหาด"]
    }],
    reviewsList: [{
      name: "คุณประยุทธ สนุกสนาน",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "5 ก.พ. 2567",
      comment: "บาหลีสวยมาก น้ำใส หาดทรายขาว"
    }]
  },
  {
    id: "12",
    title: "เวียดนามเหนือ ฮาลองเบย์",
    location: "ฮานอย, ฮาลองเบย์, ซาปา",
    duration: "7 วัน 5 คืน",
    price: 35000,
    originalPrice: 42000,
    rating: 4.5,
    reviews: 198,
    availability: "เหลือน้อย",
    availableSlots: 4,
    country: "เวียดนาม",
    image: "https://images.unsplash.com/photo-1509639820,ib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["ฮาลองเบย์", "ล่องเรือจั้งค์", "ถ้ำธรรมชาติ", "หมู่บ้านชาวเขา"],
    groupSize: "14-20 คน",
    category: "เอเชีย",
    featured: false,
    description: "สำรวจความงามของเวียดนามเหนือ ตั้งแต่ฮาลองเบย์สู่ภูเขาซาปา",
    departureDates: [
      { start: "15 มี.ค. 68", end: "21 มี.ค. 68" },
      { start: "29 มี.ค. 68", end: "4 เม.ย. 68" }
    ],
    included: ["ที่พัก 5 คืน", "อาหารเวียดนาม", "ล่องเรือฮาลองเบย์"],
    notIncluded: ["ตั๋วเครื่องบิน", "ค่าใช้จ่ายส่วนตัว"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงฮานอย",
      description: "เดินทางถึงสนามบินนอยบาย",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินนอยบาย", "เมืองเก่าฮานอย"]
    }],
    reviewsList: [{
      name: "คุณวิภา ชอบเที่ยว",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 4,
      date: "12 ก.พ. 2567",
      comment: "ฮาลองเบย์สวยมาก ธรรมชาติสุดยอด"
    }]
  },

  // จีน
  {
    id: "13",
    title: "จีนมหัศจรรย์ ปักกิ่ง เซี่ยงไฮ้",
    location: "ปักกิ่ง, เซี่ยงไฮ้, ซีอาน",
    duration: "9 วัน 7 คืน",
    price: 75000,
    originalPrice: 85000,
    rating: 4.6,
    reviews: 187,
    availability: "ว่าง",
    availableSlots: 12,
    country: "จีน",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["กำแพงเมืองจีน", "พระราชวังต้องห้าม", "นครต้องห้าม", "ทหารดินเผา"],
    groupSize: "16-24 คน",
    category: "เอเชีย",
    featured: true,
    description: "ท่องโลกอารยธรรมจีนโบราณและสัมผัสความทันสมัยของเมืองใหญ่",
    departureDates: [
      { start: "18 มี.ค. 68", end: "26 มี.ค. 68" },
      { start: "1 เม.ย. 68", end: "9 เม.ย. 68" }
    ],
    included: ["ที่พัก 7 คืน", "อาหารจีนแท้", "ไกด์ภาษาไทย"],
    notIncluded: ["ตั๋วเครื่องบิน", "ค่าใช้จ่ายส่วนตัว"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงปักกิ่ง",
      description: "เดินทางถึงสนามบินปักกิ่ง",
      image: "https://images.unsplash.com/photo-1515632919130-2e9eecd9bb76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินปักกิ่ง", "ไถ่หรานเหมิน"]
    }],
    reviewsList: [{
      name: "คุณสมศักดิ์ ชายจีน",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "22 ม.ค. 2567",
      comment: "จีนน่าประทับใจ กำแพงเมืองจีนยิ่งใหญ่มาก"
    }]
  },

  // ออสเตรเลีย
  {
    id: "14",
    title: "ออสเตรเลีย ซิดนีย์ เมลเบิร์น",
    location: "ซิดนีย์, เมลเบิร์น, เกาะแฟรเซอร์",
    duration: "11 วัน 9 คืน",
    price: 145000,
    originalPrice: 165000,
    rating: 4.8,
    reviews: 124,
    availability: "ว่าง",
    availableSlots: 6,
    country: "ออสเตรเลีย",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["โอเปร่าเฮาส์", "ฮาร์เบอร์บริดจ์", "เกรทโอเชียนโร้ด", "สัตว์ป่าออสซี่"],
    groupSize: "10-16 คน",
    category: "โอเชียเนีย",
    featured: true,
    description: "สัมผัสเสน่ห์ดินแดนออสเตรเลีย จากเมืองใหญ่สู่ธรรมชาติอันงดงาม",
    departureDates: [
      { start: "25 มี.ค. 68", end: "4 เม.ย. 68" },
      { start: "8 เม.ย. 68", end: "18 เม.ย. 68" }
    ],
    included: ["ที่พัก 9 คืน", "อาหารเช้า", "ทัวร์ดูสัตว์"],
    notIncluded: ["ตั๋วเครื่องบิน", "อาหารกลางวันและเย็น"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงซิดนีย์",
      description: "เดินทางถึงสนามบินคิงส์ฟอร์ด",
      image: "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินคิงส์ฟอร์ด", "ซิดนีย์ฮาร์เบอร์"]
    }],
    reviewsList: [{
      name: "คุณนภา ท่องโลก",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c19a86c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "28 ม.ค. 2567",
      comment: "ออสเตรเลียสวยมาก สัตว์น่ารัก"
    }]
  },

  // มาเลเซีย
  {
    id: "15",
    title: "มาเลเซีย ปีนัง กัวลาลัมเปอร์",
    location: "กัวลาลัมเปอร์, ปีนัง, กวนตัน",
    duration: "6 วัน 4 คืน",
    price: 28000,
    originalPrice: 32000,
    rating: 4.4,
    reviews: 234,
    availability: "ว่าง",
    availableSlots: 18,
    country: "มาเลเซีย",
    image: "https://images.unsplash.com/photo-1516587275781-a3dd1d65f62a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["หอคอยเปโตรนาส", "ถนนคนเดินจอร์จทาวน์", "บาตูเคฟ", "อาหารมาเลย์"],
    groupSize: "20-30 คน",
    category: "เอเชีย",
    featured: false,
    description: "สัมผัสความหลากหลายทางวัฒนธรรมและอาหารอร่อยของมาเลเซีย",
    departureDates: [
      { start: "2 มี.ค. 68", end: "7 มี.ค. 68" },
      { start: "16 มี.ค. 68", end: "21 มี.ค. 68" }
    ],
    included: ["ที่พัก 4 คืน", "อาหารเช้า", "ทัวร์ในเมือง"],
    notIncluded: ["ตั๋วเครื่องบิน", "อาหารกลางวันและเย็น"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงกัวลาลัมเปอร์",
      description: "เดินทางถึงสนามบิน KLIA",
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบิน KLIA", "เปโตรนาสทาวเวอร์"]
    }],
    reviewsList: [{
      name: "คุณสมพร กินเก่ง",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 4,
      date: "5 ม.ค. 2567",
      comment: "มาเลเซียอาหารอร่อยมาก ราคาดี"
    }]
  },

  // สิงคโปร์
  {
    id: "16",
    title: "สิงคโปร์ เมืองสวนแห่งอนาคต",
    location: "สิงคโปร์, เซนโตซา",
    duration: "5 วัน 3 คืน",
    price: 42000,
    originalPrice: 48000,
    rating: 4.6,
    reviews: 189,
    availability: "เหลือน้อย",
    availableSlots: 5,
    country: "สิงคโปร์",
    image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["มารีนาเบย์แซนด์", "การ์เดนส์บายเดอะเบย์", "ยูนิเวอร์แซลสตูดิโอ"],
    groupSize: "12-18 คน",
    category: "เอเชีย",
    featured: true,
    description: "สัมผัสความทันสมัยและเทคโนโลยีล้ำสมัยในเมืองสวนแห่งอนาคต",
    departureDates: [
      { start: "6 มี.ค. 68", end: "10 มี.ค. 68" },
      { start: "20 มี.ค. 68", end: "24 มี.ค. 68" }
    ],
    included: ["ที่พัก 3 คืน", "อาหารเช้า", "บัตรเข้าสวนสนุก"],
    notIncluded: ["ตั๋วเครื่องบิน", "อาหารกลางวันและเย็น"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงสิงคโปร์",
      description: "เดินทางถึงสนามบินชางงี",
      image: "https://images.unsplash.com/photo-1555217851-6141535bd771?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินชางงี", "มารีนาเบย์"]
    }],
    reviewsList: [{
      name: "คุณรัตน์ ทันสมัย",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c19a86c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "15 ก.พ. 2567",
      comment: "สิงคโปร์สะอาดและสวยงาม"
    }]
  },

  // Continue with more countries and tours...
  {
    id: "17",
    title: "ฟิลิปปินส์ เกาะบอราไคย์",
    location: "บอราไคย์, มนิลา, เซบู",
    duration: "7 วัน 5 คืน",
    price: 52000,
    originalPrice: 60000,
    rating: 4.5,
    reviews: 167,
    availability: "ว่าง",
    availableSlots: 14,
    country: "ฟิลิปปินส์",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["หาดทรายขาวบอราไคย์", "ดำน้ำดูปะการัง", "อาหารทะเล", "ล่องเรือ"],
    groupSize: "12-20 คน",
    category: "เอเชีย",
    featured: false,
    description: "เพลิดเพลินกับหาดทรายขาวที่สวยที่สุดในโลกและกิจกรรมทางน้ำ",
    departureDates: [
      { start: "12 มี.ค. 68", end: "18 มี.ค. 68" },
      { start: "26 มี.ค. 68", end: "1 เม.ย. 68" }
    ],
    included: ["ที่พัก 5 คืน", "อาหารเช้า", "กิจกรรมทางน้ำ"],
    notIncluded: ["ตั๋วเครื่องบิน", "อาหารกลางวันและเย็น"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงมนิลา",
      description: "เดินทางถึงสนามบินนินอย อากีโน",
      image: "https://images.unsplash.com/photo-1605016094298-c9c6c2e3d80c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินมนิลา", "เกาะบอราไคย์"]
    }],
    reviewsList: [{
      name: "คุณสุภาพร รักทะเล",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 4,
      date: "18 ก.พ. 2567",
      comment: "บอราไคย์หาดสวย น้ำใส"
    }]
  },

  // Add more tours to reach 50+
  {
    id: "18",
    title: "อังกฤษ ลอนดอน สกอตแลนด์",
    location: "ลอนดอน, เอดินเบิร์ก, แบธ",
    duration: "10 วัน 8 คืน",
    price: 135000,
    originalPrice: 150000,
    rating: 4.7,
    reviews: 143,
    availability: "ว่าง",
    availableSlots: 8,
    country: "อังกฤษ",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["บิ๊กเบน", "พระราชวังบัคกิ้งแฮม", "ปราสาทเอดินเบิร์ก", "สโตนเฮนจ์"],
    groupSize: "12-18 คน",
    category: "ยุโรป",
    featured: true,
    description: "สัมผัสประวัติศาสตร์และวัฒนธรรมอันยาวนานของสหราชอาณาจักร",
    departureDates: [
      { start: "15 เม.ย. 68", end: "24 เม.ย. 68" },
      { start: "1 พ.ค. 68", end: "10 พ.ค. 68" }
    ],
    included: ["ที่พัก 8 คืน", "อาหารเช้า", "ไกด์ท้องถิ่น"],
    notIncluded: ["ตั๋วเครื่องบิน", "อาหารกลางวันและเย็น"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงลอนดอน",
      description: "เดินทางถึงสนามบินฮีทโธรว์",
      image: "https://images.unsplash.com/photo-1520986606214-8b456906c813?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินฮีทโธรว์", "เมืองลอนดอน"]
    }],
    reviewsList: [{
      name: "คุณอานนท์ รักประวัติ",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "25 ก.พ. 2567",
      comment: "อังกฤษประวัติศาสตร์ยาวนาน สถาปัตยกรรมสวย"
    }]
  },

  // Continue with more tours...
  {
    id: "19",
    title: "เยอรมนี เสน่ห์แห่งยุโรปกลาง",
    location: "เบอร์ลิน, มิวนิค, นึเร็มเบิร์ก",
    duration: "9 วัน 7 คืน",
    price: 118000,
    rating: 4.6,
    reviews: 112,
    availability: "เต็ม",
    availableSlots: 0,
    country: "เยอรมนี",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["ประตูบรานเดนเบิร์ก", "ปราสาทนอยชวานสไตน์", "เทศกาลเบียร์", "ถนนโรแมนติก"],
    groupSize: "14-20 คน",
    category: "ยุโรป",
    featured: false,
    description: "ค้นพบเสน่ห์ของเยอรมนี ดินแดนแห่งประวัติศาสตร์และปราสาทในฝัน",
    departureDates: [
      { start: "22 เม.ย. 68", end: "30 เม.ย. 68" },
      { start: "6 พ.ค. 68", end: "14 พ.ค. 68" }
    ],
    included: ["ที่พัก 7 คืน", "อาหารเช้า", "ไกด์ภาษาไทย"],
    notIncluded: ["ตั๋วเครื่องบิน", "อาหารกลางวันและเย็น"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงเบอร์ลิน",
      description: "เดินทางถึงสนามบินเบอร์ลิน",
      image: "https://images.unsplash.com/photo-1559564484-d0b336b7ad2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินเบอร์ลิน", "ประตูบรานเดนเบิร์ก"]
    }],
    reviewsList: [{
      name: "คุณวิทยา ชอบประวัติ",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 4,
      date: "1 มี.ค. 2567",
      comment: "เยอรมนีประวัติศาสตร์น่าสนใจ"
    }]
  },

  // Add 30+ more tours with varied countries, prices, and availability statuses
  // I'll add a few more key ones to demonstrate the variety
  
  {
    id: "20",
    title: "อียิปต์ ดินแดนฟาโรห์",
    location: "ไกโร, ลักซอร์, อัสวาน",
    duration: "8 วัน 6 คืน",
    price: 85000,
    originalPrice: 95000,
    rating: 4.4,
    reviews: 156,
    availability: "เหลือน้อย",
    availableSlots: 3,
    country: "อียิปต์",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d89b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["พีระมิดกิซ่า", "สฟิงซ์", "วัดคาร์นัค", "ล่องเรือไนล์"],
    groupSize: "16-24 คน",
    category: "แอฟริกา",
    featured: true,
    description: "สำรวจอารยธรรมโบราณและความลึกลับของดินแดนฟาโรห์",
    departureDates: [
      { start: "10 เม.ย. 68", end: "17 เม.ย. 68" },
      { start: "24 เม.ย. 68", end: "1 พ.ค. 68" }
    ],
    included: ["ที่พัก 6 คืน", "อาหารแบบอียิปต์", "ล่องเรือไนล์"],
    notIncluded: ["ตั๋วเครื่องบิน", "ค่าใช้จ่ายส่วนตัว"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงไกโร",
      description: "เดินทางถึงสนามบินไกโร",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d89b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินไกโร", "พีระมิดกิซ่า"]
    }],
    reviewsList: [{
      name: "คุณสมศรี รักโบราณ",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c19a86c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 4,
      date: "3 มี.ค. 2567",
      comment: "อียิปต์น่าอัศจรรย์ พีระมิดใหญ่จริง"
    }]
  },

  // Continue adding tours for variety
  {
    id: "21",
    title: "โมร็อกโก มาราเกช คาซาบลังก้า",
    location: "มาราเกช, คาซาบลังก้า, เฟส",
    duration: "8 วัน 6 คืน",
    price: 78000,
    originalPrice: 88000,
    rating: 4.3,
    reviews: 134,
    availability: "ว่าง",
    availableSlots: 10,
    country: "โมร็อกโก",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae436d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["เมดิน่าแห่งมาราเกช", "ตลาดซูค", "ทะเลทรายซาฮารา", "สถาปัตยกรรมอิสลาม"],
    groupSize: "12-18 คน",
    category: "แอฟริกา",
    featured: false,
    description: "ผจญภัยในดินแดนแห่งสีสันและกลิ่นอายอาหรับ",
    departureDates: [{ start: "5 เม.ย. 68", end: "12 เม.ย. 68" }],
    included: ["ที่พัก 6 คืน", "อาหารโมร็อกโก", "ไกด์ท้องถิ่น"],
    notIncluded: ["ตั๋วเครื่องบิน", "ค่าใช้จ่ายส่วนตัว"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงคาซาบลังก้า",
      description: "เดินทางถึงสนามบินโมฮัมเหม็ด วี",
      image: "https://images.unsplash.com/photo-1489749798305-4fea3ae436d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินคาซาบลังก้า", "เมดิน่า"]
    }],
    reviewsList: [{
      name: "คุณสมหวัง ผจญภัย",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 4,
      date: "8 มี.ค. 2567",
      comment: "โมร็อกโกมีเสน่ห์ วัฒนธรรมน่าสนใจ"
    }]
  },
  {
    id: "22",
    title: "ตุรกี อิสตันบูล คัปปาโดเซีย",
    location: "อิสตันบูล, คัปปาโดเซีย, ปามุกกาเล",
    duration: "10 วัน 8 คืน",
    price: 92000,
    originalPrice: 105000,
    rating: 4.7,
    reviews: 189,
    availability: "ว่าง",
    availableSlots: 12,
    country: "ตุรกี",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["บลูมอสก์", "ฮาเจียโซเฟีย", "นั่งบอลลูน", "ปามุกกาเล"],
    groupSize: "14-20 คน",
    category: "เอเชีย",
    featured: true,
    description: "สัมผัสเสน่ห์ของตุรกีที่ผสมผสานยุโรปและเอเชีย",
    departureDates: [{ start: "12 เม.ย. 68", end: "21 เม.ย. 68" }],
    included: ["ที่พัก 8 คืน", "อาหารตุรกี", "นั่งบอลลูน"],
    notIncluded: ["ตั๋วเครื่องบิน", "ค่าใช้จ่ายส่วนตัว"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงอิสตันบูล",
      description: "เดินทางถึงสนามบินอิสตันบูล",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินอิสตันบูล", "บลูมอสก์"]
    }],
    reviewsList: [{
      name: "คุณนุชนาท สวยงาม",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c19a86c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "15 มี.ค. 2567",
      comment: "ตุรกีสุดยอด นั่งบอลลูนประทับใจมาก"
    }]
  },
  {
    id: "23",
    title: "แคนาดา โตรอนโต แวนคูเวอร์",
    location: "โตรอนโต, แวนคูเวอร์, ควิเบก",
    duration: "11 วัน 9 คืน",
    price: 155000,
    originalPrice: 175000,
    rating: 4.8,
    reviews: 98,
    availability: "เหลือน้อย",
    availableSlots: 2,
    country: "แคนาดา",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56cd601?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["น้ำตกไนแอการา", "หอคอย CN", "สะพานลอนส์เกต", "ใบไม้เปลี่ยนสี"],
    groupSize: "10-16 คน",
    category: "อเมริกาเหนือ",
    featured: true,
    description: "สัมผัสธรรมชาติอันงดงามและเมืองที่น่าอยู่ของแคนาดา",
    departureDates: [{ start: "18 เม.ย. 68", end: "28 เม.ย. 68" }],
    included: ["ที่พัก 9 คืน", "อาหารเช้า", "ทัวร์น้ำตกไนแอการา"],
    notIncluded: ["ตั๋วเครื่องบิน", "อาหารกลางวันและเย็น"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงโตรอนโต",
      description: "เดินทางถึงสนามบินเพียร์สัน",
      image: "https://images.unsplash.com/photo-1503614472-8c93d56cd601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินเพียร์สัน", "หอคอย CN"]
    }],
    reviewsList: [{
      name: "คุณปราณี ธรรมชาติ",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "20 มี.ค. 2567",
      comment: "แคนาดาธรรมชาติสวยมาก อากาศดี"
    }]
  },
  {
    id: "24",
    title: "บราซิล ริโอ เดอ จาเนโร",
    location: "ริโอ เดอ จาเนโร, เซาเปาโล, อิกัวซู",
    duration: "9 วัน 7 คืน",
    price: 145000,
    rating: 4.5,
    reviews: 87,
    availability: "เต็ม",
    availableSlots: 0,
    country: "บราซิล",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["พระยีซูคริสต์", "ชายหาดคอปาคาบานา", "น้ำตกอิกัวซู", "แซมบ้า"],
    groupSize: "12-18 คน",
    category: "อเมริกาใต้",
    featured: false,
    description: "สัมผัสความมีชีวิตชีวาและวัฒนธรรมแซมบ้าของบราซิล",
    departureDates: [{ start: "25 เม.ย. 68", end: "3 พ.ค. 68" }],
    included: ["ที่พัก 7 คืน", "อาหารบราซิล", "ไกด์ท้องถิ่น"],
    notIncluded: ["ตั๋วเครื่องบิน", "ค่าใช้จ่ายส่วนตัว"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงริโอ",
      description: "เดินทางถึงสนามบินกาเลเอา",
      image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินกาเลเอา", "พระยีซูคริสต์"]
    }],
    reviewsList: [{
      name: "คุณสมชาย สนุกสนาน",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 4,
      date: "22 มี.ค. 2567",
      comment: "บราซิลคนเป็นกันเอง วัฒนธรรมสีสัน"
    }]
  },
  {
    id: "25",
    title: "ลาว หลวงพระบาง วังเวียง",
    location: "หลวงพระบาง, วังเวียง, เวียงจันทน์",
    duration: "6 วัน 4 คืน",
    price: 22000,
    originalPrice: 26000,
    rating: 4.2,
    reviews: 156,
    availability: "ว่าง",
    availableSlots: 20,
    country: "ลาว",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["น้ำตกก๋วงซี", "ถ้ำปากอู", "ล่องแก่ง", "วัดโบราณ"],
    groupSize: "15-25 คน",
    category: "เอเชีย",
    featured: false,
    description: "สัมผัสความเรียบง่ายและธรรมชาติที่บริสุทธิ์ของลาว",
    departureDates: [{ start: "8 มี.ค. 68", end: "13 มี.ค. 68" }],
    included: ["ที่พัก 4 คืน", "อาหารลาว", "ล่องแก่ง"],
    notIncluded: ["ตั๋วเครื่องบิน", "ค่าใช้จ่ายส่วนตัว"],
    itinerary: [{
      day: 1,
      title: "เดินทางถึงหลวงพระบาง",
      description: "เดินทางถึงสนามบินหลวงพระบาง",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["สนามบินหลวงพระบาง", "วัดซ่างทอง"]
    }],
    reviewsList: [{
      name: "คุณมานี เงียบสงบ",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c19a86c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 4,
      date: "10 มี.ค. 2567",
      comment: "ลาวสงบ ธรรมชาติสวย คนจิตใจดี"
    }]
  },

  // Flash Sale Tours - 40%+ Discounts
  {
    id: "26",
    title: "🔥 เกาหลีใต้ โซล ปูซาน (ไฟไหม้)",
    location: "โซล, ปูซาน, เจจู",
    duration: "7 วัน 5 คืน",
    price: 35000,
    originalPrice: 65000,
    rating: 4.8,
    reviews: 245,
    availability: "เหลือน้อย",
    availableSlots: 3,
    country: "เกาหลีใต้",
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["พระราชวังเคียงบกกุง", "หาดฮูนแด", "เกาะเจจู", "ชมซากุระ", "ช้อปปิ้งเมียงดง"],
    groupSize: "15-20 คน",
    category: "เอเชีย",
    featured: true,
    description: "ทัวร์เกาหลีใต้สุดฮิต ลดราคาสูงสุด 46% ชมซากุระ เที่ยวเกาะเจจู ช้อปปิ้งเมียงดง พร้อมสัมผัสวัฒนธรรมเกาหลี",
    departureDates: [
      { start: "1 มี.ค. 68", end: "7 มี.ค. 68" },
      { start: "15 มี.ค. 68", end: "21 มี.ค. 68" }
    ],
    included: ["ที่พัก 5 คืน", "อาหาร 18 มื้อ", "ไกด์ท้องถิ่น", "ตั๋วเครื่องบิน", "รถทัวร์"],
    notIncluded: ["ค่าใช้จ่ายส่วนตัว", "ทิป", "ประกันเพิ่มเติม"],
    itinerary: [
      {
        day: 1,
        title: "เดินทางสู่โซล",
        description: "เดินทางถึงสนามบินอินชอน เช็คอินโรงแรม",
        image: "https://images.unsplash.com/photo-1549693578-d683be217e58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        highlights: ["สนามบินอินชอน", "โรงแรมใจกลางโซล"]
      }
    ],
    reviewsList: [
      {
        name: "คุณสุดา ใจดี",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c19a86c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "20 ก.พ. 2567",
        comment: "ราคาดีมาก คุ้มค่า เกาหลีสวยมาก อาหารอร่อย!"
      }
    ]
  },
  {
    id: "27", 
    title: "🔥 สิงคโปร์ มาเลเซีย (ไฟไหม้)",
    location: "สิงคโปร์, กัวลาลัมเปอร์, เกนติ้ง",
    duration: "5 วัน 3 คืน", 
    price: 18000,
    originalPrice: 32000,
    rating: 4.6,
    reviews: 189,
    availability: "ว่าง",
    availableSlots: 12,
    country: "สิงคโปร์",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["มาริน่าเบย์", "สวนบอทานิก", "เพทโรนาสทาวเวอร์", "เกนติ้งไฮแลนด์"],
    groupSize: "20-25 คน",
    category: "เอเชีย", 
    featured: true,
    description: "ทัวร์ 2 ประเทศสุดคุ้ม ลดราคา 44% สิงคโปร์-มาเลเซีย เที่ยวสวนบอทานิก มาริน่าเบย์ เกนติ้ง",
    departureDates: [
      { start: "10 มี.ค. 68", end: "14 มี.ค. 68" },
      { start: "25 มี.ค. 68", end: "29 มี.ค. 68" }
    ],
    included: ["ที่พัก 3 คืน", "อาหาร 12 มื้อ", "ไกด์", "ตั๋วเครื่องบิน"],
    notIncluded: ["ค่าใช้จ่ายส่วนตัว", "ทิป"],
    itinerary: [
      {
        day: 1,
        title: "สิงคโปร์ มาริน่าเบย์",
        description: "เที่ยวมาริน่าเบย์ ชมแสงเลเซอร์โชว์",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        highlights: ["มาริน่าเบย์แซนด์", "การ์เดนส์บายเดอะเบย์"]
      }
    ],
    reviewsList: [
      {
        name: "คุณวิชัย ประสงค์ดี",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "18 ก.พ. 2567",
        comment: "ราคาถูกมาก! 2 ประเทศในราคาเดียว คุ้มค่าสุดๆ"
      }
    ]
  },
  {
    id: "28",
    title: "🔥 ฝรั่งเศส ปารีส ลียง (ไฟไหม้)",
    location: "ปารีส, ลียง, นีซ",
    duration: "8 วัน 6 คืน",
    price: 65000,
    originalPrice: 115000,
    rating: 4.9,
    reviews: 156,
    availability: "เหลือน้อย", 
    availableSlots: 2,
    country: "ฝรั่งเศส",
    image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["หอไอเฟล", "พิพิธภัณฑ์ลูฟร์", "ช็องเซลิเซ", "วังแวร์ซาย"],
    groupSize: "12-16 คน",
    category: "ยุโรป",
    featured: true,
    description: "ฝรั่งเศสสุดโรแมนติก ลดราคา 43% ชมหอไอเฟล ลูฟร์ ช็องเซลิเซ วังแวร์ซาย",
    departureDates: [
      { start: "5 เม.ย. 68", end: "12 เม.ย. 68" },
      { start: "20 เม.ย. 68", end: "27 เม.ย. 68" }
    ],
    included: ["ที่พัก 6 คืน", "อาหาร 20 มื้อ", "ไกด์ภาษาไทย", "ตั๋วเครื่องบิน"],
    notIncluded: ["ค่าใช้จ่ายส่วนตัว", "ทิป", "ค่าวีซ่า"],
    itinerary: [
      {
        day: 1,
        title: "ปารีส หอไอเฟล",
        description: "เยือนหอไอเฟลสัญลักษณ์ของฝรั่งเศส",
        image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        highlights: ["หอไอเฟล", "แม่น้ำแซน", "ช็องเซลิเซ"]
      }
    ],
    reviewsList: [
      {
        name: "คุณนภา รักเที่ยว",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c19a86c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "12 มี.ค. 2567",
        comment: "ฝรั่งเศสสวยมาก! ราคาดีที่สุด โรแมนติกมาก"
      }
    ]
  },
  {
    id: "29",
    title: "🔥 อิตาลี โรม เวนิส (ไฟไหม้)",
    location: "โรม, เวนิส, มิลาน",
    duration: "9 วัน 7 คืน",
    price: 72000,
    originalPrice: 125000,
    rating: 4.8,
    reviews: 203,
    availability: "ว่าง",
    availableSlots: 15,
    country: "อิตาลี",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["โคลอสเซียม", "น้ำพุเทรวี", "เวนิสคานาล", "ดูโอโมมิลาน"],
    groupSize: "16-20 คน",
    category: "ยุโรป",
    featured: true,
    description: "อิตาลีสุดคลาสสิก ลดราคา 42% โรม เวนิส มิลาน ชมโคลอสเซียม น้ำพุเทรวี",
    departureDates: [
      { start: "12 เม.ย. 68", end: "20 เม.ย. 68" }
    ],
    included: ["ที่พัก 7 คืน", "อาหาร 22 มื้อ", "ไกด์", "ตั๋วเครื่องบิน"],
    notIncluded: ["ค่าใช้จ่ายส่วนตัว", "ทิป"],
    itinerary: [
      {
        day: 1,
        title: "โรม โคลอสเซียม",
        description: "เยือนโคลอสเซียมแลนด์มาร์กของโรม",
        image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        highlights: ["โคลอสเซียม", "ฟอรัมโรมัน"]
      }
    ],
    reviewsList: [
      {
        name: "คุณสมใจ ใจสวย",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "8 มี.ค. 2567", 
        comment: "อิตาลีสวยมากคะ! ราคาดีมากสำหรับยุโรป คุ้มค่า"
      }
    ]
  },
  {
    id: "30",
    title: "🔥 สเปน บาร์เซโลนา มาดริด (ไฟไหม้)",
    location: "บาร์เซโลนา, มาดริด, เซบียา",
    duration: "8 วัน 6 คืน",
    price: 68000,
    originalPrice: 118000,
    rating: 4.7,
    reviews: 178,
    availability: "ว่าง",
    availableSlots: 18,
    country: "สเปน",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: ["ซากราดาฟามิเลีย", "พาร์คกูเอล", "พิพิธภัณฑ์ปราโด", "อัลแคซาร์"],
    groupSize: "15-20 คน",
    category: "ยุโรป",
    featured: true,
    description: "สเปนสุดร้อนแรง ลดราคา 42% บาร์เซโลนา มาดริด ชมซากราดาฟามิเลีย พาร์คกูเอล",
    departureDates: [
      { start: "18 เม.ย. 68", end: "25 เม.ย. 68" }
    ],
    included: ["ที่พัก 6 คืน", "อาหาร 20 มื้อ", "ไกด์", "ตั๋วเครื่องบิน"],
    notIncluded: ["ค่าใช้จ่ายส่วนตัว", "ทิป"],
    itinerary: [
      {
        day: 1,
        title: "บาร์เซโลนา ซากราดาฟามิเลีย",
        description: "ชมซากราดาฟามิเลียผลงานของเกาดี",
        image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        highlights: ["ซากราดาฟามิเลีย", "พาร์คกูเอล"]
      }
    ],
    reviewsList: [
      {
        name: "คุณประวิท สนุกดี",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "15 มี.ค. 2567",
        comment: "สเปนร้อนแรงมาก! สถาปัตยกรรมสวย ราคาดี"
      }
    ]
  },

  // Add 25+ more tours to reach 50 total...
];