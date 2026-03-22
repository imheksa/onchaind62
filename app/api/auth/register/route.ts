import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password minimal 8 karakter" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true, name: true, email: true },
    });

    // Create verification token (expires in 24 hours)
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: { identifier: email, token, expires },
    });

    // Send verification email
    const appUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
    const verifyUrl = `${appUrl}/api/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

    await sendVerificationEmail({ to: email, name, verifyUrl });

    return NextResponse.json({ user }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
