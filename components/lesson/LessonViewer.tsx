"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { LessonQuizWidget } from "@/components/lesson/LessonQuizWidget";

type LessonViewerProps = {
  lesson: { id: string; title: string; content: string };
  module: { id: string; title: string; slug: string };
  course: { id: string; slug: string; title: string };
  userId: string;
  isCompleted: boolean;
  nextLesson: { courseSlug: string; moduleSlug: string; lessonSlug: string } | null;
  hasQuiz: boolean;
  quizPassed: boolean;
  quizId: string | null;
  allModuleLessonsDone: boolean;
  modulesList: {
    id: string;
    title: string;
    slug: string;
    lessons: { id: string; title: string; slug: string; completed: boolean }[];
  }[];
  lessonQuiz: { id: string; questions: { id: string; text: string; options: string[]; order: number }[] } | null;
};

marked.setOptions({ gfm: true, breaks: true });

export function LessonViewer({
  lesson,
  module,
  course,
  isCompleted,
  nextLesson,
  hasQuiz,
  quizPassed,
  quizId,
  modulesList,
  lessonQuiz,
}: LessonViewerProps) {
  const router = useRouter();
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(isCompleted);

  async function markComplete() {
    if (completed) return;
    setCompleting(true);
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId: lesson.id }),
    });
    setCompleted(true);
    setCompleting(false);
    router.refresh();
  }

  const htmlContent = marked.parse(lesson.content) as string;

  return (
    <div className="flex gap-0 min-h-screen -m-8">

      {/* Lesson Sidebar */}
      <aside className="w-72 shrink-0 bg-[#0f172a] border-r border-slate-800 p-4 min-h-full overflow-y-auto">
        <Link
          href={`/courses/${course.slug}`}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-violet-400 mb-5 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Kembali ke kursus
        </Link>

        <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4 px-1">
          {course.title}
        </div>

        <div className="space-y-4">
          {modulesList.map((mod) => (
            <div key={mod.id}>
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 px-1">
                {mod.title}
              </div>
              <div className="space-y-0.5">
                {mod.lessons.map((l) => {
                  const isActive = l.id === lesson.id;
                  return (
                    <Link
                      key={l.id}
                      href={`/learn/${course.slug}/${mod.slug}/${l.slug}`}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-all ${
                        isActive
                          ? "bg-violet-600/20 text-violet-300 border border-violet-600/30 font-medium"
                          : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                      }`}
                    >
                      <span className={`shrink-0 text-xs ${l.completed ? "text-emerald-400" : isActive ? "text-violet-400" : "text-slate-700"}`}>
                        {l.completed ? "✓" : "○"}
                      </span>
                      <span className="truncate">{l.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto py-10 px-10">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <span>{course.title}</span>
            <span>›</span>
            <span className="text-violet-400">{module.title}</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-100 mb-8 leading-tight">{lesson.title}</h1>

          {/* Lesson Content */}
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Lesson Quiz */}
          {lessonQuiz && (
            <LessonQuizWidget quiz={lessonQuiz} lessonTitle={lesson.title} />
          )}

          {/* Actions */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex items-center justify-between flex-wrap gap-4">
            <div>
              {!completed ? (
                <button
                  onClick={markComplete}
                  disabled={completing}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:from-violet-500 hover:to-purple-500 transition-all disabled:opacity-60 text-sm shadow-lg shadow-violet-900/30"
                >
                  {completing ? "Menyimpan..." : "✓ Tandai Selesai"}
                </button>
              ) : (
                <span className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
                  <span className="text-lg">✓</span> Lesson selesai
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {completed && hasQuiz && !quizPassed && quizId && (
                <Link
                  href={`/quiz/${quizId}`}
                  className="bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold px-5 py-2.5 rounded-lg hover:bg-amber-500/30 transition-colors text-sm"
                >
                  📝 Kerjakan Kuis
                </Link>
              )}
              {completed && (quizPassed || !hasQuiz) && nextLesson && (
                <Link
                  href={`/learn/${nextLesson.courseSlug}/${nextLesson.moduleSlug}/${nextLesson.lessonSlug}`}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:from-violet-500 hover:to-purple-500 transition-all text-sm shadow-lg shadow-violet-900/30"
                >
                  Lesson Berikutnya →
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
