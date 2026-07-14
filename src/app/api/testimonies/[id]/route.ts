import { NextRequest, NextResponse } from "next/server";
import { setTestimonyStatus } from "@/lib/data";

// PATCH /api/testimonies/[id] — { status: "APPROVED" | "REJECTED" }
// Admin-only in production: guard with getServerSession(authOptions).
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { status } = await req.json();
  if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  setTestimonyStatus(params.id, status);
  return NextResponse.json({ ok: true });
}
