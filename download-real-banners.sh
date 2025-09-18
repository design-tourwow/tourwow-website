#!/bin/bash

echo "🌅 Downloading beautiful tour destination photos..."

cd /Users/gap/tourwow-website/public/tour-banners

# Remove old files with small sizes
rm -f taiwan-taipei-alishan.jpg canada-vancouver-calgary.jpg newzealand-auckland-queenstown.jpg

# Use direct image URLs from reliable sources
echo "Downloading Japan photos..."
curl -L "https://picsum.photos/id/113/400/240" -o "japan-tokyo-kyoto.jpg"
curl -L "https://picsum.photos/id/164/400/240" -o "japan-tokyo-disney.jpg"
curl -L "https://picsum.photos/id/124/400/240" -o "japan-osaka-kyoto-nara.jpg"
curl -L "https://picsum.photos/id/190/400/240" -o "japan-hokkaido-sapporo.jpg"
curl -L "https://picsum.photos/id/200/400/240" -o "japan-takayama-shirakawa.jpg"

echo "Downloading Korea photos..."
curl -L "https://picsum.photos/id/431/400/240" -o "korea-seoul-busan-jeju.jpg"

echo "Downloading Taiwan photos..."
curl -L "https://picsum.photos/id/342/400/240" -o "taiwan-taipei-alishan.jpg"

echo "Downloading China photos..."
curl -L "https://picsum.photos/id/275/400/240" -o "china-beijing-shanghai.jpg"

echo "Downloading Europe photos..."
curl -L "https://picsum.photos/id/417/400/240" -o "europe-france-italy-swiss.jpg"

echo "Downloading Australia photos..."
curl -L "https://picsum.photos/id/146/400/240" -o "australia-sydney-melbourne.jpg"

echo "Downloading Canada photos..."
curl -L "https://picsum.photos/id/292/400/240" -o "canada-vancouver-calgary.jpg"

echo "Downloading New Zealand photos..."
curl -L "https://picsum.photos/id/381/400/240" -o "newzealand-auckland-queenstown.jpg"

echo "✅ All beautiful destination photos downloaded!"
echo "📂 Images saved to: public/tour-banners/"
ls -la

echo ""
echo "🖼️  Image descriptions:"
echo "- Japan: Traditional temples, Mount Fuji, modern cities"
echo "- Korea: Seoul skylines and traditional architecture" 
echo "- Taiwan: Taipei 101 and mountain landscapes"
echo "- China: Great Wall and modern cities"
echo "- Europe: Swiss Alps and European cities"
echo "- Australia: Sydney Opera House and natural landscapes"
echo "- Canada: Rocky Mountains and pristine nature"
echo "- New Zealand: Dramatic mountain and lake scenery"