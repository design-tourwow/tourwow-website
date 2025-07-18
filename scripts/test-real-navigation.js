const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Simulate the exact mapping logic from the listing page
function mapRawToTour(raw) {
  // This is the exact same logic as in the listing page
  let dayAndNight = '';
  let days = raw.productDurationDay;
  let nights = raw.productDurationNight;

  if (raw.productDurationDayAndNight) {
    const formats = [
      /(\d+)D(\d+)N/i,
      /(\d+)\s*วัน\s*(\d+)\s*คืน/,
      /(\d+)\s*day[s]?\s*(\d+)\s*night[s]?/i
    ];

    for (const format of formats) {
      const match = raw.productDurationDayAndNight.match(format);
      if (match) {
        days = parseInt(match[1]);
        nights = parseInt(match[2]);
        break;
      }
    }
    
    dayAndNight = `${days} วัน ${nights} คืน`;
  } else {
    dayAndNight = `${days} วัน ${nights} คืน`;
  }

  return {
    id: raw.id.toString(),
    name: raw.productName,
    code: raw.productTourCode,
    price: raw.periodPriceAdultDouble || raw.productPrice,
    originalPrice: raw.periodPriceAdultDoubleCompare,
    image: raw.productBannerUrl,
    location: raw.productMainCountryNameTh,
    country: raw.productMainCountryNameTh,
    days: days,
    nights: nights,
    duration: {
      days: days,
      nights: nights,
      dayAndNight: dayAndNight
    },
    hotelStar: raw.productHotelStar,
    meals: raw.productMealAmount,
    highlights: raw.productHilightDescription ? raw.productHilightDescription.split(/,|\n|\|/).map(s => s.trim()).filter(Boolean) : [],
    tags: raw.productTags ? raw.productTags.split(/,|\n|\|/).map(s => s.trim()).filter(Boolean) : [],
    periods: [
      {
        startAt: raw.periodStartAt,
        endAt: raw.periodEndAt,
        price: raw.periodPriceAdultDouble,
        comparePrice: raw.periodPriceAdultDoubleCompare,
        available: raw.periodQuantityRemaining,
        isActive: raw.periodIsActive,
        goTransport: raw.periodGoTransportationNameEn || 'สายการบินชั้นนำ',
        goTransportCode: raw.periodGoTransportationCode || 'TG',
        backTransport: raw.periodBackTransportationNameEn,
        backTransportCode: raw.periodBackTransportationCode,
      }
    ],
    isRecommended: raw.productIsRecommended === 1,
    tourwowCode: raw.productTourwowCode,
    quantityRemaining: raw.periodQuantityRemaining,
  }
}

