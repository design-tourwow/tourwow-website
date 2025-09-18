const puppeteer = require('puppeteer');

async function testMobileLayout() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set mobile viewport (iPhone 12 Pro)
    await page.setViewport({
      width: 390,
      height: 844,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 3
    });
    
    console.log('🔄 Loading tour-search-28 page...');
    await page.goto('http://localhost:4000/tour-search-28/tour-jp-001', {
      waitUntil: 'networkidle2'
    });
    
    console.log('✅ Page loaded successfully');
    
    // Wait for content to fully render
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if highlights card is overlapping banner
    const hero = await page.$('section.relative.h-screen, section[class*="h-screen"]');
    const highlights = await page.$('.bg-white.rounded-t-3xl.shadow-elevated');
    
    if (hero && highlights) {
      const heroBox = await hero.boundingBox();
      const highlightsBox = await highlights.boundingBox();
      
      console.log('📏 Hero section:', {
        top: heroBox.y,
        bottom: heroBox.y + heroBox.height,
        height: heroBox.height
      });
      
      console.log('📏 Highlights card:', {
        top: highlightsBox.y,
        bottom: highlightsBox.y + highlightsBox.height,
        height: highlightsBox.height
      });
      
      // Check for overlap
      const isOverlapping = highlightsBox.y < (heroBox.y + heroBox.height);
      
      if (isOverlapping) {
        console.log('❌ ISSUE: Highlights card is overlapping the hero section');
        console.log(`   Hero bottom: ${heroBox.y + heroBox.height}px`);
        console.log(`   Highlights top: ${highlightsBox.y}px`);
        console.log(`   Overlap: ${(heroBox.y + heroBox.height) - highlightsBox.y}px`);
      } else {
        console.log('✅ SUCCESS: No overlap detected');
        console.log(`   Gap between hero and highlights: ${highlightsBox.y - (heroBox.y + heroBox.height)}px`);
      }
    }
    
    // Take screenshot
    await page.screenshot({ 
      path: '/tmp/mobile-hero-cleaned.png',
      fullPage: true
    });
    console.log('📸 Screenshot saved to /tmp/mobile-hero-cleaned.png');
    
    // Keep browser open for manual inspection
    console.log('🔍 Browser kept open for manual inspection. Close manually when done.');
    
  } catch (error) {
    console.error('❌ Error testing mobile layout:', error);
    await browser.close();
  }
}

testMobileLayout();