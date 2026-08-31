import { Check, ArrowUpRight, Star, ShieldCheck, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { ProviderCta } from "./provider-cta";
import type { ReviewData } from "@/lib/config";

export interface RichCardProduct {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  highlights: string[];
  affiliateUrl: string;
  rank: number;
  rating: number;
  ratingLabel: string;
  starRating?: number;
  badge?: string;
  trustpilotRating?: string;
  trustpilotReviewCount?: string;
}

// Large, editorial-style ranking card modeled on the best affiliate comparison
// pages: a prominent score, a trust pill, the treatments offered, transparent
// starting price, a scannable key-facts grid, a strong CTA rail, and an intro
// that links through to the full review. Every value is grounded in real config
// data - scores, prices, treatments, features and trust signals all come from
// the per-provider research. Nothing here is fabricated.
export function RichComparisonCard({
  product,
  review,
  linkPrefix = "",
}: {
  product: RichCardProduct;
  review?: ReviewData;
  linkPrefix?: string;
}) {
  const stars = product.starRating ?? Math.round(product.rating / 2);
  const treatments = review?.treatmentOptions ?? [];
  const facts = (review?.keyFeatures ?? product.highlights).slice(0, 4);
  const pills = (review?.trustBadges ?? []).slice(0, 3);
  const startingPlan = review?.pricingPlans?.[0];
  const reviewHref = `${linkPrefix}/reviews/${review?.slug ?? product.id}`;
  const intro = review?.reviewIntro ?? review?.shortSummary ?? product.tagline;

  // FDA disclaimer only where it's actually warranted - i.e. the offering
  // includes compounded medication. Detected from real copy, never assumed.
  const mentionsCompounded = /compounded/i.test(
    `${review?.pricingSummary ?? ""} ${treatments.join(" ")}`,
  );

  return (
    <article className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Top ranked ribbon */}
      {product.badge && (
        <div className="flex items-center gap-1.5 bg-[#1F4A33] px-5 py-1.5 text-[12px] font-bold uppercase tracking-wide text-white">
          <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
          {product.badge}
        </div>
      )}

      <div className="p-4 sm:p-7">
        {/* ── Header: rank + logo, score box ── */}
        <div className="flex flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#22362A] text-[12px] font-extrabold text-white sm:h-8 sm:w-8 sm:text-[13px]">
              {product.rank}
            </span>
            <div className="flex h-[38px] w-[120px] items-center sm:h-[46px] sm:w-[170px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.logo}
                alt={`${product.name} logo`}
                className="max-h-full max-w-full object-contain object-left"
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="text-right">
              <div className="flex justify-end gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={i < stars ? "h-3.5 w-3.5 fill-[#FDB515] text-[#FDB515] sm:h-4 sm:w-4" : "h-3.5 w-3.5 fill-gray-200 text-gray-200 sm:h-4 sm:w-4"}
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-[#1F4A33] sm:text-[11px]">{product.ratingLabel}</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg bg-[#1F4A33] px-2.5 py-1 text-white sm:rounded-xl sm:px-3 sm:py-1.5">
              <span className="text-[20px] font-extrabold leading-none sm:text-[24px]">{product.rating.toFixed(1)}</span>
              <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-wide text-white/70 sm:text-[9px]">out of 10</span>
            </div>
          </div>
        </div>

        {/* Headline / tagline */}
        {product.tagline && (
          <h3 className="mt-3.5 text-[15px] font-bold leading-snug text-[#22362A] sm:mt-4 sm:text-[19px]">{product.tagline}</h3>
        )}

        {/* Trust pills - cap at 2 on mobile so the card doesn't stack into a list */}
        {pills.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
            {pills.map((p, i) => (
              <span
                key={p}
                className={`items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11.5px] font-semibold text-emerald-700 sm:px-3 sm:py-1 sm:text-[12px] ${
                  i >= 2 ? "hidden sm:inline-flex" : "inline-flex"
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
                {p}
              </span>
            ))}
          </div>
        )}

        {/* ── Body: facts (left) + CTA rail (right) ── */}
        <div className="mt-4 flex flex-col gap-4 sm:mt-5 sm:gap-5 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1 space-y-3.5 sm:space-y-4">
            {/* Info block: treatments + starting price */}
            {(treatments.length > 0 || startingPlan?.price) && (
              <div className="rounded-xl border border-gray-100 bg-[#FAF4E6] p-3.5 sm:p-4">
                {treatments.length > 0 && (
                  <div>
                    <p className="text-[10.5px] font-bold uppercase tracking-wide text-gray-500 sm:text-[11px]">What&#39;s offered</p>
                    <p className="mt-1 text-[12.5px] leading-snug text-gray-800 line-clamp-2 sm:line-clamp-none sm:text-[13.5px]">{treatments.slice(0, 4).join(" · ")}</p>
                  </div>
                )}
                {startingPlan?.price && (
                  <div className={treatments.length > 0 ? "mt-2.5 border-t border-gray-200 pt-2.5 sm:mt-3 sm:pt-3" : ""}>
                    <p className="text-[10.5px] font-bold uppercase tracking-wide text-gray-500 sm:text-[11px]">Starting price</p>
                    <p className="mt-1 flex items-baseline gap-2 text-gray-900">
                      {startingPlan.regularPrice && (
                        <span className="text-[13px] font-medium text-gray-400 line-through sm:text-[14px]">{startingPlan.regularPrice}</span>
                      )}
                      <span className="text-[19px] font-extrabold text-[#22362A] sm:text-[20px]">{startingPlan.price}</span>
                      {startingPlan.unit && <span className="text-[12.5px] font-semibold text-gray-500 sm:text-[13px]">{startingPlan.unit}</span>}
                    </p>
                    {mentionsCompounded && (
                      <p className="mt-1.5 text-[10.5px] leading-snug text-gray-400 sm:text-[11px]">
                        *Compounded medications are not FDA-approved.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Key facts grid */}
            {facts.length > 0 && (
              <ul className="grid gap-x-5 gap-y-1.5 sm:grid-cols-2 sm:gap-y-2">
                {facts.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[12.5px] leading-snug text-gray-700 sm:text-[13px]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2.5} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* CTA rail - on mobile the button stands on its own with the price
              beside it (and stands fully alone when there's no price); on desktop
              the price stacks above it inside a panel. */}
          <div className="flex shrink-0 flex-row items-center gap-3 lg:w-[220px] lg:flex-col lg:items-stretch lg:gap-2.5 lg:rounded-xl lg:bg-[#FAF4E6] lg:p-4">
            {startingPlan?.price && (
              <div className="shrink-0 leading-tight lg:text-center">
                <span className="hidden text-[12.5px] text-gray-500 lg:block">Pricing starts at</span>
                <p className="whitespace-nowrap text-gray-900">
                  <span className="text-[11px] font-semibold text-gray-400 lg:hidden">from </span>
                  <span className="text-[20px] font-extrabold text-[#22362A] lg:text-[22px]">{startingPlan.price}</span>
                  {startingPlan.unit && <span className="text-[12px] font-semibold text-gray-500 lg:text-[13px]">{startingPlan.unit}</span>}
                </p>
              </div>
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-2 lg:w-full lg:flex-none">
              <ProviderCta
                href={product.affiliateUrl}
                providerName={product.name}
                providerSlug={product.id}
                position={product.rank}
                pageType="listing"
                sourceFlow="main_comparison"
                className="flex h-[48px] w-full items-center justify-center gap-1.5 rounded-xl bg-[#1F4A33] text-[15px] font-bold text-white transition-colors hover:bg-[#163B27] sm:h-[50px]"
              >
                Visit Site
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </ProviderCta>
              <Link
                href={reviewHref}
                className="text-center text-[12.5px] font-semibold text-[#1F4A33] hover:underline"
              >
                Read full review
              </Link>
              {product.trustpilotRating && (
                <div className="mt-0.5 flex items-center justify-center gap-1.5 border-t border-gray-200 pt-2 text-[11.5px] text-gray-500">
                  <Star className="h-3.5 w-3.5 fill-[#00B67A] text-[#00B67A]" strokeWidth={0} />
                  <span className="font-bold text-gray-700">{product.trustpilotRating}</span>
                  <span>Trustpilot</span>
                  {product.trustpilotReviewCount && <span className="text-gray-400">({product.trustpilotReviewCount})</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Intro paragraph + read more */}
        {intro && (
          <div className="mt-4 border-t border-gray-100 pt-3.5 sm:mt-5 sm:pt-4">
            <p className="text-[12.5px] leading-relaxed text-gray-600 line-clamp-2 sm:text-[13.5px] sm:line-clamp-3">{intro}</p>
            <Link
              href={reviewHref}
              className="mt-1.5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#1F4A33] hover:underline sm:text-[13px]"
            >
              Read full {product.name} review
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
