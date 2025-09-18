// Node.js script to create placeholder banner images
const fs = require('fs');
const path = require('path');

// Create a simple SVG banner
function createBannerSVG(title, country, colors) {
  const [color1, color2] = colors;
  return `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#grad)" />
    <text x="200" y="150" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="white" text-shadow="2px 2px 4px rgba(0,0,0,0.5)">${title}</text>
    <text x="200" y="180" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="white" opacity="0.9">${country}</text>
  </svg>`;
}

// Banner configurations
const banners = [
  { filename: 'japan-tokyo-kyoto-osaka', title: 'โตเกียว-เกียวโต-โอซาก้า', country: 'ญี่ปุ่น', colors: ['#E53E3E', '#FF6B6B'] },
  { filename: 'japan-osaka-kyoto-nara', title: 'โอซาก้า-เกียวโต-นารา', country: 'ญี่ปุ่น', colors: ['#E53E3E', '#FF6B6B'] },
  { filename: 'japan-hokkaido-sapporo', title: 'ฮอกไกโด ซัปโปโร', country: 'ญี่ปุ่น', colors: ['#E53E3E', '#FF6B6B'] },
  { filename: 'japan-takayama-shirakawa', title: 'ทาคายาม่า-ชิราคาวาโกะ', country: 'ญี่ปุ่น', colors: ['#E53E3E', '#FF6B6B'] },
  { filename: 'japan-tokyo-disney', title: 'โตเกียวดิสนีย์แลนด์', country: 'ญี่ปุ่น', colors: ['#E53E3E', '#FF6B6B'] },
  { filename: 'korea-seoul-busan-jeju', title: 'โซล-ปูซาน-เชจู', country: 'เกาหลีใต้', colors: ['#3182CE', '#4299E1'] },
  { filename: 'china-beijing-shanghai', title: 'ปักกิ่ง-เซี่ยงไฮ้', country: 'จีน', colors: ['#D69E2E', '#F6E05E'] },
  { filename: 'taiwan-taipei-alishan', title: 'ไทเป-อาลีซาน', country: 'ไต้หวัน', colors: ['#38A169', '#68D391'] },
  { filename: 'europe-france-italy-swiss', title: 'ฝรั่งเศส-อิตาลี-สวิส', country: 'ยุโรป', colors: ['#805AD5', '#B794F6'] },
  { filename: 'australia-sydney-melbourne', title: 'ซิดนีย์-เมลเบิร์น', country: 'ออสเตรเลีย', colors: ['#D53F8C', '#F687B3'] },
  { filename: 'newzealand-auckland-queenstown', title: 'ออกแลนด์-ควีนส์ทาวน์', country: 'นิวซีแลนด์', colors: ['#319795', '#81E6D9'] },
  { filename: 'canada-vancouver-calgary', title: 'แวนคูเวอร์-แคลกะรี', country: 'แคนาดา', colors: ['#E53E3E', '#FF6B6B'] }
];

// Create banners directory if it doesn't exist
const bannersDir = path.join(__dirname, 'public', 'banners');
if (!fs.existsSync(bannersDir)) {
  fs.mkdirSync(bannersDir, { recursive: true });
}

// Create SVG files
banners.forEach(banner => {
  const svgContent = createBannerSVG(banner.title, banner.country, banner.colors);
  const filePath = path.join(bannersDir, `${banner.filename}.svg`);
  fs.writeFileSync(filePath, svgContent);
  console.log(`Created: ${banner.filename}.svg`);
});

console.log(`\nCreated ${banners.length} banner files in ${bannersDir}`);
console.log('\nTo convert SVG to PNG, you can use online converters or tools like:');
console.log('- https://www.aconvert.com/image/svg-to-png/');
console.log('- ImageMagick: convert banner.svg banner.png');
console.log('- Or use the HTML generator at generate-banners.html');