# GCC Startup CMS — Enterprise-Grade Headless Content Engine & Lead Pipeline

An enterprise-ready, high-performance headless Content Management System and lead processing pipeline built on **Payload CMS 3 (Beta/GA)** and **Next.js 15 (App Router)**. This engine powers the backend, database migrations, localized static page rendering, and marketing integrations for GCC Startup. It is designed for containerized deployment via Docker/Dokploy, connected to PostgreSQL, and integrated with an advanced customer intake flow.

---

## 🏛 Enterprise System Architecture & Integrations

The system decouples content administration from public client actions. It features secure collections, public endpoints, translation automation, and robust webhooks with fault-tolerant integrations.

### Integrated Services Map
* **Headless CMS Engine:** Payload v3 + Next.js 15 Server-Side Rendered (SSR) & static pre-rendering.
* **Lead Integration Hub:** Direct asynchronous ingestion pipeline to **Twenty CRM**.
* **Intelligent WhatsApp Dispatcher:** Relays real-time agent/lead alerts via **WAHA** (WhatsApp HTTP API) with dynamic fallback routes through **n8n orchestration**.
* **Meta Conversions API (CAPI):** Server-to-server privacy-preserving marketing conversion tracking with SHA-256 PII hashing.

---

## 📊 System Workflow Diagrams

### 1. Unified Lead Intake & Enrichment Pipeline

Below is the execution flow when a prospective founder submits a form on the marketing static site or global landing pages.

```mermaid
sequenceDiagram
    autonumber
    actor Visitor as Web Visitor
    participant Frontend as Hostinger Static Site / Webapp
    participant CMS as Next.js 15 / Payload CMS API
    participant DB as PostgreSQL Database
    participant CRM as Twenty CRM rest API
    participant Meta as Meta Conversions API (CAPI)
    participant n8n as n8n Webhook (Typing Sequence)
    participant WAHA as WAHA (Direct WhatsApp Gateway)
    participant Admin as GCC Admin (+971 5x...)

    Visitor->>Frontend: Fills and Submits Lead Form (Name, Email, WhatsApp, Country)
    Note over Frontend: Captures fbclid, eventId, and Client IP
    Frontend->>CMS: Secure HTTPS POST to `/api/lead`
    
    rect rgb(235, 245, 255)
        Note over CMS: Handler runs with overrideAccess: true
        CMS->>DB: Stores Lead record (Enriched with clientIp, userAgent, fbclid)
    end
    
    CMS-->>Frontend: Returns HTTPS 200 { ok: true } (Fast Response)
    
    Note over CMS: Triggers asynchronous post-commit afterChange hook (Non-blocking)

    par Parallel Asynchronous Processes
        CMS->>CRM: POST /people & /notes (Create Person & Map Target notes)
        CMS->>Meta: Hash PII (SHA-256) & POST to Meta Graphic API /events
    end

    alt Is n8n Webhook Configured?
        CMS->>n8n: POST Lead Data & Pre-formed Copy templates
        n8n->>WAHA: Emulates human typing (Start typing -> delay -> Stop -> Send)
        WAHA-->>Visitor: Message delivered (Fluid, organic conversation)
    else Fallback to Direct Gateway
        CMS->>WAHA: Direct POST to `/api/sendText`
        WAHA-->>Admin: Pushes Alert: 🟠 "New GCC Startup lead..."
        WAHA-->>Visitor: Pushes welcome SMS: "Hi [First Name], thanks..."
    end
```

---

## 🛠 Tech Stack Specification

* **Framework:** Next.js 15.1 (using App Router, force-dynamic API routes, and optimized build engines)
* **CMS Platform:** Payload CMS 3.0 (utilizing server-side database migrations, RSC layouts, and modern import maps)
* **Database Driver:** `@payloadcms/db-postgres` connected via secure connection pools.
* **Rich Text Core:** Lexical Editor (`@payloadcms/richtext-lexical`) with fully mapped clients.
* **Image Processor:** Sharp (installed as server-external package to prevent bundling overhead)
* **Package Manager:** `pnpm` (configured with strict engines and package locking)

---

## 📂 Enterprise Repository Layout

