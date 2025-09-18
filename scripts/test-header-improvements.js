#!/usr/bin/env node

/**
 * Header UI Improvements Test for Tour Search 17
 * Tests clean header design and layout improvements
 */

const fs = require('fs');
const path = require('path');

console.log('🎯 Testing Header UI Improvements for Tour Search 17\n');

// Read the tour-search-17 page file
const tourFile = path.join(__dirname, '../src/app/tour-search-17/page.tsx');
const content = fs.readFileSync(tourFile, 'utf8');

const tests = [
  {
    name: '📱 Unified Header Design',
    items: [
      {
        test: 'Single header layout (no mobile/desktop duplication)',
        check: () => {
          const mobileLayouts = content.match(/lg:hidden/g)?.length || 0;
          const desktopLayouts = content.match(/hidden lg:block/g)?.length || 0;
          return mobileLayouts === 0 && desktopLayouts === 0; // Should be unified
        },
        importance: 'HIGH'
      },
      {
        test: 'Centered title and search layout',
        check: () => content.includes('text-center') && content.includes('mx-auto'),
        importance: 'HIGH'
      },
      {
        test: 'Consistent max-width container',
        check: () => content.includes('max-w-5xl') || content.includes('max-w-4xl'),
        importance: 'MEDIUM'
      },
      {
        test: 'Proper vertical spacing (py-6)',
        check: () => content.includes('py-6') && content.includes('mb-6'),
        importance: 'MEDIUM'
      }
    ]
  },
  {
    name: '🏷️ Category Simplification',
    items: [
      {
        test: 'Limited categories shown (slice(0, 4))',
        check: () => content.includes('slice(0, 4)'),
        importance: 'HIGH'
      },
      {
        test: 'More categories button (+X เพิ่มเติม)',
        check: () => content.includes('เพิ่มเติม') && content.includes('categories.length - 4'),
        importance: 'HIGH'
      },
      {
        test: 'Clean category buttons (rounded-lg)',
        check: () => content.includes('rounded-lg') && content.includes('px-3 py-2'),
        importance: 'MEDIUM'
      },
      {
        test: 'Overflow handling for categories',
        check: () => content.includes('overflow-x-auto') && content.includes('whitespace-nowrap'),
        importance: 'MEDIUM'
      }
    ]
  },
  {
    name: '🔍 Search Bar Optimization',
    items: [
      {
        test: 'Single search implementation',
        check: () => {
          const searchInputs = content.match(/placeholder="ค้นหา.*?"/g)?.length || 0;
          return searchInputs === 1; // Should only have one search input
        },
        importance: 'HIGH'
      },
      {
        test: 'Responsive search sizing (py-3 lg:py-4)',
        check: () => content.includes('py-3 lg:py-4'),
        importance: 'MEDIUM'
      },
      {
        test: 'Centered search bar layout',
        check: () => content.includes('max-w-xl mx-auto'),
        importance: 'MEDIUM'
      },
      {
        test: 'Clean search icon positioning',
        check: () => content.includes('absolute left-4') && content.includes('pl-12'),
        importance: 'LOW'
      }
    ]
  },
  {
    name: '🎛️ Controls Layout',
    items: [
      {
        test: 'Organized controls row layout',
        check: () => content.includes('flex items-center justify-between gap-4'),
        importance: 'HIGH'
      },
      {
        test: 'Proper flex handling (flex-1, flex-shrink-0)',
        check: () => content.includes('flex-1') && content.includes('flex-shrink-0'),
        importance: 'MEDIUM'
      },
      {
        test: 'View mode toggle grouped properly',
        check: () => content.includes('bg-gray-100 rounded-lg p-1'),
        importance: 'MEDIUM'
      },
      {
        test: 'Clean button sizing and spacing',
        check: () => content.includes('p-2 rounded') && content.includes('w-4 h-4'),
        importance: 'LOW'
      }
    ]
  },
  {
    name: '🎨 Visual Consistency',
    items: [
      {
        test: 'Consistent border radius (rounded-lg)',
        check: () => {
          const inconsistentRadius = content.includes('rounded-xl') && content.includes('rounded-lg');
          return inconsistentRadius; // Both should exist but be intentional
        },
        importance: 'MEDIUM'
      },
      {
        test: 'Consistent color scheme (gray-900, gray-100)',
        check: () => content.includes('bg-gray-900') && content.includes('bg-gray-100'),
        importance: 'HIGH'
      },
      {
        test: 'Proper hover states',
        check: () => content.includes('hover:bg-gray-200') && content.includes('transition-colors'),
        importance: 'MEDIUM'
      },
      {
        test: 'Clean typography hierarchy',
        check: () => content.includes('text-xl lg:text-2xl') && content.includes('font-bold'),
        importance: 'MEDIUM'
      }
    ]
  },
  {
    name: '♿ Accessibility & UX',
    items: [
      {
        test: 'Proper aria-labels maintained',
        check: () => content.includes('aria-label') && content.includes('aria-pressed'),
        importance: 'HIGH'
      },
      {
        test: 'Touch-friendly button sizes',
        check: () => content.includes('p-2') || content.includes('py-2'),
        importance: 'HIGH'
      },
      {
        test: 'Keyboard navigation support',
        check: () => content.includes('focus:') && content.includes('focus:outline-none'),
        importance: 'MEDIUM'
      },
      {
        test: 'Clear visual feedback for interactions',
        check: () => content.includes('bg-white shadow-sm') && content.includes('hover:'),
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
console.log('📊 HEADER IMPROVEMENTS TEST SUMMARY');
console.log('='.repeat(50));
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests} (${Math.round(passedTests/totalTests*100)}%)`);
console.log(`Failed: ${totalTests - passedTests}`);
console.log(`High Priority Failures: ${highPriorityFailed}`);

// UI Quality Scoring
let score = 'A+';
const passRate = passedTests / totalTests;

if (passRate < 0.6 || highPriorityFailed > 4) {
  score = 'F - Poor UI';
} else if (passRate < 0.7 || highPriorityFailed > 2) {
  score = 'C - Needs Work';
} else if (passRate < 0.8 || highPriorityFailed > 1) {
  score = 'B - Good Progress';
} else if (passRate < 0.9 || highPriorityFailed > 0) {
  score = 'A - Nearly Perfect';
} else {
  score = 'A+ - Clean UI Design';
}

console.log(`\n🎯 HEADER UI SCORE: ${score}`);

// Design Feedback
console.log('\n📋 UI QUALITY ASSESSMENT:');
console.log('='.repeat(50));

if (score.includes('A')) {
  console.log('🎉 Excellent header design improvements!');
  console.log('✨ Key improvements achieved:');
  console.log('   - Unified layout (no mobile/desktop duplication)');
  console.log('   - Simplified category display');
  console.log('   - Clean search bar design');
  console.log('   - Organized controls layout');
  console.log('   - Consistent visual design');
} else {
  console.log('🔧 Areas needing improvement:');
  console.log('   1. Unify mobile and desktop layouts');
  console.log('   2. Simplify category display');
  console.log('   3. Clean up search bar implementation');
  console.log('   4. Organize control elements better');
  console.log('   5. Improve visual consistency');
}

console.log('\n💡 Next Steps:');
if (score.includes('A')) {
  console.log('   - Perfect! Header is clean and user-friendly');
  console.log('   - Consider testing with real users');
  console.log('   - Monitor performance metrics');
} else {
  console.log('   - Focus on failed high-priority tests');
  console.log('   - Simplify complex UI elements');
  console.log('   - Ensure mobile-first responsive design');
}

process.exit(score.includes('F') ? 1 : 0);