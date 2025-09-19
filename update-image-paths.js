const fs = require('fs');
const path = require('path');

// Google Drive mapping
const GOOGLE_DRIVE_IMAGES = {
  'cambodia.jpg': '1-TFLWocxCtlm7-LpwADeEloMmB1FrmJh',
  'hongkong.jpg': '10RHGEa-j8pRtVktmTdh4APsSHUguw9r0',
  'indonesia.jpg': '16O2Km4Pi75rH_POPfu2PNYnBaVzd0AWP',
  'japan-1-1.jpg': '1ApwnglWYNuUqJ3twBKR3A3Yt0BdpnVQD',
  'japan-1-2.jpg': '1B5k-tXgBL8mrvIVqv_nK9e9goluppT4e',
  'japan-1-3.jpg': '1EJG6tH0nwDi8eO7NfJe4EXqcenqRZcvo',
  'japan-1-4.jpg': '1F53hVDMOXhdKuwtkJBQ1ovgRNBOwchcE',
  'japan-1.jpg': '1FAWWv71hU8V3VJdz1ap-QVyM4GEWFQ5I',
  'japan-2.jpg': '1HAl4iXIeimYtUgs2_LtNoiqpHfc3bQgM',
  'japan-3.jpg': '1HiIpWCDN2K--GluZ03KxgaWkl-dccCRa',
  'japan-4.jpg': '1JBTIXjitgqFQAaUUOC_-MBb-LaMg4s_m',
  'japan-5.jpg': '1Ld7aEqZapdQ_StuEXdcrIA8LIaSYJ-TU',
  'japan-6.mov': '1NMpomdMAJ8O51JJa8jtGENm1E2ztl2_e',
  'kazakhstan-1.mp4': '1QpU2DG1JAXhfOIweqQIsf1Q3Lzk60NEg',
  'kazakhstan-2.jpg': '1SFl0gVtJzVH6q2SDYiWcjqJxiDxKGwKT',
  'kazakhstan-3.jpg': '1To17zzf_ajk9muY0x21JnQ3PuOxKqNSq',
  'kazakhstan-4.jpg': '1XPYw3GyGdULosxDyuMSWSlnow8E14W0A',
  'laos.jpg': '1YiK6Fn7QogiVd3Ovc4het_fYuiESBrgZ',
  'malaysia.jpg': '1ZRJGB2RHUpwsyNHRmnx3PVt_-pjaGh3t',
  'philippines.jpg': '1a7QT_A3-szWqgEAeoZyXLceyQrSDlnJK',
  'singapore.jpg': '1e7Y9lNqkgEqCyb7C0rag9wdpF5p4HIQd',
  'south-korea.jpg': '1e9A-BYHMOHcxt4BybLItv0Bi1zPwnjpH',
  'taiwan.jpg': '1qGG5deDkAkDGD9zxvYMaLouuM6pRQytQ',
  'vietnam.jpg': '1s7tJR4mk5J7zV-7tMuLfYbdT2j7OJy3q'
};

// Function to replace image paths in file content
function updateImagePaths(content) {
  let updatedContent = content;

  // Replace each image path
  Object.keys(GOOGLE_DRIVE_IMAGES).forEach(filename => {
    const fileId = GOOGLE_DRIVE_IMAGES[filename];
    const driveUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

    // Replace various patterns
    const patterns = [
      new RegExp(`"/images/countries/${filename}"`, 'g'),
      new RegExp(`'/images/countries/${filename}'`, 'g'),
      new RegExp(`"/images/countries/${filename}`, 'g'),  // without closing quote
      new RegExp(`'/images/countries/${filename}`, 'g'),  // without closing quote
      new RegExp(`src="/images/countries/${filename}"`, 'g'),
      new RegExp(`src='/images/countries/${filename}'`, 'g')
    ];

    patterns.forEach(pattern => {
      if (pattern.source.includes('src=')) {
        updatedContent = updatedContent.replace(pattern, `src="${driveUrl}"`);
      } else {
        updatedContent = updatedContent.replace(pattern, `"${driveUrl}"`);
      }
    });
  });

  return updatedContent;
}

// Function to process a single file
function processFile(filePath) {
  try {
    console.log(`Processing: ${filePath}`);

    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = updateImagePaths(content);

    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
    } else {
      console.log(`⚪ No changes: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Files to update
const filesToUpdate = [
  './src/app/tour-search-56/page.tsx',
  './src/app/tour-search-57/page.tsx',
  './src/app/tour-search-58/page.tsx',
  './src/app/tour-search-54/page.tsx',
  './src/app/tour-search-55/page.tsx',
  './src/app/tour-search-58/page-backup.tsx',
  './src/app/tour-search-57/page-backup.tsx',
  './src/app/src/app/tour-search-54/page.tsx',
  './src/app/src/app/tour-search-54/TourCarousel.tsx'
];

// Process all files
console.log('🚀 Starting image path updates...');

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    processFile(file);
  } else {
    console.log(`⚠️ File not found: ${file}`);
  }
});

console.log('✅ Image path updates completed!');