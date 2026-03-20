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
                lessons: true,
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

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Halo, {session.user.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-500 mt-1">Lanjutkan perjalanan belajarmu</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <div className="text-3xl font-bold text-indigo-600">{enrollments.length}</div>
          <div className="text-sm text-gray-500 mt-1">Kursus Diikuti</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <div className="text-3xl font-bold text-green-600">{completedCerts}</div>
          <div className="text-sm text-gray-500 mt-1">Sertifikat Diperoleh</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <div className="text-3xl font-bold text-gray-700">{totalCourses}</div>
          <div className="text-sm text-gray-500 mt-1">Total Kursus Tersedia</div>
        </div>
      </div>

      {/* Enrolled Courses */}
      {enrollments.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Kursus Saya</h2>
          <div className="space-y-4">
            {enrollments.map(({ course }) => {
              const totalLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);
              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="block bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{course.icon ?? "📚"}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{totalLessons} lesson • {course.modules.length} modul</p>
                    </div>
                    <div className="text-sm text-indigo-600 font-medium shrink-0">Lanjutkan →</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="font-semibold text-gray-900 mb-2">Belum ada kursus yang diikuti</h3>
          <p className="text-gray-500 text-sm mb-6">Mulai belajar dengan mendaftar ke kursus pertamamu</p>
          <Link href="/courses" className="bg-indigo-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
            Lihat Semua Kursus
          </Link>
        </div>
      )}
    </div>
  );
}
