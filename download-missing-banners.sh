#!/bin/bash

echo "📥 Downloading missing tour banner images..."

cd /Users/gap/tourwow-website/public/tour-banners

# Taiwan - Taipei 101
curl -L "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=240&fit=crop&crop=center&auto=format&q=80" -o "taiwan-taipei-alishan.jpg"

# Canada - Canadian Rockies 
curl -L "https://images.unsplash.com/photo-1503614472-8c93d56cd51c?w=400&h=240&fit=crop&crop=center&auto=format&q=80" -o "canada-vancouver-calgary.jpg"

# New Zealand - Lake with mountains
curl -L "https://images.unsplash.com/photo-1469521669194-babb32047d6d?w=400&h=240&fit=crop&crop=center&auto=format&q=80" -o "newzealand-auckland-queenstown.jpg"

echo "✅ Missing images downloaded!"
ls -la