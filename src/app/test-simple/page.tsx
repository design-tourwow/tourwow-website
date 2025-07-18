'use client'

export default function TestSimplePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Simple Test Page</h1>
      <p className="text-gray-600">This is a simple test page to check if React components work.</p>
      
      <div className="mt-8 p-4 bg-blue-100 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-800">Status Check</h2>
        <ul className="mt-2 space-y-1">
          <li>✅ React components working</li>
          <li>✅ Tailwind CSS working</li>
          <li>✅ Next.js routing working</li>
        </ul>
      </div>
      
      <div className="mt-4">
        <a 
          href="/wholesale-tours-2" 
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Wholesale Tours 2
        </a>
      </div>
    </div>
  )
}