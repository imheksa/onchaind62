import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const cert = await prisma.certificate.findUnique({
    where: { claimToken: token },
    include: {
      user: { select: { name: true, email: true } },
      course: { select: { title: true, icon: true } },
    },
  });

  if (!cert) notFound();

  // Mark as claimed
  if (!cert.claimedAt) {
    await prisma.certificate.update({
      where: { id: cert.id },
      data: { claimedAt: new Date() },
    });
  }

  const issueDate = cert.issuedAt.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        {/* Certificate Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-100 border-2 border-indigo-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-10 py-8 text-center">
            <div className="text-5xl mb-3">⛓️</div>
            <div className="text-white font-bold text-xl tracking-wide">OnChain Academy</div>
            <div className="text-indigo-200 text-sm mt-1">Sertifikat Kelulusan</div>
          </div>

          {/* Body */}
          <div className="px-10 py-10 text-center">
            <p className="text-gray-500 text-sm mb-3">Diberikan kepada</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{cert.user.name}</h1>

            <p className="text-gray-500 text-sm mb-2">telah berhasil menyelesaikan kursus</p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-3xl">{cert.course.icon ?? "📚"}</span>
              <h2 className="text-xl font-bold text-indigo-600">{cert.course.title}</h2>
            </div>

            <p className="text-gray-500 text-sm mb-8">
              dengan nilai kelulusan di atas <strong>85%</strong> pada setiap quiz
            </p>

            {/* Decorative divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-indigo-200" />
              <span className="text-indigo-400 text-xl">✦</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-indigo-200" />
            </div>

            <div className="flex justify-between items-end">
              <div className="text-left">
                <p className="text-xs text-gray-400 mb-1">Tanggal Terbit</p>
                <p className="text-sm font-medium text-gray-700">{issueDate}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">ID Sertifikat</p>
                <p className="text-xs font-mono text-gray-500">{cert.id.slice(0, 16).toUpperCase()}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-100 px-10 py-5 text-center">
            <p className="text-xs text-gray-400">
              Sertifikat ini dapat diverifikasi di{" "}
              <span className="text-indigo-600">{process.env.NEXT_PUBLIC_APP_URL}/certificates/{token}</span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => window.print()}
            className="bg-white border border-gray-200 text-gray-700 font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            🖨️ Print / Save PDF
          </button>
          <a
            href="/dashboard"
            className="bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm"
          >
            Kembali ke Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
