# IEEE Kerala ATIIG

Official website for **IEEE Kerala ATIIG**: the IEEE Kerala Assistive Technology & Inclusive Innovation Group.

ATIIG designs, prototypes, and deploys affordable assistive technologies and inclusive-innovation programs across Kerala, connecting engineers, researchers, students, volunteers, educators, and community partners.

## About

IEEE Kerala ATIIG focuses on practical, community-centered technology for accessibility and inclusion. The site presents ATIIG's mission, programs, projects, events, resources, and ways to volunteer or partner.

Core areas:

- Assistive technology prototyping
- Inclusive education
- Accessibility audits and campus retrofits
- Community outreach
- Humanitarian engineering
- Capacity building for students and professionals

## Website

GitHub Pages site: [https://robinfrancis186.github.io/IEEE-ATII/](https://robinfrancis186.github.io/IEEE-ATII/)

Canonical custom-domain target: [https://atiig.ieeekerala.org](https://atiig.ieeekerala.org)

Local frontend app:

```bash
PORT=5173 BASE_PATH=/ corepack pnpm --dir artifacts/ieee-atiig run dev
```

Production build:

```bash
PORT=5173 BASE_PATH=/IEEE-ATII/ VITE_SITE_URL=https://robinfrancis186.github.io/IEEE-ATII corepack pnpm --dir artifacts/ieee-atiig run build
```

The build emits static files to:

```text
artifacts/ieee-atiig/dist/public
```

## GitHub Pages

This repository includes a GitHub Actions workflow at:

```text
.github/workflows/pages.yml
```

The workflow builds the IEEE ATIIG site and deploys `artifacts/ieee-atiig/dist/public` to GitHub Pages.

Repository setup required in GitHub:

1. Open **Settings -> Pages**.
2. Set **Build and deployment -> Source** to **GitHub Actions**.
3. If using the custom domain, point DNS for `atiig.ieeekerala.org` to GitHub Pages and keep the included `CNAME` file.

## SEO, GEO, AEO, and LLM Support

The site includes:

- Route-specific SEO metadata
- Build-time static route metadata for crawlers
- Canonical URLs and `hreflang`
- Organization, website, breadcrumb, FAQ, and event JSON-LD
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `ai.txt`
- `humans.txt`
- security contact metadata

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/Radix UI components
- Framer Motion
- pnpm workspace

## Changelog 17/05/26

Added the initial Sanity CMS migration path for the news section. Studio is intended to remain a separate deployment from the frontend application.

### Sanity Studio Setup

Create a Sanity project and dataset, then configure the Studio environment using:

```bash
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

These values match the example file at:

```text
artifacts/sanity-studio/.env.example
```

Run the Studio locally with:

```bash
pnpm --filter @workspace/sanity-studio run dev
```

Build the Studio with:

```bash
pnpm --filter @workspace/sanity-studio run build
```

The Studio schemas added for the news migration are:

```text
artifacts/sanity-studio/schemaTypes/category.ts
artifacts/sanity-studio/schemaTypes/newsArticle.ts
```

### Frontend Sanity Setup

Configure the frontend app with:

```bash
VITE_SITE_URL=https://atiig.ieeekerala.org
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2025-02-19
VITE_SANITY_PREVIEW_TOKEN=
```

These values match the example file at:

```text
artifacts/ieee-atiig/.env.example
```

Run the frontend locally with:

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/ieee-atiig run dev
```

After publishing at least one `News Category` and one `News Article` in Sanity:

- `/news-events` renders the published article list
- `/news/<slug>` renders the article detail page

News articles are ordered by `publishedAt` in descending order. Empty states are shown if Sanity is not configured or if no articles are published.

### Preview Guidance

The current frontend includes only a basic preview toggle path and should not be treated as the final production preview solution.

For a proper draft preview setup:

1. Keep Studio deployed separately.
2. Do not expose a long-lived Sanity read token in the browser for production.
3. Add a backend preview endpoint such as `/api/sanity/preview`.
4. Store the Sanity read token only on the server, for example as `SANITY_API_READ_TOKEN`.
5. When preview is active, query Sanity with:

```text
perspective: 'drafts'
useCdn: false
```

This project currently uses a Vite SPA that fetches directly from Sanity for published content. Secure draft preview therefore requires a server-side or edge layer to mediate preview requests.

Reference documentation used for the implementation approach:

- [Drafts](https://www.sanity.io/docs/drafts)
- [Presenting and previewing content](https://www.sanity.io/docs/content-lake/presenting-and-previewing-content)
- [Implementing draft mode](https://www.sanity.io/docs/visual-editing/implementing-draft-mode)
- [Querying content with @sanity/client](https://www.sanity.io/docs/apis-and-sdks/js-client-querying)
- [Presenting Portable Text](https://www.sanity.io/docs/developer-guides/presenting-block-text)
