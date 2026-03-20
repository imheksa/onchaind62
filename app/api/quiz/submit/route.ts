import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendCertificateEmail } from "@/lib/email";

const PASS_THRESHOLD = 85;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { quizId, answers } = await req.json() as {
      quizId: string;
      answers: Record<string, number>;
    };

    // Get quiz with correct answers
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: true,
        module: {
          include: {
            course: {
              include: {
                modules: {
                  include: {
                    quiz: {
                      include: {
                        attempts: {
                          where: { userId: session.user.id, passed: true },
                          take: 1,
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

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Calculate score
    let correct = 0;
    for (const question of quiz.questions) {
      if (answers[question.id] === question.answer) {
        correct++;
      }
    }

    const total = quiz.questions.length;
    const score = total > 0 ? (correct / total) * 100 : 0;
    const passed = score >= PASS_THRESHOLD;

    // Save attempt
    await prisma.quizAttempt.create({
      data: {
        userId: session.user.id,
        quizId,
        score,
        passed,
        answers,
      },
    });

    // Check if all modules passed → issue certificate
    if (passed) {
      const course = quiz.module.course;
      const allModulesPassed = course.modules.every((mod) => {
        if (!mod.quiz) return true; // modules without quiz are auto-passed
        if (mod.quiz.id === quizId) return true; // current quiz just passed
        return mod.quiz.attempts.length > 0;
      });

      if (allModulesPassed) {
        // Issue certificate
        const cert = await prisma.certificate.upsert({
          where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
          create: { userId: session.user.id, courseId: course.id },
          update: {},
        });

        // Send email
        if (session.user.email) {
          const claimUrl = `${process.env.NEXT_PUBLIC_APP_URL}/certificates/${cert.claimToken}`;
          await sendCertificateEmail({
            to: session.user.email,
            name: session.user.name ?? "Peserta",
            courseName: course.title,
            claimUrl,
          }).catch(console.error); // don't fail if email fails
        }
      }
    }

    return NextResponse.json({ score, passed, correct, total });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
