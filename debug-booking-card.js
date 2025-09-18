// Debug script to check booking card data flow
// Run this with: node debug-booking-card.js

const mockTourData = {
  "id": "tour-turkey-009",
  "title": "ทัวร์ตุรกี 9 วัน 7 คืน บินตรง",
  "price_from": 39999,
  "departures": [
    {"id":"dep-2025-11-12","date_range":"12–20 พ.ย. 2568","price":39999,"seats_left":12,"status":"available"},
    {"id":"dep-2025-12-10","date_range":"10–18 ธ.ค. 2568","price":41999,"seats_left":3,"status":"low"},
    {"id":"dep-2026-01-15","date_range":"15–23 ม.ค. 2569","price":38999,"seats_left":0,"status":"soldout"}
  ]
}

console.log('🔍 Tour Data Debug:')
console.log('==================')

console.log('\n📅 Tour Info:')
console.log(`Tour ID: ${mockTourData.id}`)
console.log(`Title: ${mockTourData.title}`)
console.log(`Base Price: ${mockTourData.price_from?.toLocaleString()}`)

console.log('\n🚀 Departures Data:')
console.log(`Total departures: ${mockTourData.departures?.length || 0}`)

if (mockTourData.departures?.length > 0) {
  console.log('\n📋 Departure Details:')
  mockTourData.departures.forEach((dep, index) => {
    console.log(`\n${index + 1}. ${dep.id}`)
    console.log(`   📅 Date Range: "${dep.date_range}"`)
    console.log(`   💰 Price: ${dep.price?.toLocaleString()}`)
    console.log(`   🎫 Seats Left: ${dep.seats_left}`)
    console.log(`   ✅ Status: ${dep.status}`)
  })
  
  // Simulate selectedDeparture initialization 
  const selectedDeparture = mockTourData.departures[0]
  console.log('\n🎯 Selected Departure (First One):')
  console.log(`   📅 Date Range: "${selectedDeparture?.date_range || 'MISSING'}"`)
  console.log(`   💰 Price: ${selectedDeparture?.price?.toLocaleString() || 'MISSING'}`)
  console.log(`   🎫 Seats Left: ${selectedDeparture?.seats_left || 'MISSING'}`)
  
  // Simulate StickyBookingBar props
  console.log('\n📱 StickyBookingBar Props:')
  console.log(`tour.price_from: ${mockTourData.price_from?.toLocaleString()}`)
  console.log(`selectedDeparture.date_range: "${selectedDeparture?.date_range || 'ERROR: EMPTY'}"`)
  console.log(`selectedDeparture.price: ${selectedDeparture?.price?.toLocaleString() || 'ERROR: EMPTY'}`)
  
  // Check potential issues
  console.log('\n⚠️  Potential Issues Check:')
  console.log(`❌ Empty date_range? ${!selectedDeparture?.date_range ? 'YES - PROBLEM!' : 'No'}`)
  console.log(`❌ Missing price? ${!selectedDeparture?.price ? 'YES - PROBLEM!' : 'No'}`)
  console.log(`❌ Undefined departure? ${!selectedDeparture ? 'YES - PROBLEM!' : 'No'}`)
  
} else {
  console.log('❌ No departures found!')
}

// Test calculation issues
const flashSalePrice = mockTourData.departures?.[0]?.price * 1.15
console.log(`\n💸 Flash Sale Price Calculation:`)
console.log(`Original: ${mockTourData.departures?.[0]?.price?.toLocaleString()}`)
console.log(`+15%: ${Math.round(flashSalePrice)?.toLocaleString()}`)
console.log(`Formatted: ฿${Math.round(flashSalePrice)?.toLocaleString()}`)