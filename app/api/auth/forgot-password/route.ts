import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email wajib diisi" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Selalu return 200 meskipun email tidak ditemukan (mencegah user enumeration)
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  // Hapus token lama untuk email ini
  await prisma.passwordResetToken.deleteMany({ where: { email } });

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 jam

  await prisma.passwordResetToken.create({
    data: { email, token, expiresAt },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await sendPasswordResetEmail({
    to: email,
    name: user.name ?? "Pengguna",
    resetUrl,
  });

  return NextResponse.json({ ok: true });
}
