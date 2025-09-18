"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function BookTourPage() {
  const [form, setForm] = useState({ tourName: "", totalAmount: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  function checkAuth() {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) router.replace("/auth/login");
    return jwt;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const jwt = checkAuth();
    if (!jwt) return;
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
        body: JSON.stringify({
          tourName: form.tourName,
          totalAmount: Number(form.totalAmount),
          bookerPhone: form.phone,
          bookerAddress: form.address,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "เกิดข้อผิดพลาด");
      } else {
        setSuccess("จองทัวร์สำเร็จ!");
        setTimeout(() => router.push("/orders"), 1200);
      }
    } catch {
      setError("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">จองทัวร์ใหม่</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="ชื่อทัวร์"
            className="w-full border rounded-lg px-4 py-2"
            value={form.tourName}
            onChange={e => setForm(f => ({ ...f, tourName: e.target.value }))}
            required
          />
          <input
            type="number"
            placeholder="ยอดรวม (บาท)"
            className="w-full border rounded-lg px-4 py-2"
            value={form.totalAmount}
            onChange={e => setForm(f => ({ ...f, totalAmount: e.target.value }))}
            required
            min={1}
          />
          <input
            type="tel"
            placeholder="เบอร์โทร"
            className="w-full border rounded-lg px-4 py-2"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          />
          <input
            type="text"
            placeholder="ที่อยู่"
            className="w-full border rounded-lg px-4 py-2"
            value={form.address}
            onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "กำลังจอง..." : "จองทัวร์"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Button variant="outline" onClick={() => router.push("/orders")}>กลับไปหน้ารายการจอง</Button>
        </div>
      </div>
    </main>
  );
} 