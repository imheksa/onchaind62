"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
};

export function LessonViewer({
  lesson,
  module,
  course,
  userId,
  isCompleted,
  nextLesson,
  hasQuiz,
  quizPassed,
  quizId,
  modulesList,
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

  return (
    <div className="flex gap-8 min-h-screen -m-8">
      {/* Lesson Sidebar */}
      <aside className="w-72 shrink-0 bg-white border-r border-gray-100 p-4 min-h-full">
        <Link href={`/courses/${course.slug}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors">
          ← Kembali ke kursus
        </Link>
        <div className="font-semibold text-gray-900 text-sm mb-4 truncate">{course.title}</div>

        <div className="space-y-3">
          {modulesList.map((mod) => (
            <div key={mod.id}>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{mod.title}</div>
              <div className="space-y-0.5">
                {mod.lessons.map((l) => (
                  <Link
                    key={l.id}
                    href={`/learn/${course.slug}/${mod.slug}/${l.slug}`}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                      l.id === lesson.id
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className={`text-xs ${l.completed ? "text-green-500" : "text-gray-300"}`}>
                      {l.completed ? "✓" : "○"}
                    </span>
                    <span className="truncate">{l.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 py-8 pr-8 max-w-3xl">
        <div className="mb-2 text-sm text-indigo-600 font-medium">{module.title}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{lesson.title}</h1>

        {/* Lesson Content */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(lesson.content) }}
        />

        {/* Actions */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
          <div>
            {!completed ? (
              <button
                onClick={markComplete}
                disabled={completing}
                className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-60 text-sm"
              >
                {completing ? "Menyimpan..." : "✓ Tandai Selesai"}
              </button>
            ) : (
              <span className="flex items-center gap-2 text-green-600 font-medium text-sm">
                <span className="text-lg">✓</span> Lesson selesai
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {completed && hasQuiz && !quizPassed && quizId && (
              <Link
                href={`/quiz/${quizId}`}
                className="bg-amber-500 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-amber-600 transition-colors text-sm"
              >
                📝 Kerjakan Quiz
              </Link>
            )}
            {completed && quizPassed && nextLesson && (
              <Link
                href={`/learn/${nextLesson.courseSlug}/${nextLesson.moduleSlug}/${nextLesson.lessonSlug}`}
                className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
              >
                Lesson Berikutnya →
              </Link>
            )}
            {completed && !hasQuiz && nextLesson && (
              <Link
                href={`/learn/${nextLesson.courseSlug}/${nextLesson.moduleSlug}/${nextLesson.lessonSlug}`}
                className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
              >
                Lesson Berikutnya →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple markdown renderer
function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/```sql\n([\s\S]+?)```/g, '<pre><code class="language-sql">$1</code></pre>')
    .replace(/```\n?([\s\S]+?)```/g, "<pre><code>$1</code></pre>")
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[h|u|o|p|b|l|c])(.+)$/gm, "<p>$1</p>")
    .replace(/<p><\/p>/g, "")
    .replace(/---/g, "<hr/>");
}
