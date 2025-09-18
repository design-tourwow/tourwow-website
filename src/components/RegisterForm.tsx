import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function RegisterForm({ onSuccess }: { onSuccess: (user: any, token: string) => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
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
        // สมัครเสร็จ login auto
        onSuccess(data.user, data.token);
      }
    } catch {
      setError("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  }

  return (
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
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
      </Button>
    </form>
  );
} 