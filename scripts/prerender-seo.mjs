import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadEnv } from "vite";

const fileEnv = loadEnv("production", process.cwd(), "VITE_");
const getEnv = (key) => process.env[key] ?? fileEnv[key];
const siteUrl = (getEnv("VITE_SITE_URL") ?? "https://atii.ieeekerala.org").replace(/\/+$/, "");
const sanityProjectId = getEnv("VITE_SANITY_PROJECT_ID");
const sanityDataset = getEnv("VITE_SANITY_DATASET");
const sanityApiVersion = getEnv("VITE_SANITY_API_VERSION") ?? "2025-02-19";
const outDir = path.resolve("dist/public");
const indexPath = path.join(outDir, "index.html");

const routes = {
  "/": {
    title: "IEEE Kerala ATIIG | Assistive Technology & Inclusion",
    heading: "Building an Inclusive Tomorrow for All",
    description:
      "Explore IEEE Kerala ATIIG's assistive technology projects, inclusive innovation programs, events, resources, and volunteer opportunities across Kerala.",
    priority: "1.0",
    changefreq: "weekly",
  },
  "/about": {
    title: "About IEEE Kerala ATIIG | Mission, Vision & Leadership",
    heading: "About IEEE Kerala ATIIG",
    description:
      "Learn about IEEE Kerala ATIIG's mission, journey, leadership, partners, and work advancing assistive technology and inclusive innovation across Kerala.",
    priority: "0.9",
    changefreq: "monthly",
  },
  "/initiatives": {
    title: "Initiatives | IEEE Kerala ATIIG Programs & Projects",
    heading: "Our Initiatives",
    description:
      "Explore IEEE Kerala ATIIG programs in assistive technology, community outreach, inclusive education, accessible campuses, skills, and humanitarian innovation.",
    priority: "0.9",
    changefreq: "monthly",
  },
  "/projects": {
    title: "Projects & Impact | IEEE Kerala ATIIG",
    heading: "Projects That Create Inclusive Impact",
    description:
      "See IEEE Kerala ATIIG projects and impact across Kerala, including assistive-device prototypes, accessibility programs, SDG alignment, and community stories.",
    priority: "0.9",
    changefreq: "monthly",
  },
  "/resources": {
    title: "Assistive Technology Resources | IEEE Kerala ATIIG",
    heading: "Resources & Publications",
    description:
      "Explore inclusive design guides, assistive technology toolkits, research publications, accessibility standards, videos, and learning materials from IEEE Kerala ATIIG.",
    priority: "0.8",
    changefreq: "monthly",
  },
  "/get-involved": {
    title: "Get Involved | Join IEEE Kerala ATIIG",
    heading: "Get Involved",
    description:
      "Volunteer, become an IEEE member, partner, or sponsor IEEE Kerala ATIIG to support assistive technology and inclusive innovation across Kerala.",
    priority: "0.9",
    changefreq: "monthly",
  },
  "/news-events": {
    title: "News & Events | IEEE Kerala ATIIG",
    heading: "News & Events",
    description:
      "Browse IEEE Kerala ATIIG news, upcoming workshops, webinars, hackathons, technical events, and community programs across Kerala.",
    priority: "0.8",
    changefreq: "weekly",
  },
  "/contact": {
    title: "Contact IEEE Kerala ATIIG | Reach Our Team",
    heading: "Contact & Partner With Us",
    description:
      "Contact IEEE Kerala ATIIG for volunteering, partnerships, research collaboration, workshops, media, sponsorships, and general inquiries.",
    priority: "0.7",
    changefreq: "yearly",
  },
  "/connect": {
    title: "Connect with IEEE ATII | Official Links",
    heading: "Connect with IEEE ATII",
    description:
      "Access the official social media, WhatsApp community, announcements and professional channels of IEEE ATII.",
    priority: "0.5",
    changefreq: "monthly",
  },
  "/privacy": {
    title: "Privacy Policy | IEEE Kerala ATIIG",
    heading: "Privacy Policy",
    description:
      "Read how IEEE Kerala ATIIG collects, uses, and protects personal information submitted through the website.",
    priority: "0.3",
    changefreq: "yearly",
  },
  "/terms": {
    title: "Terms of Use | IEEE Kerala ATIIG",
    heading: "Terms of Use",
    description:
      "Review the terms governing use of the IEEE Kerala ATIIG website, content, resources, and public information.",
    priority: "0.3",
    changefreq: "yearly",
  },
  "/accessibility": {
    title: "Accessibility Statement | IEEE Kerala ATIIG",
    heading: "Accessibility Statement",
    description:
      "IEEE Kerala ATIIG's web accessibility commitment, WCAG alignment, assistive features, and process for reporting accessibility issues.",
    priority: "0.4",
    changefreq: "yearly",
  },
};

