import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { EnrollButton } from "@/components/course/EnrollButton";

export default async function CoursesPage() {
  const session = await getServerSession(authOptions);

  const [courses, enrollments] = await Promise.all([
    prisma.course.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
      include: {
        modules: {
          orderBy: { order: "asc" },
          include: {
            lessons: { orderBy: { order: "asc" }, take: 1 },
          },
          take: 1,
        },
        _count: { select: { enrollments: true } },
      },
    }),
    session?.user?.id
      ? prisma.enrollment.findMany({
          where: { userId: session.user.id },
          select: { courseId: true },
        })
      : [],
  ]);

  const enrolledIds = new Set(enrollments.map((e) => e.courseId));

  const levelBadge: Record<string, string> = {
    Beginner: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    Intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    Advanced: "bg-red-500/15 text-red-400 border-red-500/25",
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100">Semua Kursus</h1>
        <p className="text-slate-400 mt-1 text-sm">Pilih kursus dan mulai belajar on-chain analysis</p>
      </div>

      <div className="space-y-4">
        {courses.map((course) => {
          const isEnrolled = enrolledIds.has(course.id);
          const firstModule = course.modules[0];
          const firstLesson = firstModule?.lessons[0];
          const firstLessonUrl = firstModule && firstLesson
            ? `/learn/${course.slug}/${firstModule.slug}/${firstLesson.slug}`
            : undefined;

          return (
            <div
              key={course.id}
              className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6 hover:border-violet-500/30 hover:bg-[#263347] transition-all group"
            >
              <div className="flex items-start gap-5">
                <div className="text-4xl shrink-0 mt-0.5">{course.icon ?? "📚"}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <h2 className="font-semibold text-slate-100 text-base group-hover:text-violet-300 transition-colors">
                          {course.title}
                        </h2>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${levelBadge[course.level] ?? "bg-slate-700 text-slate-400 border-slate-600"}`}>
                          {course.level}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{course.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-3 mt-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                      {course._count.enrollments} peserta
                    </div>

                    {isEnrolled ? (
                      <Link
                        href={firstLessonUrl ?? `/courses/${course.slug}`}
                        className="text-sm font-medium px-4 py-2 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/25 transition-colors"
                      >
                        ✓ Lanjutkan Belajar →
                      </Link>
                    ) : (
                      <EnrollButton
                        courseId={course.id}
                        firstLessonUrl={firstLessonUrl}
                        label="Mulai Kursus →"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