```
├── .next/                   # Next.js optimization and compile caches
├── embeds/                  # Pre-made embeddable HTML assets (WA chat bubble, banners, CTA buttons)
├── n8n/                     # JSON schema of the workflow engine for human-like typing sequences
├── src/
│   ├── app/                 # Next.js App Router Structure
│   │   ├── (payload)/       # Payload CMS core router, scss, layout, and admin portals
│   │   │   ├── admin/       # Auto-generated Import Mapping (importMap.js)
│   │   │   └── api/         # Core CMS REST and GraphQL query gateways
│   │   └── (frontend)/      # Dynamic frontend pages & custom marketing routers
│   ├── collections/         # Database models (Countries, Services, PricingTiers, Posts, Leads, Media, Users)
│   ├── globals/             # Global configurations (Homepage contents, siteSettings, PartnerPage templates)
│   ├── endpoints/           # Custom, lightweight REST endpoints (/api/lead and /api/partner-apply)
│   ├── lib/                 # Core server library modules (renderSite, leadIntegrations, partnerIntegrations)
│   └── site/                # High-performance i18n CommonJS dictionary and site compiler
│       ├── locales/         # Translated static UI JSON files
│       └── generator.cjs    # CommonJS site compiler driven by CMS values
├── website-static/          # Core optimized landing pages (re-usable templates)
├── Dockerfile               # Multi-stage production container build schema
├── docker-compose.yml       # Standard local dev environment compose setup
├── tsconfig.json            # Strict type system compiler settings
└── seed.ts                  # Idempotent baseline data seeder
```

---

## ⚙️ Environment Variables Matrix (.env)

Ensure your `.env` contains the keys structured as follows:

| Environment Variable | Description | Default / Example | Security Classification |
|---|---|---|---|
| `DATABASE_URI` | Full PostgreSQL connection string | `postgres://gcc:gcc@postgres:5432/gccstartup` | Secret |
| `PAYLOAD_SECRET` | Secret key used for cryptographic signing of CMS tokens | `long-random-alphanumeric-string` | Secret |
| `ALLOWED_ORIGINS` | Comma-separated whitelist of client origins for CORS/CSRF | `https://gccstartup.com,http://localhost:3000` | Restricted |
| `MEDIA_DIR` | Directory mapping on disk for uploaded attachments | `/app/media` | Public |
| `TWENTY_BASE_URL` | Base API endpoint for the Twenty CRM Instance | `https://api.twenty.com` | Public |
| `TWENTY_API_KEY` | Bearer API token for Twenty CRM REST client | `twenty_token_xyz123` | Secret |
| `WAHA_BASE_URL` | Base HTTP endpoint of the WhatsApp Gateway service | `http://waha:3000` | Internal |
| `WAHA_SESSION` | Configured active WAHA whatsapp session | `default` | Public |
| `WAHA_API_KEY` | Access token for WAHA HTTP API gateway authentication | `waha_secret_abc` | Secret |
| `ADMIN_WHATSAPP` | Admin mobile number including country prefix | `971501234567` | Restricted |
| `NOTIFY_LEAD` | Direct boolean toggle to send automated response SMS to leads | `true` | Public |
| `N8N_WEBHOOK_URL` | If configured, bypasses WAHA and delegates sequence to n8n | `https://n8n.gccstartup.com/webhook/flow` | Secret |
| `META_PIXEL_ID` | Identifies your Meta pixel for Conversion API (CAPI) | `1234567890` | Public |
| `META_ACCESS_TOKEN`| Secure System User Token for Meta Conversions API | `EAAB...` | Secret |
| `META_TEST_EVENT_CODE` | Code used to verify events in Meta Event Manager | `TEST12345` | Restricted (Debug only) |

---

## 💻 Local Development Setup

### Prerequisites
* Node.js `>= 22.13.0` (V8 engine optimal)
* PostgreSQL database instance running or Docker
* `pnpm` Package Manager (Version `^11.0.0`)

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/gccstartup/gccstartup-cms.git
   cd gccstartup-cms
   ```

2. **Configure Environment:**
   ```bash
   cp .env.example .env
   # Edit .env and enter correct DATABASE_URI and PAYLOAD_SECRET
   ```

3. **Install Dependencies:**
   ```bash
   pnpm install
   ```

4. **Initialize Core Modules & Types:**
   ```bash
   pnpm generate:importmap
   pnpm generate:types
   ```

5. **Start Dev Server:**
   ```bash
   pnpm dev
   ```
   Navigate to `http://localhost:3000/admin` to set up your primary developer credentials.

