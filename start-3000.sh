#!/bin/bash

echo "🔥 กำลังแก้ปัญหา localhost:3000..."

# Kill all processes
pkill -f "next\|node" 2>/dev/null || true
sleep 2

echo "📱 ตรวจสอบระบบ..."
echo "- localhost: $(ping -c 1 localhost | grep 'bytes from')"
echo "- port 3000: $(lsof -i :3000 2>/dev/null || echo 'ว่าง')"

echo "🚀 เริ่มต้น Next.js..."
echo "พอร์ตที่จะใช้: 3000"
echo "URL ที่ควรใช้งานได้:"
echo "  - http://localhost:3000"
echo "  - http://127.0.0.1:3000"
echo "  - http://192.168.1.109:3000"

# Start with explicit localhost binding
exec npx next dev --port 3000 --hostname localhost