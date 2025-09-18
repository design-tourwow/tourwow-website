const puppeteer = require('puppeteer');

async function debugSearchResults() {
  console.log('🚀 Debugging search results...');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1200, height: 800 }
  });
  
  try {
    const page = await browser.newPage();
    
    // Navigate to tour-search-32
    console.log('📱 Navigating to tour-search-32...');
    await page.goto('http://localhost:4000/tour-search-32', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Wait for the page to be fully loaded
    await page.waitForSelector('#ts32-search-input', { timeout: 10000 });
    console.log('✅ Page loaded');
    
    // Get initial search results count
    const initialResults = await page.evaluate(() => {
      const resultsText = document.querySelector('#search-results h2')?.textContent || '';
      const match = resultsText.match(/พบ (\d+) ทัวร์/);
      return match ? parseInt(match[1]) : 0;
    });
    console.log(`📊 Initial results count: ${initialResults}`);
    
    // Type in search input
    console.log('\n🔍 Typing "ญี่" in search input...');
    const searchInput = await page.$('#ts32-search-input');
    await searchInput.click({ clickCount: 3 });
    await page.keyboard.type('ญี่');
    
    // Wait for suggestions
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check suggestions
    const suggestions = await page.$$('.ts32-search-bar .absolute button');
    console.log(`📝 Found ${suggestions.length} suggestions`);
    
    if (suggestions.length > 0) {
      const suggestionText = await page.evaluate(el => el.textContent, suggestions[0]);
      console.log(`   First suggestion: "${suggestionText}"`);
      
      // Click the first suggestion
      console.log('\n👆 Clicking first suggestion...');
      await suggestions[0].click();
      
      // Wait for search to process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check final results count
      const finalResults = await page.evaluate(() => {
        const resultsText = document.querySelector('#search-results h2')?.textContent || '';
        const match = resultsText.match(/พบ (\d+) ทัวร์/);
        return match ? parseInt(match[1]) : 0;
      });
      console.log(`📊 Final results count: ${finalResults}`);
      
      // Check the search query in the input
      const currentQuery = await page.evaluate(() => {
        return document.querySelector('#ts32-search-input')?.value || '';
      });
      console.log(`🔍 Current search query: "${currentQuery}"`);
      
      // Check if there are any visible tour cards
      const tourCards = await page.$$eval('.ts32-tour-card, [class*="tour-card"]', cards => cards.length);
      console.log(`🎴 Visible tour cards: ${tourCards}`);
      
      // Try direct search with the same keyword
      console.log('\n🧪 Testing direct search with same keyword...');
      await searchInput.click({ clickCount: 3 });
      await page.keyboard.type('ทัวร์ญี่ปุ่น');
      await page.keyboard.press('Enter');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const directSearchResults = await page.evaluate(() => {
        const resultsText = document.querySelector('#search-results h2')?.textContent || '';
        const match = resultsText.match(/พบ (\d+) ทัวร์/);
        return match ? parseInt(match[1]) : 0;
      });
      console.log(`📊 Direct search results: ${directSearchResults}`);
      
      // Debug: Check search index data
      console.log('\n🔍 Checking search index...');
      const debugInfo = await page.evaluate(() => {
        // Try to access window.searchIndex or any global search data
        if (window.searchIndex) {
          return {
            totalTours: window.searchIndex.length || 0,
            sampleTitles: window.searchIndex.slice(0, 3).map(t => t.title || 'No title')
          };
        }
        return { message: 'No searchIndex found on window' };
      });
      console.log('🗂️ Search index info:', JSON.stringify(debugInfo, null, 2));
      
    } else {
      console.log('❌ No suggestions found');
    }
    
    // Keep browser open for inspection
    console.log('\n👀 Keeping browser open for 10 seconds...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  } finally {
    await browser.close();
    console.log('🔚 Debug completed');
  }
}

debugSearchResults().catch(console.error);