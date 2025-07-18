#!/bin/bash

echo "🔄 กำลังรีสตาร์ทเซิร์ฟเวอร์..."

# Kill all Next.js processes
pkill -f "next dev" 2>/dev/null || true
pkill -f "node.*3000" 2>/dev/null || true

# Kill port 3000 specifically
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

echo "⏳ รอ 3 วินาทีเพื่อให้พอร์ตปิดสมบูรณ์..."
sleep 3

echo "🚀 เริ่มต้นเซิร์ฟเวอร์ใหม่ที่ port 3000..."
npm run dev