import { getSanityClient, sanityConfigured } from "./client";
import { eventListQuery, getInvolvedCardsQuery, globalStatsQuery, homePageQuery, initiativeCardsQuery, newsArticleQuery, newsListQuery, photoGalleryListQuery, projectsPageQuery, projectsStoriesSectionQuery, resourceGuidesQuery, resourcePublicationsQuery, resourceStandardsQuery, resourceVideosQuery } from "./queries";
import type {
  SanityEventSummary,
  SanityGlobalStats,
  SanityGetInvolvedCard,
  SanityHomePage,
  SanityInitiativeCard,
  SanityNewsArticle,
  SanityNewsArticleSummary,
  SanityPhotoGalleryItem,
  SanityProjectsPage,
  SanityProjectsStoriesSection,
  SanityResourceGuide,
  SanityResourcePublication,
  SanityResourceStandard,
  SanityResourceVideo,
} from "./types";

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

export async function fetchPhotoGalleryItems() {
  if (!sanityConfigured) return [];
  return getSanityClient().fetch<SanityPhotoGalleryItem[]>(photoGalleryListQuery);
}

export async function fetchGlobalStats() {
  if (!sanityConfigured) return null;
  return getSanityClient().fetch<SanityGlobalStats | null>(globalStatsQuery);
}

export async function fetchHomePage() {
  if (!sanityConfigured) return null;
  return getSanityClient().fetch<SanityHomePage | null>(homePageQuery);
}

export async function fetchInitiativeCards() {
  if (!sanityConfigured) return [];
  return getSanityClient().fetch<SanityInitiativeCard[]>(initiativeCardsQuery);
}

export async function fetchProjectsPage() {
  if (!sanityConfigured) return null;
  return getSanityClient().fetch<SanityProjectsPage | null>(projectsPageQuery);
}

export async function fetchProjectsStoriesSection() {
  if (!sanityConfigured) return null;
  return getSanityClient().fetch<SanityProjectsStoriesSection | null>(projectsStoriesSectionQuery);
}

export async function fetchGetInvolvedCards() {
  if (!sanityConfigured) return [];
  return getSanityClient().fetch<SanityGetInvolvedCard[]>(getInvolvedCardsQuery);
}

export async function fetchResourceGuides() {
  if (!sanityConfigured) return [];
  return getSanityClient().fetch<SanityResourceGuide[]>(resourceGuidesQuery);
}

export async function fetchResourcePublications() {
  if (!sanityConfigured) return [];
  return getSanityClient().fetch<SanityResourcePublication[]>(resourcePublicationsQuery);
}

export async function fetchResourceVideos() {
  if (!sanityConfigured) return [];
  return getSanityClient().fetch<SanityResourceVideo[]>(resourceVideosQuery);
}

export async function fetchResourceStandards() {
  if (!sanityConfigured) return [];
  return getSanityClient().fetch<SanityResourceStandard[]>(resourceStandardsQuery);
}
