import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { QuizEngine } from "@/components/quiz/QuizEngine";

export default async function QuizPage({
  params,
}: {
  params: { moduleId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const quiz = await prisma.quiz.findUnique({
    where: { id: params.moduleId },
    include: {
      questions: { orderBy: { order: "asc" } },
      module: {
        include: {
          course: { select: { id: true, slug: true, title: true } },
        },
      },
    },
  });

  if (!quiz) notFound();

  // Check latest attempt
  const latestAttempt = await prisma.quizAttempt.findFirst({
    where: { userId: session.user.id, quizId: quiz.id },
    orderBy: { createdAt: "desc" },
  });

  // Shuffle questions (max 10 per attempt)
  const shuffled = [...quiz.questions].sort(() => Math.random() - 0.5).slice(0, 10);

  return (
    <div className="max-w-2xl mx-auto">
      <QuizEngine
        quiz={{
          id: quiz.id,
          moduleTitle: quiz.module.title,
          courseSlug: quiz.module.course.slug,
          courseTitle: quiz.module.course.title,
          questions: shuffled.map((q) => ({
            id: q.id,
            text: q.text,
            options: q.options,
          })),
        }}
        previousAttempt={latestAttempt ? { score: latestAttempt.score, passed: latestAttempt.passed } : null}
      />
    </div>
  );
}
