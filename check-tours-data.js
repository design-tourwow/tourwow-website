// Simple Node.js script to check tours-data content
const fs = require('fs');
const path = require('path');

try {
  console.log('🔍 Checking tours-data.ts content...');
  
  const toursDataPath = path.join(__dirname, 'src', 'data', 'tours-data.ts');
  
  if (fs.existsSync(toursDataPath)) {
    const content = fs.readFileSync(toursDataPath, 'utf8');
    
    // Check for Japan-related content
    const japanMatches = content.match(/ญี่ปุ่น|Japan|โตเกียว|Tokyo|japan/gi) || [];
    console.log(`📊 Found ${japanMatches.length} Japan-related matches:`, japanMatches.slice(0, 10));
    
    // Check destinations
    const destinationMatches = content.match(/destination['":]?\s*['"'][^'"]+['"']/gi) || [];
    console.log(`🌏 Found ${destinationMatches.length} destination entries`);
    console.log('First 10 destinations:', destinationMatches.slice(0, 10));
    
    // Check if file exports allTours
    const hasAllTours = content.includes('export') && (content.includes('allTours') || content.includes('tours'));
    console.log(`📦 Has allTours export: ${hasAllTours}`);
    
    // Get file size
    const fileSizeKB = Math.round(fs.statSync(toursDataPath).size / 1024);
    console.log(`📁 File size: ${fileSizeKB} KB`);
    
  } else {
    console.log('❌ tours-data.ts not found');
    console.log('📁 Checking src/data/ directory...');
    
    const dataDir = path.join(__dirname, 'src', 'data');
    if (fs.existsSync(dataDir)) {
      const files = fs.readdirSync(dataDir);
      console.log('Files in src/data/:', files);
    } else {
      console.log('❌ src/data/ directory not found');
    }
  }
} catch (error) {
  console.error('❌ Error:', error.message);
}