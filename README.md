# GCC Startup — CMS (Payload 3 + Next.js)

The admin panel, content API and lead pipeline for **GCC Startup**, deployed as one Docker service on **Dokploy** with **Postgres**. Edit countries, services, pricing, homepage copy, **SEO meta** and the **blog** at `/admin`. The website's lead form posts to `POST /api/lead` → saved in Payload → pushed to **Twenty CRM** + **WAHA** WhatsApp (admin + lead).

> The public marketing site source lives in [`website-static/`](./website-static) (the current live site). It also provides the seed data via `build_pages.js`. Binding that site to render live from this CMS is the next milestone.

---

## Stack
- **Payload 3** (admin + REST/GraphQL API) on **Next.js 15** (App Router)
- **Postgres** (`@payloadcms/db-postgres`)
- **SEO plugin** (`@payloadcms/plugin-seo`) — meta title/description/OG per page
- Lead intake → **Twenty CRM** + **WAHA** WhatsApp (`src/lib/leadIntegrations.ts`, `src/endpoints/lead.ts`)

## Local development
```bash
pnpm install
cp .env.example .env          # set DATABASE_URI + PAYLOAD_SECRET (Twenty/WAHA optional locally)
pnpm dev                      # http://localhost:3000  (admin: /admin)
# create the first admin user, then:
pnpm seed                     # import all existing content (idempotent)
```

## Environment (.env)
See `.env.example`. Keys: `DATABASE_URI`, `PAYLOAD_SECRET`, `ALLOWED_ORIGINS`, `MEDIA_DIR`,
`TWENTY_BASE_URL`, `TWENTY_API_KEY`, `WAHA_BASE_URL`, `WAHA_SESSION`, `WAHA_API_KEY`,
`ADMIN_WHATSAPP`, `NOTIFY_LEAD`.

## Deploy on Dokploy
1. **Postgres** service → copy its internal connection string into `DATABASE_URI`.
2. **Application** from this GitHub repo → build type **Dockerfile**.
3. Set all env vars (Environment tab). `WAHA_BASE_URL` = your WAHA service internal URL (e.g. `http://gcc-waha:3000`).
4. Add a **persistent volume** mount at `/app/media`.
5. **Domain** → `cms.gccstartup.com`, port `3000`, enable SSL.
6. Deploy. Open `/admin`, create the admin user, then run `pnpm seed` (app terminal) — or run seed locally against the prod `DATABASE_URI`.

## Connect the live static site to leads
In `website-static/index.html` and `website-static/build_pages.js`, set
`const LEAD_ENDPOINT = 'https://cms.gccstartup.com/api/lead'`, run `node build_pages.js`,
re-upload the HTML to Hostinger, and add `https://gccstartup.com` to `ALLOWED_ORIGINS`.

## Project layout
```
src/
  payload.config.ts          Payload config (collections, globals, SEO, lead endpoint)
  collections/               Countries, Services, PricingTiers, Posts(blog), Leads, Media, Users
  globals/                   Homepage, SiteSettings
  lib/leadIntegrations.ts    Twenty CRM + WAHA
  endpoints/lead.ts          POST /api/lead
  app/(payload)/             Admin UI + REST/GraphQL routes (standard Payload Next boilerplate)
  app/(frontend)/            CMS landing page (links to /admin)
seed.ts                      Imports website-static/build_pages.js data into Payload
website-static/              Current live marketing site + build_pages.js (seed source)
Dockerfile, docker-compose.yml
```

## Roadmap
- [x] CMS: collections, globals, SEO, blog
- [x] Lead pipeline: /api/lead → Twenty + WAHA
- [x] Seed from existing content
- [x] Docker + Dokploy deploy
- [ ] **Frontend port** — render the marketing site (home, country, service, pricing, blog) live from this CMS, reusing the existing design + microtools
