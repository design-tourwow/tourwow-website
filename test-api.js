const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing API endpoint...');
    
    // Test page 1
    const response1 = await fetch('http://localhost:4000/api/product-pool?page=1&limit=20');
    const data1 = await response1.json();
    
    console.log('Page 1 Results:');
    console.log('- Status:', response1.status);
    console.log('- Total unique tours available:', data1.total);
    console.log('- Page:', data1.page);
    console.log('- Limit:', data1.limit);
    console.log('- Total pages:', data1.totalPages);
    console.log('- Raw data rows returned:', data1.data.length);
    
    // Group to see unique tours
    const uniqueTours = new Map();
    data1.data.forEach(tour => {
      const key = tour.productTourwowCode;
      if (!uniqueTours.has(key)) {
        uniqueTours.set(key, []);
      }
      uniqueTours.get(key).push(tour);
    });
    
    console.log('- Unique tours after grouping:', uniqueTours.size);
    console.log('- Sample tour codes:', Array.from(uniqueTours.keys()).slice(0, 5));
    
    // Test if we can get next page
    if (data1.totalPages > 1) {
      console.log('\nTesting page 2...');
      const response2 = await fetch('http://localhost:4000/api/product-pool?page=2&limit=20');
      const data2 = await response2.json();
      console.log('- Page 2 raw data rows:', data2.data.length);
      
      const uniqueTours2 = new Map();
      data2.data.forEach(tour => {
        const key = tour.productTourwowCode;
        if (!uniqueTours2.has(key)) {
          uniqueTours2.set(key, []);
        }
        uniqueTours2.get(key).push(tour);
      });
      console.log('- Page 2 unique tours:', uniqueTours2.size);
    }
    
  } catch (error) {
    console.error('Error testing API:', error.message);
  }
}

testAPI();