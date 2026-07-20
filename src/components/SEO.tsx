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
const DEFAULT_OG_ALT =
  `${SITE_NAME} — Assistive Technology and Inclusive Innovation in Kerala`;

export interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
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
  imageAlt = DEFAULT_OG_ALT,
  imageWidth = 1280,
  imageHeight = 720,
  type = "website",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  schemas,
  noindex,
}: SEOProps) {
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  const url = `${SITE_URL}${normalizedPath}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const imageType = fullImage.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: fullImage,
      width: imageWidth,
      height: imageHeight,
    },
  };
  const allSchemas = [pageSchema, ...(schemas ?? [])];
  const serializeSchema = (schema: Record<string, unknown>) =>
    JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
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
      <meta property="og:image:secure_url" content={fullImage} />
      <meta property="og:image:type" content={imageType} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:locale" content="en_IN" />
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && section && <meta property="article:section" content={section} />}
      {type === "article" && tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@IEEEKerala" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={imageAlt} />

      <meta name="DC.title" content={title} />

      {allSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {serializeSchema(schema)}
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
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/assets/ATII_CLR_1777748066607.png`,
    width: 2221,
    height: 625,
  },
  image: `${SITE_URL}/opengraph.jpg`,
  description: SITE_DESCRIPTION,
  slogan: SITE_TAGLINE,
  foundingDate: "2018",
  email: CONTACT_EMAIL,
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Kerala, India",
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
