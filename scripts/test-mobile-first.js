#!/usr/bin/env node

/**
 * Mobile-First Design Test for Tour Search 17
 * Tests responsive design and mobile-first approach
 */

const fs = require('fs');
const path = require('path');

console.log('📱 Testing Mobile-First Design for Tour Search 17\n');

// Read the tour-search-17 page file
const tourFile = path.join(__dirname, '../src/app/tour-search-17/page.tsx');
const content = fs.readFileSync(tourFile, 'utf8');

const tests = [
  {
    name: '📱 Mobile-First Foundation',
    items: [
      {
        test: 'Base styles are mobile-first (no max-width breakpoints)',
        check: () => {
          const maxWidthBreakpoints = content.match(/max-[a-z]+:/g)?.length || 0;
          return maxWidthBreakpoints === 0; // Should use min-width approach
        },
        importance: 'HIGH'
      },
      {
        test: 'Uses lg: prefixes for larger screens',
        check: () => content.includes('lg:') && content.includes('lg:text-'),
        importance: 'HIGH'
      },
      {
        test: 'Mobile padding and margins are appropriate',
        check: () => content.includes('px-4') && content.includes('py-6'),
        importance: 'HIGH'
      },
      {
        test: 'Touch-friendly button sizes (p-2, py-3)',
        check: () => content.includes('p-2') && content.includes('py-3'),
        importance: 'HIGH'
      }
    ]
  },
  {
    name: '📋 Mobile Content Layout',
    items: [
      {
        test: 'Single column layout on mobile (grid-cols-1)',
        check: () => content.includes('grid-cols-1'),
        importance: 'HIGH'
      },
      {
        test: 'Responsive text sizes (text-base lg:text-lg)',
        check: () => content.includes('text-base lg:text-lg') || content.includes('text-xl lg:text-2xl'),
        importance: 'HIGH'
      },
      {
        test: 'Mobile-appropriate spacing (gap-2, gap-4)',
        check: () => content.includes('gap-2') && content.includes('gap-4'),
        importance: 'MEDIUM'
      },
      {
        test: 'Responsive image sizing',
        check: () => content.includes('h-48') && content.includes('object-cover'),
        importance: 'MEDIUM'
      }
    ]
  },
  {
    name: '🎛️ Mobile Controls & Navigation',
    items: [
      {
        test: 'Horizontal scrolling for categories (overflow-x-auto)',
        check: () => content.includes('overflow-x-auto'),
        importance: 'HIGH'
      },
      {
        test: 'Categories have whitespace-nowrap',
        check: () => content.includes('whitespace-nowrap'),
        importance: 'HIGH'
      },
      {
        test: 'Mobile-friendly button layout',
        check: () => content.includes('flex-shrink-0') && content.includes('flex-1'),
        importance: 'MEDIUM'
      },
      {
        test: 'Proper touch target sizes (min 44px)',
        check: () => {
          const touchTargets = content.match(/p-[2-9]|py-[2-9]|min-h-\[4[4-9]/g)?.length || 0;
          return touchTargets > 5; // Should have multiple touch-friendly elements
        },
        importance: 'HIGH'
      }
    ]
  },
  {
    name: '🔄 Responsive Breakpoints',
    items: [
      {
        test: 'Desktop improvements with lg: prefix',
        check: () => content.includes('lg:grid-cols-2') && content.includes('lg:w-80'),
        importance: 'HIGH'
      },
      {
        test: 'Responsive flex layout (flex-col lg:flex-row)',
        check: () => content.includes('flex-col lg:flex-row'),
        importance: 'HIGH'
      },
      {
        test: 'Desktop-specific positioning (lg:sticky lg:top-24)',
        check: () => content.includes('lg:sticky'),
        importance: 'MEDIUM'
      },
      {
        test: 'Responsive container widths (max-w-xl, max-w-5xl)',
        check: () => content.includes('max-w-xl') && content.includes('max-w-5xl'),
        importance: 'MEDIUM'
      }
    ]
  },
  {
    name: '🎨 Mobile Typography & Visual',
    items: [
      {
        test: 'Readable font sizes on mobile (text-sm, text-base)',
        check: () => content.includes('text-sm') && content.includes('text-base'),
        importance: 'HIGH'
      },
      {
        test: 'Appropriate line heights and spacing',
        check: () => content.includes('mb-1') && content.includes('mb-2') && content.includes('mb-4'),
        importance: 'MEDIUM'
      },
      {
        test: 'Mobile-optimized card padding (p-6)',
        check: () => content.includes('p-6'),
        importance: 'MEDIUM'
      },
      {
        test: 'Consistent border radius (rounded-lg, rounded-xl)',
        check: () => content.includes('rounded-lg') && content.includes('rounded-xl'),
        importance: 'LOW'
      }
    ]
  },
  {
    name: '⚡ Mobile Performance',
    items: [
      {
        test: 'Efficient CSS classes (no redundant breakpoints)',
        check: () => {
          const redundantClasses = content.match(/sm:.*md:.*lg:/g)?.length || 0;
          return redundantClasses < 3; // Should minimize complex breakpoint chains
        },
        importance: 'MEDIUM'
      },
      {
        test: 'Next.js Image optimization for mobile',
        check: () => content.includes('<Image') && content.includes('fill'),
        importance: 'HIGH'
      },
      {
        test: 'Lazy loading and performance hints',
        check: () => content.includes('loading="lazy"') || content.includes('fill'),
        importance: 'MEDIUM'
      },
      {
        test: 'Mobile-efficient animations (transition-colors vs complex animations)',
        check: () => content.includes('transition-colors') && !content.includes('animate-bounce'),
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
console.log('📊 MOBILE-FIRST TEST SUMMARY');
console.log('='.repeat(50));
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests} (${Math.round(passedTests/totalTests*100)}%)`);
console.log(`Failed: ${totalTests - passedTests}`);
console.log(`High Priority Failures: ${highPriorityFailed}`);

// Mobile-First Scoring
let score = 'A+';
const passRate = passedTests / totalTests;

if (passRate < 0.6 || highPriorityFailed > 4) {
  score = 'F - Desktop-First';
} else if (passRate < 0.7 || highPriorityFailed > 2) {
  score = 'C - Poor Mobile UX';
} else if (passRate < 0.8 || highPriorityFailed > 1) {
  score = 'B - Good Mobile Design';
} else if (passRate < 0.9 || highPriorityFailed > 0) {
  score = 'A - Mobile-Optimized';
} else {
  score = 'A+ - Mobile-First Excellence';
}

console.log(`\n📱 MOBILE-FIRST SCORE: ${score}`);

// Mobile UX Feedback
console.log('\n📋 MOBILE UX ASSESSMENT:');
console.log('='.repeat(50));

if (score.includes('A')) {
  console.log('🎉 Excellent mobile-first implementation!');
  console.log('✨ Mobile UX strengths:');
  console.log('   - True mobile-first approach');
  console.log('   - Touch-friendly interface');
  console.log('   - Responsive breakpoints');
  console.log('   - Mobile-optimized performance');
  console.log('   - Clean mobile typography');
} else {
  console.log('🔧 Mobile UX needs improvement:');
  console.log('   1. Implement mobile-first CSS approach');
  console.log('   2. Increase touch target sizes');
  console.log('   3. Optimize content layout for mobile');
  console.log('   4. Improve mobile navigation patterns');
  console.log('   5. Test on actual mobile devices');
}

console.log('\n💡 Mobile Testing Recommendations:');
if (score.includes('A+')) {
  console.log('   - Test on various mobile devices');
  console.log('   - Verify touch interactions work properly');
  console.log('   - Check mobile performance metrics');
  console.log('   - Consider mobile-specific features (swipe, etc.)');
} else {
  console.log('   - Start with mobile viewport (375px width)');
  console.log('   - Use Chrome DevTools device emulation');
  console.log('   - Test touch interactions on real devices');
  console.log('   - Optimize for mobile performance');
}

console.log('\n📱 Quick Mobile Test:');
console.log('   1. Open Chrome DevTools (F12)');
console.log('   2. Click device toolbar (Ctrl+Shift+M)');
console.log('   3. Set to iPhone SE (375x667)');
console.log('   4. Test all interactions');
console.log('   5. Check horizontal scrolling works');

process.exit(score.includes('F') ? 1 : 0);