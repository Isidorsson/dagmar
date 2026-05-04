# Dagmar Carlssons Hembageri — Website

Modern replacement for [dagmarcarlssons.se](https://www.dagmarcarlssons.se/), built for hand-off to the bakery owner.

- **Public**: hero, cake gallery (filterable by category + dietary tag), custom-order form, real opening hours with holiday closures, Google reviews carousel, news banner, bilingual SV/EN.
- **Admin**: login-protected CRUD over cakes, orders, hours, news, and site settings.

## Stack

| Concern | Tech |
|---|---|
| Framework | SvelteKit 2 + Svelte 5 + TypeScript |
| Styles | Tailwind CSS 4 (via `@tailwindcss/vite`) |
| Backend / DB / file storage (production) | Convex |
| Auth (production) | Clerk |
| Reviews | Google Places API |
| Email | Resend |
| Deploy | Vercel + Convex Cloud |
| Package manager | Bun |

## Demo mode (zero setup)

The site runs with **no API keys required**. When env vars are missing, `src/lib/server/source.ts` falls back to in-memory dummy data (`src/lib/server/dummy.ts`):

- Cake catalogue → 6 sample cakes
- Google reviews → 5 sample reviews
- Custom order form → logs email to console instead of sending

```bash
bun install
bun run dev          # http://localhost:5173
```

### Auth modes (toggle by env var)

| Mode | Trigger | Behavior |
|---|---|---|
| **bypass** *(default)* | nothing set | `/admin/*` open to anyone, banner says "DEMO BYPASS". Forms still mutate in-memory data. |
| **password** | `OWNER_DEMO_PASSWORD=...` in `.env` | Login page at `/admin/login` requires the password. Cookie session for 30 days. |
| **live** | `PUBLIC_CLERK_PUBLISHABLE_KEY=...` | Real Clerk auth flow (swap `src/lib/server/auth.ts` per the production guide below). |

Switching modes is just adding/removing env vars and restarting `bun run dev`.

## Project layout

```
src/
  app.html, app.css, hooks.server.ts
  lib/
    i18n.ts                     simple i18n helper (no build step)
    i18n/messages/{sv,en}.json  translation strings
    components/                 Hero, CakeCard, ReviewCarousel, HoursWidget…
    server/
      source.ts                 single switch: live or demo
      dummy.ts                  in-memory demo data
      email.ts                  Resend wrapper w/ console fallback
      auth.ts                   demo cookie auth (swap for Clerk)
  routes/
    +layout.svelte              header, footer, JSON-LD LocalBusiness
    +page.svelte                home
    tartor/                     gallery + detail
    bestall/                    custom order form
    oppettider/                 opening hours + holidays
    kontakt/                    map, phone, email
    om-oss/                     about
    admin/                      login + dashboard + CRUD pages
    sitemap.xml/+server.ts
convex/                         production schema + functions (Convex)
static/                         favicon, robots.txt
```

## Going to production

1. **Convex** (DB + storage):
   ```bash
   bunx convex dev   # one-time, creates project + writes deploy keys
   ```
   Set `PUBLIC_CONVEX_URL` from the dashboard. Replace dummy-data calls in `src/lib/server/source.ts` with Convex client calls (each function is already designed as a swap-in).
2. **Clerk** (auth):
   - Create app at clerk.com, copy publishable + secret keys to `.env.local`.
   - In Clerk JWT templates, add a `convex` template; copy issuer URL into Convex `auth.config.ts` env var `CLERK_JWT_ISSUER_DOMAIN`.
   - Set `OWNER_CLERK_USER_ID` to the bakery owner's Clerk user ID; the `requireOwner` guard in `convex/_lib/auth.ts` checks it.
   - Replace the demo cookie check in `src/lib/server/auth.ts` with `@clerk/clerk-sveltekit`'s session helpers.
3. **Google Places API** (live reviews):
   - Enable the Places API (New) in Google Cloud Console.
   - Restrict the API key to the Places API + your domain.
   - Get the bakery's Place ID via Place ID Finder.
   - Fill `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` in `.env.local`. Reviews are server-cached for 1 hour.
4. **Resend** (custom-order emails):
   - Create domain at resend.com, verify DNS, fill `RESEND_API_KEY` + `OWNER_EMAIL`.
5. **Vercel** deploy:
   ```bash
   vercel link
   vercel env add ...   # all keys from .env.example
   vercel deploy --prod
   ```
6. Point `dagmarcarlssons.se` DNS at Vercel.

## Env vars

```
PUBLIC_CONVEX_URL=
CONVEX_DEPLOY_KEY=
PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
GOOGLE_PLACES_API_KEY=
GOOGLE_PLACE_ID=
RESEND_API_KEY=
OWNER_EMAIL=
OWNER_CLERK_USER_ID=
OWNER_DEMO_PASSWORD=        # only used in demo mode
```

## Owner cheat sheet

- Sign in at **/admin** (password from owner setup).
- **Tårtor** — add new cake, edit, mark as featured (shows on homepage), delete.
- **Beställningar** — see incoming custom-cake requests, set status (new → seen → accepted/declined).
- **Öppettider** — change weekday hours; toggle "Closed" for permanent closures (holidays go in news banner or as extra `holidays` rows in production).
- **Nyheter** — write announcements; pin one as a banner on the homepage.
- **Inställningar** — update phone, email, address, Google Place ID for live reviews.

## License

Private project. © Dagmar Carlssons Hembageri Eftr.
