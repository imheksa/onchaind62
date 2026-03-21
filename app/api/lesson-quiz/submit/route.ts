import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { quizId, answers } = await req.json();
  if (!quizId || !Array.isArray(answers)) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const quiz = await prisma.lessonQuiz.findUnique({
    where: { id: quizId },
    include: { questions: { orderBy: { order: "asc" } } },
  });
  if (!quiz) return NextResponse.json({ error: "Quiz not found" }, { status: 404 });

  const score = quiz.questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0);
  const passed = score / quiz.questions.length >= 0.8;

  await prisma.lessonQuizAttempt.upsert({
    where: { userId_quizId: { userId: session.user.id, quizId } },
    create: { userId: session.user.id, quizId, score, passed, answers },
    update: { score, passed, answers },
  });

  // Check certificate eligibility: average lesson quiz score >= 85% across all lessons in course
  const lesson = await prisma.lesson.findUnique({
    where: { id: quiz.lessonId },
    include: {
      module: {
        include: {
          course: {
            include: {
              modules: {
                include: {
                  lessons: {
                    include: {
                      quiz: {
                        include: {
                          attempts: {
                            where: { userId: session.user.id },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (lesson) {
    const allLessons = lesson.module.course.modules.flatMap((m) => m.lessons);
    const allQuizzes = allLessons.map((l) => l.quiz).filter(Boolean);
    const allAttempted = allQuizzes.every(
      (q) => q!.attempts.length > 0 || q!.id === quizId
    );

    if (allAttempted && allQuizzes.length > 0) {
      const totalScore = allQuizzes.reduce((acc, q) => {
        const attempt = q!.id === quizId ? { score } : q!.attempts[0];
        return acc + (attempt ? attempt.score : 0);
      }, 0);
      const maxScore = allQuizzes.length * 5;
      const avgPercent = totalScore / maxScore;

      if (avgPercent >= 0.85) {
        await prisma.certificate.upsert({
          where: {
            userId_courseId: {
              userId: session.user.id,
              courseId: lesson.module.course.id,
            },
          },
          create: {
            userId: session.user.id,
            courseId: lesson.module.course.id,
          },
          update: {},
        });
      }
    }
  }

  return NextResponse.json({ score, passed, total: quiz.questions.length });
}
