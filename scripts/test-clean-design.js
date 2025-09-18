#!/usr/bin/env node

/**
 * Clean Design Best Practices Test for Tour Search 17
 * Tests minimalist design principles and clean layout
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 Testing Clean Design Best Practices for Tour Search 17\n');

// Read the tour-search-17 page file
const tourFile = path.join(__dirname, '../src/app/tour-search-17/page.tsx');
const content = fs.readFileSync(tourFile, 'utf8');

const tests = [
  {
    name: '🎨 Color Palette Simplicity',
    items: [
      {
        test: 'Uses limited color palette (gray-900, gray-100, white)',
        check: () => {
          const colorCount = content.match(/bg-(red|blue|green|yellow|purple|orange)-/g)?.length || 0;
          return colorCount < 5; // Allow minimal accent colors
        },
        importance: 'HIGH'
      },
      {
        test: 'Primary colors are consistent (gray-900 for primary)',
        check: () => content.includes('bg-gray-900') && content.includes('text-gray-900'),
        importance: 'HIGH'
      },
      {
        test: 'Eliminates rainbow colors',
        check: () => {
          const rainbowColors = ['bg-purple-600', 'bg-yellow-500', 'bg-orange-500', 'bg-green-500'];
          return !rainbowColors.some(color => content.includes(color));
        },
        importance: 'HIGH'
      },
      {
        test: 'Uses backdrop-blur for overlays',
        check: () => content.includes('backdrop-blur'),
        importance: 'MEDIUM'
      }
    ]
  },
  {
    name: '📐 Layout & Spacing',
    items: [
      {
        test: 'Consistent border radius (rounded-lg, rounded-xl)',
        check: () => {
          const inconsistentRadius = content.includes('rounded-2xl') || content.includes('rounded-3xl');
          return !inconsistentRadius;
        },
        importance: 'HIGH'
      },
      {
        test: 'Clean borders (border vs border-2)',
        check: () => {
          const heavyBorders = content.match(/border-[2-9]/g)?.length || 0;
          return heavyBorders < 3;
        },
        importance: 'HIGH'
      },
      {
        test: 'Proper gap spacing (gap-2, gap-3, gap-4)',
        check: () => content.includes('gap-') && !content.includes('gap-8'),
        importance: 'MEDIUM'
      },
      {
        test: 'Consistent padding (p-4, p-6)',
        check: () => content.includes('p-4') || content.includes('p-6'),
        importance: 'MEDIUM'
      }
    ]
  },
  {
    name: '🧹 UI Elements Simplification',
    items: [
      {
        test: 'Reduced badge complexity',
        check: () => {
          const badgeLines = content.split('\n').filter(line => 
            line.includes('badge') || line.includes('span className=')
          );
          return badgeLines.length < 10; // Much fewer badges
        },
        importance: 'HIGH'
      },
      {
        test: 'Single floating contact button',
        check: () => {
          const floatingButtons = content.match(/fixed bottom-/g)?.length || 0;
          return floatingButtons === 1;
        },
        importance: 'HIGH'
      },
      {
        test: 'Simplified action buttons',
        check: () => {
          return content.includes('ดูรายละเอียด') && content.includes('จองเลย') &&
                 !content.includes('ปรึกษา') || content.split('ปรึกษา').length <= 2;
        },
        importance: 'MEDIUM'
      },
      {
        test: 'Removed excessive social proof',
        check: () => !content.includes('มีคนกำลังดู') && !content.includes('จองแล้ว'),
        importance: 'HIGH'
      }
    ]
  },
  {
    name: '📝 Typography & Hierarchy',
    items: [
      {
        test: 'Clean font weights (font-medium, font-semibold)',
        check: () => content.includes('font-medium') && !content.includes('font-black'),
        importance: 'MEDIUM'
      },
      {
        test: 'Appropriate text sizes (text-sm, text-lg)',
        check: () => content.includes('text-sm') && content.includes('text-lg'),
        importance: 'MEDIUM'
      },
      {
        test: 'Gray text hierarchy (text-gray-600, text-gray-900)',
        check: () => content.includes('text-gray-600') && content.includes('text-gray-900'),
        importance: 'HIGH'
      },
      {
        test: 'Minimal use of bold colors in text',
        check: () => {
          const coloredText = content.match(/text-(red|blue|green|yellow)-/g)?.length || 0;
          return coloredText < 5;
        },
        importance: 'HIGH'
      }
    ]
  },
  {
    name: '⚡ Performance & Clean Code',
    items: [
      {
        test: 'Uses Next.js Image component',
        check: () => content.includes('import Image from') && content.includes('<Image'),
        importance: 'HIGH'
      },
      {
        test: 'Consistent transition timing',
        check: () => content.includes('transition-colors') || content.includes('transition-all'),
        importance: 'MEDIUM'
      },
      {
        test: 'Clean hover states',
        check: () => content.includes('hover:bg-gray-') && content.includes('hover:text-'),
        importance: 'MEDIUM'
      },
      {
        test: 'Simplified animation (no complex transforms)',
        check: () => !content.includes('scale-110') && !content.includes('animate-bounce'),
        importance: 'MEDIUM'
      }
    ]
  },
  {
    name: '🎯 Accessibility & UX',
    items: [
      {
        test: 'Proper aria-labels maintained',
        check: () => content.includes('aria-label'),
        importance: 'HIGH'
      },
      {
        test: 'Touch-friendly sizes (min-h-[44px])',
        check: () => content.includes('min-h-[44px]') || content.includes('p-3'),
        importance: 'HIGH'
      },
      {
        test: 'Clear focus states',
        check: () => content.includes('focus:border-gray-900') || content.includes('focus:outline-none'),
        importance: 'HIGH'
      },
      {
        test: 'Simplified navigation',
        check: () => content.includes('rounded-full') && content.includes('px-4 py-2'),
        importance: 'MEDIUM'
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
console.log('📊 CLEAN DESIGN TEST SUMMARY');
console.log('='.repeat(50));
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests} (${Math.round(passedTests/totalTests*100)}%)`);
console.log(`Failed: ${totalTests - passedTests}`);
console.log(`High Priority Failures: ${highPriorityFailed}`);

// Clean Design Scoring
let score = 'A+';
const passRate = passedTests / totalTests;

if (passRate < 0.6 || highPriorityFailed > 5) {
  score = 'F - Too Complex';
} else if (passRate < 0.7 || highPriorityFailed > 3) {
  score = 'C - Needs Simplification';
} else if (passRate < 0.8 || highPriorityFailed > 2) {
  score = 'B - Getting Cleaner';
} else if (passRate < 0.9 || highPriorityFailed > 0) {
  score = 'A - Almost Clean';
} else {
  score = 'A+ - Clean & Minimal';
}

console.log(`\n🎨 CLEAN DESIGN SCORE: ${score}`);

// Design Recommendations
console.log('\n📋 DESIGN PRINCIPLES:');
console.log('='.repeat(50));

if (score.includes('A')) {
  console.log('🎉 Excellent clean design! Follows minimalist principles.');
  console.log('✨ Key achievements:');
  console.log('   - Limited color palette');
  console.log('   - Clean typography hierarchy');
  console.log('   - Simplified UI elements');
  console.log('   - Consistent spacing');
} else {
  console.log('🔧 Areas to improve for cleaner design:');
  console.log('   1. Reduce color complexity');
  console.log('   2. Simplify UI elements');
  console.log('   3. Use consistent spacing');
  console.log('   4. Remove unnecessary badges/indicators');
  console.log('   5. Focus on essential information only');
}

process.exit(score.includes('F') ? 1 : 0);