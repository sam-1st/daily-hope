import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminShell from "./AdminShell";

// Guards every route in this group. If DATABASE_URL isn't configured yet,
// getServerSession will simply fail to authenticate anyone — see README.md
// for how to set up the database and seed the first admin account.
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  return <AdminShell userName={session.user?.name || "Admin"}>{children}</AdminShell>;
}
