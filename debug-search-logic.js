const puppeteer = require('puppeteer');

async function debugSearchLogic() {
  console.log('🔍 Debugging Search Logic in Detail...');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1200, height: 800 }
  });
  
  try {
    const page = await browser.newPage();
    
    // Enable console logs from page
    page.on('console', msg => {
      if (msg.text().includes('SearchIndex') || msg.text().includes('tours') || msg.text().includes('search')) {
        console.log('🌐 Page Log:', msg.text());
      }
    });
    
    await page.goto('http://localhost:4000/tour-search-32', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Wait for data to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Inject debug script to inspect searchIndex
    const debugInfo = await page.evaluate(() => {
      try {
        // Try to access the searchIndex through various methods
        let indexInfo = { message: 'No searchIndex accessible' };
        
        // Check if there's a global searchIndex
        if (typeof window !== 'undefined' && window.searchIndex) {
          indexInfo = {
            type: 'window.searchIndex',
            hasTours: window.searchIndex.tours ? window.searchIndex.tours.length : 'no tours property',
            sampleTour: window.searchIndex.tours ? window.searchIndex.tours[0] : null
          };
        }
        
        // Check React component state (if accessible)
        const reactComponents = Array.from(document.querySelectorAll('[data-reactroot] *'))
          .map(el => el._reactInternalInstance || el.__reactInternalInstance)
          .filter(Boolean);
        
        return {
          indexInfo,
          hasReactComponents: reactComponents.length > 0,
          pageHTML: document.body.innerHTML.includes('searchResults') || document.body.innerHTML.includes('filteredTours'),
          resultsElement: !!document.getElementById('search-results'),
          searchInput: !!document.getElementById('ts32-search-input')
        };
      } catch (error) {
        return { error: error.message };
      }
    });
    
    console.log('🗂️ Debug Info:', JSON.stringify(debugInfo, null, 2));
    
    // Test specific search with detailed logging
    console.log('\n🧪 Testing search with "ญี่ปุ่น"...');
    
    const searchInput = await page.$('#ts32-search-input');
    if (!searchInput) {
      throw new Error('Search input not found');
    }
    
    await searchInput.click({ clickCount: 3 });
    await page.keyboard.type('ญี่ปุ่น');
    await page.keyboard.press('Enter');
    
    // Wait and check results
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const searchResults = await page.evaluate(() => {
      // Get results header
      const resultsHeader = document.querySelector('#search-results h2');
      const headerText = resultsHeader ? resultsHeader.textContent : 'No header found';
      
      // Count tour cards with various selectors
      const cardSelectors = [
        '.ts32-tour-card',
        '[class*="tour-card"]',
        '[class*="card"]',
        '.card'
      ];
      
      const cardCounts = {};
      cardSelectors.forEach(selector => {
        cardCounts[selector] = document.querySelectorAll(selector).length;
      });
      
      // Get any visible content that might be tours
      const allElements = Array.from(document.querySelectorAll('*'))
        .filter(el => el.textContent && (
          el.textContent.includes('ญี่ปุ่น') ||
          el.textContent.includes('โตเกียว') ||
          el.textContent.includes('price') ||
          el.textContent.includes('บาท')
        ));
      
      return {
        headerText,
        cardCounts,
        japanContentElements: allElements.length,
        sampleContent: allElements.slice(0, 3).map(el => ({
          tagName: el.tagName,
          className: el.className,
          textContent: el.textContent.substring(0, 100)
        }))
      };
    });
    
    console.log('🔍 Search Results:', JSON.stringify(searchResults, null, 2));
    
    console.log('\n👀 Keeping browser open for inspection...');
    await new Promise(resolve => setTimeout(resolve, 15000));
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  } finally {
    await browser.close();
  }
}

debugSearchLogic().catch(console.error);