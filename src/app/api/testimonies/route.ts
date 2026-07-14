import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getApprovedTestimonies, getAllTestimonies, submitTestimony } from "@/lib/data";

const submitSchema = z.object({
  name: z.string().max(80).optional(),
  email: z.string().email().optional().or(z.literal("")),
  content: z.string().min(20).max(3000),
  company_website: z.string().max(0).optional(), // honeypot: must stay empty
});

// GET /api/testimonies — approved only, unless ?all=1 (admin use)
export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get("all");
  const items = all ? getAllTestimonies() : getApprovedTestimonies();
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const json = await req.json();
  const parsed = submitSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const item = submitTestimony(parsed.data);
  return NextResponse.json({ item }, { status: 201 });
}
