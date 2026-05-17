import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const siteUrl = (process.env.VITE_SITE_URL ?? "https://atiig.ieeekerala.org").replace(/\/+$/, "");
const sanityProjectId = process.env.VITE_SANITY_PROJECT_ID;
const sanityDataset = process.env.VITE_SANITY_DATASET;
const sanityApiVersion = process.env.VITE_SANITY_API_VERSION ?? "2025-02-19";
const today = new Date().toISOString().slice(0, 10);
const outDir = path.resolve("dist/public");
const indexPath = path.join(outDir, "index.html");

const routes = {
  "/": {
    title: "IEEE Kerala ATIIG | Assistive Technology & Inclusive Innovation",
    description:
      "IEEE Kerala ATIIG designs, prototypes, and deploys affordable assistive technologies and inclusive-innovation programs across Kerala. Explore projects, events, resources, and ways to join.",
    priority: "1.0",
    changefreq: "weekly",
  },
  "/about": {
    title: "About IEEE Kerala ATIIG | Mission, Vision & Leadership",
    description:
      "Learn about IEEE Kerala ATIIG, the assistive-technology and inclusive-innovation affinity group of IEEE Kerala Section, its mission, journey, leadership, and partners.",
    priority: "0.9",
    changefreq: "monthly",
  },
  "/initiatives": {
    title: "Initiatives | IEEE Kerala ATIIG Programs & Projects",
    description:
      "Explore IEEE Kerala ATIIG initiatives including AT Innovation Lab, Community Outreach, Inclusive Education, Accessible Campus, Capacity Building, and Humanitarian Technology.",
    priority: "0.9",
    changefreq: "monthly",
  },
  "/projects": {
    title: "Projects & Impact | IEEE Kerala ATIIG",
    description:
      "See IEEE Kerala ATIIG projects and impact across Kerala, including assistive-device prototypes, accessibility programs, SDG alignment, and community stories.",
    priority: "0.9",
    changefreq: "monthly",
  },
  "/resources": {
    title: "Resources | Guides, Toolkits & Learning Materials | IEEE Kerala ATIIG",
    description:
      "Access IEEE Kerala ATIIG resources, inclusive design guides, assistive technology toolkits, research materials, accessibility standards, and workshop content.",
    priority: "0.8",
    changefreq: "monthly",
  },
  "/get-involved": {
    title: "Get Involved | Join IEEE Kerala ATIIG",
    description:
      "Volunteer, become an IEEE member, partner, or sponsor IEEE Kerala ATIIG to support assistive technology and inclusive innovation across Kerala.",
    priority: "0.9",
    changefreq: "monthly",
  },
  "/news-events": {
    title: "News & Events | IEEE Kerala ATIIG",
    description:
      "Browse IEEE Kerala ATIIG news, upcoming workshops, webinars, hackathons, technical events, and community programs across Kerala.",
    priority: "0.8",
    changefreq: "weekly",
  },
  "/contact": {
    title: "Contact IEEE Kerala ATIIG | Reach Our Team",
    description:
      "Contact IEEE Kerala ATIIG for volunteering, partnerships, research collaboration, workshops, media, sponsorships, and general inquiries.",
    priority: "0.7",
    changefreq: "yearly",
  },
  "/privacy": {
    title: "Privacy Policy | IEEE Kerala ATIIG",
    description:
      "Read how IEEE Kerala ATIIG collects, uses, and protects personal information submitted through the website.",
    priority: "0.3",
    changefreq: "yearly",
  },
  "/terms": {
    title: "Terms of Use | IEEE Kerala ATIIG",
    description:
      "Review the terms governing use of the IEEE Kerala ATIIG website, content, resources, and public information.",
    priority: "0.3",
    changefreq: "yearly",
  },
  "/accessibility": {
    title: "Accessibility Statement | IEEE Kerala ATIIG",
    description:
      "IEEE Kerala ATIIG's web accessibility commitment, WCAG alignment, assistive features, and process for reporting accessibility issues.",
    priority: "0.4",
    changefreq: "yearly",
  },
};

async function fetchSanityArticleRoutes() {
  if (!sanityProjectId || !sanityDataset) return {};

  const query = `*[_type == "newsArticle" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    excerpt,
    seoTitle,
    seoDescription
  }`;

  const url = new URL(
    `https://${sanityProjectId}.apicdn.sanity.io/v${sanityApiVersion}/data/query/${sanityDataset}`,
  );
  url.searchParams.set("query", query);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Skipping Sanity article prerender: ${response.status} ${response.statusText}`);
      return {};
    }

    const payload = await response.json();
    const articles = Array.isArray(payload.result) ? payload.result : [];

    return Object.fromEntries(
      articles
        .filter((item) => typeof item?.slug === "string" && item.slug.length > 0)
        .map((item) => [
          `/news/${item.slug}`,
          {
            title: item.seoTitle || `${item.title} | IEEE Kerala ATIIG`,
            description: item.seoDescription || item.excerpt || "Latest updates from IEEE Kerala ATIIG.",
            priority: "0.7",
            changefreq: "weekly",
          },
        ]),
    );
  } catch (error) {
    console.warn("Skipping Sanity article prerender because the dataset could not be queried.", error);
    return {};
  }
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function replaceOrInsert(html, pattern, replacement, before = "</head>") {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace(before, `    ${replacement}\n  ${before}`);
}

function withRouteMeta(baseHtml, routePath, meta) {
  const url = `${siteUrl}${routePath}`;
  let html = baseHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
  );
  html = replaceOrInsert(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`,
  );
  html = replaceOrInsert(
    html,
    /<link rel="alternate" hrefLang="en-IN" href="[^"]*"\s*\/?>/,
    `<link rel="alternate" hrefLang="en-IN" href="${url}" />`,
  );
  html = replaceOrInsert(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
  );
  html = replaceOrInsert(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
  );
  html = replaceOrInsert(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`,
  );
  html = replaceOrInsert(
    html,
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
  );
  html = replaceOrInsert(
    html,
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
  );
  return html;
}

const articleRoutes = await fetchSanityArticleRoutes();
const allRoutes = { ...routes, ...articleRoutes };
const baseHtml = await readFile(indexPath, "utf8");

for (const [routePath, meta] of Object.entries(allRoutes)) {
  const html = withRouteMeta(baseHtml, routePath, meta);
  if (routePath === "/") {
    await writeFile(indexPath, html);
  } else {
    const routeDir = path.join(outDir, routePath.slice(1));
    await mkdir(routeDir, { recursive: true });
    await writeFile(path.join(routeDir, "index.html"), html);
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.entries(allRoutes)
  .map(
    ([routePath, meta]) => `  <url>
    <loc>${siteUrl}${routePath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${meta.changefreq}</changefreq>
    <priority>${meta.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

await writeFile(path.join(outDir, "sitemap.xml"), sitemap);
console.log(`Prerendered SEO metadata for ${Object.keys(allRoutes).length} routes.`);
