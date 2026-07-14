# Daily Hope

A calm, modern platform for daily encouragements, scripture reflections, and
reader testimonies — not affiliated with any church or ministry.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion,
Prisma, and NextAuth.

## Renaming the site

The display name is read from `NEXT_PUBLIC_SITE_NAME` in `.env` (defaults to
"Daily Hope" if unset) — change it there and in `package.json`'s `name`
field. No other code changes are needed.

## Quick start (demo mode — no database required)

The app ships with an in-memory data layer (`src/lib/data.ts`) pre-seeded
with sample encouragements and testimonies, so you can run and browse the
whole public site immediately:

```bash
npm install
npm run dev
```

Open http://localhost:3000. Public pages (home, encouragements,
testimonies, contact, support) work fully. Data resets whenever the dev
server restarts, since nothing is persisted yet.

The **admin dashboard** (`/admin`) requires a real database — see below —
because sign-in looks up an `Admin` row via Prisma.

## Full setup (with a real database)

1. Create a Postgres database (a free [Supabase](https://supabase.com)
   project works well) and copy its connection string.
2. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — your Postgres connection string
   - `NEXTAUTH_SECRET` — any long random string (`openssl rand -base64 32`)
   - `NEXTAUTH_URL` — `http://localhost:3000` in dev
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — credentials for the first admin
     account (used only by the seed script)
3. Run migrations and seed the first admin:
   ```bash
   npx prisma migrate dev --name init
   npx tsx prisma/seed.ts
   ```
4. Swap the API routes in `src/app/api/**/route.ts` from the in-memory
   helpers in `src/lib/data.ts` to Prisma queries via `src/lib/prisma.ts`.
   The shapes already match `prisma/schema.prisma`, so this is mostly a
   find-and-replace inside each route handler.
5. `npm run dev`, then sign in at `/admin/login` with the admin credentials
   from step 2.

## Project structure

```
src/
  app/                  routes (App Router)
    (public pages)
    admin/
      login/             public sign-in page
      (dashboard)/        guarded admin routes (layout checks the session)
    api/                  route handlers
  components/             reusable UI (cards, forms, nav, footer, toasts...)
  lib/                    data access, auth config, utilities
  types/                  shared TypeScript types
prisma/
  schema.prisma           Admin, Encouragement, Testimony, ContactMessage, SupportSettings
  seed.ts                 creates the first admin account
```

## Editing the Support section

M-Pesa and PayPal details live at the top of
`src/components/SupportSection.tsx` as plain constants — edit `MPESA_NAME`,
`MPESA_TILL`, and `PAYPAL_LINK` directly. Once the database is connected,
wire this up to the `SupportSettings` model instead so it's editable from
`/admin/settings`.

## Notes on what's stubbed vs. production-ready

- **Frontend**: fully built — every page, component, animation, and
  responsive layout described in the brief is implemented and usable today.
- **Spam protection**: contact and testimony forms include a honeypot field
  and basic validation (zod). For production, consider adding rate limiting
  or a CAPTCHA at the API route level.
- **Auth**: NextAuth is fully wired for credentials-based admin login; it
  just needs a live database to check against.
- **Image uploads (Cloudinary)**: not wired up yet — the brief marked this
  optional/future. `next.config.js` already allow-lists Cloudinary's image
  domain for when you add it.
- **API routes**: currently read/write `src/lib/data.ts`'s in-memory store.
  Swapping to Prisma (step 4 above) makes everything persistent.

## Deployment

Any Next.js host works (Vercel is the simplest). Set the same environment
variables from `.env` in your host's dashboard, run the Prisma migration
against your production database, and seed the first admin account.
