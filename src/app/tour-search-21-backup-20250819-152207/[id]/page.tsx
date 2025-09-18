export default function TourDetailSkipped() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">หน้านี้ถูก Skip ไปก่อน</h1>
        <p className="text-gray-600 mb-6">เนื่องจากมีปัญหา Type Error ในการ Build</p>
        <a
          href="/tour-search-21"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          กลับหน้าหลัก
        </a>
      </div>
    </div>
  )
}