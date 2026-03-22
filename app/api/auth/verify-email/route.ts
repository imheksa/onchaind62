import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token || !email) {
    return NextResponse.redirect(new URL("/login?error=invalid-link", req.url));
  }

  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record || record.identifier !== email || record.expires < new Date()) {
    return NextResponse.redirect(new URL("/login?error=link-expired", req.url));
  }

  await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({ where: { token } });

  return NextResponse.redirect(new URL("/login?verified=1", req.url));
}
