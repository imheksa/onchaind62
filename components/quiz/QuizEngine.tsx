"use client";

import { useState } from "react";
import Link from "next/link";

type Question = {
  id: string;
  text: string;
  options: string[];
};

type QuizEngineProps = {
  quiz: {
    id: string;
    moduleTitle: string;
    courseSlug: string;
    courseTitle: string;
    questions: Question[];
  };
  previousAttempt: { score: number; passed: boolean } | null;
};

type QuizResult = {
  score: number;
  passed: boolean;
  correct: number;
  total: number;
};

export function QuizEngine({ quiz, previousAttempt }: QuizEngineProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(!previousAttempt);

  function selectAnswer(questionId: string, optionIdx: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  }

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = quiz.questions.length;
  const allAnswered = answeredCount === totalQuestions;

  async function handleSubmit() {
    if (!allAnswered) return;
    setSubmitting(true);

    const res = await fetch("/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizId: quiz.id, answers }),
    });

    const data = await res.json();
    setResult(data);
    setSubmitting(false);
  }

  if (!started && previousAttempt) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center">
        <div className={`text-5xl mb-4 ${previousAttempt.passed ? "" : ""}`}>
          {previousAttempt.passed ? "🏆" : "📝"}
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{quiz.moduleTitle} - Quiz</h2>
        <p className="text-gray-500 mb-6">
          Percobaan terakhir:{" "}
          <span className={`font-semibold ${previousAttempt.passed ? "text-green-600" : "text-red-600"}`}>
            {previousAttempt.score.toFixed(0)}%
          </span>
          {previousAttempt.passed ? " (Lulus)" : " (Belum lulus)"}
        </p>

        {previousAttempt.passed ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Anda sudah lulus quiz ini. Lanjutkan ke modul berikutnya.</p>
            <Link href={`/courses/${quiz.courseSlug}`} className="inline-block bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm">
              Kembali ke Kursus
            </Link>
          </div>
        ) : (
          <button
            onClick={() => setStarted(true)}
            className="bg-amber-500 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-amber-600 transition-colors text-sm"
          >
            Coba Lagi
          </button>
        )}
      </div>
    );
  }

  if (result) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">{result.passed ? "🎉" : "😅"}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {result.passed ? "Selamat! Anda Lulus!" : "Belum Lulus"}
        </h2>

        <div className={`text-5xl font-bold mb-2 ${result.passed ? "text-green-600" : "text-red-500"}`}>
          {result.score.toFixed(0)}%
        </div>
        <p className="text-gray-500 mb-2">
          {result.correct} dari {result.total} jawaban benar
        </p>
        <p className="text-sm text-gray-400 mb-8">
          Batas lulus: 85%
        </p>

        {result.passed ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6 text-left">
            <p className="text-green-800 font-medium text-sm">
              ✅ Cek email Anda untuk link klaim sertifikat (jika ini adalah modul terakhir)
            </p>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6 text-left">
            <p className="text-amber-800 font-medium text-sm">
              💡 Pelajari kembali materi dan coba lagi. Anda harus menjawab minimal 85% dengan benar.
            </p>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          {!result.passed && (
            <button
              onClick={() => { setResult(null); setAnswers({}); setStarted(true); }}
              className="bg-amber-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-amber-600 transition-colors text-sm"
            >
              Coba Lagi
            </button>
          )}
          <Link
            href={`/courses/${quiz.courseSlug}`}
            className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm"
          >
            Kembali ke Kursus
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link href={`/courses/${quiz.courseSlug}`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          ← {quiz.courseTitle}
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">{quiz.moduleTitle} - Quiz</h1>
        <p className="text-gray-500 text-sm mt-1">
          Jawab {totalQuestions} pertanyaan. Minimal 85% benar untuk lulus.
        </p>
      </div>

      {/* Progress */}
      <div className="bg-white border border-gray-100 rounded-xl px-5 py-3 mb-6 flex items-center justify-between">
        <span className="text-sm text-gray-600">{answeredCount}/{totalQuestions} dijawab</span>
        <div className="flex-1 mx-4 bg-gray-100 rounded-full h-2">
          <div
            className="bg-indigo-500 rounded-full h-2 transition-all"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium text-indigo-600">{Math.round((answeredCount / totalQuestions) * 100)}%</span>
      </div>

      {/* Questions */}
      <div className="space-y-5">
        {quiz.questions.map((q, idx) => (
          <div key={q.id} className="bg-white border border-gray-100 rounded-2xl p-6">
            <p className="font-medium text-gray-900 mb-4">
              <span className="text-indigo-600 font-bold mr-2">{idx + 1}.</span>
              {q.text}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, optIdx) => (
                <button
                  key={optIdx}
                  onClick={() => selectAnswer(q.id, optIdx)}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                    answers[q.id] === optIdx
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-medium"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <span className="font-semibold mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit */}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {allAnswered ? "Semua pertanyaan terjawab. Siap submit!" : `${totalQuestions - answeredCount} pertanyaan belum dijawab`}
        </p>
        <button
          onClick={handleSubmit}
          disabled={!allAnswered || submitting}
          className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
        >
          {submitting ? "Menilai..." : "Submit Quiz →"}
        </button>
      </div>
    </div>
  );
}
