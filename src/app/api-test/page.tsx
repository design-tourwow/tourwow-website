"use client"

import { useEffect, useState } from "react";

export default function ApiTestPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let didCancel = false;
    const fetchApi = async () => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 3000)); // รอ 3 วินาที
        
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout
        const res = await fetch("https://www.zegoapi.com/v1.5/programtours", {
          headers: {
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhmMmViYjEyYjE0NzIyZDQxZDRmODQiLCJpYXQiOjE2NzA4NDI2NTB9.OqjXzyitMLH2Q2int7pfAvZ1Fel-7eZSnmak0k9g3pk"
          },
          signal: controller.signal
        });
        clearTimeout(timeout);
        if (!res.ok) {
          if (res.status === 429) {
            throw new Error("Rate limit exceeded - กรุณารอสักครู่แล้วลองใหม่");
          }
          throw new Error("API error: " + res.status);
        }
        let json;
        try {
          json = await res.json();
        } catch (e) {
          throw new Error("Response is not valid JSON");
        }
        if (!didCancel) setData(json);
      } catch (e: any) {
        console.error("API fetch error", e);
        if (!didCancel) setError(e.name === 'AbortError' ? "Timeout: API ไม่ตอบสนองใน 10 วินาที" : (e.message || "เกิดข้อผิดพลาด"));
      } finally {
        if (!didCancel) setLoading(false);
      }
    };
    fetchApi();
    return () => { didCancel = true; };
  }, []);

  return (
    <main className="min-h-screen bg-blue-50 py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">API Test: Zego ProgramTour</h1>
        {loading && <div className="text-gray-600 mb-4">กำลังโหลดข้อมูล...</div>}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
        )}
        {data && (
          <pre className="bg-white rounded-lg p-4 shadow overflow-x-auto text-xs max-h-[500px] mt-4">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
} 