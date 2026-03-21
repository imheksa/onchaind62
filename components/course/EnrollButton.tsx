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
      className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? "Memproses..." : label}
    </button>
  );
}
