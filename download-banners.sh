#!/bin/bash

# Download tour banner images from Unsplash
echo "📥 Downloading tour banner images..."

cd /Users/gap/tourwow-website/public/tour-banners

# Japan - Tokyo & Kyoto (Mount Fuji skyline)
curl -L "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=240&fit=crop&crop=center&auto=format&q=80" -o "japan-tokyo-kyoto.jpg"

# Japan - Tokyo Disney (Castle)
curl -L "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop&crop=center&auto=format&q=80" -o "japan-tokyo-disney.jpg"

# Japan - Osaka & Kyoto (Fushimi Inari)
curl -L "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&h=240&fit=crop&crop=center&auto=format&q=80" -o "japan-osaka-kyoto-nara.jpg"

# Japan - Hokkaido (Winter landscape)
curl -L "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop&crop=center&auto=format&q=80" -o "japan-hokkaido-sapporo.jpg"

# Japan - Takayama & Shirakawa-go (Traditional village)
curl -L "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=240&fit=crop&crop=center&auto=format&q=80" -o "japan-takayama-shirakawa.jpg"

# Korea - Seoul & Busan (Seoul skyline)
curl -L "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=240&fit=crop&crop=center&auto=format&q=80" -o "korea-seoul-busan-jeju.jpg"

# Taiwan - Taipei & Alishan (Taipei 101)
curl -L "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=240&fit=crop&crop=center&auto=format&q=80" -o "taiwan-taipei-alishan.jpg"

# China - Beijing & Shanghai (Great Wall)
curl -L "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=240&fit=crop&crop=center&auto=format&q=80" -o "china-beijing-shanghai.jpg"

# Europe - France, Italy & Switzerland (Swiss Alps)
curl -L "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop&crop=center&auto=format&q=80" -o "europe-france-italy-swiss.jpg"

# Australia - Sydney & Melbourne (Sydney Opera House)
curl -L "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=240&fit=crop&crop=center&auto=format&q=80" -o "australia-sydney-melbourne.jpg"

# Canada - Vancouver & Calgary (Canadian Rockies)
curl -L "https://images.unsplash.com/photo-1503614472-8c93d56cd51c?w=400&h=240&fit=crop&crop=center&auto=format&q=80" -o "canada-vancouver-calgary.jpg"

# New Zealand - Auckland & Queenstown (Mountains)
curl -L "https://images.unsplash.com/photo-1469521669194-babb32047d6d?w=400&h=240&fit=crop&crop=center&auto=format&q=80" -o "newzealand-auckland-queenstown.jpg"

echo "✅ All tour banner images downloaded!"
echo "📂 Images saved to: public/tour-banners/"
ls -la