import { useQuery } from "@tanstack/react-query";
import { fetchEvents, fetchNewsArticle, fetchNewsArticles, fetchPhotoGalleryItems } from "./api";
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
