// UX Flow Analysis - Tour Detail Page Structure
// โครงสร้างหน้ารายละเอียดทัวร์ที่ปรับปรุงแล้ว

const improvedTourStructure = {
  
  // 1. HERO SECTION - Above the fold
  hero: {
    flashSaleBanner: "⚡ Flash Sale กับ countdown timer",
    tourTitle: "ชื่อทัวร์และข้อมูลพื้นฐาน",
    priceWithOffers: "ราคาพร้อมโปรโมชั่น",
    heroImageGallery: "รูปภาพหลักพร้อม gallery"
  },

  // 2. MAIN CONTENT - Left Column
  leftColumn: {
    tourHighlights: {
      order: 1,
      reason: "จุดเด่นต้องอยู่ด้านบน เพื่อให้ user รู้ว่าได้อะไร"
    },
    
    detailedItinerary: {
      order: 2, 
      reason: "รายการเดินทางมาหลัง highlights เพื่อ build interest ก่อน"
    },
    
    trustIndicators: {
      order: 3,
      reason: "Trust signals หลัง itinerary เพื่อสร้างความเชื่อมั่น"
    },
    
    includedExcluded: {
      order: 4,
      reason: "ข้อมูลราคาและรายการมาหลัง trust เพื่อ decision making"
    },
    
    customerReviews: {
      order: 5, 
      reason: "รีวิวลูกค้าเป็น social proof สำคัญ มาก่อน FAQ"
    },
    
    faqSection: {
      order: 6,
      reason: "FAQ มาทีเหลังเพื่อจัดการ objections"
    },
    
    relatedTours: {
      order: 7,
      reason: "Cross-selling มาท้ายสุด หลังจากสนใจทัวร์นี้แล้ว"
    }
  },

  // 3. BOOKING SECTION - Right Column
  rightColumn: {
    flashSaleCountdown: "Desktop countdown timer",
    bookingCard: "ข้อมูลราคาและ CTA",
    urgencyIndicators: "ตัวชี้วัดความเร่งด่วน",
    trustBadges: "ตราสัญลักษณ์ความน่าเชื่อถือ",
    contactCard: "ข้อมูลติดต่อ",
    socialProof: "จำนวนคนเดินทาง, รีวิว"
  },

  // 4. BOTTOM SECTION
  bottomSection: {
    specialOfferCTA: {
      position: "ก่อนปิดหน้า",
      purpose: "Last chance offer สำหรับ conversion"
    }
  },

  // 5. MOBILE STICKY ELEMENTS  
  mobileSticky: {
    stickyBookingBar: "ด้านล่าง พร้อม urgent messaging",
    mobileCTAs: "ปุ่มใหญ่ touch-friendly"
  }
}

// ปัญหาเดิมที่แก้ไขแล้ว:
const problemsSolved = {
  before: [
    "Trust indicators อยู่ด้านบนก่อน highlights",
    "Limited offer CTA ขัด flow ของ itinerary", 
    "Reviews อยู่ก่อน included/excluded ทำให้งง",
    "Related tours ขัด FAQ",
    "Seed data น้อยเกินไป"
  ],
  
  after: [
    "✅ Highlights มาก่อน เพื่อ build interest",
    "✅ Itinerary detailed มาที่ 2 เพื่อ engagement", 
    "✅ Trust indicators หลัง itinerary เพื่อ credibility",
    "✅ Included/Excluded มาก่อน reviews เพื่อ decision",
    "✅ Reviews เป็น social proof หลัง decision factors",
    "✅ FAQ จัดการ objections หลัง reviews",
    "✅ Related tours เป็น cross-sell ท้ายสุด",
    "✅ Special offer CTA ท้ายสุดเป็น last push"
  ]
}

module.exports = { improvedTourStructure, problemsSolved };