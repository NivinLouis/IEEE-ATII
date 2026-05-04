import type { Event, NewsItem, TeamMember } from "@workspace/api-client-react";

export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/+$/, "") ??
  "https://ieee-atiig.replit.app";

export const SITE_NAME = "IEEE Kerala ATIIG";
export const SITE_CANONICAL_NAME =
  "IEEE Kerala Assistive Technology & Inclusive Innovation Group";
export const SITE_TAGLINE = "Innovation with Empathy. Technology with Purpose.";
export const SITE_DESCRIPTION =
  "IEEE Kerala ATIIG is the official IEEE Kerala Section affinity group designing affordable assistive technology and inclusive-innovation programs across Kerala, India.";

export const CONTACT_EMAIL = "atiig@ieeekerala.org";
export const CONTACT_PHONE = "+91 79945 426 300";

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

export const fallbackTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Anitha R.",
    role: "Chair, IEEE Kerala ATIIG",
    initials: "AR",
    linkedinUrl: null,
    sortOrder: 1,
    createdAt: "2026-05-03T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Pranav K.",
    role: "Vice Chair, Programs & Partnerships",
    initials: "PK",
    linkedinUrl: null,
    sortOrder: 2,
    createdAt: "2026-05-03T00:00:00.000Z",
  },
  {
    id: 3,
    name: "Meera S.",
    role: "Secretary, Community Outreach",
    initials: "MS",
    linkedinUrl: null,
    sortOrder: 3,
    createdAt: "2026-05-03T00:00:00.000Z",
  },
];

export const fallbackEvents: Event[] = [
  {
    id: 1,
    title: "Inclusive Innovation Hackathon 2026",
    category: "Hackathons",
    location: "Technopark, Thiruvananthapuram",
    time: "9:00 AM - 6:00 PM",
    startsAt: "2026-06-15T09:00:00.000+05:30",
    description:
      "A hands-on build sprint for assistive technology prototypes, with mentoring from engineers, designers, educators, and persons with disabilities.",
    featured: true,
    registrationUrl: "/get-involved#join",
    createdAt: "2026-05-03T00:00:00.000Z",
  },
  {
    id: 2,
    title: "Accessible Campus Audit Workshop",
    category: "Workshops",
    location: "Kochi, Kerala",
    time: "10:00 AM - 4:00 PM",
    startsAt: "2026-07-08T10:00:00.000+05:30",
    description:
      "Training for student volunteers and faculty coordinators on accessibility audits, documentation, and retrofit planning.",
    featured: false,
    registrationUrl: "/get-involved#volunteer",
    createdAt: "2026-05-03T00:00:00.000Z",
  },
  {
    id: 3,
    title: "AI for Assistive Communication Webinar",
    category: "Webinars",
    location: "Online",
    time: "7:00 PM - 8:30 PM",
    startsAt: "2026-08-12T19:00:00.000+05:30",
    description:
      "A technical session on practical AI workflows for low-cost augmentative and alternative communication tools.",
    featured: false,
    registrationUrl: "/resources#videos",
    createdAt: "2026-05-03T00:00:00.000Z",
  },
];

export const fallbackNews: NewsItem[] = [
  {
    id: 1,
    title: "ATIIG Expands Accessible Campus Program Across Kerala",
    description:
      "The Accessible Campus Program will support student-led audits, retrofit recommendations, and inclusive-design mentoring across partner institutions.",
    badge: "Program",
    badgeColor: "bg-teal",
    imageUrl: "team",
    publishedAt: "2026-05-03T00:00:00.000Z",
    createdAt: "2026-05-03T00:00:00.000Z",
  },
  {
    id: 2,
    title: "New Assistive Technology Toolkit Released for Student Teams",
    description:
      "The toolkit includes practical checklists, prototyping templates, user-interview guidance, and evaluation rubrics for inclusive engineering projects.",
    badge: "Resource",
    badgeColor: "bg-purple",
    imageUrl: "news-hero",
    publishedAt: "2026-04-22T00:00:00.000Z",
    createdAt: "2026-04-22T00:00:00.000Z",
  },
  {
    id: 3,
    title: "Volunteer Network Crosses 120 Active Contributors",
    description:
      "Students, educators, industry engineers, and accessibility advocates are now contributing to ATIIG programs across research, education, and outreach.",
    badge: "Community",
    badgeColor: "bg-orange",
    imageUrl: "news-variant",
    publishedAt: "2026-04-10T00:00:00.000Z",
    createdAt: "2026-04-10T00:00:00.000Z",
  },
];

export function asArrayOrFallback<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) ? value : fallback;
}
