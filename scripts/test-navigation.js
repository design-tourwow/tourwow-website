const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testNavigation() {
  try {
    console.log('=== Testing Navigation Logic ===\n');
    
    // Get all tours from the database
    const allTours = await prisma.productPool.findMany({
      select: {
        productTourCode: true,
        productTourwowCode: true,
        productName: true,
        periodIsActive: true,
        periodQuantityRemaining: true,
      },
      take: 20
    });
    
    console.log('Available tours in database:');
    allTours.forEach((tour, index) => {
      console.log(`${index + 1}. ${tour.productTourwowCode} (${tour.productTourCode}) - Active: ${tour.periodIsActive}, Available: ${tour.periodQuantityRemaining}`);
    });
    
    console.log('\n=== Testing specific tour codes ===\n');
    
    // Test specific tour codes
    const testCodes = [
      'tw3524',
      'tw3749', 
      'XJ130',
      'tw3283',
      'DADVZ0923',
      'VTEFD0223',
      'nonexistent-code',
      'tw-5500',
      'tw5500'
    ];
    
    for (const code of testCodes) {
      console.log(`Testing code: ${code}`);
      
      // Test exact match for productTourwowCode
      const tourwowMatch = await prisma.productPool.findMany({
        where: {
          productTourwowCode: code
        },
        select: {
          productTourCode: true,
          productTourwowCode: true,
          productName: true,
          periodIsActive: true,
          periodQuantityRemaining: true,
        }
      });
      
      // Test exact match for productTourCode
      const tourCodeMatch = await prisma.productPool.findMany({
        where: {
          productTourCode: code
        },
        select: {
          productTourCode: true,
          productTourwowCode: true,
          productName: true,
          periodIsActive: true,
          periodQuantityRemaining: true,
        }
      });
      
      console.log(`  - productTourwowCode matches: ${tourwowMatch.length}`);
      console.log(`  - productTourCode matches: ${tourCodeMatch.length}`);
      
      if (tourwowMatch.length > 0) {
        console.log(`    First match: ${tourwowMatch[0].productTourwowCode} (${tourwowMatch[0].productTourCode})`);
      }
      
      if (tourCodeMatch.length > 0) {
        console.log(`    First match: ${tourCodeMatch[0].productTourwowCode} (${tourCodeMatch[0].productTourCode})`);
      }
      
      if (tourwowMatch.length === 0 && tourCodeMatch.length === 0) {
        console.log(`    ❌ No match found for: ${code}`);
      }
      
      console.log('');
    }
    
    console.log('\n=== Checking for edge cases ===\n');
    
    // Check for empty/blank tour codes
    const emptyTourwowCodes = await prisma.productPool.findMany({
      where: {
        productTourwowCode: ''
      },
      select: {
        productTourCode: true,
        productTourwowCode: true,
        productName: true,
      }
    });
    
    const emptyTourCodes = await prisma.productPool.findMany({
      where: {
        productTourCode: ''
      },
      select: {
        productTourCode: true,
        productTourwowCode: true,
        productName: true,
      }
    });
    
    console.log(`Tours with empty productTourwowCode: ${emptyTourwowCodes.length}`);
    console.log(`Tours with empty productTourCode: ${emptyTourCodes.length}`);
    
    // Check for duplicate tour codes
    const duplicateTourwowCodes = await prisma.productPool.groupBy({
      by: ['productTourwowCode'],
      _count: {
        productTourwowCode: true
      },
      having: {
        productTourwowCode: {
          _count: {
            gt: 1
          }
        }
      }
    });
    
    console.log(`\nDuplicate productTourwowCodes: ${duplicateTourwowCodes.length}`);
    duplicateTourwowCodes.forEach(dup => {
      console.log(`  - ${dup.productTourwowCode} appears ${dup._count.productTourwowCode} times`);
    });
    
    // Check for special characters
    const specialChars = await prisma.productPool.findMany({
      where: {
        OR: [
          { productTourwowCode: { contains: '-' } },
          { productTourwowCode: { contains: '_' } },
          { productTourwowCode: { contains: ' ' } },
          { productTourCode: { contains: '-' } },
          { productTourCode: { contains: '_' } },
          { productTourCode: { contains: ' ' } },
        ]
      },
      select: {
        productTourCode: true,
        productTourwowCode: true,
        productName: true,
      },
      take: 5
    });
    
    console.log(`\nTours with special characters: ${specialChars.length}`);
    specialChars.forEach(tour => {
      console.log(`  - ${tour.productTourwowCode} (${tour.productTourCode})`);
    });
    
    await prisma.$disconnect();
    
  } catch (error) {
    console.error('Error testing navigation:', error);
    await prisma.$disconnect();
  }
}

testNavigation();