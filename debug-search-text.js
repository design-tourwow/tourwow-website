// Debug search_text generation in Node.js environment
console.log('🔍 Testing search_text generation...');

// Simulate tour data structure from tours-data.ts
const sampleTour = {
  id: 1,
  title: "ญี่ปุ่น 7 วัน 6 คืน โตเกียว-เกียวโต-โอซาก้า",
  price: 45900,
  originalPrice: 52900,
  duration: "7 วัน 6 คืน",
  rating: 4.8,
  reviews: 127,
  highlights: ["วัดคิโยมิซุ", "ภูเขาฟูจิ", "ชินจูกุ", "ดาเตะบาชิ"],
  destinations: ["โตเกียว", "เกียวโต", "โอซาก้า"],
  discount: 13,
  groupSize: "2-15 คน",
  departureDate: "มี.ค. - พ.ค. 67"
};

// Country mapping (from data-etl.ts)
const COUNTRY_REGIONS = {
  'ญี่ปุ่น': { region: 'East Asia', country_code: 'JP' },
  'เกาหลีใต้': { region: 'East Asia', country_code: 'KR' },
  'จีน': { region: 'East Asia', country_code: 'CN' }
};

// Simulate extractMainDestination
function extractMainDestination(tour) {
  // First check if destination field exists
  if (tour.destination) {
    return tour.destination;
  }
  
  // Extract from title - look for known countries
  const titleLower = tour.title.toLowerCase();
  for (const country of Object.keys(COUNTRY_REGIONS)) {
    if (titleLower.includes(country.toLowerCase())) {
      return country;
    }
  }
  
  // Fallback to first destination in destinations array
  if (tour.destinations && tour.destinations.length > 0) {
    return tour.destinations[0];
  }
  
  return 'ไทย'; // Default fallback
}

// Simulate generateSearchKeywords
function generateSearchKeywords(tour) {
  const keywords = new Set();
  
  // Extract from title
  if (tour.title && typeof tour.title === 'string') {
    tour.title.split(' ').forEach(word => {
      if (word.length > 2) keywords.add(word.toLowerCase());
    });
  }
  
  // Add destination (extract main destination)
  const mainDestination = extractMainDestination(tour);
  keywords.add(mainDestination.toLowerCase());
  
  // Add highlights
  if (tour.highlights && Array.isArray(tour.highlights)) {
    tour.highlights.forEach(highlight => {
      if (highlight && typeof highlight === 'string') {
        highlight.split(' ').forEach(word => {
          if (word.length > 2) keywords.add(word.toLowerCase());
        });
      }
    });
  }
  
  // Add destinations array if available
  if (tour.destinations && Array.isArray(tour.destinations)) {
    tour.destinations.forEach(dest => {
      if (dest) {
        keywords.add(dest.toLowerCase());
      }
    });
  }
  
  return Array.from(keywords);
}

// Test the functions
console.log('🧪 Testing with sample tour...');

const mainDestination = extractMainDestination(sampleTour);
console.log(`🌏 Main destination: "${mainDestination}"`);

const searchKeywords = generateSearchKeywords(sampleTour);
console.log(`🔑 Search keywords:`, searchKeywords.slice(0, 10));

const searchText = `${sampleTour.title} ${mainDestination} ${sampleTour.highlights.join(' ')} ${searchKeywords.join(' ')}`.toLowerCase();
console.log(`📝 Search text: "${searchText.substring(0, 200)}..."`);

// Test search queries with updated logic
const testQueries = ['ญี่ปุ่น', 'ทัวร์ญี่ปุ่น', 'โตเกียว', 'japan'];

console.log('\n🔍 Testing search matches with updated logic...');
testQueries.forEach(query => {
  const queryLower = query.toLowerCase();
  
  // Handle "ทัวร์" prefix like in updated search logic
  let searchQuery = queryLower;
  if (queryLower.startsWith('ทัวร์')) {
    searchQuery = queryLower.replace('ทัวร์', '').trim();
  }
  
  const matches = [
    searchText.includes(queryLower) || searchText.includes(searchQuery),
    sampleTour.title.toLowerCase().includes(queryLower) || sampleTour.title.toLowerCase().includes(searchQuery),
    mainDestination.toLowerCase().includes(queryLower) || mainDestination.toLowerCase().includes(searchQuery)
  ];
  
  const matchResult = matches.some(m => m);
  console.log(`  "${query}": ${matchResult ? '✅' : '❌'} [searchText: ${matches[0]}, title: ${matches[1]}, destination: ${matches[2]}]`);
  if (queryLower !== searchQuery) {
    console.log(`    → Processed query: "${searchQuery}"`);
  }
});