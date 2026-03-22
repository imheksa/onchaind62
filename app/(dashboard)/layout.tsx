import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/course/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      <Sidebar user={session.user} />
      {/* pt-14 on mobile accounts for the fixed top bar */}
      <main className="flex-1 md:ml-64 pt-14 md:pt-0 p-4 md:p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
