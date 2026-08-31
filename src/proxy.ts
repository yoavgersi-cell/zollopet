import { NextResponse, type NextRequest } from "next/server";
import { isVertical } from "@/lib/config";

// Single-segment pages that are shared across the hub rather than owned by a
// vertical's CMS config (the quiz and static info pages). The dynamic money
// pages (/reviews, /articles, battle comparisons) are served by real nested
// routes under [battleSlug] and are intentionally NOT listed here - they must
// keep their own vertical param.
const SHARED_ONE_OFF_PAGES = new Set([
  "find-your-match",
  "about",
  "how-we-rank",
  "disclaimer",
]);

// zollopet.com is a single-host hub: "/" is the hub landing (a real root
// route), and every content page lives under a /<vertical>/ prefix. The only
// job left for the proxy is serving the shared one-off pages from their root
// route when they're requested under a vertical prefix
// ("/fresh-dog-food/about" → "/about"), so each vertical's chrome links keep
// the visitor inside the vertical without duplicating the pages.
export function proxy(req: NextRequest) {
  const segments = req.nextUrl.pathname.split("/").filter(Boolean);
  if (
    segments.length === 2 &&
    isVertical(segments[0]) &&
    SHARED_ONE_OFF_PAGES.has(segments[1])
  ) {
    return NextResponse.rewrite(new URL(`/${segments[1]}`, req.url));
  }
  return NextResponse.next();
}

export const config = {
  // Run on all pages except Next internals, API, admin, and any file with an
  // extension (assets, /sitemap.xml, /robots.txt).
  matcher: ["/((?!_next/|api/|admin|.*\\..*).*)"],
};
