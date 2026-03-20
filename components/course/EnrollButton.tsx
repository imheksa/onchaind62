"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function EnrollButton({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleEnroll() {
    setLoading(true);
    await fetch("/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60"
    >
      {loading ? "Mendaftar..." : "Daftar ke Kursus Ini"}
    </button>
  );
}
