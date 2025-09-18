const puppeteer = require('puppeteer');

async function testSuggestionFunctionality() {
  console.log('🚀 Starting suggestion functionality test...');
  
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
    console.log('✅ Search bar found');
    
    // Test 1: Type in search input to trigger suggestions
    console.log('\n🔍 Test 1: Typing in search input...');
    const searchInput = await page.$('#ts32-search-input');
    
    if (!searchInput) {
      throw new Error('Search input not found');
    }
    
    // Clear and type "ญี่"
    await searchInput.click({ clickCount: 3 });
    await page.keyboard.type('ญี่');
    
    // Wait for suggestions to appear
    console.log('⏳ Waiting for suggestions...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if suggestions appeared
    const suggestions = await page.$$('.ts32-search-bar .absolute button');
    console.log(`📝 Found ${suggestions.length} suggestions`);
    
    if (suggestions.length === 0) {
      console.log('❌ No suggestions found');
      return;
    }
    
    // Get suggestion text for verification
    const suggestionTexts = await Promise.all(
      suggestions.slice(0, 3).map(async (suggestion, index) => {
        const text = await page.evaluate(el => el.textContent, suggestion);
        console.log(`   ${index + 1}. ${text}`);
        return text;
      })
    );
    
    // Test 2: Click on the first suggestion
    console.log('\n👆 Test 2: Clicking first suggestion...');
    const firstSuggestion = suggestions[0];
    const suggestionText = suggestionTexts[0];
    
    // Get initial scroll position
    const initialScrollY = await page.evaluate(() => window.scrollY);
    console.log(`📍 Initial scroll position: ${initialScrollY}px`);
    
    // Click the suggestion
    await firstSuggestion.click();
    
    // Wait for potential state updates
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test 3: Verify input value was updated
    console.log('\n✅ Test 3: Verifying input value...');
    const inputValue = await page.evaluate(() => {
      const input = document.querySelector('#ts32-search-input');
      return input ? input.value : null;
    });
    
    console.log(`📝 Input value after click: "${inputValue}"`);
    console.log(`📝 Expected suggestion text: "${suggestionText}"`);
    
    const inputMatches = inputValue === suggestionText;
    console.log(`${inputMatches ? '✅' : '❌'} Input value ${inputMatches ? 'matches' : 'does not match'} suggestion`);
    
    // Test 4: Verify auto-scroll occurred
    console.log('\n🔄 Test 4: Verifying auto-scroll...');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
    
    const finalScrollY = await page.evaluate(() => window.scrollY);
    console.log(`📍 Final scroll position: ${finalScrollY}px`);
    
    const scrollOccurred = finalScrollY > initialScrollY;
    console.log(`${scrollOccurred ? '✅' : '❌'} Auto-scroll ${scrollOccurred ? 'occurred' : 'did not occur'}`);
    
    // Test 5: Check if results section is visible
    console.log('\n👀 Test 5: Checking results section visibility...');
    const resultsVisible = await page.evaluate(() => {
      const resultsSection = document.getElementById('search-results');
      if (!resultsSection) return false;
      
      const rect = resultsSection.getBoundingClientRect();
      return rect.top >= 0 && rect.top <= window.innerHeight;
    });
    
    console.log(`${resultsVisible ? '✅' : '❌'} Results section ${resultsVisible ? 'is' : 'is not'} visible in viewport`);
    
    // Summary
    console.log('\n📊 Test Summary:');
    console.log(`  • Suggestions loaded: ${suggestions.length > 0 ? '✅' : '❌'}`);
    console.log(`  • Input populated: ${inputMatches ? '✅' : '❌'}`);
    console.log(`  • Auto-scroll worked: ${scrollOccurred ? '✅' : '❌'}`);
    console.log(`  • Results visible: ${resultsVisible ? '✅' : '❌'}`);
    
    const allTestsPassed = suggestions.length > 0 && inputMatches && scrollOccurred && resultsVisible;
    console.log(`\n${allTestsPassed ? '🎉 All tests PASSED!' : '⚠️  Some tests FAILED!'}`);
    
    // Keep browser open for 5 seconds for visual verification
    console.log('\n👀 Keeping browser open for 5 seconds for visual verification...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
    console.log('🔚 Test completed');
  }
}

// Run the test
testSuggestionFunctionality().catch(console.error);