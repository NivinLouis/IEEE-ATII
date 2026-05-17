import { getSanityClient, sanityConfigured } from "./client";
import { eventListQuery, newsArticleQuery, newsListQuery } from "./queries";
import type { SanityEventSummary, SanityNewsArticle, SanityNewsArticleSummary } from "./types";

export async function fetchNewsArticles() {
  if (!sanityConfigured) return [];
  return getSanityClient().fetch<SanityNewsArticleSummary[]>(newsListQuery);
}

export async function fetchNewsArticle(slug: string) {
  if (!sanityConfigured) return null;
  return getSanityClient().fetch<SanityNewsArticle | null>(newsArticleQuery, { slug });
}

export async function fetchEvents() {
  if (!sanityConfigured) return [];
  return getSanityClient().fetch<SanityEventSummary[]>(eventListQuery);
}
