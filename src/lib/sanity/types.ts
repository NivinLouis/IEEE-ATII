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
