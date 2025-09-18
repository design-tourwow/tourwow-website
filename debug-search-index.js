const puppeteer = require('puppeteer');

async function debugSearchIndex() {
  console.log('🔍 Debugging Search Index...');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1200, height: 800 }
  });
  
  try {
    const page = await browser.newPage();
    
    await page.goto('http://localhost:4000/tour-search-32', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Check search index data
    const indexInfo = await page.evaluate(() => {
      // Try to access search module or inspect actual tours
      return {
        totalElements: document.querySelectorAll('.ts32-tour-card, [class*="tour"]').length,
        sampleTitles: Array.from(document.querySelectorAll('h3, h4, .tour-title')).slice(0, 10).map(el => el.textContent?.trim()),
        hasJapanTours: Array.from(document.querySelectorAll('*')).some(el => 
          el.textContent && (
            el.textContent.includes('ญี่ปุ่น') || 
            el.textContent.includes('Japan') ||
            el.textContent.includes('Tokyo') ||
            el.textContent.includes('โตเกียว')
          )
        )
      };
    });
    
    console.log('📊 Search Index Debug Info:');
    console.log(`  Total tour elements: ${indexInfo.totalElements}`);
    console.log(`  Has Japan content: ${indexInfo.hasJapanTours}`);
    console.log('  Sample titles:', indexInfo.sampleTitles);
    
    // Test direct search with Japan keywords
    const searchTests = ['ญี่ปุ่น', 'japan', 'โตเกียว', 'tokyo'];
    
    for (const keyword of searchTests) {
      console.log(`\n🧪 Testing search: "${keyword}"`);
      
      const searchInput = await page.$('#ts32-search-input');
      await searchInput.click({ clickCount: 3 });
      await page.keyboard.type(keyword);
      await page.keyboard.press('Enter');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const results = await page.evaluate(() => {
        const resultsText = document.querySelector('#search-results h2')?.textContent || '';
        const match = resultsText.match(/พบ (\d+) ทัวร์/);
        return match ? parseInt(match[1]) : 0;
      });
      
      console.log(`  Results: ${results} tours`);
    }
    
    console.log('\n👀 Keeping browser open for inspection...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  } finally {
    await browser.close();
  }
}

debugSearchIndex().catch(console.error);