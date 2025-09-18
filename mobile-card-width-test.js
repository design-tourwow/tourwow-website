// Mobile Card Width Test for Tour Search 31
// This script tests that all country cards have uniform width on mobile

const runMobileCardWidthTest = () => {
  console.log('🧪 Testing Mobile Card Width Uniformity...');
  
  // Wait for page to load
  setTimeout(() => {
    // Find all country cards in mobile view
    const cards = document.querySelectorAll('.ts31-country-card-mobile');
    
    if (cards.length === 0) {
      console.log('❌ No mobile cards found - may not be in mobile view');
      return;
    }
    
    console.log(`📊 Found ${cards.length} cards to test`);
    
    // Get the width of each card
    const cardWidths = Array.from(cards).map((card, index) => {
      const rect = card.getBoundingClientRect();
      const width = rect.width;
      console.log(`Card ${index + 1}: ${width.toFixed(2)}px wide`);
      return width;
    });
    
    // Check if all widths are equal (within 1px tolerance for rounding)
    const firstWidth = cardWidths[0];
    const allEqual = cardWidths.every(width => Math.abs(width - firstWidth) <= 1);
    
    if (allEqual) {
      console.log('✅ SUCCESS: All cards have uniform width!');
      console.log(`📏 All cards are ${firstWidth.toFixed(2)}px wide`);
      
      // Visual indicator in browser
      const indicator = document.createElement('div');
      indicator.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px; border-radius: 8px; z-index: 9999; font-family: monospace; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          ✅ Mobile Cards Fixed!<br>
          All ${cards.length} cards = ${firstWidth.toFixed(0)}px
        </div>
      `;
      document.body.appendChild(indicator);
      
      return true;
    } else {
      console.log('❌ FAILED: Cards have different widths!');
      cardWidths.forEach((width, index) => {
        const diff = Math.abs(width - firstWidth);
        if (diff > 1) {
          console.log(`⚠️  Card ${index + 1} differs by ${diff.toFixed(2)}px`);
        }
      });
      
      // Visual indicator for failure
      const indicator = document.createElement('div');
      indicator.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: #ef4444; color: white; padding: 12px; border-radius: 8px; z-index: 9999; font-family: monospace; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          ❌ Width Issue Found<br>
          Cards have different widths
        </div>
      `;
      document.body.appendChild(indicator);
      
      return false;
    }
  }, 1000);
};

// Run the test
runMobileCardWidthTest();

console.log('📱 Mobile Card Width Test initiated - check results above');