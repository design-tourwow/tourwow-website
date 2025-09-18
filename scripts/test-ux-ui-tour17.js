#!/usr/bin/env node

/**
 * UX/UI Best Practices Test for Tour Search 17
 * Tests comprehensive improvements for CTA optimization, upselling, and user experience
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing UX/UI Best Practices for Tour Search 17\n');

// Read the tour-search-17 page file
const tourFile = path.join(__dirname, '../src/app/tour-search-17/page.tsx');
const content = fs.readFileSync(tourFile, 'utf8');

const tests = [
  {
    name: '🎯 CTA Optimization',
    items: [
      {
        test: 'Primary CTA present (จองเลย)',
        check: () => content.includes('จองเลย'),
        importance: 'HIGH'
      },
      {
        test: 'Secondary CTA present (รายละเอียด)',
        check: () => content.includes('รายละเอียด'),
        importance: 'HIGH'
      },
      {
        test: 'Contact CTAs available (ปรึกษา, โทร)',
        check: () => content.includes('ปรึกษา') && content.includes('โทร'),
        importance: 'HIGH'
      },
      {
        test: 'Floating contact buttons',
        check: () => content.includes('fixed bottom-4 right-4') && content.includes('MessageCircle'),
        importance: 'MEDIUM'
      },
      {
        test: 'Clear button hierarchy with proper styling',
        check: () => content.includes('bg-blue-600') && content.includes('border-blue-600'),
        importance: 'HIGH'
      }
    ]
  },
  {
    name: '💰 Upselling & Cross-selling',
    items: [
      {
        test: 'Upgrade options displayed',
        check: () => content.includes('upgradeOptions') && content.includes('อัพเกรดพิเศษ'),
        importance: 'HIGH'
      },
      {
        test: 'Flash sale timer implementation',
        check: () => content.includes('flashSaleEnd') && content.includes('Timer'),
        importance: 'HIGH'
      },
      {
        test: 'Comparison feature available',
        check: () => content.includes('compareList') && content.includes('เปรียบเทียบ'),
        importance: 'MEDIUM'
      },
      {
        test: 'Related tours suggestion',
        check: () => content.includes('ดูทัวร์ที่คล้ายกัน'),
        importance: 'MEDIUM'
      },
      {
        test: 'Expert recommendations highlighted',
        check: () => content.includes('expertRecommended') && content.includes('Expert Choice'),
        importance: 'HIGH'
      }
    ]
  },
  {
    name: '🏆 Social Proof & Trust',
    items: [
      {
        test: 'Last booking information',
        check: () => content.includes('lastBooking') && content.includes('จองล่าสุด'),
        importance: 'HIGH'
      },
      {
        test: 'Live viewing indicators',
        check: () => content.includes('มีคนกำลังดู') && content.includes('Users'),
        importance: 'MEDIUM'
      },
      {
        test: 'Daily booking count',
        check: () => content.includes('จองแล้ว') && content.includes('รายการวันนี้'),
        importance: 'MEDIUM'
      },
      {
        test: 'Safety ratings visible',
        check: () => content.includes('safetyRating') && content.includes('Shield'),
        importance: 'HIGH'
      },
      {
        test: 'Popularity ranking shown',
        check: () => content.includes('popularityRank') && content.includes('ยอดนิยม'),
        importance: 'MEDIUM'
      },
      {
        test: 'Expert awards displayed',
        check: () => content.includes('Award') && content.includes('Expert Choice'),
        importance: 'HIGH'
      }
    ]
  },
  {
    name: '⚡ Performance & Loading',
    items: [
      {
        test: 'Image lazy loading with skeleton',
        check: () => content.includes('imageLoaded') && content.includes('animate-pulse'),
        importance: 'HIGH'
      },
      {
        test: 'Next.js Image optimization',
        check: () => content.includes('import Image from') && content.includes('<Image'),
        importance: 'HIGH'
      },
      {
        test: 'Loading states for actions',
        check: () => content.includes('loading') && content.includes('animate-spin'),
        importance: 'MEDIUM'
      },
      {
        test: 'Pagination/Load more functionality',
        check: () => content.includes('ดูทัวร์เพิ่มเติม') && content.includes('ChevronRight'),
        importance: 'MEDIUM'
      }
    ]
  },
  {
    name: '🎨 UX/UI Best Practices',
    items: [
      {
        test: 'Mobile-first responsive design',
        check: () => content.includes('lg:hidden') && content.includes('lg:block'),
        importance: 'HIGH'
      },
      {
        test: 'Accessibility attributes (aria-labels)',
        check: () => content.includes('aria-label') && content.includes('aria-pressed'),
        importance: 'HIGH'
      },
      {
        test: 'Touch-friendly button sizes (min-h-[44px])',
        check: () => content.includes('min-h-[44px]') || content.includes('min-h-[48px]'),
        importance: 'HIGH'
      },
      {
        test: 'Visual hierarchy with proper spacing',
        check: () => content.includes('gap-') && content.includes('mb-') && content.includes('mt-'),
        importance: 'HIGH'
      },
      {
        test: 'Interactive states (hover, focus)',
        check: () => content.includes('hover:') && content.includes('focus:'),
        importance: 'HIGH'
      },
      {
        test: 'Consistent color scheme',
        check: () => content.includes('bg-blue-600') && content.includes('text-blue-600'),
        importance: 'HIGH'
      },
      {
        test: 'Advanced filtering options',
        check: () => content.includes('departureDate') && content.includes('expertRecommended'),
        importance: 'MEDIUM'
      },
      {
        test: 'Visual feedback and animations',
        check: () => content.includes('transition-') && content.includes('duration-'),
        importance: 'MEDIUM'
      }
    ]
  },
  {
    name: '🔍 Advanced Features',
    items: [
      {
        test: 'Voice search capability',
        check: () => content.includes('Mic') && content.includes('ค้นหาด้วยเสียง'),
        importance: 'LOW'
      },
      {
        test: 'Wishlist functionality',
        check: () => content.includes('wishlist') && content.includes('toggleWishlist'),
        importance: 'MEDIUM'
      },
      {
        test: 'Multiple view modes (grid/list)',
        check: () => content.includes('viewMode') && content.includes('Grid') && content.includes('List'),
        importance: 'MEDIUM'
      },
      {
        test: 'Real-time urgency indicators',
        check: () => content.includes('availableSeats') && content.includes('เหลือ') && content.includes('ที่นั่ง'),
        importance: 'HIGH'
      },
      {
        test: 'Price sorting and filtering',
        check: () => content.includes('priceRange') && content.includes('sortBy'),
        importance: 'HIGH'
      }
    ]
  }
];

// Run tests
let totalTests = 0;
let passedTests = 0;
let highPriorityFailed = 0;

tests.forEach(category => {
  console.log(`\n${category.name}`);
  console.log('='.repeat(50));
  
  category.items.forEach(item => {
    totalTests++;
    const passed = item.check();
    
    if (passed) {
      passedTests++;
      console.log(`✅ ${item.test}`);
    } else {
      console.log(`❌ ${item.test} (${item.importance} PRIORITY)`);
      if (item.importance === 'HIGH') {
        highPriorityFailed++;
      }
    }
  });
});

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 TEST SUMMARY');
console.log('='.repeat(50));
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests} (${Math.round(passedTests/totalTests*100)}%)`);
console.log(`Failed: ${totalTests - passedTests}`);
console.log(`High Priority Failures: ${highPriorityFailed}`);

// Scoring
let score = 'A+';
const passRate = passedTests / totalTests;

if (passRate < 0.6 || highPriorityFailed > 5) {
  score = 'F';
} else if (passRate < 0.7 || highPriorityFailed > 3) {
  score = 'C';
} else if (passRate < 0.8 || highPriorityFailed > 1) {
  score = 'B';
} else if (passRate < 0.9 || highPriorityFailed > 0) {
  score = 'A';
}

console.log(`\n🎯 OVERALL SCORE: ${score}`);

// Recommendations
console.log('\n📋 RECOMMENDATIONS:');
console.log('='.repeat(50));

if (score === 'A+') {
  console.log('🎉 Excellent! Your implementation follows UX/UI best practices.');
  console.log('🚀 Ready for production deployment!');
} else {
  console.log('🔧 Areas for improvement:');
  if (highPriorityFailed > 0) {
    console.log('- Address high priority failed tests first');
  }
  console.log('- Focus on core CTA optimization');
  console.log('- Enhance social proof elements');
  console.log('- Improve accessibility features');
}

process.exit(score === 'F' ? 1 : 0);