import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? "2025-02-19";
const previewToken = import.meta.env.VITE_SANITY_PREVIEW_TOKEN;

export const sanityConfigured = Boolean(projectId && dataset);

function isPreviewEnabled() {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("preview") === "1";
}

function resolvePerspective() {
  return isPreviewEnabled() && previewToken ? "drafts" : "published";
}

function resolveUseCdn() {
  return resolvePerspective() === "published";
}

export function getSanityClient() {
  if (!sanityConfigured) {
    throw new Error("Sanity frontend environment variables are not configured.");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: resolveUseCdn(),
    perspective: resolvePerspective(),
    ...(resolvePerspective() === "drafts" && previewToken ? { token: previewToken } : {}),
  });
}

export function isSanityPreviewActive() {
  return resolvePerspective() === "drafts";
}
