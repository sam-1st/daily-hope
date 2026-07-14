import { NextRequest, NextResponse } from "next/server";

// Placeholder mark-as-read endpoint. src/lib/data.ts doesn't currently
// track per-message updates for contact messages beyond creation — extend
// getContactMessages()/data model here once wired to Prisma.
export async function PATCH(_req: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ ok: true, id: params.id });
}
