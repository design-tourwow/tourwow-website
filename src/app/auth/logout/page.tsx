"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setTimeout(() => router.push("/"), 1000);
  }, [router]);
  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">กำลังออกจากระบบ...</h1>
        <div className="text-blue-700">กรุณารอสักครู่</div>
      </div>
    </main>
  );
} 