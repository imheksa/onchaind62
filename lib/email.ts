import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail({
  to,
  name,
  verifyUrl,
}: {
  to: string;
  name: string;
  verifyUrl: string;
}) {
  const { data, error } = await resend.emails.send({
    from: "onchaindo <onboarding@resend.dev>",
    to,
    subject: "Verifikasi Email Anda — onchaindo",
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8" /><title>Verifikasi Email</title></head>
        <body style="font-family: Arial, sans-serif; background: #f9fafb; margin: 0; padding: 0;">
          <div style="max-width: 560px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">

            <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 36px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">⛓ onchaindo</h1>
              <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Platform Belajar On-Chain Analysis</p>
            </div>

            <div style="padding: 36px;">
              <p style="font-size: 17px; color: #111827; margin-top: 0;">Halo, <strong>${name}</strong>!</p>

              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 28px;">
                Terima kasih sudah mendaftar di onchaindo. Satu langkah lagi —
                klik tombol di bawah untuk memverifikasi email Anda dan mulai belajar.
              </p>

              <div style="text-align: center; margin: 32px 0;">
                <a href="${verifyUrl}"
                   style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 14px 36px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: 600; display: inline-block;">
                  Verifikasi Email Saya
                </a>
              </div>

              <p style="color: #9ca3af; font-size: 13px; line-height: 1.6;">
                Link ini berlaku selama <strong>24 jam</strong>. Jika Anda tidak mendaftar, abaikan email ini.<br/><br/>
                Jika tombol tidak berfungsi, salin link berikut ke browser:<br/>
                <a href="${verifyUrl}" style="color: #6366f1; word-break: break-all; font-size: 12px;">${verifyUrl}</a>
              </p>
            </div>

            <div style="border-top: 1px solid #e5e7eb; padding: 18px 36px; text-align: center;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} onchaindo · Dibuat untuk komunitas Web3 Indonesia
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function sendPasswordResetEmail({
  to,
  name,
  resetUrl,
}: {
  to: string;
  name: string;
  resetUrl: string;
}) {
  const { data, error } = await resend.emails.send({
    from: "onchaindo <onboarding@resend.dev>",
    to,
    subject: "Reset Password Anda — onchaindo",
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8" /><title>Reset Password</title></head>
        <body style="font-family: Arial, sans-serif; background: #f9fafb; margin: 0; padding: 0;">
          <div style="max-width: 560px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 36px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">⛓ onchaindo</h1>
              <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Platform Belajar On-Chain Analysis</p>
            </div>
            <div style="padding: 36px;">
              <p style="font-size: 17px; color: #111827; margin-top: 0;">Halo, <strong>${name}</strong>!</p>
              <p style="color: #4b5563; line-height: 1.6; margin-bottom: 28px;">
                Kami menerima permintaan reset password untuk akun Anda.
                Klik tombol di bawah untuk membuat password baru. Link ini berlaku selama <strong>1 jam</strong>.
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="${resetUrl}"
                   style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 14px 36px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: 600; display: inline-block;">
                  Reset Password Saya
                </a>
              </div>
              <p style="color: #9ca3af; font-size: 13px; line-height: 1.6;">
                Jika Anda tidak meminta reset password, abaikan email ini — password Anda tidak akan berubah.<br/><br/>
                Jika tombol tidak berfungsi, salin link berikut:<br/>
                <a href="${resetUrl}" style="color: #6366f1; word-break: break-all; font-size: 12px;">${resetUrl}</a>
              </p>
            </div>
            <div style="border-top: 1px solid #e5e7eb; padding: 18px 36px; text-align: center;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} onchaindo · Dibuat untuk komunitas Web3 Indonesia
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function sendCertificateEmail({
  to,
  name,
  courseName,
  claimUrl,
}: {
  to: string;
  name: string;
  courseName: string;
  claimUrl: string;
}) {
  const { data, error } = await resend.emails.send({
    from: "onchaindo <onboarding@resend.dev>",
    to,
    subject: `🎓 Selamat! Sertifikat ${courseName} Anda Siap`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Sertifikat onchaindo</title>
        </head>
        <body style="font-family: Arial, sans-serif; background: #f9fafb; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

            <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🎓 onchaindo</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Sertifikat Kelulusan</p>
            </div>

            <div style="padding: 40px;">
              <p style="font-size: 18px; color: #111827;">Halo, <strong>${name}</strong>!</p>

              <p style="color: #4b5563; line-height: 1.6;">
                Selamat! Anda telah berhasil menyelesaikan kursus
                <strong style="color: #6366f1;">${courseName}</strong>
                di onchaindo dengan nilai di atas 85%.
              </p>

              <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">Klik tombol di bawah untuk mengklaim sertifikat Anda</p>
              </div>

              <div style="text-align: center; margin: 32px 0;">
                <a href="${claimUrl}"
                   style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: 600; display: inline-block;">
                  Klaim Sertifikat Saya
                </a>
              </div>

              <p style="color: #9ca3af; font-size: 13px; text-align: center;">
                Link berlaku selama 30 hari. Jika tombol tidak berfungsi, copy link berikut:<br/>
                <a href="${claimUrl}" style="color: #6366f1; word-break: break-all;">${claimUrl}</a>
              </p>
            </div>

            <div style="border-top: 1px solid #e5e7eb; padding: 20px 40px; text-align: center;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} onchaindo. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  });

  if (error) throw new Error(error.message);
  return data;
}
