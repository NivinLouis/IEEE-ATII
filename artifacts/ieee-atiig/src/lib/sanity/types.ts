export interface SanityCategory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
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
