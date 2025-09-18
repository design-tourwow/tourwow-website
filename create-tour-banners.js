// Script to create tour banner images with real destination photos
const fs = require('fs')
const path = require('path')

// Create banners directory if it doesn't exist
const bannersDir = path.join(__dirname, 'public', 'tour-banners')
if (!fs.existsSync(bannersDir)) {
  fs.mkdirSync(bannersDir, { recursive: true })
}

// Tour banner data with Unsplash image URLs for real destination photos
const tourBanners = [
  {
    filename: 'japan-tokyo-kyoto.jpg',
    country: 'Japan',
    city: 'Tokyo & Kyoto',
    unsplashId: 'MJPr6nOdppw', // Tokyo skyline with Mount Fuji
    description: 'Tokyo skyline with traditional temples'
  },
  {
    filename: 'japan-tokyo-disney.jpg', 
    country: 'Japan',
    city: 'Tokyo Disneyland',
    unsplashId: 'TLZhfRCM59Q', // Tokyo Disneyland castle
    description: 'Tokyo Disneyland magical castle'
  },
  {
    filename: 'japan-osaka-kyoto-nara.jpg',
    country: 'Japan', 
    city: 'Osaka & Kyoto',
    unsplashId: 'UeAQAzlhdeQ', // Fushimi Inari shrine
    description: 'Traditional Japanese shrine gates'
  },
  {
    filename: 'japan-hokkaido-sapporo.jpg',
    country: 'Japan',
    city: 'Hokkaido',
    unsplashId: 'F_pSgQ8Ed9E', // Hokkaido winter landscape
    description: 'Hokkaido winter snow landscape'
  },
  {
    filename: 'japan-takayama-shirakawa.jpg',
    country: 'Japan',
    city: 'Takayama & Shirakawa-go',
    unsplashId: 'JBkwaYMuhdc', // Shirakawa-go village
    description: 'Traditional Japanese village in mountains'
  },
  {
    filename: 'korea-seoul-busan-jeju.jpg',
    country: 'South Korea',
    city: 'Seoul & Busan',
    unsplashId: 'TUJud0AWAPI', // Seoul skyline
    description: 'Seoul modern cityscape at night'
  },
  {
    filename: 'taiwan-taipei-alishan.jpg',
    country: 'Taiwan',
    city: 'Taipei & Alishan',
    unsplashId: 'b90cXqBYTJA', // Taipei 101
    description: 'Taipei 101 and city skyline'
  },
  {
    filename: 'china-beijing-shanghai.jpg',
    country: 'China',
    city: 'Beijing & Shanghai',
    unsplashId: 'gYdjd93sSHU', // Great Wall of China
    description: 'Great Wall of China scenic view'
  },
  {
    filename: 'europe-france-italy-swiss.jpg',
    country: 'Europe',
    city: 'France, Italy & Switzerland',
    unsplashId: 'JBkwaYMuhdc', // Swiss Alps
    description: 'Swiss Alps mountain landscape'
  },
  {
    filename: 'australia-sydney-melbourne.jpg',
    country: 'Australia', 
    city: 'Sydney & Melbourne',
    unsplashId: 'WPvmBzIdYXs', // Sydney Opera House
    description: 'Sydney Opera House and harbour'
  },
  {
    filename: 'canada-vancouver-calgary.jpg',
    country: 'Canada',
    city: 'Vancouver & Calgary', 
    unsplashId: 'bOqCXbyZn2M', // Canadian Rockies
    description: 'Canadian Rocky Mountains landscape'
  },
  {
    filename: 'newzealand-auckland-queenstown.jpg',
    country: 'New Zealand',
    city: 'Auckland & Queenstown',
    unsplashId: 'jFu2L04tMBc', // New Zealand mountains
    description: 'New Zealand dramatic mountain scenery'
  }
]

// Generate HTML file to download images
let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tour Banner Generator</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 20px;
        }
        .banner-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
            gap: 20px; 
            margin: 20px 0;
        }
        .banner-item { 
            border: 1px solid #ddd; 
            border-radius: 8px; 
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .banner-img { 
            width: 100%; 
            height: 200px; 
            object-fit: cover; 
        }
        .banner-info { 
            padding: 15px; 
        }
        .banner-title { 
            font-size: 18px; 
            font-weight: bold; 
            margin-bottom: 5px;
            color: #333;
        }
        .banner-desc { 
            color: #666; 
            font-size: 14px;
        }
        .download-btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
        .download-btn:hover {
            background: #0056b3;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .instructions {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <h1>🖼️ Tour Banner Image Generator</h1>
    
    <div class="instructions">
        <h3>Instructions:</h3>
        <ol>
            <li>Click "Download" button on each image you want to save</li>
            <li>Save the images to <code>public/tour-banners/</code> folder</li>
            <li>Images are optimized at 400x240 pixels for tour cards</li>
            <li>All images are high-quality destination photos from Unsplash</li>
        </ol>
    </div>

    <div class="banner-grid">
`

tourBanners.forEach(banner => {
    const imageUrl = `https://images.unsplash.com/${banner.unsplashId}?w=400&h=240&fit=crop&crop=center&auto=format&q=80`
    
    htmlContent += `
        <div class="banner-item">
            <img src="${imageUrl}" alt="${banner.description}" class="banner-img" />
            <div class="banner-info">
                <div class="banner-title">${banner.city}</div>
                <div class="banner-desc">${banner.description}</div>
                <button class="download-btn" onclick="downloadImage('${imageUrl}', '${banner.filename}')">
                    📥 Download ${banner.filename}
                </button>
            </div>
        </div>
    `
})

htmlContent += `
    </div>

    <script>
        async function downloadImage(url, filename) {
            try {
                const response = await fetch(url)
                const blob = await response.blob()
                const downloadUrl = window.URL.createObjectURL(blob)
                
                const link = document.createElement('a')
                link.href = downloadUrl
                link.download = filename
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                
                window.URL.revokeObjectURL(downloadUrl)
                console.log('Downloaded:', filename)
            } catch (error) {
                console.error('Download failed:', error)
            }
        }
        
        // Pre-load images for better UX
        window.addEventListener('load', () => {
            console.log('Tour banner generator loaded!')
        })
    </script>
</body>
</html>
`

// Write the HTML file
fs.writeFileSync(path.join(__dirname, 'generate-tour-banners.html'), htmlContent)

console.log('✅ Generated generate-tour-banners.html')
console.log('📂 Open this file in your browser to download tour banner images')
console.log('💾 Save images to public/tour-banners/ folder')

// Also create a JSON file with the mapping
const bannerMapping = tourBanners.map((banner, index) => ({
    id: index,
    filename: banner.filename,
    country: banner.country,
    city: banner.city,
    description: banner.description,
    path: `/tour-banners/${banner.filename}`
}))

fs.writeFileSync(
    path.join(__dirname, 'tour-banner-mapping.json'), 
    JSON.stringify(bannerMapping, null, 2)
)

console.log('✅ Created tour-banner-mapping.json with image paths')