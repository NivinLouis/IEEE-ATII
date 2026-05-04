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

Canonical site: [[https://atiig.ieeekerala.org](https://robinfrancis186.github.io/IEEE-ATII/)]([https://atiig.ieeekerala.org](https://robinfrancis186.github.io/IEEE-ATII/))

Local frontend app:

```bash
PORT=5173 BASE_PATH=/ corepack pnpm --dir artifacts/ieee-atiig run dev
```

Production build:

```bash
PORT=5173 BASE_PATH=/ VITE_SITE_URL=https://atiig.ieeekerala.org corepack pnpm --dir artifacts/ieee-atiig run build
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

