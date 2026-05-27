import { useQuery } from "@tanstack/react-query";
import { fetchEvents, fetchGetInvolvedCards, fetchGlobalStats, fetchHomePage, fetchInitiativeCards, fetchNewsArticle, fetchNewsArticles, fetchPhotoGalleryItems, fetchProjectsPage, fetchProjectsStoriesSection, fetchResourceGuides, fetchResourcePublications, fetchResourceStandards, fetchResourceVideos } from "./api";
import { isSanityPreviewActive, sanityConfigured } from "./client";

export function useNewsArticles() {
  const preview = isSanityPreviewActive();

  return useQuery({
    queryKey: ["sanity-news-articles", preview],
    queryFn: fetchNewsArticles,
    enabled: sanityConfigured,
  });
}

export function useNewsArticle(slug: string) {
  const preview = isSanityPreviewActive();

  return useQuery({
    queryKey: ["sanity-news-article", slug, preview],
    queryFn: () => fetchNewsArticle(slug),
    enabled: sanityConfigured && Boolean(slug),
  });
}

export function useEvents() {
  const preview = isSanityPreviewActive();

  return useQuery({
    queryKey: ["sanity-events", preview],
    queryFn: fetchEvents,
    enabled: sanityConfigured,
  });
}

export function usePhotoGalleryItems() {
  const preview = isSanityPreviewActive();

  return useQuery({
    queryKey: ["sanity-photo-gallery", preview],
    queryFn: fetchPhotoGalleryItems,
    enabled: sanityConfigured,
  });
}

export function useGlobalStats() {
  const preview = isSanityPreviewActive();

  return useQuery({
    queryKey: ["sanity-global-stats", preview],
    queryFn: fetchGlobalStats,
    enabled: sanityConfigured,
  });
}

export function useHomePage() {
  const preview = isSanityPreviewActive();

  return useQuery({
    queryKey: ["sanity-home-page", preview],
    queryFn: fetchHomePage,
    enabled: sanityConfigured,
  });
}

export function useInitiativeCards() {
  const preview = isSanityPreviewActive();

  return useQuery({
    queryKey: ["sanity-initiative-cards", preview],
    queryFn: fetchInitiativeCards,
    enabled: sanityConfigured,
  });
}

export function useProjectsPage() {
  const preview = isSanityPreviewActive();

  return useQuery({
    queryKey: ["sanity-projects-page", preview],
    queryFn: fetchProjectsPage,
    enabled: sanityConfigured,
  });
}

export function useProjectsStoriesSection() {
  const preview = isSanityPreviewActive();

  return useQuery({
    queryKey: ["sanity-projects-stories-section", preview],
    queryFn: fetchProjectsStoriesSection,
    enabled: sanityConfigured,
  });
}

export function useGetInvolvedCards() {
  const preview = isSanityPreviewActive();

  return useQuery({
    queryKey: ["sanity-get-involved-cards", preview],
    queryFn: fetchGetInvolvedCards,
    enabled: sanityConfigured,
  });
}

export function useResourceGuides() {
  const preview = isSanityPreviewActive();

  return useQuery({
    queryKey: ["sanity-resource-guides", preview],
    queryFn: fetchResourceGuides,
    enabled: sanityConfigured,
  });
}

export function useResourcePublications() {
  const preview = isSanityPreviewActive();

  return useQuery({
    queryKey: ["sanity-resource-publications", preview],
    queryFn: fetchResourcePublications,
    enabled: sanityConfigured,
  });
}

export function useResourceVideos() {
  const preview = isSanityPreviewActive();

  return useQuery({
    queryKey: ["sanity-resource-videos", preview],
    queryFn: fetchResourceVideos,
    enabled: sanityConfigured,
  });
}

export function useResourceStandards() {
  const preview = isSanityPreviewActive();

  return useQuery({
    queryKey: ["sanity-resource-standards", preview],
    queryFn: fetchResourceStandards,
    enabled: sanityConfigured,
  });
}
