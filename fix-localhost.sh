#!/bin/bash

echo "🔧 กำลังแก้ไขปัญหา localhost:3000..."

# Kill all processes
echo "1️⃣ ปิดโปรเซสทั้งหมด..."
killall -9 node 2>/dev/null || true
killall -9 python3 2>/dev/null || true
pkill -9 -f "next\|python" 2>/dev/null || true

# Wait for processes to die
echo "⏳ รอ 5 วินาที..."
sleep 5

# Check if ports are free
echo "2️⃣ ตรวจสอบพอร์ต..."
if lsof -i:3000 >/dev/null 2>&1; then
    echo "❌ พอร์ต 3000 ยังถูกใช้งาน"
    lsof -i:3000
    exit 1
else
    echo "✅ พอร์ต 3000 ว่าง"
fi

# Test localhost resolution
echo "3️⃣ ทดสอบ localhost..."
if ping -c 1 localhost >/dev/null 2>&1; then
    echo "✅ localhost ทำงานได้"
else
    echo "❌ localhost ไม่ทำงาน"
    exit 1
fi

# Clear DNS cache
echo "4️⃣ เคลียร์ DNS cache..."
dscacheutil -flushcache 2>/dev/null || true

# Start Next.js with multiple binding attempts
echo "5️⃣ เริ่มต้น Next.js..."
echo "🚀 URL ที่ควรทำงาน:"
echo "   - http://localhost:3000"
echo "   - http://127.0.0.1:3000"
echo "   - http://192.168.1.109:3000"
echo ""

# Try different binding methods
for method in "localhost" "127.0.0.1" "0.0.0.0"; do
    echo "🔄 ลอง bind กับ $method..."
    npx next dev --port 3000 --hostname $method &
    sleep 3
    
    if curl -I http://localhost:3000 >/dev/null 2>&1; then
        echo "✅ สำเร็จ! เข้าใช้งานได้ที่ http://localhost:3000"
        wait
        exit 0
    fi
    
    # Kill and try next method
    pkill -f next 2>/dev/null || true
    sleep 2
done

echo "❌ ไม่สามารถเริ่ม Next.js ได้ - ลองรีบูตเครื่องครับ"
exit 1