export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/+$/, "") ??
  "https://atiig.ieeekerala.org";

export const SITE_NAME = "IEEE Kerala ATIIG";
export const SITE_CANONICAL_NAME =
  "IEEE Kerala Assistive Technology & Inclusive Innovation Group";
export const SITE_TAGLINE = "Innovation with Empathy. Technology with Purpose.";
export const SITE_DESCRIPTION =
  "IEEE Kerala ATIIG is the official IEEE Kerala Section affinity group designing affordable assistive technology and inclusive-innovation programs across Kerala, India.";

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
  "https://www.linkedin.com/company/ieee-kerala-section/",
  "https://www.facebook.com/IEEEKeralaSection/",
  "https://x.com/IEEEKerala",
  "https://www.instagram.com/ieeekerala/",
  "https://www.youtube.com/@IEEEKeralaSection",
];

export const routeMeta = {
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
