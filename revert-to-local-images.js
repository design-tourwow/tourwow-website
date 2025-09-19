const fs = require('fs');
const path = require('path');

// Function to revert Google Drive URLs back to local paths
function revertImagePaths(content) {
  let updatedContent = content;

  // Pattern to match Google Drive URLs and replace with local paths
  const driveUrlPattern = /https:\/\/drive\.google\.com\/uc\?export=view&id=[^"']*/g;

  // Find all Google Drive URLs and map them back to local paths
  const driveUrls = content.match(driveUrlPattern) || [];

  driveUrls.forEach(driveUrl => {
    // Extract the filename from the Google Drive mapping
    let localPath = '';

    // Map specific IDs back to filenames
    if (driveUrl.includes('1-TFLWocxCtlm7-LpwADeEloMmB1FrmJh')) localPath = '/images/countries/cambodia.jpg';
    else if (driveUrl.includes('10RHGEa-j8pRtVktmTdh4APsSHUguw9r0')) localPath = '/images/countries/hongkong.jpg';
    else if (driveUrl.includes('16O2Km4Pi75rH_POPfu2PNYnBaVzd0AWP')) localPath = '/images/countries/indonesia.jpg';
    else if (driveUrl.includes('1ApwnglWYNuUqJ3twBKR3A3Yt0BdpnVQD')) localPath = '/images/countries/japan-1-1.jpg';
    else if (driveUrl.includes('1B5k-tXgBL8mrvIVqv_nK9e9goluppT4e')) localPath = '/images/countries/japan-1-2.jpg';
    else if (driveUrl.includes('1EJG6tH0nwDi8eO7NfJe4EXqcenqRZcvo')) localPath = '/images/countries/japan-1-3.jpg';
    else if (driveUrl.includes('1F53hVDMOXhdKuwtkJBQ1ovgRNBOwchcE')) localPath = '/images/countries/japan-1-4.jpg';
    else if (driveUrl.includes('1FAWWv71hU8V3VJdz1ap-QVyM4GEWFQ5I')) localPath = '/images/countries/japan-1.jpg';
    else if (driveUrl.includes('1HAl4iXIeimYtUgs2_LtNoiqpHfc3bQgM')) localPath = '/images/countries/japan-2.jpg';
    else if (driveUrl.includes('1HiIpWCDN2K--GluZ03KxgaWkl-dccCRa')) localPath = '/images/countries/japan-3.jpg';
    else if (driveUrl.includes('1JBTIXjitgqFQAaUUOC_-MBb-LaMg4s_m')) localPath = '/images/countries/japan-4.jpg';
    else if (driveUrl.includes('1Ld7aEqZapdQ_StuEXdcrIA8LIaSYJ-TU')) localPath = '/images/countries/japan-5.jpg';
    else if (driveUrl.includes('1NMpomdMAJ8O51JJa8jtGENm1E2ztl2_e')) localPath = '/images/countries/japan-6.mov';
    else if (driveUrl.includes('1QpU2DG1JAXhfOIweqQIsf1Q3Lzk60NEg')) localPath = '/images/countries/kazakhstan-1.mp4';
    else if (driveUrl.includes('1SFl0gVtJzVH6q2SDYiWcjqJxiDxKGwKT')) localPath = '/images/countries/kazakhstan-2.jpg';
    else if (driveUrl.includes('1To17zzf_ajk9muY0x21JnQ3PuOxKqNSq')) localPath = '/images/countries/kazakhstan-3.jpg';
    else if (driveUrl.includes('1XPYw3GyGdULosxDyuMSWSlnow8E14W0A')) localPath = '/images/countries/kazakhstan-4.jpg';
    else if (driveUrl.includes('1YiK6Fn7QogiVd3Ovc4het_fYuiESBrgZ')) localPath = '/images/countries/laos.jpg';
    else if (driveUrl.includes('1ZRJGB2RHUpwsyNHRmnx3PVt_-pjaGh3t')) localPath = '/images/countries/malaysia.jpg';
    else if (driveUrl.includes('1a7QT_A3-szWqgEAeoZyXLceyQrSDlnJK')) localPath = '/images/countries/philippines.jpg';
    else if (driveUrl.includes('1e7Y9lNqkgEqCyb7C0rag9wdpF5p4HIQd')) localPath = '/images/countries/singapore.jpg';
    else if (driveUrl.includes('1e9A-BYHMOHcxt4BybLItv0Bi1zPwnjpH')) localPath = '/images/countries/south-korea.jpg';
    else if (driveUrl.includes('1qGG5deDkAkDGD9zxvYMaLouuM6pRQytQ')) localPath = '/images/countries/taiwan.jpg';
    else if (driveUrl.includes('1s7tJR4mk5J7zV-7tMuLfYbdT2j7OJy3q')) localPath = '/images/countries/vietnam.jpg';

    if (localPath) {
      updatedContent = updatedContent.replace(driveUrl, localPath);
    }
  });

  return updatedContent;
}

// Function to process a single file
function processFile(filePath) {
  try {
    console.log(`Processing: ${filePath}`);

    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = revertImagePaths(content);

    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Reverted: ${filePath}`);
    } else {
      console.log(`⚪ No changes: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Files to revert
const filesToRevert = [
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
console.log('🔄 Reverting to local image paths...');

filesToRevert.forEach(file => {
  if (fs.existsSync(file)) {
    processFile(file);
  } else {
    console.log(`⚠️ File not found: ${file}`);
  }
});

console.log('✅ Revert to local images completed!');