import type { SanityCategory, SanityImage } from "./types";

export function formatNewsDate(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getNewsBadgeStyles(categories: SanityCategory[]) {
  const primary = categories[0]?.slug ?? categories[0]?.title?.toLowerCase() ?? "news";

  switch (primary) {
    case "program":
    case "programs":
    case "community":
      return "bg-teal";
    case "resource":
    case "resources":
    case "research":
      return "bg-navy";
    case "announcement":
    case "announcements":
    case "update":
      return "bg-orange";
    default:
      return "bg-slate-700";
  }
}

export function getPrimaryCategoryLabel(categories: SanityCategory[]) {
  return categories[0]?.title ?? "News";
}

export function getPrimaryEventCategoryLabel(categories: SanityCategory[]) {
  return categories[0]?.title ?? "Events";
}

export function getSanityImageProps(image?: SanityImage) {
  const src = image?.asset?.url;
  if (!src) return null;

  return {
    src,
    alt: image?.alt ?? "",
    width: image?.asset?.metadata?.dimensions?.width,
    height: image?.asset?.metadata?.dimensions?.height,
    placeholder: image?.asset?.metadata?.lqip,
    caption: image?.caption,
  };
}
