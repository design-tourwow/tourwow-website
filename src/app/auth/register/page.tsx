"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "เกิดข้อผิดพลาด");
      } else {
        setSuccess("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
        setTimeout(() => router.push("/auth/login"), 1200);
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
        <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">สมัครสมาชิก</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="ชื่อ-นามสกุล"
            className="w-full border rounded-lg px-4 py-2"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            type="email"
            placeholder="อีเมล"
            className="w-full border rounded-lg px-4 py-2"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
          <input
            type="tel"
            placeholder="เบอร์โทรศัพท์ (ไม่บังคับ)"
            className="w-full border rounded-lg px-4 py-2"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value.slice(0, 10) }))}
            maxLength={10}
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            className="w-full border rounded-lg px-4 py-2"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
            minLength={6}
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-blue-700">
          มีบัญชีอยู่แล้ว? <a href="/auth/login" className="underline">เข้าสู่ระบบ</a>
        </div>
      </div>
    </main>
  );
} 