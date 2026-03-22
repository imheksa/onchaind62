import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const [enrollments, totalCourses] = await Promise.all([
    prisma.enrollment.findMany({
      where: { userId: session.user.id },
      include: {
        course: {
          include: {
            modules: {
              include: {
                lessons: {
                  include: {
                    progress: { where: { userId: session.user.id } },
                  },
                },
                quiz: { include: { attempts: { where: { userId: session.user.id }, orderBy: { createdAt: "desc" }, take: 1 } } },
              },
            },
          },
        },
      },
    }),
    prisma.course.count({ where: { isPublished: true } }),
  ]);

  const completedCerts = await prisma.certificate.count({ where: { userId: session.user.id } });

  const stats = [
    { label: "Kursus Diikuti", value: enrollments.length, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
    { label: "Sertifikat Diperoleh", value: completedCerts, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { label: "Total Kursus", value: totalCourses, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
  ];

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100">
          Halo, {session.user.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Lanjutkan perjalanan belajarmu</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className={`${s.bg} border ${s.border} rounded-xl p-4 md:p-5`}>
            <div className={`text-2xl md:text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs md:text-sm text-slate-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Enrolled Courses */}
      {enrollments.length > 0 ? (
        <div>
          <h2 className="text-base font-semibold text-slate-300 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-violet-500 rounded-full inline-block" />
            Kursus Saya
          </h2>
          <div className="space-y-3">
            {enrollments.map(({ course }) => {
              const totalLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);
              const completedLessons = course.modules.reduce(
                (a, m) => a + m.lessons.filter((l) => l.progress.length > 0).length,
                0
              );
              const pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
              const isCompleted = pct === 100;

              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="flex items-center gap-4 bg-[#1e293b] border border-slate-700/50 rounded-xl p-5 hover:border-violet-500/40 hover:bg-[#263347] transition-all group"
                >
                  <div className="text-3xl shrink-0">{course.icon ?? "📚"}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-200 group-hover:text-violet-300 transition-colors">{course.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{totalLessons} lesson · {course.modules.length} modul</p>
                    {/* Progress bar */}
                    <div className="mt-2.5 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${isCompleted ? "bg-emerald-400" : "bg-violet-500"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium shrink-0 ${isCompleted ? "text-emerald-400" : "text-slate-400"}`}>
                        {isCompleted ? "✓ Selesai" : `${pct}%`}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-violet-400 font-medium shrink-0 group-hover:translate-x-0.5 transition-transform ml-3">
                    {isCompleted ? "Lihat →" : "Lanjutkan →"}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-[#1e293b] border border-dashed border-slate-700 rounded-xl p-12 text-center">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="font-semibold text-slate-200 mb-2">Belum ada kursus yang diikuti</h3>
          <p className="text-slate-500 text-sm mb-6">Mulai belajar dengan mendaftar ke kursus pertamamu</p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium px-6 py-2.5 rounded-lg hover:from-violet-500 hover:to-purple-500 transition-all text-sm shadow-lg shadow-violet-900/30"
          >
            Lihat Semua Kursus →
          </Link>
        </div>
      )}
    </div>
  );
}
