import { Helmet } from "react-helmet-async";
import {
  CONTACT_EMAIL,
  SITE_CANONICAL_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/data/site";

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
      <meta name="author" content="IEEE Kerala Section ATIIG" />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, follow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />

      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en-IN" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:alt" content={`${SITE_NAME} — ${SITE_TAGLINE}`} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={`${SITE_NAME} — ${SITE_TAGLINE}`} />

      <meta name="geo.region" content="IN-KL" />
      <meta name="geo.placename" content="Kerala, India" />
      <meta name="ICBM" content="8.5241, 76.9366" />
      <meta name="DC.title" content={title} />

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

export const organizationSchema = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": ["NGO", "EducationalOrganization", "Organization"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: SITE_CANONICAL_NAME,
  alternateName: [
    SITE_CANONICAL_NAME,
    "IEEE Kerala Assistive Technology and Inclusive Innovation Group",
  ],
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/opengraph.jpg`,
  image: `${SITE_URL}/opengraph.jpg`,
  description: SITE_DESCRIPTION,
  slogan: SITE_TAGLINE,
  foundingDate: "2018",
  email: CONTACT_EMAIL,
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Kerala, India",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "IEEE Kerala Section Office, Technopark Campus, Phase III",
    addressLocality: "Thiruvananthapuram",
    addressRegion: "Kerala",
    postalCode: "695581",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 8.5241,
    longitude: 76.9366,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "general inquiries",
      email: CONTACT_EMAIL,
      areaServed: "IN-KL",
      availableLanguage: ["English", "Malayalam"],
    },
  ],
  knowsAbout: [
    "Assistive Technology",
    "Inclusive Innovation",
    "Accessible Education",
    "Humanitarian Engineering",
    "Disability Inclusion",
    "Universal Design",
    "IEEE Kerala Section programs",
  ],
  sameAs: SOCIAL_LINKS,
  parentOrganization: {
    "@type": "Organization",
    name: "IEEE Kerala Section",
    url: "https://ieeekerala.org/",
  },
  memberOf: {
    "@type": "Organization",
    name: "IEEE",
    url: "https://www.ieee.org/",
  },
});

export const websiteSchema = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#organization` },
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
