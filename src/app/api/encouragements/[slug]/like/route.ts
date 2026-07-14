import { NextRequest, NextResponse } from "next/server";
import { likeEncouragement } from "@/lib/data";

// POST /api/encouragements/[slug]/like — no auth required by design.
export async function POST(_req: NextRequest, { params }: { params: { slug: string } }) {
  const item = likeEncouragement(params.slug);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ likes: item.likes });
}
