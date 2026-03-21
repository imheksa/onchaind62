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

  const levelColor: Record<string, string> = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-red-100 text-red-700",
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Semua Kursus</h1>
        <p className="text-gray-500 mt-1">Pilih kursus dan mulai belajar on-chain analysis</p>
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
            <div key={course.id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-5">
                <div className="text-4xl shrink-0">{course.icon ?? "📚"}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="font-semibold text-gray-900 text-lg">{course.title}</h2>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[course.level] ?? "bg-gray-100 text-gray-700"}`}>
                          {course.level}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-3 mt-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>👥 {course._count.enrollments} peserta</span>
                    </div>

                    {isEnrolled ? (
                      <Link
                        href={firstLessonUrl ?? `/courses/${course.slug}`}
                        className="text-sm font-medium px-4 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
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
