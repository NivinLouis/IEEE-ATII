export interface SanityCategory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  tagColor?: "orange" | "teal" | "navy" | "slate" | "gold";
}

export interface SanityImage {
  asset?: {
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
  alt?: string;
  caption?: string;
}

export interface SanityNewsArticleSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  featured: boolean;
  categories: SanityCategory[];
  coverImage?: SanityImage;
  seoTitle?: string;
  seoDescription?: string;
}

export interface SanityNewsArticle extends SanityNewsArticleSummary {
  body: unknown[];
}

export interface SanityEventSummary {
  _id: string;
  title: string;
  categories: SanityCategory[];
  location: string;
  displayTime: string;
  startsAt: string;
  description?: string;
  featured: boolean;
  registrationUrl?: string;
  registrationLabel?: string;
}

export interface SanityPhotoGalleryItem {
  _id: string;
  caption: string;
  categories: SanityCategory[];
  image?: SanityImage;
  sortOrder: number;
}

export interface SanityGlobalStats {
  _id: string;
  title?: string;
  livesImpacted?: string;
  projects?: string;
  partners?: string;
  volunteers?: string;
  states?: string;
  events?: string;
  beneficiaries?: string;
}

export interface SanityHomePageImpactDistributionItem {
  name: string;
  value: number;
}

export interface SanityHomePageImpactTrendItem {
  year: string;
  impact: number;
}

export interface SanityHomePageStatistics {
  impactDistribution?: SanityHomePageImpactDistributionItem[];
  impactTrend?: SanityHomePageImpactTrendItem[];
}

export interface SanityHomePage {
  _id: string;
  title?: string;
  statistics?: SanityHomePageStatistics;
}

export interface SanityInitiativeCard {
  _id: string;
  id: string;
  title: string;
  theme: "innovation" | "education" | "community" | "campus";
  status: string;
  description: string;
  statOneValue: string;
  statOneLabel: string;
  statTwoValue: string;
  statTwoLabel: string;
  statThreeValue: string;
  statThreeLabel: string;
  sortOrder?: number;
}

export interface SanityProjectCategory {
  kind: string;
  title: string;
  count: string;
  sortOrder?: number;
}

export interface SanityFeaturedProjectMetric {
  value: string;
  label: string;
}

export interface SanityFeaturedProject {
  title: string;
  description: string;
  tags?: string[];
  metrics?: SanityFeaturedProjectMetric[];
  outcomes?: string[];
}

export interface SanityStoryOfChangeItem {
  title: string;
  description: string;
  gradient: string;
}

export interface SanityProjectsPage {
  _id: string;
  title?: string;
  projectCategories?: SanityProjectCategory[];
  featuredProject?: SanityFeaturedProject;
}

export interface SanityProjectsStoriesSection {
  _id: string;
  title?: string;
  items?: SanityStoryOfChangeItem[];
}

export interface SanityGetInvolvedCard {
  _id: string;
  id: string;
  kind: "volunteer" | "member" | "partner" | "join";
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  sortOrder?: number;
}

export interface SanityResourceGuide {
  _id: string;
  title: string;
  format: string;
  description: string;
  theme: "purple" | "teal" | "orange" | "navy";
  href: string;
  buttonLabel: string;
  sortOrder?: number;
}

export interface SanityResourcePublication {
  _id: string;
  type: string;
  theme: "navy" | "purple" | "teal" | "orange";
  title: string;
  authors: string;
  year: string;
  href: string;
  buttonLabel: string;
  sortOrder?: number;
}

export interface SanityResourceVideo {
  _id: string;
  title: string;
  duration: string;
  type: string;
  href: string;
  thumbnail?: SanityImage;
  sortOrder?: number;
}

export interface SanityResourceStandard {
  _id: string;
  title: string;
  href: string;
  sortOrder?: number;
}
