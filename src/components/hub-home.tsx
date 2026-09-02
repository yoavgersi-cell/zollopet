import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Star, ShieldCheck } from "lucide-react";
import { VERTICALS, DEFAULT_VERTICAL, isPublishedVertical, type Provider, type RankingPosition, type ReviewData, type SiteConfig } from "@/lib/config";
import { getConfig } from "@/lib/config-store";
import { ProviderCta } from "@/components/provider-cta";

// ───── Category icons ─────
// Hand-drawn two-tone line icons (outline + light fill), matching the
// comparison-publisher look: detailed enough to feel bespoke, drawn inline so
// there are no external assets. Purely decorative - no data implied.
const ICON_STROKE = "#1F4A33";
const ICON_FILL = "#F9E9BC";

function DogBowlIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* steam - fresh, just served */}
      <path d="M26.5 16c-2-2.6 2-4.4 0-7M37.5 16c-2-2.6 2-4.4 0-7M32 13.5c-2-2.6 2-4.4 0-7" stroke={ICON_STROKE} strokeWidth="2" strokeLinecap="round" />
      {/* fresh food mound */}
      <path
        d="M17 33.5c0-4.6 3.6-8 7.6-7.7 1.5-2.9 4.4-4.6 7.4-4.6 3.3 0 6.2 1.9 7.5 4.7 3.7.4 6.5 3.4 6.5 7.6"
        fill="#fff"
        stroke={ICON_STROKE}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* visible ingredients: peas + carrot chunk */}
      <circle cx="25" cy="29.5" r="1.5" fill={ICON_STROKE} />
      <circle cx="38.5" cy="30" r="1.5" fill={ICON_STROKE} />
      <path d="M30.5 27.5l4.5 1.2-2.2 3.2z" fill={ICON_FILL} stroke={ICON_STROKE} strokeWidth="1.6" strokeLinejoin="round" />
      {/* bowl */}
      <path
        d="M11.5 34h41c0 9.3-6.8 15.6-15 16.7h-11c-8.2-1.1-15-7.4-15-16.7z"
        fill={ICON_FILL}
        stroke={ICON_STROKE}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M8.5 34h47" stroke={ICON_STROKE} strokeWidth="2.2" strokeLinecap="round" />
      {/* debossed paw on the bowl front */}
      <ellipse cx="32" cy="43.5" rx="3" ry="2.5" fill="#fff" stroke={ICON_STROKE} strokeWidth="1.5" />
      <circle cx="27.2" cy="40.8" r="1.4" fill="#fff" stroke={ICON_STROKE} strokeWidth="1.3" />
      <circle cx="32" cy="39.6" r="1.4" fill="#fff" stroke={ICON_STROKE} strokeWidth="1.3" />
      <circle cx="36.8" cy="40.8" r="1.4" fill="#fff" stroke={ICON_STROKE} strokeWidth="1.3" />
      {/* sparkles */}
      <path d="M53.5 18.5v5M51 21h5" stroke={ICON_STROKE} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="11" cy="21" r="1.3" fill={ICON_STROKE} />
    </svg>
  );
}

function CatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* cat head peeking over the bowl */}
      <path
        d="M17.5 36c0-3 .7-5.9 2-8.4L16.5 14l8.4 5.6a15.6 15.6 0 0 1 14.2 0L47.5 14l-3 13.6c1.3 2.5 2 5.4 2 8.4"
        fill={ICON_FILL}
        stroke={ICON_STROKE}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* content closed eyes */}
      <path d="M24.5 28.5c1.1-1.5 2.9-1.5 4 0M35.5 28.5c1.1-1.5 2.9-1.5 4 0" stroke={ICON_STROKE} strokeWidth="1.8" strokeLinecap="round" />
      {/* nose */}
      <path d="M30.8 32h2.4l-1.2 1.7z" fill={ICON_STROKE} />
      {/* whiskers */}
      <path d="M11 27.5h6.5M11.5 32l6-1M53 27.5h-6.5M52.5 32l-6-1" stroke={ICON_STROKE} strokeWidth="1.7" strokeLinecap="round" />
      {/* bowl in front */}
      <path
        d="M15 38.5h34c0 6.8-5.2 11.6-11.8 12.5H26.8C20.2 50.1 15 45.3 15 38.5z"
        fill="#fff"
        stroke={ICON_STROKE}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M12 38.5h40" stroke={ICON_STROKE} strokeWidth="2.2" strokeLinecap="round" />
      {/* fish on the bowl */}
      <path d="M29 44.5c2.4-2 5.2-2 7.6 0-2.4 2-5.2 2-7.6 0z" fill={ICON_FILL} stroke={ICON_STROKE} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M29 44.5l-2.6-1.7v3.4z" fill={ICON_FILL} stroke={ICON_STROKE} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="34.6" cy="44.1" r="0.7" fill={ICON_STROKE} />
      {/* sparkles */}
      <path d="M54 11v5M51.5 13.5h5" stroke={ICON_STROKE} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="10.5" cy="14" r="1.3" fill={ICON_STROKE} />
    </svg>
  );
}

function InsuranceShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* shield, double outline */}
      <path
        d="M32 7l19.5 6.8v12.9c0 13.7-8 23.9-19.5 28.3C20.5 50.6 12.5 40.4 12.5 26.7V13.8z"
        fill={ICON_FILL}
        stroke={ICON_STROKE}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M32 12.2l14.4 5v9.8c0 10.5-5.9 18.3-14.4 22-8.5-3.7-14.4-11.5-14.4-22v-9.8z"
        fill="#fff"
        stroke={ICON_STROKE}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      {/* paw */}
      <ellipse cx="32" cy="34.5" rx="5" ry="4.3" fill={ICON_FILL} stroke={ICON_STROKE} strokeWidth="1.9" />
      <circle cx="24.8" cy="28.6" r="2.3" fill={ICON_FILL} stroke={ICON_STROKE} strokeWidth="1.7" />
      <circle cx="29.6" cy="25.4" r="2.3" fill={ICON_FILL} stroke={ICON_STROKE} strokeWidth="1.7" />
      <circle cx="34.4" cy="25.4" r="2.3" fill={ICON_FILL} stroke={ICON_STROKE} strokeWidth="1.7" />
      <circle cx="39.2" cy="28.6" r="2.3" fill={ICON_FILL} stroke={ICON_STROKE} strokeWidth="1.7" />
      {/* care badge */}
      <circle cx="48.5" cy="11" r="5.2" fill="#fff" stroke={ICON_STROKE} strokeWidth="1.9" />
      <path d="M48.5 8.6v4.8M46.1 11h4.8" stroke={ICON_STROKE} strokeWidth="1.8" strokeLinecap="round" />
      {/* sparkles */}
      <path d="M12.5 7.5v4.4M10.3 9.7h4.4" stroke={ICON_STROKE} strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="55" cy="24" r="1.3" fill={ICON_STROKE} />
    </svg>
  );
}

function DnaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* double helix */}
      <path
        d="M21 8c0 7 16 9 16 16s-16 9-16 16"
        stroke={ICON_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M37 8c0 7-16 9-16 16s16 9 16 16"
        stroke={ICON_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* rungs across the open bulges */}
      <path d="M23 11.5h12M25.5 15.5h7M25.5 32.5h7M23 36.5h12" stroke={ICON_STROKE} strokeWidth="1.8" strokeLinecap="round" />
      {/* magnifier finding the paw */}
      <circle cx="42" cy="43" r="10" fill={ICON_FILL} stroke={ICON_STROKE} strokeWidth="2.2" />
      <path d="M49.5 50.5L56 57" stroke={ICON_STROKE} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="42" cy="45.5" rx="2.9" ry="2.4" fill="#fff" stroke={ICON_STROKE} strokeWidth="1.5" />
      <circle cx="37.6" cy="42" r="1.5" fill="#fff" stroke={ICON_STROKE} strokeWidth="1.3" />
      <circle cx="42" cy="40.3" r="1.5" fill="#fff" stroke={ICON_STROKE} strokeWidth="1.3" />
      <circle cx="46.4" cy="42" r="1.5" fill="#fff" stroke={ICON_STROKE} strokeWidth="1.3" />
      {/* sparkles */}
      <path d="M52 12v5M49.5 14.5h5" stroke={ICON_STROKE} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="46" r="1.3" fill={ICON_STROKE} />
    </svg>
  );
}

const VERTICAL_ICON: Record<string, (p: { className?: string }) => React.JSX.Element> = {
  "fresh-dog-food": DogBowlIcon,
  "fresh-cat-food": CatIcon,
  "pet-insurance": InsuranceShieldIcon,
  "dog-dna-tests": DnaIcon,
};

