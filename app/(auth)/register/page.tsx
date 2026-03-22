"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Password tidak cocok");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Terjadi kesalahan");
      return;
    }

    router.push("/login?registered=1&email=" + encodeURIComponent(form.email));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-900/50">
              ⛓
            </div>
            <span className="font-bold text-xl text-slate-100">
              onchain<span className="text-violet-400">do</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-100">Buat Akun Baru</h1>
          <p className="text-slate-400 mt-2 text-sm">Mulai belajar on-chain analysis hari ini — gratis</p>
        </div>

        <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 p-8 shadow-2xl shadow-black/40">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-950/50 border border-red-800/50 text-red-400 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            {[
              { label: "Nama Lengkap", name: "name", type: "text", placeholder: "Nama Anda" },
              { label: "Email", name: "email", type: "email", placeholder: "nama@email.com" },
              { label: "Password", name: "password", type: "password", placeholder: "Minimal 8 karakter", minLength: 8 },
              { label: "Konfirmasi Password", name: "confirm", type: "password", placeholder: "Ulangi password" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-slate-300 mb-2">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  placeholder={field.placeholder}
                  minLength={field.minLength}
                  required
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-violet-500 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-900/30"
            >
              {loading ? "Mendaftar..." : "Daftar Sekarang"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-violet-400 font-medium hover:text-violet-300">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
