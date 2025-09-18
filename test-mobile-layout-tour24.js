// Mobile Layout Test for tour-search-24
// This script tests mobile responsiveness and layout issues

console.log('🧪 Testing Tour Search 24 Mobile Layout');

// Test 1: Check for mobile viewport
function testViewport() {
  const viewport = document.querySelector('meta[name="viewport"]');
  console.log('📱 Viewport meta:', viewport ? viewport.content : 'MISSING');
  return !!viewport;
}

// Test 2: Check mobile-first CSS classes
function testMobileFirstCSS() {
  const mobileElements = [
    { selector: '.px-3', description: 'Mobile padding' },
    { selector: '.sm\\:px-4', description: 'Small screen padding' },
    { selector: '.text-xs', description: 'Mobile text size' },
    { selector: '.lg\\:hidden', description: 'Desktop hidden elements' },
    { selector: '.hidden.lg\\:block', description: 'Mobile hidden elements' }
  ];
  
  console.log('🎨 Mobile-First CSS Classes:');
  mobileElements.forEach(({ selector, description }) => {
    const elements = document.querySelectorAll(selector);
    console.log(`  - ${description}: ${elements.length} elements`);
  });
}

// Test 3: Check touch targets
function testTouchTargets() {
  const buttons = document.querySelectorAll('button, a, [role="button"]');
  const smallTargets = [];
  
  buttons.forEach(btn => {
    const rect = btn.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height);
    if (size < 44 && size > 0) {
      smallTargets.push({ element: btn, size });
    }
  });
  
  console.log(`👆 Touch Targets: ${buttons.length} total, ${smallTargets.length} under 44px`);
  if (smallTargets.length > 0) {
    console.warn('⚠️  Small touch targets found:', smallTargets.slice(0, 3));
  }
}

// Test 4: Check for horizontal overflow
function testHorizontalOverflow() {
  const bodyWidth = document.body.scrollWidth;
  const windowWidth = window.innerWidth;
  const hasOverflow = bodyWidth > windowWidth;
  
  console.log(`📏 Layout Width: body=${bodyWidth}px, window=${windowWidth}px`);
  
  if (hasOverflow) {
    console.error('❌ HORIZONTAL OVERFLOW DETECTED!');
    
    // Find elements causing overflow
    const allElements = document.querySelectorAll('*');
    const overflowElements = [];
    
    allElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right > windowWidth) {
        overflowElements.push({
          element: el,
          right: rect.right,
          tagName: el.tagName,
          className: el.className
        });
      }
    });
    
    console.log('🔍 Elements causing overflow:', overflowElements.slice(0, 5));
  } else {
    console.log('✅ No horizontal overflow detected');
  }
  
  return !hasOverflow;
}

// Test 5: Check sticky elements positioning
function testStickyElements() {
  const stickyElements = document.querySelectorAll('.sticky, .fixed');
  console.log(`📌 Sticky/Fixed Elements: ${stickyElements.length} found`);
  
  stickyElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const styles = window.getComputedStyle(el);
    console.log(`  - ${el.className}: position=${styles.position}, z-index=${styles.zIndex}`);
  });
}

// Test 6: Test modal responsiveness
function testModalResponsiveness() {
  const modals = document.querySelectorAll('[role="dialog"], .modal, [class*="modal"]');
  console.log(`🪟 Modals found: ${modals.length}`);
  
  modals.forEach(modal => {
    const rect = modal.getBoundingClientRect();
    const styles = window.getComputedStyle(modal);
    console.log(`  - Modal: width=${rect.width}px, max-width=${styles.maxWidth}`);
  });
}

// Run all tests
function runMobileTests() {
  console.log('🚀 Starting Mobile Layout Tests...\n');
  
  const results = {
    viewport: testViewport(),
    overflow: testHorizontalOverflow()
  };
  
  testMobileFirstCSS();
  testTouchTargets();
  testStickyElements();
  testModalResponsiveness();
  
  console.log('\n📊 Test Results:');
  console.log(`  ✅ Viewport: ${results.viewport ? 'PASS' : 'FAIL'}`);
  console.log(`  ✅ No Overflow: ${results.overflow ? 'PASS' : 'FAIL'}`);
  
  const overall = results.viewport && results.overflow;
  console.log(`\n🎯 Overall: ${overall ? '✅ MOBILE READY' : '❌ NEEDS FIXES'}`);
  
  return results;
}

// Auto-run tests when script loads
if (typeof window !== 'undefined') {
  // Wait for page to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runMobileTests);
  } else {
    setTimeout(runMobileTests, 1000); // Give time for React to render
  }
}

// Export for manual testing
if (typeof module !== 'undefined') {
  module.exports = { runMobileTests };
}