async function fetchSanityArticleRoutes() {
  if (!sanityProjectId || !sanityDataset) return {};

  const query = `*[_type == "newsArticle" && defined(slug.current)] | order(publishedAt desc) {
    _updatedAt,
    "slug": slug.current,
    title,
    excerpt,
    publishedAt,
    seoTitle,
    seoDescription,
    categories[]->{title},
    "image": coverImage.asset->url,
    "imageWidth": coverImage.asset->metadata.dimensions.width,
    "imageHeight": coverImage.asset->metadata.dimensions.height,
    "imageAlt": coverImage.alt
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
            heading: item.title,
            description: item.seoDescription || item.excerpt || "Latest updates from IEEE Kerala ATIIG.",
            type: "article",
            image: item.image,
            imageWidth: item.imageWidth,
            imageHeight: item.imageHeight,
            imageAlt: item.imageAlt || item.title,
            publishedTime: item.publishedAt,
            modifiedTime: item._updatedAt,
            section: item.categories?.[0]?.title,
            lastmod: item._updatedAt?.slice(0, 10),
          },
        ]),
    );
  } catch (error) {
    console.warn("Skipping Sanity article prerender because the dataset could not be queried.", error);
    return {};
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function replaceOrInsert(html, pattern, replacement, before = "</head>") {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace(before, `    ${replacement}\n  ${before}`);
}

function routeSchema(routePath, meta) {
  const url = `${siteUrl}${routePath}`;
  const image = meta.image || `${siteUrl}/opengraph.jpg`;
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: meta.title,
      description: meta.description,
      inLanguage: "en-IN",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: image,
        ...(meta.imageWidth ? { width: meta.imageWidth } : {}),
        ...(meta.imageHeight ? { height: meta.imageHeight } : {}),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement:
        routePath === "/"
          ? [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${siteUrl}/`,
              },
            ]
          : [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${siteUrl}/`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: meta.heading,
                item: url,
              },
            ],
    },
  ];

  if (meta.type === "article") {
    graph.push({
      "@type": "NewsArticle",
      "@id": `${url}#article`,
      headline: meta.heading,
      description: meta.description,
      url,
      mainEntityOfPage: { "@id": `${url}#webpage` },
      image: [image],
      datePublished: meta.publishedTime,
      dateModified: meta.modifiedTime || meta.publishedTime,
      articleSection: meta.section,
      inLanguage: "en-IN",
      author: {
        "@type": "Organization",
        name: "IEEE Kerala ATIIG",
        url: `${siteUrl}/`,
      },
      publisher: { "@id": `${siteUrl}/#organization` },
    });
  }

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replaceAll("<", "\\u003c");
}

function staticRouteShell(meta) {
  const navigation = Object.entries(routes)
    .filter(([routePath]) => !["/privacy", "/terms", "/accessibility", "/connect"].includes(routePath))
    .map(([routePath, routeMeta]) => (
      `<a href="${routePath}" style="color:#023a74;font-weight:600">${escapeHtml(routeMeta.heading)}</a>`
    ))
    .join("");

  return `<div data-seo-static-shell style="font-family:Arial,sans-serif;max-width:960px;margin:0 auto;padding:48px 24px;color:#0f172a">
      <header style="margin-bottom:48px">
        <a href="/" style="color:#023a74;font-size:20px;font-weight:800;text-decoration:none">IEEE Kerala ATIIG</a>
      </header>
      <main>
        <h1 style="color:#023a74;font-size:40px;line-height:1.15">${escapeHtml(meta.heading)}</h1>
        <p style="font-size:18px;line-height:1.7;max-width:760px">${escapeHtml(meta.description)}</p>
        <nav aria-label="Main navigation" style="display:flex;flex-wrap:wrap;gap:16px;margin-top:36px">${navigation}</nav>
      </main>
    </div>`;
}

