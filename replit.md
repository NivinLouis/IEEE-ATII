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
