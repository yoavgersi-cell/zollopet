# ZolloPet

zollopet.com - an independent comparison hub for pet products and services.

## Verticals

The hub is split into fully separated verticals, each with its own providers,
reviews, comparisons, articles and CMS blob:

- **Fresh Dog Food** (`/fresh-dog-food`) - fresh & human-grade dog food delivery
- **Fresh Cat Food** (`/fresh-cat-food`) - fresh & human-grade cat food delivery
- **Pet Insurance** (`/pet-insurance`) - pet insurance plans for dogs & cats

Adding a vertical is a single entry in `src/lib/config.ts` (`VERTICALS`) plus a
content seed in `src/lib/seeds/`.

## Architecture

- Next.js App Router. `/` is the hub landing; all content lives under
  `/<vertical>/…` (vertical home, `/reviews`, `/articles`, and battle
  comparison pages at `/<vertical>/<a>-vs-<b>`).
- Per-vertical content is code-seeded (`src/lib/seeds/*.ts`) and CMS-editable
  at `/admin`, stored per vertical in Vercel Blob
  (`site-config-<vertical>.json`). A saved blob overlays the code seed.
- Shared info pages (`/about`, `/how-we-rank`, `/disclaimer`,
  `/find-your-match`) are served from root routes; the proxy rewrites
  `/<vertical>/<page>` onto them so navigation stays inside a vertical.

## House rules (content)

Real brands with truthful, general descriptions and NO invented data - no
fabricated prices, ratings, or claims. Where a brand's published pricing hasn't
been verified, the copy says so and points to the brand's site. Affiliate links
and verified pricing get filled in as partnerships come online.

## Development

```bash
npm install
npm run dev
```

Environment variables:

- `BLOB_READ_WRITE_TOKEN` - Vercel Blob (CMS storage)
- `ADMIN_PASSWORD` - /admin and /api/config auth
- `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID` - analytics (optional)
