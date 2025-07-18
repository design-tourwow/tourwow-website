'use client'

export default function TestAnimationsPage() {
  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Animation Cleanup เสร็จสิ้น</h1>
        
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">สิ่งที่แก้ไขแล้ว:</h3>
            <ul className="text-green-700 space-y-1">
              <li>✅ เอา Math.random() ออกจากข้อมูลทัวร์</li>
              <li>✅ เอา animate-spin ออกจาก loading spinner</li>
              <li>✅ แก้ไข live viewers ให้แสดงค่าคงที่</li>
              <li>✅ แก้ไข recent bookings ให้ไม่สุ่ม</li>
              <li>✅ UI แสดงผลเสถียร ไม่มีอะไรแว้บขึ้นแล้วหาย</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">ลิงก์ทดสอบ:</h3>
            <div className="space-y-2">
              <a 
                href="/wholesale-tours-2" 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
              >
                Wholesale Tours 2 (Port 3000)
              </a>
              <a 
                href="http://localhost:3001/wholesale-tours-2" 
                target="_blank"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Wholesale Tours 2 (Port 3001)
              </a>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">หากยังมีปัญหา:</h3>
            <ol className="text-yellow-700 space-y-1 list-decimal list-inside">
              <li>กด Ctrl+F5 (Windows) หรือ Cmd+Shift+R (Mac) เพื่อ hard refresh</li>
              <li>Clear browser cache</li>
              <li>ใช้ Port 3001 แทน</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}