const puppeteer = require('puppeteer');

async function quickTestSearch() {
  console.log('🚀 Quick search test...');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1200, height: 800 }
  });
  
  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(10000); // Shorter timeout
    
    console.log('📱 Opening page...');
    await page.goto('http://localhost:4000/tour-search-32', { 
      waitUntil: 'domcontentloaded',
      timeout: 10000 
    });
    
    // Wait for basic elements
    await page.waitForSelector('#ts32-search-input', { timeout: 5000 });
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('🔍 Testing search...');
    
    // Direct search test
    await page.type('#ts32-search-input', 'ทัวร์ญี่ปุ่น');
    await page.keyboard.press('Enter');
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const results = await page.evaluate(() => {
      const header = document.querySelector('#search-results h2 + p');
      const cards = document.querySelectorAll('.ts32-tour-card, [class*="tour-card"]');
      return {
        headerText: header ? header.textContent : 'No header',
        cardCount: cards.length,
        hasResults: header && header.textContent.includes('พบ') && !header.textContent.includes('พบ 0')
      };
    });
    
    console.log('📊 Results:', results);
    
    if (results.hasResults) {
      console.log('🎉 SUCCESS: Search is working!');
    } else {
      console.log('❌ Still not working');
    }
    
    console.log('👀 Keeping browser open...');
    await new Promise(resolve => setTimeout(resolve, 8000));
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
    console.log('🔚 Test completed');
  }
}

quickTestSearch().catch(console.error);