import type { MetadataRoute } from "next";
import { getConfig } from "@/lib/config-store";
import {
  CONTENT_LAST_UPDATED,
  latestUpdate,
  NOINDEX_ARTICLE_SLUGS,
  VERTICAL_IDS,
  isPublishedVertical,
  type SiteConfig,
} from "@/lib/config";

const HUB_URL = "https://www.zollopet.com";
const FALLBACK_DATE = new Date(CONTENT_LAST_UPDATED);

// Battles, reviews and articles share a template-wide floor date (see
// TEMPLATES_LAST_UPDATED) - keep the sitemap's lastmod in sync with the
// on-page "Last updated" line and schema dateModified.
const flooredLastModified = (updatedAt?: string) => new Date(latestUpdate(updatedAt));

// Shared one-off pages, canonical under the default vertical's prefix is NOT
// used for these - they're advertised once at the hub root scope, under the
// prefix the chrome links use. Kept minimal: only routes that actually exist.
const SHARED_STATIC_PATHS: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/how-we-rank", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.3, changeFrequency: "monthly" },
  { path: "/disclaimer", priority: 0.2, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: HUB_URL, lastModified: FALLBACK_DATE, changeFrequency: "weekly", priority: 1 },
  ];

  for (const vertical of VERTICAL_IDS) {
    if (!isPublishedVertical(vertical)) continue; // unpublished skeletons stay out
    const config = await getConfig(vertical);
    if ((config.providers ?? []).length === 0) continue; // nothing to index yet
    entries.push(...verticalEntries(`${HUB_URL}/${vertical}`, config));
  }

  // Shared info pages, once, under the default vertical prefix the chrome uses.
  entries.push(
    ...SHARED_STATIC_PATHS.map((s) => ({
      url: `${HUB_URL}/${VERTICAL_IDS[0]}${s.path}`,
      lastModified: FALLBACK_DATE,
      changeFrequency: s.changeFrequency,
      priority: s.priority,
    }))
  );

  return entries;
}

// Sitemap entries for one vertical, rooted at `base` (origin + /<vertical>).
function verticalEntries(base: string, config: SiteConfig): MetadataRoute.Sitemap {
  const P = (path: string) => `${base}${path}`;

  const entries: MetadataRoute.Sitemap = [
    { url: base, lastModified: FALLBACK_DATE, changeFrequency: "weekly", priority: 0.9 },
    { url: P("/reviews"), lastModified: FALLBACK_DATE, changeFrequency: "weekly", priority: 0.9 },
  ];

  // The articles index only earns a sitemap slot once the vertical actually
  // has articles - an empty "No articles" page is thin content.
  if ((config.articles ?? []).length > 0) {
    entries.push({ url: P("/articles"), lastModified: FALLBACK_DATE, changeFrequency: "weekly", priority: 0.8 });
  }

  entries.push(
    ...(config.reviews ?? []).map((r) => ({
      url: P(`/reviews/${r.slug}`),
      lastModified: flooredLastModified(r.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  entries.push(
    ...(config.articles ?? [])
      .filter((a) => !NOINDEX_ARTICLE_SLUGS.includes(a.slug))
      .map((a) => ({
        url: P(`/articles/${a.slug}`),
        lastModified: flooredLastModified(a.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
  );

  entries.push(
    ...(config.battles ?? []).map((b) => ({
      url: P(`/${b.slug}`),
      lastModified: flooredLastModified(b.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  entries.push(
    ...(config.landingPages ?? []).map((lp) => ({
      url: P(`/${lp.slug}`),
      lastModified: lp.updatedAt ? new Date(lp.updatedAt) : FALLBACK_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }))
  );

  return entries;
}
