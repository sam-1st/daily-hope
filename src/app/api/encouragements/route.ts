import { NextRequest, NextResponse } from "next/server";
import { getEncouragements, searchEncouragements, createEncouragement } from "@/lib/data";
import { z } from "zod";

// GET /api/encouragements?q=keyword — list, optionally filtered by search
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  const items = q ? searchEncouragements(q) : getEncouragements();
  return NextResponse.json({ items });
}

const createSchema = z.object({
  title: z.string().min(3),
  scripture: z.string().min(2),
  scriptureText: z.string().optional(),
  excerpt: z.string().min(10),
  body: z.string().min(20),
  date: z.string(),
  featured: z.boolean().optional(),
});

// POST /api/encouragements — admin-only in production (wire up
// getServerSession(authOptions) here once NextAuth is fully configured).
export async function POST(req: NextRequest) {
  const json = await req.json();
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const item = createEncouragement(parsed.data);
  return NextResponse.json({ item }, { status: 201 });
}