// Simulate the exact matching logic from the detail page
async function findTourByCode(code) {
  const data = await prisma.productPool.findMany();
  
  console.log(`\n=== Testing code: ${code} ===`);
  console.log(`Looking for code: ${code}`);
  
  // This is the exact matching logic from the detail page
  // 1. Exact match first
  let matchingTours = data.filter(t => 
    t.productTourCode === code || 
    t.productTourwowCode === code
  );
  
  console.log(`Step 1 - Exact match: ${matchingTours.length} tours found`);
  
  // 2. Case insensitive match
  if (matchingTours.length === 0) {
    matchingTours = data.filter(t => 
      (t.productTourCode && t.productTourCode.toLowerCase() === code.toLowerCase()) || 
      (t.productTourwowCode && t.productTourwowCode.toLowerCase() === code.toLowerCase())
    );
    console.log(`Step 2 - Case insensitive match: ${matchingTours.length} tours found`);
  }
  
  // 3. Includes match
  if (matchingTours.length === 0) {
    matchingTours = data.filter(t => 
      (t.productTourCode && t.productTourCode.includes(code)) || 
      (t.productTourwowCode && t.productTourwowCode.includes(code)) ||
      (t.productTourCode && code.includes(t.productTourCode)) ||
      (t.productTourwowCode && code.includes(t.productTourwowCode))
    );
    console.log(`Step 3 - Includes match: ${matchingTours.length} tours found`);
  }
  
  // 4. Special characters removal
  if (matchingTours.length === 0) {
    const normalizedCode = code.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    matchingTours = data.filter(t => {
      const normalizedTourCode = (t.productTourCode || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      const normalizedTourwowCode = (t.productTourwowCode || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      return normalizedTourCode === normalizedCode || normalizedTourwowCode === normalizedCode;
    });
    console.log(`Step 4 - Special chars removed match: ${matchingTours.length} tours found`);
  }
  
  if (matchingTours.length > 0) {
    console.log(`✅ Found ${matchingTours.length} matching tours`);
    matchingTours.forEach((tour, index) => {
      console.log(`  ${index + 1}. ${tour.productTourwowCode} (${tour.productTourCode}) - ${tour.productName.substring(0, 80)}...`);
    });
    return matchingTours;
  } else {
    console.log(`❌ No matching tours found for: ${code}`);
    return [];
  }
}

async function testRealNavigation() {
  try {
    console.log('=== Real Navigation Testing ===');
    console.log('Simulating the exact flow from listing page to detail page\n');
    
    // Step 1: Get tours as they would appear in the listing
    const allTours = await prisma.productPool.findMany({
      take: 10
    });
    
    console.log('Step 1: Tours from listing page (first 10):');
    const listingTours = allTours.map(mapRawToTour);
    
    listingTours.forEach((tour, index) => {
      console.log(`${index + 1}. ${tour.tourwowCode} -> Navigation Link: /product-pool/${encodeURIComponent(tour.tourwowCode)}`);
    });
    
    // Step 2: Test navigation for each tour
    console.log('\n=== Testing Navigation Links ===');
    
    for (const tour of listingTours.slice(0, 5)) { // Test first 5 tours
      const encodedCode = encodeURIComponent(tour.tourwowCode);
      const decodedCode = decodeURIComponent(encodedCode);
      
      console.log(`\nTesting navigation for: ${tour.tourwowCode}`);
      console.log(`  Original code: ${tour.tourwowCode}`);
      console.log(`  Encoded: ${encodedCode}`);
      console.log(`  Decoded: ${decodedCode}`);
      console.log(`  Navigation URL: /product-pool/${encodedCode}`);
      
      const foundTours = await findTourByCode(decodedCode);
      
      if (foundTours.length > 0) {
        console.log(`  ✅ Navigation SUCCESS - Detail page would load`);
      } else {
        console.log(`  ❌ Navigation FAILED - Detail page would show 404`);
      }
    }
    
    // Step 3: Test edge cases that might cause navigation issues
    console.log('\n=== Testing Edge Cases ===');
    
    const edgeCases = [
      'tw5500',  // Normal case
      'tw-5500', // Dash in code
      'tw%205500', // URL encoded space
      'tw5500%20', // URL encoded space at end
      'TW5500',   // Capital letters
      'tw5500/', // Slash at end
      '',        // Empty string
      'undefined', // Undefined string
      'null',    // Null string
    ];
    
    for (const testCode of edgeCases) {
      await findTourByCode(testCode);
    }
    
    // Step 4: Test with real URL encoding scenarios
    console.log('\n=== Testing URL Encoding Scenarios ===');
    
    const realTours = await prisma.productPool.findMany({
      where: {
        productTourwowCode: {
          in: ['tw5500', 'tw3524', 'tw3749']
        }
      }
    });
    
    for (const tour of realTours) {
      const scenarios = [
        tour.productTourwowCode,
        encodeURIComponent(tour.productTourwowCode),
        encodeURIComponent(tour.productTourwowCode) + '%20',
        tour.productTourwowCode.toUpperCase(),
        tour.productTourwowCode.toLowerCase(),
      ];
      
      for (const scenario of scenarios) {
        console.log(`\nTesting scenario: "${scenario}" for original: "${tour.productTourwowCode}"`);
        const decoded = decodeURIComponent(scenario);
        const found = await findTourByCode(decoded);
        
        if (found.length > 0) {
          console.log(`  ✅ Would work: ${decoded}`);
        } else {
          console.log(`  ❌ Would fail: ${decoded}`);
        }
      }
    }
    
    await prisma.$disconnect();
    
  } catch (error) {
    console.error('Error in real navigation test:', error);
    await prisma.$disconnect();
  }
}

testRealNavigation();