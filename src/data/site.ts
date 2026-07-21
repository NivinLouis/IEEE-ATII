export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/+$/, "") ??
  "https://atii.ieeekerala.org";

export function getCanonicalPath(path: string): string {
  const normalizedPath = `/${path.replace(/^\/+|\/+$/g, "")}`;
  return normalizedPath === "/" ? "/" : `${normalizedPath}/`;
}

export function getCanonicalUrl(path: string): string {
  return `${SITE_URL}${getCanonicalPath(path)}`;
}

export const SITE_NAME = "IEEE Kerala ATIIG";
export const SITE_CANONICAL_NAME =
  "IEEE Kerala Assistive Technology & Inclusive Innovation Group";
export const SITE_TAGLINE = "Innovation with Empathy. Technology with Purpose.";
export const SITE_DESCRIPTION =
  "IEEE ATII, also known as IEEE Kerala ATIIG, is the IEEE Assistive Technology & Inclusive Innovation Group advancing accessible technology and inclusive innovation across Kerala.";

export const CONTACT_EMAIL = "ieeeatii@gmail.com";
export const CONTACT_PHONE = "+91 79945 426 300";

export const GLOBAL_STATS = {
  volunteers: "40+",
  livesImpacted: "750+",
  partners: "7+",
  events: "4+",
  projects: "12+",
  states: "5+",
  beneficiaries: "750+",
  devicesDistributed: "700+",
};

export const SOCIAL_LINKS = [
  "https://www.linkedin.com/company/ieee-assistive-technology-inclusive-innovation-group/",
  "https://www.instagram.com/ieeeatii/",
  "https://www.youtube.com/@ieeeatii",
];

export const routeMeta = {
  "/": {
    title: "IEEE ATII / ATIIG Kerala | Assistive Technology",
    description:
      "IEEE ATII, also known as IEEE Kerala ATIIG, advances assistive technology and inclusive innovation through projects, programs, events, resources, and volunteering.",
    priority: "1.0",
    changefreq: "weekly",
  },
  "/about": {
    title: "About IEEE ATII / ATIIG Kerala | Mission & Leadership",
    description:
      "Learn about the IEEE Assistive Technology & Inclusive Innovation Group (IEEE ATII / ATIIG), including its mission, leadership, journey, and work across Kerala.",
    priority: "0.9",
    changefreq: "monthly",
  },
  "/initiatives": {
    title: "Initiatives | IEEE Kerala ATIIG Programs & Projects",
    description:
      "Explore IEEE Kerala ATIIG programs in assistive technology, community outreach, inclusive education, accessible campuses, skills, and humanitarian innovation.",
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
    title: "Assistive Technology Resources | IEEE Kerala ATIIG",
    description:
      "Explore inclusive design guides, assistive technology toolkits, research publications, accessibility standards, videos, and learning materials from IEEE Kerala ATIIG.",
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
  "/connect": {
    title: "Connect with IEEE ATII | Official Links",
    description:
      "Access the official social media, WhatsApp community, announcements and professional channels of IEEE ATII.",
    priority: "0.5",
    changefreq: "monthly",
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
} as const;
