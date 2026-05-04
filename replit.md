# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

---

## IEEE Kerala ATIIG Website (`artifacts/ieee-atiig`)

### Overview
A full 8-page website for the IEEE Kerala Assistive Technology & Inclusive Innovation Group (ATIIG). Built with React + Vite + TypeScript + shadcn/ui + Tailwind CSS.

### Artifact Details
- **Artifact ID**: artifacts/ieee-atiig
- **Kind**: web
- **Preview path**: `/`
- **Port**: 22892
- **Directory**: `artifacts/ieee-atiig/`

### Brand Identity
- **Primary/Navy**: `#023A74`
- **Purple**: `#642396`
- **Orange (CTAs)**: `#FD7B09`
- **Teal**: `#01A0A0`
- **Font**: Montserrat (Google Fonts)
- **Color logo**: `@assets/ATII_CLR_1777748066607.png`
- **White logo**: `@assets/ATII_WHITE_1777748066607.png`

### Pages (8 total)
| Path | File | Description |
|------|------|-------------|
| `/` | `src/pages/home.tsx` | Homepage with hero, impact stats, initiatives overview, data charts |
| `/about` | `src/pages/about.tsx` | About ATIIG, mission/vision, team, journey timeline, partners |
| `/initiatives` | `src/pages/initiatives.tsx` | All 6 initiatives with filterable cards and search |
| `/projects` | `src/pages/projects.tsx` | Projects & impact with SDG alignment |
| `/resources` | `src/pages/resources.tsx` | Resources & Publications with search |
| `/get-involved` | `src/pages/get-involved.tsx` | Volunteer, membership, partnerships, donations |
| `/news-events` | `src/pages/news-events.tsx` | Upcoming events, calendar, latest news |
| `/contact` | `src/pages/contact.tsx` | Contact form, office info, map, partnerships |

### Shared Components (`src/components/`)
- `Layout.tsx` — wraps every page with AccessibilityToolbar + Header + Footer
- `Header.tsx` — sticky nav with dropdowns (NavigationMenu), mobile Sheet drawer, active link highlighting
- `Footer.tsx` — dark navy footer with social icons (react-icons/fa)
- `AccessibilityToolbar.tsx` — font size controls, high contrast, text-only, skip-to-content
- `StatCounter.tsx` — animated counting numbers
- `PartnerCarousel.tsx` — scrolling partner logos
- `NewsletterStrip.tsx` — email signup strip

### Key Libraries
- `wouter` — client-side routing (base from `import.meta.env.BASE_URL`)
- `framer-motion` — scroll and entrance animations
- `recharts` — data charts on home and projects pages
- `lucide-react` — icons
- `react-icons/fa` — social media icons in footer
- `@radix-ui/*` (via shadcn/ui) — accessible UI primitives

### Testing Data-Testids
- `toolbar-accessibility` — accessibility bar
- `header-main` — header
- `footer-main` — footer
- `link-logo-header` / `link-footer-logo` — logos
- `nav-link-home`, `nav-link-about-us`, `nav-link-contact` — simple nav links
- `nav-dropdown-initiatives`, `nav-dropdown-about-us` — nav dropdown triggers
- `btn-font-small`, `btn-font-normal`, `btn-font-large` — font size buttons
- `toggle-high-contrast`, `toggle-text-only` — accessibility toggles
- `btn-mobile-menu` — mobile hamburger
- `btn-donate-header`, `btn-mobile-donate` — donate buttons

### Workflow
- Dev server: `pnpm --filter @workspace/ieee-atiig run dev`
- Vite dev port: 22892

### SEO / GEO Improvements (May 2026)
- `react-helmet-async` for per-route meta + JSON-LD via `src/components/SEO.tsx`
- `index.html` holds only sitewide-stable signals: charset/viewport/theme-color, default title/description, sitewide OG defaults (`og:type`, `og:site_name`, `og:image`, `og:locale`), Twitter card/site, geo signals (IN-KL), favicon/manifest, font preconnect, and a sitewide Organization+WebSite JSON-LD `@graph` (NGO + EducationalOrganization).
- Per-route `<SEO />` owns: `<title>`, `description`, `keywords`, `robots`, `canonical`, `og:title/description/url/image`, `twitter:title/description/image`, plus per-page JSON-LD (`BreadcrumbList`, `FAQPage`, `CollectionPage`, `ContactPage`, `AboutPage`).
- FAQ schemas on `/` (5 Q&As) and `/get-involved` (3 Q&As) for GEO/AI retrieval.
- 404 route forces `noindex, follow`.
- `public/robots.txt` allows Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, ClaudeBot; blocks GPTBot, CCBot, anthropic-ai (training-only). References `sitemap.xml`.
- `public/sitemap.xml` lists all 11 indexable routes with priorities.
- `public/site.webmanifest` for PWA / install metadata.
- `SEO` helpers: `breadcrumbSchema()`, `faqSchema()`, `eventSchema()` exported from `SEO.tsx`.
- Site URL constant: `https://atiig.ieeekerala.org` (update in `SEO.tsx` and `sitemap.xml` when production domain changes).

### CMS / Dynamic Content (News, Events, Team)
News articles, events, and team members are now stored in PostgreSQL and served via the API server, rather than hardcoded in the React pages.

**Database tables** (`lib/db/src/schema/`):
- `news_items` — `news.ts` — title, description, badge, badge_color, image_url, published_at
- `events` — `events.ts` — title, category, location, time, starts_at, description, featured, registration_url
- `team_members` — `team.ts` — name, role, initials, linkedin_url, sort_order

**Public API endpoints** (no auth required, used by the frontend):
- `GET /api/news` — list news (newest first)
- `GET /api/events` — list events (soonest first)
- `GET /api/team` — list team members (by sort_order)

**Admin API endpoints** (require `Authorization: Bearer <ADMIN_TOKEN>` header):
- `POST /api/news`, `PUT /api/news/:id`, `DELETE /api/news/:id`
- `POST /api/events`, `PUT /api/events/:id`, `DELETE /api/events/:id`
- `POST /api/team`, `PUT /api/team/:id`, `DELETE /api/team/:id`

**Admin token**: The admin endpoints are gated by an `ADMIN_TOKEN` secret. To enable them, add `ADMIN_TOKEN` via the Secrets tab (any strong random string). When unset, all admin endpoints return 503 with a clear message; the public GET endpoints continue to work. There is intentionally no default token committed to the repo — never commit one.

**News image handling**: The `imageUrl` column accepts either a normal URL (http/https or `/`) OR a friendly key (`news-hero`, `news-variant`, `hero`, `team`) that maps to a bundled fallback asset in `news-events.tsx`. Admins can store either.

**Frontend usage**: `useListNews`, `useListEvents`, `useListTeamMembers` hooks from `@workspace/api-client-react` (generated from `lib/api-spec/openapi.yaml` via Orval). After editing the OpenAPI spec, run `pnpm --filter @workspace/api-spec run codegen`.
