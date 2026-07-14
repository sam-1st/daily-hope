/**
 * In-memory sample data so the site is fully browsable out of the box.
 *
 * This file is ONLY a placeholder data source. Once DATABASE_URL is set
 * and `npx prisma migrate dev` has been run, swap the functions in
 * src/app/api/**\/route.ts to read from `prisma` (see src/lib/prisma.ts)
 * instead of this file. The shapes already match the Prisma schema in
 * prisma/schema.prisma, so the swap is mostly a find-and-replace.
 */
import { Encouragement, Testimony, ContactMessage } from "@/types";
import { slugify } from "./utils";

const seedEncouragements: Omit<Encouragement, "id" | "slug">[] = [
  {
    title: "You Are Not Forgotten",
    scripture: "Isaiah 49:15-16",
    scriptureText:
      "Can a mother forget the baby at her breast... I have engraved you on the palms of my hands.",
    excerpt:
      "Even on the days you feel invisible, you are held in mind, on purpose, by name.",
    body: "There are seasons when it feels like life is moving on without you — messages unanswered, plans unmade, your name slipping out of the conversation. It is easy, in those quiet stretches, to wonder if you are forgotten.\n\nIsaiah answers that fear with an image almost too tender to imagine: your name engraved on open palms. Not written on paper that can be lost. Not spoken once and let go. Engraved — carried, deliberately, in the place a hand cannot help but notice.\n\nWhatever today has felt like, you were thought of before it began. Let that be enough to steady you, even for the next hour.",
    date: "2026-07-10",
    likes: 128,
    featured: true,
  },
  {
    title: "Strength for the Waiting",
    scripture: "Isaiah 40:31",
    scriptureText:
      "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.",
    excerpt:
      "Waiting isn't wasted time — it's where strength is quietly being renewed.",
    body: "Waiting rooms, inboxes, and empty calendars all share the same discomfort: nothing seems to be happening. But renewal is rarely loud. Roots grow underground long before anything breaks the surface.\n\nIf you're in a waiting season, you are not stuck — you are being strengthened for what's next, even in ways you can't yet see.",
    date: "2026-07-08",
    likes: 94,
  },
  {
    title: "A Quiet Kind of Courage",
    scripture: "Joshua 1:9",
    scriptureText:
      "Be strong and courageous. Do not be afraid; do not be discouraged.",
    excerpt: "Courage doesn't always roar. Sometimes it just shows up again tomorrow.",
    body: "We tend to picture courage as dramatic — a single bold moment. But most courage looks smaller than that: getting up again, making the call, trying once more after a hard week.\n\nWhatever you're facing, showing up today counts as courage too.",
    date: "2026-07-05",
    likes: 61,
  },
  {
    title: "Enough for Today",
    scripture: "Matthew 6:34",
    scriptureText:
      "Do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
    excerpt: "You were never meant to carry tomorrow's weight today.",
    body: "So much of our exhaustion comes from carrying two days at once — today's demands and tomorrow's fears. This verse gives permission to set one of them down.\n\nToday has what it needs. Tomorrow will be met when it comes.",
    date: "2026-07-01",
    likes: 73,
  },
];

let encouragements: Encouragement[] = seedEncouragements.map((e, i) => ({
  ...e,
  id: String(i + 1),
  slug: slugify(e.title),
}));

let testimonies: Testimony[] = [
  {
    id: "1",
    name: "A grateful reader",
    content:
      "I found this site during a really hard month. Reading the daily message became something I looked forward to, and slowly things felt lighter. Thank you for keeping it simple and honest.",
    date: "2026-06-20",
    status: "APPROVED",
  },
  {
    id: "2",
    name: null,
    content:
      "I don't usually comment on anything online, but I wanted to say that the Isaiah 40 post reached me at exactly the right time. Sharing this as encouragement to whoever reads it next.",
    date: "2026-06-28",
    status: "APPROVED",
  },
];

let contactMessages: ContactMessage[] = [];

export function getEncouragements() {
  return [...encouragements].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getFeaturedEncouragement() {
  return (
    encouragements.find((e) => e.featured) ||
    getEncouragements()[0]
  );
}

export function getEncouragementBySlug(slug: string) {
  return encouragements.find((e) => e.slug === slug) || null;
}

export function searchEncouragements(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return getEncouragements();
  return getEncouragements().filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.excerpt.toLowerCase().includes(q) ||
      e.scripture.toLowerCase().includes(q)
  );
}

export function createEncouragement(data: Omit<Encouragement, "id" | "slug" | "likes">) {
  const item: Encouragement = {
    ...data,
    id: String(Date.now()),
    slug: slugify(data.title),
    likes: 0,
  };
  encouragements.unshift(item);
  return item;
}

export function updateEncouragement(id: string, data: Partial<Encouragement>) {
  encouragements = encouragements.map((e) =>
    e.id === id ? { ...e, ...data, slug: data.title ? slugify(data.title) : e.slug } : e
  );
  return encouragements.find((e) => e.id === id) || null;
}

export function deleteEncouragement(id: string) {
  encouragements = encouragements.filter((e) => e.id !== id);
}

export function likeEncouragement(slug: string) {
  const e = encouragements.find((e) => e.slug === slug);
  if (e) e.likes += 1;
  return e;
}

export function getApprovedTestimonies() {
  return testimonies
    .filter((t) => t.status === "APPROVED")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllTestimonies() {
  return [...testimonies].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function submitTestimony(data: { name?: string; content: string }) {
  const item: Testimony = {
    id: String(Date.now()),
    name: data.name || null,
    content: data.content,
    date: new Date().toISOString(),
    status: "PENDING",
  };
  testimonies.unshift(item);
  return item;
}

export function setTestimonyStatus(id: string, status: Testimony["status"]) {
  testimonies = testimonies.map((t) => (t.id === id ? { ...t, status } : t));
}

export function getContactMessages() {
  return [...contactMessages].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function submitContactMessage(data: { name: string; email: string; message: string }) {
  const item: ContactMessage = {
    id: String(Date.now()),
    ...data,
    date: new Date().toISOString(),
    read: false,
  };
  contactMessages.unshift(item);
  return item;
}
