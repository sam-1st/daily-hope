import { NextRequest, NextResponse } from "next/server";
import { getEncouragementBySlug, updateEncouragement, deleteEncouragement } from "@/lib/data";

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const item = getEncouragementBySlug(params.slug);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PATCH(req: NextRequest, { params }: { params: { slug: string } }) {
  const existing = getEncouragementBySlug(params.slug);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const data = await req.json();
  const item = updateEncouragement(existing.id, data);
  return NextResponse.json({ item });
}

export async function DELETE(_req: NextRequest, { params }: { params: { slug: string } }) {
  const existing = getEncouragementBySlug(params.slug);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  deleteEncouragement(existing.id);
  return NextResponse.json({ ok: true });
}
