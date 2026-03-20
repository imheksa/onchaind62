import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { LessonViewer } from "@/components/lesson/LessonViewer";

export default async function LessonPage({
  params,
}: {
  params: { courseSlug: string; moduleSlug: string; lessonSlug: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const course = await prisma.course.findUnique({
    where: { slug: params.courseSlug, isPublished: true },
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

  // Check enrollment
  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
  });
  if (!enrollment) redirect(`/courses/${params.courseSlug}`);

  const currentModule = course.modules.find((m) => m.slug === params.moduleSlug);
  if (!currentModule) notFound();

  const currentLesson = currentModule.lessons.find((l) => l.slug === params.lessonSlug);
  if (!currentLesson) notFound();

  // Progress
  const progress = await prisma.lessonProgress.findMany({
    where: { userId: session.user.id },
    select: { lessonId: true },
  });
  const completedIds = new Set(progress.map((p) => p.lessonId));

  // Quiz attempt for current module
  const quizAttempt = currentModule.quiz
    ? await prisma.quizAttempt.findFirst({
        where: { userId: session.user.id, quizId: currentModule.quiz.id, passed: true },
      })
    : null;

  // Find next lesson
  const allLessons = course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleSlug: m.slug, moduleId: m.id, quiz: m.quiz }))
  );
  const currentIdx = allLessons.findIndex((l) => l.id === currentLesson.id);
  const nextLesson = allLessons[currentIdx + 1] ?? null;

  // Check if all lessons in current module are done
  const moduleLessons = currentModule.lessons;
  const allModuleLessonsDone = moduleLessons.every((l) => completedIds.has(l.id) || l.id === currentLesson.id);

  return (
    <LessonViewer
      lesson={currentLesson}
      module={currentModule}
      course={{ id: course.id, slug: course.slug, title: course.title }}
      userId={session.user.id}
      isCompleted={completedIds.has(currentLesson.id)}
      nextLesson={nextLesson ? { courseSlug: course.slug, moduleSlug: nextLesson.moduleSlug, lessonSlug: nextLesson.slug } : null}
      hasQuiz={!!currentModule.quiz && allModuleLessonsDone}
      quizPassed={!!quizAttempt}
      quizId={currentModule.quiz?.id ?? null}
      allModuleLessonsDone={allModuleLessonsDone}
      modulesList={course.modules.map((m) => ({
        id: m.id,
        title: m.title,
        slug: m.slug,
        lessons: m.lessons.map((l) => ({
          id: l.id,
          title: l.title,
          slug: l.slug,
          completed: completedIds.has(l.id),
        })),
      }))}
    />
  );
}
