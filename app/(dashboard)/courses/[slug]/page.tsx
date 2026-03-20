import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { EnrollButton } from "@/components/course/EnrollButton";

export default async function CourseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const course = await prisma.course.findUnique({
    where: { slug: params.slug, isPublished: true },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: { orderBy: { order: "asc" } },
          quiz: true,
        },
      },
    },
  });

  if (!course) notFound();

  const [enrollment, progressData] = await Promise.all([
    prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
    }),
    prisma.lessonProgress.findMany({
      where: { userId: session.user.id },
      select: { lessonId: true },
    }),
  ]);

  const completedLessonIds = new Set(progressData.map((p) => p.lessonId));
  const totalLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);
  const completedLessons = course.modules.reduce(
    (a, m) => a + m.lessons.filter((l) => completedLessonIds.has(l.id)).length,
    0
  );

  // Find first incomplete lesson for continue button
  let firstLesson: { moduleSlug: string; lessonSlug: string } | null = null;
  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      if (!completedLessonIds.has(lesson.id)) {
        firstLesson = { moduleSlug: mod.slug, lessonSlug: lesson.slug };
        break;
      }
    }
    if (firstLesson) break;
  }

  return (
    <div className="max-w-3xl">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
        <div className="text-5xl mb-4">{course.icon ?? "📚"}</div>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">{course.level}</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
        <p className="text-indigo-100 text-sm leading-relaxed">{course.description}</p>

        <div className="flex items-center gap-6 mt-6 text-sm text-indigo-100">
          <span>📖 {course.modules.length} modul</span>
          <span>📝 {totalLessons} lesson</span>
          {enrollment && (
            <span>✅ {completedLessons}/{totalLessons} selesai</span>
          )}
        </div>

        {enrollment && totalLessons > 0 && (
          <div className="mt-4">
            <div className="bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all"
                style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Action */}
      <div className="mb-8">
        {!enrollment ? (
          <EnrollButton courseId={course.id} />
        ) : firstLesson ? (
          <Link
            href={`/learn/${course.slug}/${firstLesson.moduleSlug}/${firstLesson.lessonSlug}`}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Lanjutkan Belajar →
          </Link>
        ) : (
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <span>🎉</span> Kursus Selesai! Cek sertifikat Anda.
          </div>
        )}
      </div>

      {/* Modules List */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Konten Kursus</h2>
        <div className="space-y-3">
          {course.modules.map((mod, idx) => {
            const modCompleted = mod.lessons.filter((l) => completedLessonIds.has(l.id)).length;
            const modTotal = mod.lessons.length;
            const isModComplete = modCompleted === modTotal && modTotal > 0;

            return (
              <div key={mod.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${isModComplete ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {isModComplete ? "✓" : idx + 1}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">{mod.title}</h3>
                      <p className="text-xs text-gray-500">{modCompleted}/{modTotal} lesson selesai</p>
                    </div>
                  </div>
                  {mod.quiz && (
                    <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">📝 Quiz</span>
                  )}
                </div>

                {/* Lessons */}
                <div className="border-t border-gray-50">
                  {mod.lessons.map((lesson) => {
                    const done = completedLessonIds.has(lesson.id);
                    return (
                      <Link
                        key={lesson.id}
                        href={enrollment ? `/learn/${course.slug}/${mod.slug}/${lesson.slug}` : "#"}
                        className={`flex items-center gap-3 px-5 py-3 text-sm border-b border-gray-50 last:border-0 transition-colors ${
                          enrollment ? "hover:bg-gray-50" : "cursor-default"
                        }`}
                      >
                        <span className={`text-base ${done ? "text-green-500" : "text-gray-300"}`}>
                          {done ? "✓" : "○"}
                        </span>
                        <span className={done ? "text-gray-900" : "text-gray-600"}>{lesson.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
