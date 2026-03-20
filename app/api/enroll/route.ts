import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = await req.json();
    if (!courseId) {
      return NextResponse.json({ error: "courseId required" }, { status: 400 });
    }

    const enrollment = await prisma.enrollment.upsert({
      where: { userId_courseId: { userId: session.user.id, courseId } },
      create: { userId: session.user.id, courseId },
      update: {},
    });

    return NextResponse.json({ enrollment });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
