import { getSanityClient, sanityConfigured } from "./client";
import { newsArticleQuery, newsListQuery } from "./queries";
import type { SanityNewsArticle, SanityNewsArticleSummary } from "./types";

export async function fetchNewsArticles() {
  if (!sanityConfigured) return [];
  return getSanityClient().fetch<SanityNewsArticleSummary[]>(newsListQuery);
}

export async function fetchNewsArticle(slug: string) {
  if (!sanityConfigured) return null;
  return getSanityClient().fetch<SanityNewsArticle | null>(newsArticleQuery, { slug });
}
