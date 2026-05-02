import { Helmet } from "react-helmet-async";

const SITE_URL = "https://ieee-atiig.replit.app";
const DEFAULT_OG = `${SITE_URL}/opengraph.jpg`;

export interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string;
  /** Optional JSON-LD objects to inject as <script type="application/ld+json"> */
  schemas?: Record<string, unknown>[];
  /** Set true to noindex (e.g. 404 page) */
  noindex?: boolean;
}

export default function SEO({
  title,
  description,
  path,
  image = DEFAULT_OG,
  type = "website",
  keywords,
  schemas,
  noindex,
}: SEOProps) {
  const url = `${SITE_URL}${path}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, follow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />

      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={fullImage} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {schemas?.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

/** Helpers to build common schema objects */
export const breadcrumbSchema = (
  items: { name: string; path: string }[]
): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.path}`,
  })),
});

export const faqSchema = (
  faqs: { q: string; a: string }[]
): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const eventSchema = (events: {
  name: string;
  startDate: string;
  endDate?: string;
  locationName: string;
  description: string;
  url?: string;
}[]): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@graph": events.map((e) => ({
    "@type": "Event",
    name: e.name,
    startDate: e.startDate,
    endDate: e.endDate ?? e.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: e.locationName,
      address: { "@type": "PostalAddress", addressRegion: "Kerala", addressCountry: "IN" },
    },
    description: e.description,
    organizer: {
      "@type": "Organization",
      name: "IEEE Kerala ATIIG",
      url: SITE_URL,
    },
    ...(e.url ? { url: e.url } : {}),
  })),
});
