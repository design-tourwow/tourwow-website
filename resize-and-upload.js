const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dpnrzkhz8',
  api_key: '167852792777538',
  api_secret: 'Vmj5Lxj36LkkG3_5b_Lntiq6U4U'
});

// Function to resize image if needed
async function resizeImage(inputPath, outputPath, maxSizeBytes = 9 * 1024 * 1024) { // 9MB limit
  try {
    const stat = fs.statSync(inputPath);

    if (stat.size <= maxSizeBytes) {
      // File is already small enough, just copy
      fs.copyFileSync(inputPath, outputPath);
      return;
    }

    console.log(`📏 Resizing ${inputPath} (${(stat.size / 1024 / 1024).toFixed(1)}MB)`);

    // Start with 85% quality and adjust if needed
    let quality = 85;
    let resized;

    do {
      resized = await sharp(inputPath)
        .jpeg({ quality, progressive: true })
        .toBuffer();

      if (resized.length <= maxSizeBytes) {
        break;
      }

      quality -= 10;
    } while (quality >= 30);

    // If still too large, resize dimensions
    if (resized.length > maxSizeBytes) {
      console.log(`🔽 Reducing dimensions for ${inputPath}`);

      const metadata = await sharp(inputPath).metadata();
      let scale = Math.sqrt(maxSizeBytes / resized.length) * 0.8; // Be conservative

      resized = await sharp(inputPath)
        .resize({
          width: Math.round(metadata.width * scale),
          height: Math.round(metadata.height * scale),
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 80, progressive: true })
        .toBuffer();
    }

    fs.writeFileSync(outputPath, resized);
    console.log(`✅ Resized to ${(resized.length / 1024 / 1024).toFixed(1)}MB`);

  } catch (error) {
    console.error(`❌ Failed to resize ${inputPath}:`, error.message);
    // If resize fails, copy original
    fs.copyFileSync(inputPath, outputPath);
  }
}

// Function to upload files recursively
async function uploadDirectory(dirPath, baseFolder = '') {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file.startsWith('.')) continue;
      await uploadDirectory(filePath, path.join(baseFolder, file));
    } else {
      if (file.startsWith('.')) continue;

      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov', '.avi'].includes(ext)) {
        try {
          const publicId = path.join(baseFolder, path.parse(file).name).replace(/\\/g, '/');

          let resourceType = 'image';
          let uploadPath = filePath;

          // Handle images - resize if needed
          if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
            const tempPath = filePath + '.temp' + ext;
            await resizeImage(filePath, tempPath);
            uploadPath = tempPath;
          } else if (['.mp4', '.mov', '.avi'].includes(ext)) {
            resourceType = 'video';
            // Check video size
            const videoStat = fs.statSync(filePath);
            if (videoStat.size > 40 * 1024 * 1024) { // 40MB limit for videos
              console.log(`⚠️ Video ${filePath} is ${(videoStat.size / 1024 / 1024).toFixed(1)}MB - may fail to upload`);
            }
          }

          console.log(`📤 Uploading: ${filePath} -> ${publicId}`);

          const result = await cloudinary.uploader.upload(uploadPath, {
            public_id: publicId,
            resource_type: resourceType,
            folder: 'tourwow',
            chunk_size: 6000000,
            timeout: 120000
          });

          console.log(`✅ Uploaded: ${result.public_id} -> ${result.secure_url}`);

          // Clean up temp file
          if (uploadPath !== filePath && fs.existsSync(uploadPath)) {
            fs.unlinkSync(uploadPath);
          }

        } catch (error) {
          console.error(`❌ Failed to upload ${filePath}:`, error.message);

          // Clean up temp file on error
          const tempPath = filePath + '.temp' + ext;
          if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
          }
        }
      }
    }
  }
}

// Start upload
async function main() {
  try {
    console.log('🚀 Starting resize and upload to Cloudinary...');
    await uploadDirectory('./public/images');
    console.log('✅ All files processed successfully!');
  } catch (error) {
    console.error('❌ Process failed:', error);
  }
}

main();