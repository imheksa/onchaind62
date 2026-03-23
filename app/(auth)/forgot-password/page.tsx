"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);

    if (res.ok) {
      setSent(true);
    } else {
      const data = await res.json();
      setError(data.error ?? "Terjadi kesalahan");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-900/50">
              ⛓
            </div>
            <span className="font-bold text-xl text-slate-100">
              onchain<span className="text-violet-400">do</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-100">Lupa Password?</h1>
          <p className="text-slate-400 mt-2 text-sm">
            Masukkan email Anda dan kami akan kirimkan link reset password
          </p>
        </div>

        <div className="bg-[#1e293b] rounded-2xl border border-slate-700/50 p-8 shadow-2xl shadow-black/40">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="text-4xl">📬</div>
              <p className="text-slate-100 font-semibold">Email terkirim!</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Jika email <strong className="text-slate-300">{email}</strong> terdaftar,
                Anda akan menerima link reset password dalam beberapa menit.
                Periksa folder spam jika tidak muncul.
              </p>
              <Link
                href="/login"
                className="inline-block mt-2 text-violet-400 text-sm font-medium hover:text-violet-300"
              >
                ← Kembali ke Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-950/50 border border-red-800/50 text-red-400 text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  placeholder="nama@email.com"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-violet-500 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-900/30"
              >
                {loading ? "Mengirim..." : "Kirim Link Reset"}
              </button>

              <p className="text-center text-sm text-slate-500">
                <Link href="/login" className="text-violet-400 font-medium hover:text-violet-300">
                  ← Kembali ke Login
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
