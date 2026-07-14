import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitContactMessage } from "@/lib/data";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(3000),
  company_website: z.string().max(0).optional(), // honeypot
});

export async function POST(req: NextRequest) {
  const json = await req.json();
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { name, email, message } = parsed.data;
  const item = submitContactMessage({ name, email, message });
  return NextResponse.json({ item }, { status: 201 });
}
