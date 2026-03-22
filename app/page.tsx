import Link from "next/link";

const features = [
  {
    icon: "🗄️",
    title: "SQL dari Nol",
    desc: "Pelajari SQL mulai dari SELECT dasar hingga Window Functions dan CTE yang digunakan analis profesional.",
    color: "from-violet-500/20 to-purple-500/10 border-violet-500/20",
    dot: "bg-violet-500",
  },
  {
    icon: "⛓️",
    title: "On-Chain Data",
    desc: "Pahami struktur data blockchain: blocks, transactions, logs, dan cara query-nya di Dune Analytics.",
    color: "from-sky-500/20 to-blue-500/10 border-sky-500/20",
    dot: "bg-sky-500",
  },
  {
    icon: "📊",
    title: "Dune Dashboard",
    desc: "Buat visualisasi dan dashboard interaktif untuk analisis DeFi, NFT, token, dan aktivitas on-chain.",
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  {
    icon: "🔍",
    title: "Footprint Analytics",
    desc: "Kuasai Footprint Analytics dengan mode drag-and-drop dan SQL untuk analisis multi-chain.",
    color: "from-amber-500/20 to-orange-500/10 border-amber-500/20",
    dot: "bg-amber-500",
  },
  {
    icon: "🏆",
    title: "Quiz & Sertifikat",
    desc: "Setiap modul diakhiri dengan quiz. Lulus dengan nilai 85%+ dan dapatkan sertifikat resmi.",
    color: "from-pink-500/20 to-rose-500/10 border-pink-500/20",
    dot: "bg-pink-500",
  },
  {
    icon: "⚡",
    title: "Query Optimization",
    desc: "Pelajari cara menulis query DuneSQL yang efisien dengan Trino dan hindari timeout.",
    color: "from-violet-500/20 to-indigo-500/10 border-violet-500/20",
    dot: "bg-indigo-500",
  },
];

const curriculum = [
  { num: "01", title: "SQL Fundamentals", level: "Beginner", lessons: 12, topics: ["Apa itu Database & SQL?", "SELECT & FROM", "WHERE & Filter", "ORDER BY", "Fungsi Agregat", "JOIN Tabel", "Subquery & CTE", "Window Functions", "Date & Time Functions", "String & Konversi", "CASE WHEN & UNION", "DuneSQL (Trino)"] },
  { num: "02", title: "Dune Analytics", level: "Intermediate", lessons: 4, topics: ["Apa itu Dune Analytics?", "Raw vs Decoded vs Spellbook", "Membuat Visualisasi", "Menyusun Dashboard"] },
  { num: "03", title: "On-Chain Analysis", level: "Intermediate", lessons: 4, topics: ["Analisis Token ERC20", "Analisis NFT Marketplace", "Analisis Protokol DeFi", "Memahami & Mendeteksi MEV"] },
  { num: "04", title: "Advanced On-Chain Analysis", level: "Advanced", lessons: 4, topics: ["Analisis Multi-Chain & Bridge", "Wallet Clustering & Smart Money", "Bitcoin On-Chain (UTXO)", "Dune API & Spellbook"] },
  { num: "05", title: "Footprint Analytics", level: "Intermediate", lessons: 3, topics: ["Pengenalan Footprint Analytics", "No-Code Dashboard Builder", "SQL Mode di Footprint"] },
];

const stats = [
  { value: "5", label: "Kursus" },
  { value: "27+", label: "Lesson" },
  { value: "85%", label: "Nilai Kelulusan" },
  { value: "🎓", label: "Sertifikat" },
];

const levelColor: Record<string, string> = {
  Beginner: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  Intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  Advanced: "bg-red-500/15 text-red-400 border-red-500/25",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100">

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-violet-900/40">
              ⛓
            </div>
            <span className="font-bold text-base text-slate-100">
              onchain<span className="text-violet-400">do</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login" className="text-slate-400 hover:text-slate-200 text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
              Masuk
            </Link>
            <Link href="/register" className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:from-violet-500 hover:to-purple-500 transition-all shadow-md shadow-violet-900/30">
              Daftar Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-28 px-6 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-[400px] h-[300px] bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
            Free platform untuk belajar dasar-dasar onchain analyst
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
            Playground pertama untuk jadi expert,{" "}
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              hasil tergantung anda
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Mulai dari SQL dasar, query data blockchain di Dune, hingga analisis DeFi dan NFT.
            Terstruktur, dan langsung praktik.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all text-base shadow-xl shadow-violet-900/40"
            >
              Mulai Belajar Gratis →
            </Link>
            <Link
              href="/courses"
              className="bg-slate-800 text-slate-200 font-semibold px-8 py-4 rounded-xl border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all text-base"
            >
              Lihat Kurikulum
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 mt-16 pt-10 border-t border-slate-800">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-slate-100">{s.value}</div>
                <div className="text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Apa yang Akan Kamu Pelajari?</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              Kurikulum lengkap dari dasar hingga mahir, dirancang khusus untuk calon on-chain analyst.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${f.color} border rounded-xl p-6 hover:scale-[1.02] transition-transform`}
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-slate-100 text-base mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Kurikulum Lengkap</h2>
            <p className="text-slate-400 text-sm">5 kursus terstruktur dari Beginner hingga Advanced</p>
          </div>
          <div className="space-y-3">
            {curriculum.map((m) => (
              <div
                key={m.num}
                className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-5 hover:border-violet-500/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-violet-500/15 text-violet-400 border border-violet-500/25 font-bold text-xs px-2.5 py-1 rounded-lg shrink-0 font-mono">
                    {m.num}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-200 text-sm">{m.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${levelColor[m.level]}`}>{m.level}</span>
                      </div>
                      <span className="text-xs text-slate-500 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-full">{m.lessons} lesson</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {m.topics.map((t) => (
                        <span key={t} className="text-xs bg-slate-800 text-slate-400 border border-slate-700/50 px-2 py-0.5 rounded-md">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/30 to-purple-900/30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold text-slate-100 mb-4">Siap Menjadi On-Chain Analyst?</h2>
          <p className="text-slate-400 mb-8 text-sm leading-relaxed">
            Bergabung dengan ribuan pelajar yang sudah memulai perjalanan mereka. Gratis!
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold px-10 py-4 rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all text-base shadow-xl shadow-violet-900/40"
          >
            Daftar Sekarang →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6 text-center">
        <p className="text-slate-600 text-sm">© 2025 onchaindo · Dibuat untuk komunitas Web3 Indonesia</p>
      </footer>

    </div>
  );
}
