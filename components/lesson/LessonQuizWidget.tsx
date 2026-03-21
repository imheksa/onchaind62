"use client";

import { useState, useEffect, useCallback } from "react";

type Question = { id: string; text: string; options: string[]; order: number };
type Quiz = { id: string; questions: Question[] };

type Props = { quiz: Quiz; lessonTitle: string };

type Phase = "idle" | "active" | "finished";

const LABELS = ["A", "B", "C", "D"];
const TIME_PER_Q = 30;

export function LessonQuizWidget({ quiz }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quiz.questions.length).fill(null));
  const [chosen, setChosen] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [result, setResult] = useState<{ score: number; passed: boolean; total: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const question = quiz.questions[current];

  const advance = useCallback(() => {
    if (current + 1 < quiz.questions.length) {
      setCurrent(c => c + 1);
      setChosen(null);
      setRevealed(false);
      setTimeLeft(TIME_PER_Q);
    } else {
      setPhase("finished");
    }
  }, [current, quiz.questions.length]);

  const handleTimeout = useCallback(() => {
    if (revealed) return;
    setAnswers(prev => { const a = [...prev]; a[current] = -1; return a; });
    setRevealed(true);
    setTimeout(advance, 1500);
  }, [revealed, current, advance]);

  useEffect(() => {
    if (phase !== "active" || revealed) return;
    if (timeLeft <= 0) { handleTimeout(); return; }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft, revealed, handleTimeout]);

  useEffect(() => {
    if (phase === "finished" && !result && !submitting) {
      setSubmitting(true);
      fetch("/api/lesson-quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId: quiz.id, answers }),
      })
        .then(r => r.json())
        .then(data => setResult(data))
        .finally(() => setSubmitting(false));
    }
  }, [phase, result, submitting, quiz.id, answers]);

  function handleChoose(idx: number) {
    if (revealed) return;
    setChosen(idx);
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
    setRevealed(true);
    setTimeout(advance, 1800);
  }

  function handleStart() {
    setPhase("active");
    setCurrent(0);
    setChosen(null);
    setRevealed(false);
    setTimeLeft(TIME_PER_Q);
    setAnswers(Array(quiz.questions.length).fill(null));
    setResult(null);
  }

  // IDLE
  if (phase === "idle") {
    return (
      <div className="mt-12 border-t border-slate-800 pt-10">
        <div className="bg-[#1e293b] border border-slate-700/50 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-bold text-slate-100 mb-2">Kuis Akhir Lesson</h3>
          <p className="text-slate-400 text-sm mb-1">{quiz.questions.length} soal pilihan ganda · ⏱ 30 detik per soal</p>
          <p className="text-slate-500 text-xs mb-6">Hasil kuis ini berkontribusi pada kelulusan kursus (ambang batas 85%)</p>
          <button
            onClick={handleStart}
            className="bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all shadow-lg shadow-violet-900/30"
          >
            Mulai Kuis →
          </button>
        </div>
      </div>
    );
  }

  // FINISHED
  if (phase === "finished") {
    const pct = result ? Math.round((result.score / result.total) * 100) : null;
    const passed = result?.passed;

    return (
      <div className="mt-12 border-t border-slate-800 pt-10">
        <div className="bg-[#1e293b] border border-slate-700/50 rounded-2xl p-8 text-center">
          {submitting ? (
            <p className="text-slate-400 text-sm">Menyimpan hasil...</p>
          ) : result ? (
            <>
              <div className={`text-5xl mb-4 ${passed ? "text-emerald-400" : "text-red-400"}`}>
                {passed ? "🎉" : "📚"}
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">
                {passed ? "Luar Biasa!" : "Tetap Semangat!"}
              </h3>
              <div className={`text-4xl font-bold mb-2 ${passed ? "text-emerald-400" : "text-amber-400"}`}>
                {result.score}/{result.total}
              </div>
              <div className={`text-lg font-semibold mb-4 ${passed ? "text-emerald-400" : "text-amber-400"}`}>
                {pct}% · {passed ? "Lulus" : "Belum Lulus"}
              </div>
              <p className="text-slate-500 text-sm mb-6">
                {passed
                  ? "Hasil ini telah disimpan dan berkontribusi pada kelulusan kursus Anda."
                  : "Pelajari kembali materi lesson ini lalu coba kuis lagi."}
              </p>
              <button
                onClick={handleStart}
                className="text-sm text-violet-400 hover:text-violet-300 border border-violet-600/30 px-5 py-2 rounded-lg hover:bg-violet-600/10 transition-all"
              >
                Ulangi Kuis
              </button>
            </>
          ) : null}
        </div>
      </div>
    );
  }

  // ACTIVE
  const timerPct = (timeLeft / TIME_PER_Q) * 100;
  const timerColor = timeLeft > 15 ? "bg-emerald-500" : timeLeft > 7 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="mt-12 border-t border-slate-800 pt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-100">Kuis Akhir Lesson</h3>
          <p className="text-xs text-slate-500 mt-0.5">Soal {current + 1} dari {quiz.questions.length}</p>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold font-mono ${timeLeft <= 7 ? "text-red-400" : timeLeft <= 15 ? "text-amber-400" : "text-emerald-400"}`}>
            {String(timeLeft).padStart(2, "0")}s
          </div>
          <div className="text-xs text-slate-600">tersisa</div>
        </div>
      </div>

      {/* Timer bar */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full mb-6 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
          style={{ width: `${timerPct}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6 mb-4">
        <p className="text-slate-100 font-medium text-base leading-relaxed">{question.text}</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt, idx) => {
          let style = "border-slate-700/50 text-slate-300 hover:border-violet-500/50 hover:bg-violet-600/10";
          if (revealed) {
            if (idx === chosen) {
              style = "border-violet-500 bg-violet-600/20 text-violet-200";
            } else {
              style = "border-slate-700/30 text-slate-500 opacity-50";
            }
          }
          return (
            <button
              key={idx}
              onClick={() => handleChoose(idx)}
              disabled={revealed}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border bg-[#1e293b] text-left transition-all ${style} disabled:cursor-default`}
            >
              <span className="shrink-0 w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-400">
                {LABELS[idx]}
              </span>
              <span className="text-sm">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-6">
        {quiz.questions.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i < current ? "bg-violet-500" : i === current ? "bg-violet-400 scale-125" : "bg-slate-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
