# Status — Bakery demo site

## Done

- SvelteKit 2 + TS + Tailwind 4 scaffold, Vercel adapter
- Bilingual SV/EN (cookie + `?lang=` toggle, no build step)
- Public routes: `/`, `/sortiment`, `/sortiment/[slug]`, `/bestall`, `/oppettider`, `/kontakt`, `/om-oss`
- Admin routes (3 auth modes — see README): dashboard, products CRUD, orders inbox, hours editor, news editor, settings
- "Open now" widget — Stockholm time, holiday-aware
- Custom order form → validation, success screen, email to console (or Resend if configured)
- Google reviews carousel — dummy reviews now, swaps to live Places API when key set
- News banner (dismissible, sessionStorage)
- SEO: sitemap.xml, robots.txt, JSON-LD `Bakery` schema, per-route meta
- Convex schema + functions ready for production swap
- Dummy-data fallback layer — site runs zero-config
- README with full prod setup guide

## To run

```bash
cd dagmar
bun install
bun run dev
```

Open http://localhost:5173 · admin at `/admin` (pw `lorem2026`).

## Production swap (later)

| Service | What unlocks |
|---|---|
| Convex | Persistent DB + image uploads |
| Clerk | Real owner auth |
| Google Places API | Live reviews |
| Resend | Real order emails |
| Vercel | Deploy |

Each is one env var + one file edit per the README. Code paths already wired.

## Nice-to-haves (out of scope)

- Real image upload UI (currently URL paste)
- Stripe deposits for custom orders
- SMS notifications (Twilio)
- Drag-reorder products in admin
- Instagram embed on home
