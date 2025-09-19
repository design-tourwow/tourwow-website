const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dpnrzkhz8',
  api_key: '167852792777538',
  api_secret: 'Vmj5Lxj36LkkG3_5b_Lntiq6U4U'
});

// Function to upload files recursively
async function uploadDirectory(dirPath, baseFolder = '') {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip .DS_Store and hidden directories
      if (file.startsWith('.')) continue;

      // Recursively upload subdirectory
      await uploadDirectory(filePath, path.join(baseFolder, file));
    } else {
      // Skip .DS_Store and hidden files
      if (file.startsWith('.')) continue;

      // Check if it's an image or video
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov', '.avi'].includes(ext)) {
        try {
          const publicId = path.join(baseFolder, path.parse(file).name).replace(/\\/g, '/');
          console.log(`Uploading: ${filePath} -> ${publicId}`);

          let resourceType = 'image';
          if (['.mp4', '.mov', '.avi'].includes(ext)) {
            resourceType = 'video';
          }

          const result = await cloudinary.uploader.upload(filePath, {
            public_id: publicId,
            resource_type: resourceType,
            folder: 'tourwow',
            chunk_size: 6000000, // 6MB chunks for large files
            timeout: 120000 // 2 minute timeout
          });

          console.log(`✅ Uploaded: ${result.public_id} -> ${result.secure_url}`);
        } catch (error) {
          console.error(`❌ Failed to upload ${filePath}:`, error.message);
        }
      }
    }
  }
}

// Start upload
async function main() {
  try {
    console.log('🚀 Starting upload to Cloudinary...');
    await uploadDirectory('./public/images');
    console.log('✅ All files uploaded successfully!');
  } catch (error) {
    console.error('❌ Upload failed:', error);
  }
}

main();