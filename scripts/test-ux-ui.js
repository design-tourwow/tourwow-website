#!/usr/bin/env node

/**
 * UX/UI Testing Script for Tour Search Pages
 * Tests all functionality and user interactions
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class UXUITester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      passed: 0,
      failed: 0,
      tests: []
    };
  }

  async init() {
    console.log('🚀 Starting UX/UI Testing...');
    this.browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1280, height: 720 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    
    // Set user agent
    await this.page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  }

  async test(testName, testFunction) {
    try {
      console.log(`\n🧪 Testing: ${testName}`);
      await testFunction();
      this.results.passed++;
      this.results.tests.push({ name: testName, status: 'PASSED' });
      console.log(`✅ PASSED: ${testName}`);
    } catch (error) {
      this.results.failed++;
      this.results.tests.push({ name: testName, status: 'FAILED', error: error.message });
      console.log(`❌ FAILED: ${testName}`);
      console.log(`   Error: ${error.message}`);
    }
  }

  async runTests() {
    await this.init();

    // Test 1: Page Loading
    await this.test('Page loads successfully', async () => {
      await this.page.goto('http://localhost:3000/tour-search-7', { waitUntil: 'networkidle0' });
      await this.page.waitForSelector('h1', { timeout: 10000 });
    });

    // Test 2: Hero Section
    await this.test('Hero section displays correctly', async () => {
      const heroTitle = await this.page.$eval('h1', el => el.textContent);
      if (!heroTitle.includes('ค้นพบโลกใบใหม่')) {
        throw new Error('Hero title not found');
      }
    });

    // Test 3: Continent Tabs
    await this.test('Continent tabs work correctly', async () => {
      // Check Asia tab
      await this.page.click('button:has-text("ทัวร์เอเชีย")');
      await this.page.waitForTimeout(500);
      
      // Check Europe tab
      await this.page.click('button:has-text("ทัวร์ยุโรป")');
      await this.page.waitForTimeout(500);
      
      // Check button sizes are appropriate
      const buttonSize = await this.page.$eval('button:has-text("ทัวร์เอเชีย")', el => {
        const rect = el.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      });
      
      if (buttonSize.width > 200 || buttonSize.height > 60) {
        throw new Error('Button size too large');
      }
    });

    // Test 4: Country Grid Layout
    await this.test('Country grid shows 6 countries in 2 rows', async () => {
      await this.page.click('button:has-text("ทัวร์เอเชีย")');
      await this.page.waitForTimeout(500);
      
      const countryCards = await this.page.$$('[class*="grid-cols-3"] > button');
      if (countryCards.length !== 6) {
        throw new Error(`Expected 6 countries, found ${countryCards.length}`);
      }
      
      // Check if it's in 2 rows (3 columns)
      const gridContainer = await this.page.$('[class*="grid-cols-3"]');
      const computedStyle = await this.page.evaluate(el => {
        return window.getComputedStyle(el).gridTemplateColumns;
      }, gridContainer);
      
      if (!computedStyle.includes('repeat(3')) {
        throw new Error('Grid should have 3 columns');
      }
    });

    // Test 5: Country Selection
    await this.test('Country selection works', async () => {
      await this.page.click('button:has-text("ญี่ปุ่น")');
      await this.page.waitForTimeout(1000);
      
      // Check if results section shows filtered tours
      const resultsTitle = await this.page.$eval('h2', el => el.textContent);
      if (!resultsTitle.includes('ทัวร์ญี่ปุ่น')) {
        throw new Error('Country filter not working');
      }
    });

    // Test 6: Filter Toggle
    await this.test('Filter toggle works', async () => {
      await this.page.click('button:has-text("ตัวกรองและเรียงลำดับ")');
      await this.page.waitForTimeout(500);
      
      const filterSection = await this.page.$('select[value=""]');
      if (!filterSection) {
        throw new Error('Filter section not visible');
      }
    });

    // Test 7: Tour Cards Display
    await this.test('Tour cards display correctly', async () => {
      const tourCards = await this.page.$$('a[href*="/tour-search-7/"]');
      if (tourCards.length === 0) {
        throw new Error('No tour cards found');
      }
      
      // Check if cards have required elements
      const firstCard = tourCards[0];
      const hasImage = await firstCard.$('img');
      const hasTitle = await firstCard.$('h3');
      const hasPrice = await firstCard.$('text:has-text("฿")');
      
      if (!hasImage || !hasTitle || !hasPrice) {
        throw new Error('Tour card missing required elements');
      }
    });

    // Test 8: Departure Dates Badge
    await this.test('Departure dates badge shows correctly', async () => {
      const departureBadges = await this.page.$$('text:has-text("ม.ค.-มี.ค.")');
      if (departureBadges.length === 0) {
        throw new Error('Departure dates badge not found');
      }
    });

    // Test 9: Tour Detail Page Navigation
    await this.test('Tour detail page navigation works', async () => {
      const firstTourLink = await this.page.$('a[href*="/tour-search-7/"]');
      const href = await firstTourLink.evaluate(el => el.href);
      
      await firstTourLink.click();
      await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
      
      const currentUrl = this.page.url();
      if (!currentUrl.includes('/tour-search-7/')) {
        throw new Error('Navigation to detail page failed');
      }
    });

    // Test 10: Detail Page Elements
    await this.test('Detail page displays all sections', async () => {
      await this.page.waitForSelector('h1', { timeout: 10000 });
      
      // Check for main sections
      const sections = ['ภาพรวม', 'กำหนดการ', 'ที่พัก', 'ราคา', 'รีวิว'];
      for (const section of sections) {
        const sectionElement = await this.page.$(`text:has-text("${section}")`);
        if (!sectionElement) {
          throw new Error(`Section "${section}" not found`);
        }
      }
    });

    // Test 11: Sticky Navigation
    await this.test('Sticky navigation works', async () => {
      await this.page.evaluate(() => {
        window.scrollTo(0, 500);
      });
      await this.page.waitForTimeout(500);
      
      const stickyNav = await this.page.$('[class*="sticky"]');
      if (!stickyNav) {
        throw new Error('Sticky navigation not found');
      }
    });

    // Test 12: Booking Modal
    await this.test('Booking modal opens correctly', async () => {
      const bookButton = await this.page.$('button:has-text("จองทัวร์")');
      await bookButton.click();
      await this.page.waitForTimeout(500);
      
      const modal = await this.page.$('[class*="fixed inset-0"]');
      if (!modal) {
        throw new Error('Booking modal not opened');
      }
      
      // Close modal
      const closeButton = await this.page.$('button:has-text("×")');
      if (closeButton) {
        await closeButton.click();
      }
    });

    // Test 13: Mobile Responsiveness
    await this.test('Mobile responsiveness', async () => {
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.reload();
      await this.page.waitForTimeout(1000);
      
      // Check if mobile grid shows 3 columns
      const mobileGrid = await this.page.$('[class*="grid-cols-3"]');
      if (!mobileGrid) {
        throw new Error('Mobile grid not found');
      }
    });

    // Test 14: Performance Test
    await this.test('Page performance is acceptable', async () => {
      const startTime = Date.now();
      await this.page.goto('http://localhost:3000/tour-search-7', { waitUntil: 'networkidle0' });
      const loadTime = Date.now() - startTime;
      
      if (loadTime > 5000) {
        throw new Error(`Page load time too slow: ${loadTime}ms`);
      }
    });

    // Test 15: Accessibility
    await this.test('Basic accessibility features', async () => {
      // Check for alt text on images
      const images = await this.page.$$('img');
      for (const img of images) {
        const alt = await img.evaluate(el => el.alt);
        if (!alt) {
          throw new Error('Image missing alt text');
        }
      }
      
      // Check for proper heading hierarchy
      const headings = await this.page.$$eval('h1, h2, h3', els => els.map(el => el.tagName));
      if (!headings.includes('H1')) {
        throw new Error('Page missing H1 heading');
      }
    });

    await this.generateReport();
    await this.browser.close();
  }

  async generateReport() {
    console.log('\n📊 Test Results Summary:');
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`📈 Success Rate: ${((this.results.passed / (this.results.passed + this.results.failed)) * 100).toFixed(1)}%`);
    
    console.log('\n📋 Detailed Results:');
    this.results.tests.forEach(test => {
      const status = test.status === 'PASSED' ? '✅' : '❌';
      console.log(`${status} ${test.name}`);
      if (test.error) {
        console.log(`   Error: ${test.error}`);
      }
    });

    // Save report to file
    const reportPath = path.join(__dirname, 'ux-ui-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  }
}

// Run tests
async function main() {
  const tester = new UXUITester();
  await tester.runTests();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = UXUITester; 