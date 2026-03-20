import Link from "next/link";

const features = [
  {
    icon: "🗄️",
    title: "SQL dari Nol",
    desc: "Pelajari SQL mulai dari SELECT dasar hingga Window Functions dan CTE yang digunakan analis profesional.",
  },
  {
    icon: "⛓️",
    title: "On-Chain Data",
    desc: "Pahami struktur data blockchain: blocks, transactions, logs, dan cara query-nya di Dune Analytics.",
  },
  {
    icon: "📊",
    title: "Dune Dashboard",
    desc: "Buat visualisasi dan dashboard interaktif untuk analisis DeFi, NFT, token, dan aktivitas on-chain.",
  },
  {
    icon: "🔍",
    title: "Footprint Analytics",
    desc: "Kuasai Footprint Analytics dengan mode drag-and-drop dan SQL untuk analisis multi-chain.",
  },
  {
    icon: "🏆",
    title: "Quiz & Sertifikat",
    desc: "Setiap modul diakhiri dengan quiz. Lulus dengan nilai 85%+ dan dapatkan sertifikat resmi.",
  },
  {
    icon: "⚡",
    title: "Query Optimization",
    desc: "Pelajari cara menulis query DuneSQL yang efisien dengan Trino dan hindari timeout.",
  },
];

const curriculum = [
  { num: "01", title: "SQL Fundamentals", lessons: 7, topics: ["SELECT & WHERE", "GROUP BY & Agregasi", "JOIN Tables", "Subquery & CTE", "Window Functions", "Date & String Functions", "Advanced SQL"] },
  { num: "02", title: "DuneSQL & Query Optimization", lessons: 3, topics: ["Pengenalan Dune Analytics", "DuneSQL / Trino Dialect", "Query Optimization"] },
  { num: "03", title: "Dashboard Dune", lessons: 3, topics: ["Membuat Visualisasi", "Menyusun Dashboard", "Study Case: Lens Protocol"] },
  { num: "04", title: "Analisis Token & DeFi", lessons: 4, topics: ["ERC20 Token Analysis", "NFT Analysis", "DeFi Protocol Analysis", "MEV Analysis"] },
  { num: "05", title: "Advanced On-Chain Analysis", lessons: 4, topics: ["Cross-Chain Analysis", "Network & Wallet Analysis", "Bitcoin Analytics", "Spellbook & Dune API"] },
  { num: "06", title: "Footprint Analytics", lessons: 3, topics: ["Pengenalan Footprint", "No-Code Dashboard", "SQL Mode di Footprint"] },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <span className="text-2xl">⛓️</span>
            <span>OnChain <span className="text-indigo-600">Academy</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Masuk
            </Link>
            <Link href="/register" className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Daftar Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span>🚀</span> Platform Belajar On-Chain Analysis #1
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Kuasai <span className="text-indigo-600">On-Chain</span><br />
            Analysis dari Nol
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Dari SQL dasar hingga membuat dashboard Dune dan Footprint Analytics.
            Belajar dengan kurikulum terstruktur dan dapatkan sertifikat setelah lulus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-indigo-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-indigo-700 transition-colors text-lg shadow-lg shadow-indigo-200">
              Mulai Belajar Gratis →
            </Link>
            <Link href="/courses" className="bg-white text-gray-800 font-semibold px-8 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-lg">
              Lihat Kurikulum
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-12 mt-16 pt-8 border-t border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">6</div>
              <div className="text-sm text-gray-500 mt-1">Modul Kursus</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">24+</div>
              <div className="text-sm text-gray-500 mt-1">Sub-Lesson</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">85%</div>
              <div className="text-sm text-gray-500 mt-1">Nilai Kelulusan</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">🎓</div>
              <div className="text-sm text-gray-500 mt-1">Sertifikat Resmi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Apa yang Akan Kamu Pelajari?</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Kurikulum lengkap dari dasar hingga mahir, dirancang khusus untuk calon on-chain analyst.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kurikulum Lengkap</h2>
            <p className="text-gray-600">6 modul terstruktur dengan total 24+ sub-lesson</p>
          </div>
          <div className="space-y-4">
            {curriculum.map((m) => (
              <div key={m.num} className="bg-white border border-gray-100 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 text-indigo-600 font-bold text-sm px-3 py-1 rounded-lg shrink-0">
                    {m.num}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{m.title}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{m.lessons} lesson</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {m.topics.map((t) => (
                        <span key={t} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md">{t}</span>
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
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Siap Menjadi On-Chain Analyst?</h2>
          <p className="text-indigo-100 mb-8">Daftar sekarang dan mulai perjalanan belajarmu. Gratis!</p>
          <Link href="/register" className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors text-lg inline-block">
            Daftar Sekarang →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4 text-center">
        <p className="text-gray-500 text-sm">© 2025 OnChain Academy. Dibuat dengan ❤️ untuk komunitas Web3 Indonesia.</p>
      </footer>
    </div>
  );
}
