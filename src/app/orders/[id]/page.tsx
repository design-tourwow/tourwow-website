"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;
  const [order, setOrder] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      router.replace("/auth/login");
      return;
    }
    fetch(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "เกิดข้อผิดพลาด");
        setOrder(data.order);
        setForm({
          phone: data.order.bookerPhone || data.order.phone || "",
          address: data.order.bookerAddress || data.order.address || "",
          status: data.order.status || data.order.orderStatus || "",
        });
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [orderId, router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    const jwt = localStorage.getItem("jwt");
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "เกิดข้อผิดพลาด");
      } else {
        setSuccess("บันทึกสำเร็จ");
        setOrder(data.order);
      }
    } catch {
      setError("เกิดข้อผิดพลาด");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  if (!order) return null;

  return (
    <main className="min-h-screen bg-blue-50 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">รายละเอียดการจอง</h1>
        <div className="mb-4">
          <div className="font-semibold text-blue-900">{order.tourName || order.tour_name || "-"}</div>
          <div className="text-sm text-gray-500">ยอดรวม: ฿{order.totalAmount || order.total_amount}</div>
          <div className="text-sm text-gray-500">สถานะ: {order.status || order.orderStatus || "-"}</div>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <input
            type="tel"
            placeholder="เบอร์โทร"
            className="w-full border rounded-lg px-4 py-2"
            value={form.phone}
            onChange={e => setForm((f: any) => ({ ...f, phone: e.target.value }))}
          />
          <input
            type="text"
            placeholder="ที่อยู่"
            className="w-full border rounded-lg px-4 py-2"
            value={form.address}
            onChange={e => setForm((f: any) => ({ ...f, address: e.target.value }))}
          />
          <select
            className="w-full border rounded-lg px-4 py-2"
            value={form.status}
            onChange={e => setForm((f: any) => ({ ...f, status: e.target.value }))}
          >
            <option value="">เลือกสถานะ</option>
            <option value="pending">รอดำเนินการ</option>
            <option value="confirmed">ยืนยันแล้ว</option>
            <option value="cancelled">ยกเลิก</option>
            <option value="completed">เสร็จสิ้น</option>
          </select>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Button variant="outline" onClick={() => router.push("/orders")}>กลับไปหน้ารายการจอง</Button>
        </div>
      </div>
    </main>
  );
} 