// Real, keyword-rich internal links surfaced on a live category card (desktop
// hero). Only routes that actually exist are listed here - all hub-prefixed so
// they resolve without a redirect hop.
const CATEGORY_LINKS: Record<string, { label: string; href: string }[]> = {
  "fresh-dog-food": [
    { label: "Compare services", href: "/fresh-dog-food" },
    { label: "Reviews", href: "/fresh-dog-food/reviews" },
  ],
  "fresh-cat-food": [
    { label: "Compare services", href: "/fresh-cat-food" },
    { label: "Reviews", href: "/fresh-cat-food/reviews" },
  ],
  "pet-insurance": [
    { label: "Compare plans", href: "/pet-insurance" },
    { label: "Reviews", href: "/pet-insurance/reviews" },
  ],
  "dog-dna-tests": [
    { label: "Compare tests", href: "/dog-dna-tests" },
    { label: "Embark vs Wisdom Panel", href: "/dog-dna-tests/embark-vs-wisdom-panel" },
  ],
};

// Compact provider card for the homepage shelf - mirrors the ranking card's
// data but in a lighter, three-up form. Every value (logo, score, Trustpilot
// count, highlights, price) comes from config; nothing is invented, and the
// Trustpilot line only appears when a real aggregate rating exists.
function ProviderMiniCard({
  provider,
  position,
  review,
  rank,
  vertical,
}: {
  provider: Provider;
  position: RankingPosition;
  review?: ReviewData;
  rank: number;
  vertical: string;
}) {
  const highlights = (review?.keyFeatures ?? provider.highlights).slice(0, 3);
  const startingPlan = review?.pricingPlans?.[0];
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <div className="flex h-[40px] w-[130px] items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={provider.logo} alt={`${provider.name} logo`} className="max-h-full max-w-full object-contain object-left" />
        </div>
        <div className="flex flex-col items-center rounded-lg bg-[#1F4A33] px-2.5 py-1 text-white">
          <span className="text-[17px] font-extrabold leading-none">{position.score.toFixed(1)}</span>
          <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-wide text-white/70">/ 10</span>
        </div>
      </div>

      {provider.trustpilotRating ? (
        <div className="mt-3 flex items-center gap-1.5 text-[12.5px] text-gray-500">
          <Star className="h-3.5 w-3.5 fill-[#00B67A] text-[#00B67A]" strokeWidth={0} />
          <span className="font-bold text-gray-800">{provider.trustpilotRating}</span>
          <span>on Trustpilot</span>
          {provider.trustpilotReviewCount && <span className="text-gray-400">({provider.trustpilotReviewCount})</span>}
        </div>
      ) : (
        <div className="mt-3 flex items-center gap-1.5 text-[12.5px] font-semibold uppercase tracking-wide text-[#1F4A33]">
          <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
          {position.label}
        </div>
      )}

      <ul className="mt-3 space-y-1.5">
        {highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-[13px] leading-snug text-gray-800">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2.5} />
            <span className="line-clamp-2">{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex-1" />

      {startingPlan?.price && (
        <p className="mb-2.5 text-[12.5px] text-gray-500">
          From <span className="text-[15px] font-extrabold text-[#22362A]">{startingPlan.price}</span>
          {startingPlan.unit && <span className="font-semibold text-gray-500">{startingPlan.unit}</span>}
        </p>
      )}
      <ProviderCta
        href={provider.affiliateUrl}
        providerName={provider.name}
        providerSlug={provider.id}
        position={rank}
        pageType="listing"
        sourceFlow="main_comparison"
        className="flex h-[44px] w-full items-center justify-center gap-1.5 rounded-xl bg-[#1F4A33] text-[14px] font-bold text-white transition-colors hover:bg-[#163B27]"
      >
        Visit Site
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
      </ProviderCta>
      <Link
        href={`/${vertical}/reviews/${review?.slug ?? provider.id}`}
        className="mt-2 text-center text-[12.5px] font-semibold text-[#1F4A33] hover:underline"
      >
        Read review
      </Link>
    </div>
  );
}

// Ranked top-3 for one vertical, built from its own config.
function topThree(config: SiteConfig) {
  const order = config.ranking?.providerOrder ?? [];
  const positions = config.ranking?.positions ?? [];
  const reviews = config.reviews ?? [];
  return order
    .map((id, i) => {
      const provider = config.providers.find((p) => p.id === id);
      if (!provider) return null;
      const position = positions[i] ?? positions[positions.length - 1];
      return { provider, position, review: reviews.find((r) => r.providerId === id), rank: i + 1 };
    })
    .filter(Boolean)
    .slice(0, 3) as { provider: Provider; position: RankingPosition; review?: ReviewData; rank: number }[];
}

// Hub landing (zollopet.com). An editorial front door for the umbrella brand,
// styled as a real comparison publisher: a clear hero, a category grid, a
// shelf of reviewed brands, and top-rated picks per category. Every provider,
// score and review is pulled from config - nothing is fabricated, and
// unpublished categories are shown as "coming soon".
export async function HubHome() {
  const published = VERTICALS.filter((v) => isPublishedVertical(v.id));
  const configs = await Promise.all(published.map((v) => getConfig(v.id)));
  const byId = new Map(published.map((v, i) => [v.id, configs[i]]));

  const defaultConfig = byId.get(DEFAULT_VERTICAL) ?? configs[0];
  const defaultMeta = published.find((v) => v.id === DEFAULT_VERTICAL) ?? published[0];
  const topProviders = defaultConfig ? topThree(defaultConfig) : [];

  // Brand shelf: reviewed brands across all published categories. Only brands
  // with a real uploaded logo (PNG/JPG/WebP) appear - text-placeholder SVGs
  // would break the shelf's visual consistency. New uploads join automatically.
  const shelfProviders = configs
    .flatMap((c) => c.providers ?? [])
    .filter((p) => !p.logo.endsWith(".svg"))
    .slice(0, 12);

  return (
    <div className="bg-white">
      {/* ───── HERO ───── */}
      <section className="bg-gradient-to-b from-[#F8EDD6] via-[#FBF5E7] to-white">
        <div className="mx-auto max-w-[1100px] px-5 pb-14 pt-14 text-center sm:px-8 sm:pb-20 sm:pt-20">
          {/* One h1/one paragraph, responsive copy: the compact "Compare the
              Best..." treatment is mobile-only; desktop keeps the original
              hero exactly as it was. */}
          <h1 className="mx-auto max-w-[820px] text-[38px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#1F4A33] sm:max-w-[950px] sm:text-[62px] sm:leading-[1.06] sm:tracking-[-0.025em]">
            <span className="sm:hidden">Compare the Best Pet Services for Your Pet&rsquo;s Needs</span>
            <span className="hidden sm:inline">Everything Your Pet Deserves, Compared Honestly</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-[16.5px] leading-relaxed text-gray-700 sm:mt-8 sm:max-w-[680px] sm:text-[21px]">
            <span className="sm:hidden">
              Fresh dog &amp; cat food, pet insurance and dog DNA tests -
              independent reviews and honest verdicts for pet parents.
            </span>
            <span className="hidden sm:inline">
              Fresh food, pet insurance and DNA tests - honest, independent
              reviews written for pet parents, with every claim we haven&rsquo;t
              verified labeled as exactly that.
            </span>
          </p>

          {/* MOBILE: compact tappable icon+label cards, two-up like the big
              comparison publishers. The whole card is the link. */}
          <div className="mx-auto mt-9 grid max-w-[680px] grid-cols-2 gap-3 text-left sm:hidden">
            {VERTICALS.map((v) => {
              const live = isPublishedVertical(v.id);
              const Icon = VERTICAL_ICON[v.id] ?? DogBowlIcon;

              if (!live) {
                return (
                  <div
                    key={v.id}
                    className="flex items-center gap-3 rounded-2xl border border-gray-200/80 bg-white px-4 py-4 shadow-[0_1px_3px_rgba(16,42,67,0.06)]"
                  >
                    <Icon className="h-10 w-10 shrink-0" />
                    <div>
                      <span className="block text-[14.5px] font-bold leading-snug text-[#22362A]">{v.name}</span>
                      <span className="mt-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-400">
                        Coming soon
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={v.id}
                  href={`/${v.id}`}
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200/80 bg-white px-4 py-4 shadow-[0_1px_3px_rgba(16,42,67,0.06)] transition-shadow hover:shadow-[0_4px_14px_rgba(16,42,67,0.12)]"
                >
                  <Icon className="h-10 w-10 shrink-0" />
                  <span className="text-[14.5px] font-bold leading-snug text-[#22362A] group-hover:text-[#1F4A33]">
                    {v.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* DESKTOP: the original icon-led category cards with quick links. */}
          <div className="mx-auto mt-14 hidden max-w-[880px] gap-4 text-left sm:grid sm:grid-cols-2">
            {VERTICALS.map((v) => {
              const live = isPublishedVertical(v.id);
              const Icon = VERTICAL_ICON[v.id] ?? DogBowlIcon;
              const links = live ? CATEGORY_LINKS[v.id] ?? [] : [];

              if (links.length === 0) {
                // Icon + name only (unpublished categories) - centered, calm.
                return (
                  <div
                    key={v.id}
                    className="flex items-center justify-center gap-4 rounded-2xl border border-gray-200/80 bg-white px-6 py-7 shadow-[0_1px_3px_rgba(16,42,67,0.06)]"
                  >
                    <Icon className="h-[52px] w-[52px] shrink-0" />
                    <div className="text-left">
                      <span className="block text-[17px] font-bold leading-snug text-[#22362A]">{v.name}</span>
                      {!live && (
                        <span className="mt-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-400">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={v.id}
                  className="flex items-stretch gap-5 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)] transition-shadow hover:shadow-[0_4px_14px_rgba(16,42,67,0.10)] sm:p-6"
                >
                  {/* Icon + category name */}
                  <div className="flex w-[124px] shrink-0 flex-col items-center justify-center gap-3 text-center">
                    <Icon className="h-[56px] w-[56px]" />
                    <Link
                      href={`/${v.id}`}
                      className="text-[16.5px] font-bold leading-[1.25] text-[#22362A] hover:text-[#1F4A33]"
                    >
                      {v.name}
                    </Link>
                  </div>

                  <div className="w-px self-stretch bg-gray-200" />

                  {/* Arrow links */}
                  <div className="flex flex-1 flex-col justify-center gap-2.5 py-1">
                    {links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="group inline-flex items-center gap-2 text-[14.5px] font-medium text-gray-800 hover:text-[#1F4A33]"
                      >
                        {l.label}
                        <ArrowRight
                          className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#1F4A33]"
                          strokeWidth={2.2}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── BRAND SHELF ───── */}
      {/* Single-row, seamless auto-scrolling logo strip - the track is
          rendered twice and translated by exactly -50%, so the loop never
          shows a seam. Fixed per-item width + margins (no flex gap) keep
          that math exact. Works identically on mobile. */}
      {shelfProviders.length > 0 && (
        <section className="overflow-hidden border-y border-gray-200 bg-white">
          <div className="mx-auto max-w-[1100px] px-5 pt-12 sm:px-8">
            <h2 className="text-center text-[22px] font-bold tracking-[-0.01em] text-[#22362A]">
              Brands we review and compare
            </h2>
            <p className="mx-auto mt-2 max-w-[560px] text-center text-[15px] leading-relaxed text-gray-500">
              Independent reviews of real pet brands across our categories.
            </p>
          </div>
          <div className="relative mt-8 pb-12">
            <style>{`@keyframes zp-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
            <div className="flex w-max items-center [animation:zp-marquee_45s_linear_infinite]">
              {[...shelfProviders, ...shelfProviders].map((p, i) => (
                <div
                  key={`${p.id}-${i}`}
                  className="mx-4 flex h-[28px] w-[92px] shrink-0 items-center justify-center opacity-60 grayscale sm:mx-8 sm:h-[34px] sm:w-[120px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logo} alt={`${p.name} logo`} className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
            {/* soft edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
          </div>
        </section>
      )}

      {/* ───── TOP-RATED PROVIDERS (default vertical) ───── */}
      {topProviders.length > 0 && defaultMeta && (
        <section className="bg-[#FAF4E6]">
          <div className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8 sm:py-16">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#1F4A33]">{defaultMeta.name}</p>
                <h2 className="mt-1.5 text-[26px] font-bold leading-tight tracking-[-0.015em] text-[#22362A] sm:text-[32px]">
                  Top-rated brands this month
                </h2>
              </div>
              <Link
                href={`/${defaultMeta.id}`}
                className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#1F4A33] hover:underline underline-offset-4"
              >
                See the full ranking
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {topProviders.map((t) => (
                <ProviderMiniCard
                  key={t.provider.id}
                  provider={t.provider}
                  position={t.position}
                  review={t.review}
                  rank={t.rank}
                  vertical={defaultMeta.id}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── METHODOLOGY ───── */}
      <section className="border-t border-gray-200 bg-[#FAF4E6]">
        <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-[720px]">
            <h2 className="text-[26px] font-bold tracking-[-0.015em] text-[#22362A] sm:text-[32px]">
              How ZolloPet compares brands
            </h2>
            <p className="mt-4 text-[16.5px] leading-[1.7] text-gray-600">
              We look at what actually matters when choosing for your pet - what
              a service includes, how its pricing really works, plan and
              cancellation terms, and customer experience. Rankings are
              editorial and independent; partnerships never buy a higher
              placement, and where we haven&rsquo;t verified a brand&rsquo;s
              numbers we say so instead of guessing.
            </p>
            <Link
              href={`/${DEFAULT_VERTICAL}/how-we-rank`}
              className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-bold text-[#1F4A33] hover:underline underline-offset-4"
            >
              See how we rank brands
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
