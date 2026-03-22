"use client";

import { useState, useEffect } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on lesson change
  useEffect(() => {
    setSidebarOpen(false);
  }, [lesson.id]);

  // Prevent body scroll when mobile sidebar open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

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

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0f172a] border-r border-slate-800 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-5">
        <Link
          href={`/courses/${course.slug}`}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-violet-400 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Kembali ke kursus
        </Link>
        {/* Close button (mobile) */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden text-slate-500 hover:text-slate-300 p-1"
          aria-label="Tutup"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

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
    </div>
  );

  return (
    <div className="flex min-h-screen -m-4 md:-m-8">

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-72 shrink-0 min-h-full">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="md:hidden fixed left-0 top-0 h-full z-50 w-72 shadow-2xl">
            {sidebarContent}
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto min-w-0">

        {/* Mobile top bar for lesson nav */}
        <div className="md:hidden sticky top-0 z-30 bg-[#0f172a]/95 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-400 hover:text-slate-200 p-1 shrink-0"
            aria-label="Buka daftar lesson"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500 truncate">{module.title}</p>
            <p className="text-sm font-medium text-slate-200 truncate">{lesson.title}</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto py-8 px-4 md:py-10 md:px-10">

          {/* Breadcrumb (desktop) */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 mb-6">
            <span>{course.title}</span>
            <span>›</span>
            <span className="text-violet-400">{module.title}</span>
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-slate-100 mb-6 md:mb-8 leading-tight">{lesson.title}</h1>

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
          <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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

            <div className="flex items-center gap-3 flex-wrap">
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
