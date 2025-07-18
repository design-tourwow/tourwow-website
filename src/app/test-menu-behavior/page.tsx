'use client'

export default function TestMenuBehaviorPage() {
  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ เมนู Modal แก้ไขเสร็จสิ้น</h1>
        
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">การเปลี่ยนแปลงที่ทำ:</h3>
            <ul className="text-green-700 space-y-1">
              <li>✅ <strong>แพ็กเกจทัวร์</strong>: ต้องคลิกก่อนถึงจะแสดง Modal</li>
              <li>✅ <strong>ทัวร์ไฟไหม้</strong>: ต้องคลิกก่อนถึงจะแสดง Modal</li>
              <li>✅ Mouse leave จาก Modal = ปิดทันที (ไม่มี delay)</li>
              <li>✅ เปลี่ยนหน้า = ปิด Modal ทันที</li>
              <li>✅ ไม่มี overflow scroll block แล้ว</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">วิธีใช้งานใหม่:</h3>
            <ol className="text-blue-700 space-y-1 list-decimal list-inside">
              <li><strong>คลิก</strong>ที่ "แพ็กเกจทัวร์" หรือ "ทัวร์ไฟไหม้"</li>
              <li>Modal จะเปิดขึ้นมา</li>
              <li>เลื่อน mouse ออกจาก Modal = ปิดทันที</li>
              <li>คลิกลิงก์ใดๆ = ปิด Modal และไปหน้าใหม่</li>
            </ol>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">ประโยชน์ที่ได้:</h3>
            <ul className="text-yellow-700 space-y-1">
              <li>🚀 ไม่มี Modal ค้างบังหน้าอื่นอีกแล้ว</li>
              <li>💨 ปิด Modal ได้เร็วขึ้น</li>
              <li>🎯 ใช้งานตรงตามความต้องการ</li>
              <li>📱 UX ดีขึ้นทั้งบน desktop และ mobile</li>
            </ul>
          </div>
          
          <div className="mt-6">
            <a 
              href="/wholesale-tours-2" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              ทดสอบที่ Wholesale Tours 2
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}