function withRouteMeta(baseHtml, routePath, meta) {
  const url = `${siteUrl}${routePath}`;
  const image = meta.image || `${siteUrl}/opengraph.jpg`;
  const imageAlt = meta.imageAlt || "IEEE Kerala ATIIG — Assistive Technology and Inclusive Innovation in Kerala";
  const imageType = /\.png(?:$|\?)/i.test(image) ? "image/png" : "image/jpeg";
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
    /<link rel="alternate" hrefLang="en-IN" href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hrefLang="en-IN" href="${url}" />`,
  );
  html = replaceOrInsert(
    html,
    /<link rel="alternate" hrefLang="x-default" href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hrefLang="x-default" href="${url}" />`,
  );
  html = replaceOrInsert(
    html,
    /<meta property="og:type" content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${meta.type || "website"}" />`,
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
    /<meta property="og:image" content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${image}" />`,
  );
  html = replaceOrInsert(
    html,
    /<meta property="og:image:secure_url" content="[^"]*"\s*\/?>/,
    `<meta property="og:image:secure_url" content="${image}" />`,
  );
  html = replaceOrInsert(
    html,
    /<meta property="og:image:type" content="[^"]*"\s*\/?>/,
    `<meta property="og:image:type" content="${imageType}" />`,
  );
  html = replaceOrInsert(
    html,
    /<meta property="og:image:alt" content="[^"]*"\s*\/?>/,
    `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`,
  );
  if (meta.imageWidth && meta.imageHeight) {
    html = replaceOrInsert(
      html,
      /<meta property="og:image:width" content="[^"]*"\s*\/?>/,
      `<meta property="og:image:width" content="${meta.imageWidth}" />`,
    );
    html = replaceOrInsert(
      html,
      /<meta property="og:image:height" content="[^"]*"\s*\/?>/,
      `<meta property="og:image:height" content="${meta.imageHeight}" />`,
    );
  }
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
  html = replaceOrInsert(
    html,
    /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${image}" />`,
  );
  html = replaceOrInsert(
    html,
    /<meta name="twitter:image:alt" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />`,
  );
  if (meta.type === "article" && meta.publishedTime) {
    html = replaceOrInsert(
      html,
      /<meta property="article:published_time" content="[^"]*"\s*\/?>/,
      `<meta property="article:published_time" content="${meta.publishedTime}" />`,
    );
  }
  if (meta.type === "article" && meta.modifiedTime) {
    html = replaceOrInsert(
      html,
      /<meta property="article:modified_time" content="[^"]*"\s*\/?>/,
      `<meta property="article:modified_time" content="${meta.modifiedTime}" />`,
    );
  }
  if (meta.type === "article" && meta.section) {
    html = replaceOrInsert(
      html,
      /<meta property="article:section" content="[^"]*"\s*\/?>/,
      `<meta property="article:section" content="${escapeHtml(meta.section)}" />`,
    );
  }
  html = replaceOrInsert(
    html,
    /<script id="route-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script id="route-structured-data" type="application/ld+json">${routeSchema(routePath, meta)}</script>`,
  );
  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    `<div id="root">${staticRouteShell(meta)}</div>`,
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
${meta.lastmod ? `    <lastmod>${meta.lastmod}</lastmod>\n` : ""}  </url>`,
  )
  .join("\n")}
</urlset>
`;

await writeFile(path.join(outDir, "sitemap.xml"), sitemap);
console.log(`Prerendered SEO metadata for ${Object.keys(allRoutes).length} routes.`);
