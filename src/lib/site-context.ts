import { DEFAULT_VERTICAL, isPublishedVertical } from "./config";

// ─────────────────────────────────────────────────────────────────────────────
// Site context
//
// ZolloPet is a single-brand hub: every content page lives under a vertical
// prefix (zollopet.com/<vertical>/…). A SiteContext carries the few per-render
// facts the shared page templates need: the internal-link prefix, the
// canonical origin/prefix, and the schema branding. Threading a context
// (instead of reading request headers) keeps every page a plain,
// statically-renderable server component.
// ─────────────────────────────────────────────────────────────────────────────

const HUB_ORIGIN = "https://www.zollopet.com";

export interface SiteContext {
  vertical: string;
  /** Prefix for internal (relative) links: "/<vertical>". */
  prefix: string;
  /** Absolute origin used for canonical / OpenGraph / schema URLs. */
  origin: string;
  /** Path prefix inside the canonical origin: "/<vertical>". */
  canonicalPrefix: string;
  /** Bare domain for schema Organization names, e.g. "zollopet.com". */
  brandDomain: string;
  /** Display name for schema author/publisher, e.g. "ZolloPet Team". */
  brandTeam: string;
  /** When true, pages in this context are kept out of the index (unpublished vertical). */
  noindex: boolean;
}

// Context for a page rendered under the hub at /<vertical>/...
export function hubContext(vertical: string): SiteContext {
  // An unpublished vertical (a content skeleton not yet launched) is kept out
  // of the index until its affiliate data is filled in and it's published.
  return {
    vertical,
    prefix: `/${vertical}`,
    origin: HUB_ORIGIN,
    canonicalPrefix: `/${vertical}`,
    brandDomain: "zollopet.com",
    brandTeam: "ZolloPet Team",
    noindex: !isPublishedVertical(vertical),
  };
}

// Context used by shared root-level pages (about, disclaimer, 404) that render
// outside a vertical prefix - branded ZolloPet, linked into the default
// vertical.
export const ROOT_CONTEXT: SiteContext = hubContext(DEFAULT_VERTICAL);

// Absolute canonical URL for an internal path (path starts with "/", or "/" for
// the vertical home). e.g. canonicalUrl(ctx, "/reviews/ollie").
export function canonicalUrl(ctx: SiteContext, path: string): string {
  const tail = path === "/" ? "" : path;
  return `${ctx.origin}${ctx.canonicalPrefix}${tail}`;
}

// Internal <Link> href for an internal path.
export function hubLink(ctx: SiteContext, path: string): string {
  if (path === "/") return ctx.prefix || "/";
  return `${ctx.prefix}${path}`;
}
