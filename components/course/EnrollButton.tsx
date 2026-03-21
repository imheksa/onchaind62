"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  courseId: string;
  firstLessonUrl?: string;
  label?: string;
}

export function EnrollButton({ courseId, firstLessonUrl, label = "Mulai Kursus" }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleEnroll() {
    setLoading(true);
    const res = await fetch("/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });

    setLoading(false);

    if (res.ok && firstLessonUrl) {
      router.push(firstLessonUrl);
    } else {
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className="text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-violet-900/30"
    >
      {loading ? "Memproses..." : label}
    </button>
  );
}
