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
            Playground Menuju{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Expert
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Belajar SQL Dasar Hingga Query Data Blockchain
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all text-base shadow-xl shadow-violet-900/40"
            >
              Mulai Langkah Pertama Mu
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
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Kurikulum Dasar</h2>
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
          <h2 className="text-3xl font-bold text-slate-100 mb-4">Tertarik Menjadi On-Chain Analyst?</h2>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold px-10 py-4 rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all text-base shadow-xl shadow-violet-900/40"
          >
            Mulai Langkah Pertama Mu
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-white text-xs font-bold">
              ⛓
            </div>
            <span className="font-bold text-sm text-slate-100">
              onchain<span className="text-violet-400">do</span>
            </span>
          </div>

          {/* Center: copyright */}
          <p className="text-slate-600 text-xs">© 2025 onchaindo · Dibuat untuk komunitas Web3 Indonesia</p>

          {/* Right: actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://twitter.com/iniheksa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-slate-100 text-xs border border-slate-700 hover:border-slate-500 px-3 py-2 rounded-lg transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @iniheksa
            </a>
            <a
              href="https://github.com/imheksa/onchaind62"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 border border-slate-700 hover:border-slate-500 px-3 py-2 rounded-lg transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Contribute
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