6. **Seed Database:**
   To import the original, pre-migrated services, prices, and country options into PostgreSQL:
   ```bash
   pnpm seed
   ```

---

## 🌐 Dynamic Internationalization (i18n) Engine

The localization system supports **8 global languages**:
* **English (`en`)** - Primary / Default Location
* **Arabic (`ar`)** - Fully Right-to-Left (RTL) styled CSS
* **Chinese (`zh`)** - Traditional characters
* **German (`de`)**, **French (`fr`)**, **Dutch (`nl`)**, **Spanish (`es`)**, **Italian (`it`)**

### Deep-Translate Engine (`translate.ts`)
We utilize the Google Cloud Translation V2 REST API to automatically translate UI chrome strings, CMS collections, and base64 static index page blocks.

1. Configure your API key in `.env`:
   ```bash
   GOOGLE_TRANSLATE_API_KEY=AIzaSy...
   ```
2. Trigger the automated machine translation sweep:
   ```bash
   pnpm translate
   ```
This processes:
* **A) UI Chrome Strings:** Reads `STRINGS` from `src/site/i18n.cjs`, translates placeholders safely, and writes outputs to `src/site/locales/<code>.json`.
* **B) CMS Content:** Translates all untranslated string properties inside `Countries`, `Services`, `PricingTiers`, `Homepage`, and `SiteSettings` and writes them into localized database rows.
* **C) Main Template:** Encodes and outputs optimized `indexHtml.<code>.b64.cjs` files.

---

## 🚀 Production Deployment Guidelines

Our production infrastructure utilizes **Dokploy** combined with **Docker multi-stage builds** and **Postgres**.

### Docker Deployment Strategy

The included multi-stage `Dockerfile` leverages Node.js 22 alpine images, performing clean compilation steps while excluding non-essential build packages from the production image to keep memory consumption low.

#### Step-by-Step Dokploy/Dokku Deploy

1. **Provision PostgreSQL Database:**
   * Create a PostgreSQL database service in your Dokploy project dashboard.
   * Note down the internal connection URI, e.g., `postgres://gcc:password@postgres-service:5432/gccstartup`.

2. **Provision Web Application:**
   * Create a new application pointing to this Git repository's `main` branch.
   * Set the build pack type to **Dockerfile**.

3. **Establish Persistent Storage (Media Directory):**
   * Since Docker containers have ephemeral file systems, you MUST mount a persistent host directory to the container to prevent user uploads from being deleted during deployments.
   * Under the **Volumes** tab, add a new mount:
     * **Host Path:** `/var/lib/dokploy/media` (or similar host-level path)
     * **Container Path:** `/app/media` (Matching `MEDIA_DIR` environment setting)

4. **Add Environment Variables:**
   * Add all required environment keys to the **Environment Variables** tab.
   * Set `PORT` = `3000`.
   * Ensure `ALLOWED_ORIGINS` has `https://gccstartup.com,https://cms.gccstartup.com`.

5. **Expose Ports & Domain Routing:**
   * Under **Domains**, map your admin domain (e.g. `cms.gccstartup.com`).
   * Set **Port Mapping** to target container port `3000`.
   * Enable automatic Let's Encrypt SSL.

6. **Trigger Deployment:**
   * Build and release. After completion, access the terminal under the application's **Console** tab on Dokploy and run:
     ```bash
     pnpm seed
     ```
     This initializes all production content inside Postgres.

---

## 🔒 Security & Performance Policies

* **CORS & CSRF Isolation:** The allowed origins are parsed from `.env` dynamically and enforced on the endpoints, blocking unapproved scrapers or unauthorized third-party cross-origin requests.
* **Non-blocking Hooks:** Database hooks (e.g., sending leads to WhatsApp or CRM) are run asynchronously within catch-all wrappers, ensuring that network lag on third-party APIs never stalls the database or blocks HTTP response loops.
* **Secure PII Hashing:** All marketing trackers receive only hashed PII signatures (SHA-256) satisfying worldwide GDPR/CCPA consumer data compliance standards.
