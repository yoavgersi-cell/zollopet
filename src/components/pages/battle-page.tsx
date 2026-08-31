import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED, latestUpdate } from "@/lib/config";
import { splitSentences, BoldKeyFacts, ReadableProse } from "@/components/prose";
import { type SiteContext, canonicalUrl, hubLink } from "@/lib/site-context";
import { ComparisonLayout } from "@/components/comparison-layout";
import { LandingEditorial } from "@/components/landing-editorial";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowRight, Check, Minus, ShieldCheck, Sparkles } from "lucide-react";
import { LastUpdated } from "@/components/last-updated";
import { ProviderCta } from "@/components/provider-cta";
import { BattleStickyCta } from "@/components/battle-sticky-cta";
import { TrustpilotCarousel } from "@/components/trustpilot-carousel";
import { TrustpilotRating } from "@/components/trustpilot-rating";
import { PromoPopup } from "@/components/promo-popup";
import { resolvePromoPopup } from "@/lib/promo-popups";
import { TrustDisclosure } from "@/components/medical-sources";
import { SourcesMethodology } from "@/components/sources-methodology";
import { ProductCarousel } from "@/components/product-carousel";
import { RedditThreadCarousel, REDDIT_COMMUNITY_FEEDBACK } from "@/components/reddit-community";
import { threeWayBySlug } from "@/lib/three-way";
import { ThreeWayPageView, threeWayMetadata } from "@/components/pages/three-way-page";

// Code-side CTR overrides for the highest-performing "versus" pages. These
// pages live in the CMS blob, so their stored titles can't be tuned from code -
// this map wins over the stored meta for exactly these slugs. Every price is
// the provider's real listed price; keep them in sync when pricing changes.
// Per-battle 12-month cost math - the decision-grade table SERP winners for
// "X vs Y" queries carry. Values are computed from the same verified prices as
// the price index; rows align to the battle's provider1/provider2 order.
// Seed a battle here only with real, current published rates.
const BATTLE_COST_MATH: Record<
  string,
  { rows: [string, string, string][]; note: string }
> = {};

const BATTLE_SEO_OVERRIDES: Record<string, { title: string; description: string }> = {};

// Metadata for a landing page or head-to-head battle at /<slug> (root) or
// /<vertical>/<slug> (hub). Returns { title: "Not Found" } for an unknown slug.
export async function battleMetadata(slug: string, ctx: SiteContext): Promise<Metadata> {
  // Curated 3-way comparisons (/{a}-vs-{b}-vs-{c}) resolve before 2-way battles.
  const trio = ctx.vertical === "weight-loss" ? threeWayBySlug.get(slug) : undefined;
  if (trio) return threeWayMetadata(trio, ctx);

  const config = await getConfig(ctx.vertical);

  // Check landing pages first
  const landing = (config.landingPages ?? []).find((lp) => lp.slug === slug);
  if (landing) {
    const url = canonicalUrl(ctx, `/${landing.slug}`);
    return {
      title: landing.seoTitle,
      description: landing.seoDescription,
      robots: ctx.noindex ? { index: false, follow: false } : undefined,
      alternates: { canonical: url },
      openGraph: {
        title: landing.seoTitle,
        description: landing.seoDescription,
        url,
      },
    };
  }

  const battle = (config.battles ?? []).find((b) => b.slug === slug);
  if (!battle) return { title: "Not Found" };

  // Reverse-pair canonicalization: if another battle compares the same two
  // providers in the opposite order (e.g. altrx-vs-noom and noom-vs-altrx),
  // both target the same query intent and split ranking signals. Point every
  // page for a given provider pair at one deterministic canonical - the
  // alphabetically-first slug - so Google consolidates them into one result.
  const samePairSlugs = (config.battles ?? [])
    .filter(
      (b) =>
        (b.provider1Id === battle.provider1Id && b.provider2Id === battle.provider2Id) ||
        (b.provider1Id === battle.provider2Id && b.provider2Id === battle.provider1Id)
    )
    .map((b) => b.slug)
    .sort();
  const canonicalSlug = samePairSlugs[0] ?? battle.slug;
  const url = canonicalUrl(ctx, `/${canonicalSlug}`);

  // CTR override (code-controlled) wins over the stored meta for top battles.
  // For battles without a bespoke override whose stored title carries no year,
  // generate a high-intent pattern instead of shipping a generic title - the
  // matchup label stays, the intent qualifiers (year, price, verdict) come in.
  const override = ctx.vertical === "weight-loss" ? BATTLE_SEO_OVERRIDES[slug] : undefined;
  const baseLabel = (battle.matchupLabel ?? battle.title.split(":")[0]).trim();
  const generatedTitle = `${baseLabel} (2026): Price, Differences & Verdict`;
  const metaTitle = override?.title ?? (/20\d{2}/.test(battle.title) ? battle.title : generatedTitle);
  const metaDescription = override?.description ?? battle.description;

  return {
    title: metaTitle,
    description: metaDescription,
    robots: ctx.noindex ? { index: false, follow: false } : undefined,
    alternates: { canonical: url },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      type: "article",
    },
  };
}

/// Read-more treatment for long editorial copy: the first `n` sentences stay
// visible, the remainder renders inside a native <details> element - so ALL
// content is in the initial HTML/DOM for search engines, and the toggle is
// purely visual (no JS, no fetch). Sentence splitting and key-fact bolding
// come from the shared prose module.
function ReadMoreProse({ text, label, visibleSentences = 2 }: { text: string; label: string; visibleSentences?: number }) {
  const [visible, rest] = splitSentences(text, visibleSentences);
  if (!rest) {
    return (
      <p className="mb-6 max-w-[820px] text-[15px] leading-[1.85] text-gray-600">
        <BoldKeyFacts text={text} />
      </p>
    );
  }
  return (
    <div className="mb-6 max-w-[820px]">
      <p className="text-[15px] leading-[1.85] text-gray-600">
        <BoldKeyFacts text={visible} />
      </p>
      <details className="group mt-1.5">
        <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-[14px] font-semibold text-[#1F4A33] hover:underline [&::-webkit-details-marker]:hidden">
          {label}
          <span className="text-[11px] transition-transform group-open:rotate-180">▾</span>
        </summary>
        <ReadableProse text={rest} className="mt-2" paragraphClassName="text-[15px] leading-[1.85] text-gray-600" />
      </details>
    </div>
  );
}

export async function BattlePageView({ slug, ctx }: { slug: string; ctx: SiteContext }) {
  // Curated 3-way comparisons render their own template.
  const trio = ctx.vertical === "weight-loss" ? threeWayBySlug.get(slug) : undefined;
  if (trio) return ThreeWayPageView({ trio, ctx });

  const config = await getConfig(ctx.vertical);

  // ───── LANDING PAGE ─────
  const landing = (config.landingPages ?? []).find((lp) => lp.slug === slug);
  if (landing) {
    // Build a config override with custom provider order + positions
    const customConfig = {
      ...config,
      ranking: {
        ...config.ranking,
        providerOrder: landing.providerOrder.length > 0 ? landing.providerOrder : config.ranking.providerOrder,
      },
    };

    const providerOrder = landing.providerOrder.length > 0 ? landing.providerOrder : config.ranking.providerOrder;

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: landing.seoTitle,
      description: landing.seoDescription,
      url: canonicalUrl(ctx, `/${landing.slug}`),
      dateModified: landing.updatedAt || CONTENT_LAST_UPDATED,
      publisher: { "@type": "Organization", name: ctx.brandDomain, url: ctx.origin },
    };

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: landing.h1,
      numberOfItems: providerOrder.length,
      itemListElement: providerOrder.map((id, i) => {
        const p = config.providers.find((pr) => pr.id === id);
        return { "@type": "ListItem", position: i + 1, name: p?.name ?? id };
      }),
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl(ctx, "/") },
        { "@type": "ListItem", position: 2, name: landing.h1, item: canonicalUrl(ctx, `/${landing.slug}`) },
      ],
    };

    // FAQ schema from editorial sections
    const landingFaqSchema = landing.editorialSections && landing.editorialSections.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: landing.editorialSections.map((s) => ({
        "@type": "Question",
        name: s.heading,
        acceptedAnswer: { "@type": "Answer", text: s.body.replace(/<[^>]*>/g, "") },
      })),
    } : null;

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {landingFaqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(landingFaqSchema) }} />}
        <ComparisonLayout
          config={customConfig}
          linkPrefix={ctx.prefix}
          heroOverrides={{
            h1: landing.h1,
            h2: landing.h2,
            description: landing.heroDescription,
          }}
        >
          {landing.editorialSections && landing.editorialSections.length > 0 ? (
            <LandingEditorial sections={landing.editorialSections} />
          ) : null}
        </ComparisonLayout>
      </>
    );
  }

  // ───── BATTLE PAGE ─────
  const battle = (config.battles ?? []).find((b) => b.slug === slug);
  if (!battle) return notFound();

  // Collapse reverse-pair duplicates (e.g. embody-vs-altrx ↔ altrx-vs-embody):
  // both slugs render the same matchup and compete in search. 308-redirect any
  // non-canonical slug to the single canonical (alphabetically-first) slug for
  // this provider pair so only one URL is indexed and its authority is pooled.
  const samePairSlugs = (config.battles ?? [])
    .filter(
      (b) =>
        (b.provider1Id === battle.provider1Id && b.provider2Id === battle.provider2Id) ||
        (b.provider1Id === battle.provider2Id && b.provider2Id === battle.provider1Id)
    )
    .map((b) => b.slug)
    .sort();
  const canonicalPairSlug = samePairSlugs[0] ?? battle.slug;
  if (canonicalPairSlug !== slug) {
    permanentRedirect(hubLink(ctx, `/${canonicalPairSlug}`));
  }

  const p1 = config.providers.find((p) => p.id === battle.provider1Id);
  const p2 = config.providers.find((p) => p.id === battle.provider2Id);
  if (!p1 || !p2) return notFound();

  // Display label for the "X vs Y" matchup (breadcrumb, FAQ, schema). A battle
  // can lead the label with a high-demand brand via matchupLabel without
  // reordering provider1/provider2 (which drives winner logic).
  const matchupLabel = battle.matchupLabel || `${p1.name} vs ${p2.name}`;

  // Objective framing: no declared "winner". Map the per-side verdict points to
  // each provider (the CMS stores them as winner/loser points) so both columns
  // read as an even "go with X if… / go with Y if…" recommendation.
  const p1IsBattleWinner = battle.winnerId === p1.id;
  const p1VerdictPoints = p1IsBattleWinner ? (battle.verdictWinnerPoints ?? []) : (battle.verdictLoserPoints ?? []);
  const p2VerdictPoints = p1IsBattleWinner ? (battle.verdictLoserPoints ?? []) : (battle.verdictWinnerPoints ?? []);

  // Per-provider deep dives. Each provider gets its own rich, full section
  // (intro, what-you-get, pricing, pros/cons, its own Trustpilot reviews, CTA)
  // pulled from that provider's review data - so the page reads as two honest,
  // standalone write-ups rather than a "who wins" head-to-head. `bestForFallback`
  // covers providers that don't have a review entry yet.
  const p1Review = (config.reviews ?? []).find((r) => r.providerId === p1.id);
  const p2Review = (config.reviews ?? []).find((r) => r.providerId === p2.id);
  const deepDives = [
    { provider: p1, review: p1Review, bestForFallback: p1VerdictPoints },
    { provider: p2, review: p2Review, bestForFallback: p2VerdictPoints },
  ];

  // Mobile promo popup - the highest-priority featured provider that has a
  // creative (registry + priority in @/lib/promo-popups). Each popup's link and
  // offer come from that provider's own real affiliate data.
  const promoPopup = resolvePromoPopup([p1, p2]);

  // CRO layer (rolled out to all battles after the embody-vs-ro prototype):
  // quick answer, fit finder, Reddit synthesis, read-more accordions (content
  // stays fully in the DOM via <details>) and sticky-CTA hierarchy. All
  // data-driven from each battle's own verdict fields - presentation only.
  const verdictWinner = battle.winnerId === p2.id ? p2 : battle.winnerId === p1.id ? p1 : null;
  const verdictRunnerUp = verdictWinner === p1 ? p2 : verdictWinner === p2 ? p1 : null;
  const winnerPts = battle.verdictWinnerPoints ?? [];
  const runnerUpPts = battle.verdictLoserPoints ?? [];

  // Above-the-fold quick-comparison rows: the three decisions searchers care
  // about first (price, prescription, delivery), pulled from this battle's own
  // feature data so every value is real. The prescription row is a market
  // constant - every provider we compare requires a licensed-provider review.
  const findFeature = (re: RegExp) => (battle.features ?? []).find((f) => re.test(f.feature));
  const priceRow = findFeature(/price|cost/i);
  const shippingRow = findFeature(/shipping|delivery|speed/i);
  const medsRow = findFeature(/medication|treatment/i);
  const quickRows = [
    priceRow && { label: "Starting price", v1: priceRow.provider1Value, v2: priceRow.provider2Value },
    medsRow && { label: "Medications", v1: medsRow.provider1Value, v2: medsRow.provider2Value },
    { label: "Prescription", v1: "Required - online provider review", v2: "Required - online provider review" },
    shippingRow && { label: "Delivery", v1: shippingRow.provider1Value, v2: shippingRow.provider2Value },
  ].filter(Boolean) as { label: string; v1: string; v2: string }[];

  // Related comparisons - other battles featuring either provider (internal links).
  // Ordered by relevance: comparisons involving this matchup's winner surface
  // first (a reader is most likely to keep evaluating the winner against other
  // options), then the rest in config order - the stable sort preserves that
  // order within each tier.
  const relatedBattles = (config.battles ?? [])
    .filter(
      (b) =>
        b.slug !== battle.slug &&
        [b.provider1Id, b.provider2Id].some((id) => id === p1.id || id === p2.id)
    )
    .map((b) => {
      const bp1 = config.providers.find((p) => p.id === b.provider1Id);
      const bp2 = config.providers.find((p) => p.id === b.provider2Id);
      if (!bp1 || !bp2) return null;
      const featuresWinner =
        b.provider1Id === battle.winnerId || b.provider2Id === battle.winnerId;
      return { slug: b.slug, bp1, bp2, featuresWinner };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => Number(b.featuresWinner) - Number(a.featuresWinner))
    .slice(0, 6);

  // FAQ - real, query-shaped questions answered from grounded battle content.
  // Expands the queries the page can rank for (long-tail + People Also Ask) and
  // powers both the visible FAQ section and the FAQPage schema.
  const catToQuestion = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("pric") || n.includes("value")) return `Is ${p1.name} cheaper than ${p2.name}?`;
    if (n.includes("ship") || n.includes("speed")) return `Which is faster, ${p1.name} or ${p2.name}?`;
    if (n.includes("medication")) return `Which has more medication options, ${p1.name} or ${p2.name}?`;
    if (n.includes("medical") || n.includes("care") || n.includes("support") || n.includes("monitor")) return `Which has better medical support, ${p1.name} or ${p2.name}?`;
    if (n.includes("customer") || n.includes("experience") || n.includes("service") || n.includes("personal")) return `Which has better customer reviews, ${p1.name} or ${p2.name}?`;
    if (n.includes("flexib")) return `Which offers more flexible plans, ${p1.name} or ${p2.name}?`;
    if (n.includes("focus") || n.includes("simplic")) return `Which is the more focused option, ${p1.name} or ${p2.name}?`;
    if (n.includes("range") || n.includes("beyond")) return `Does ${p2.name} offer a wider range than ${p1.name}?`;
    if (n.includes("brand") || n.includes("track") || n.includes("pharmacy")) return `Which is the more established brand, ${p1.name} or ${p2.name}?`;
    if (n.includes("transparen") || n.includes("certif")) return `Which is more transparent about pricing, ${p1.name} or ${p2.name}?`;
    return `${name}: ${p1.name} or ${p2.name}?`;
  };

  const battleFaqs = [
    { question: `Which is better, ${matchupLabel}?`, answer: battle.verdict },
    ...battle.categories.map((cat) => ({ question: catToQuestion(cat.name), answer: cat.explanation })),
  ].filter((f, i, arr) => !!f.answer && arr.findIndex((x) => x.question === f.question) === i);

  const battleUpdatedAt = latestUpdate(battle.updatedAt);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: battle.title,
    description: battle.description,
    datePublished: "2026-06-01",
    dateModified: battleUpdatedAt,
    author: { "@type": "Organization", name: ctx.brandTeam, url: ctx.origin },
    publisher: { "@type": "Organization", name: ctx.brandDomain, url: ctx.origin },
    mainEntityOfPage: canonicalUrl(ctx, `/${battle.slug}`),
  };

  const battleBreadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl(ctx, "/") },
      { "@type": "ListItem", position: 2, name: matchupLabel, item: canonicalUrl(ctx, `/${battle.slug}`) },
    ],
  };

  const battleFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: battleFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(battleBreadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(battleFaqSchema) }} />

      <div className="min-h-screen bg-[#FAF4E6]">
        {/* ───── HERO ───── */}
        <section className="relative overflow-hidden border-b border-gray-200 bg-white">
          {/* Subtle gradient accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1F4A33] via-[#1a8cd8] to-[#1F4A33]" />
          {/* Mobile-tight hero: less padding, a smaller subtitle, and a single
              wrapping byline row - the fold should reach real content, not
              spend itself on credits. Desktop keeps its previous scale. */}
          <div className="mx-auto max-w-[1100px] px-4 pb-6 pt-5 sm:px-6 sm:pb-14 sm:pt-12">
            <Breadcrumbs
              items={[
                { label: "Home", href: hubLink(ctx, "/") },
                { label: matchupLabel },
              ]}
            />

            <h1 className="text-[24px] font-extrabold leading-[1.18] text-[#22362A] sm:text-[38px] sm:leading-[1.15]">
              {battle.title}
            </h1>
            <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-gray-500 sm:mt-3 sm:text-[15px]">
              {battle.subtitle || battle.description}
            </p>
            <div className="mt-3.5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[11.5px] leading-[1.5] sm:mt-4 sm:text-[13px]">
              {config.experts && config.experts.length > 0 && (
                <>
                  <p className="text-gray-500">
                    <span className="font-semibold uppercase tracking-[0.05em] text-gray-400">By </span>
                    <Link href={hubLink(ctx, "/about")} className="font-semibold text-[#22362A] hover:text-[#1F4A33] hover:underline">
                      The {ctx.brandTeam.replace(/\s+Team$/i, "")} Research Team
                    </Link>
                    <span className="hidden text-gray-400 sm:inline"> · {config.experts[0].role}</span>
                  </p>
                  <span className="text-gray-300">•</span>
                </>
              )}
              {/* Medical-review credit slot: renders the reviewer from the CMS
                  Team tab. When a credentialed clinician (MD/PharmD/RD) is
                  added there, this line carries their name sitewide. */}
              {config.experts && config.experts.length > 1 && (
                <>
                  <p className="text-gray-500">
                    <span className="font-semibold uppercase tracking-[0.05em] text-gray-400">Reviewed by </span>
                    <Link href={hubLink(ctx, "/about")} className="font-semibold text-[#22362A] hover:text-[#1F4A33] hover:underline">
                      {config.experts[1].credentials
                        ? `${config.experts[1].name}, ${config.experts[1].credentials}`
                        : config.experts[1].name}
                    </Link>
                  </p>
                  <span className="text-gray-300">•</span>
                </>
              )}
              <LastUpdated date={battleUpdatedAt} />
            </div>
            <TrustDisclosure disclaimerHref={hubLink(ctx, "/disclaimer")} />
          </div>
        </section>

        <div className="mx-auto max-w-[1100px] px-4 pt-10 pb-28 sm:px-6 sm:pb-10">
          {/* ───── EXPERT INTRO ───── */}
          <div className="mb-8 max-w-[760px]">
            <p className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.07em] text-[#1F4A33]">
              Here&rsquo;s the short version
            </p>
            <ReadableProse text={battle.intro} paragraphClassName="text-[16px] leading-[1.85] text-gray-600" />
          </div>

          {/* ───── EARLY QUICK ANSWER ─────
              Answers the search intent immediately, built from each battle's
              own verdict points - no new copy to maintain per page. Renders
              only when a battle actually names a winner with points. */}
          {battle.winnerId && verdictWinner && verdictRunnerUp && winnerPts.length > 0 && runnerUpPts.length > 0 && (
            <div className="mb-12 max-w-[820px] rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.07em] text-[#1F4A33]">
                The quick answer
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-[14px] font-bold text-[#22362A]">Go with {verdictWinner.name} if you want</p>
                  <ul className="space-y-2">
                    {winnerPts.slice(0, 3).map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-[14px] leading-[1.65] text-gray-600">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2.5} />
                        <span><BoldKeyFacts text={pt} /></span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-[14px] font-bold text-[#22362A]">{verdictRunnerUp.name} makes more sense if you want</p>
                  <ul className="space-y-2">
                    {runnerUpPts.slice(0, 3).map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-[14px] leading-[1.65] text-gray-600">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1F4A33]" strokeWidth={2.5} />
                        <span><BoldKeyFacts text={pt} /></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-4 border-t border-gray-100 pt-3.5 text-[14px] text-gray-700">
                <span className="font-bold text-[#22362A]">
                  Had to pick one for most people? {verdictWinner.name}.
                </span>{" "}
                <span className="text-gray-500">
                  The numbers and customer feedback below are why - and where {verdictRunnerUp.name} wins instead.
                </span>
              </p>
            </div>
          )}

          {/* ───── ABOVE-THE-FOLD QUICK COMPARISON ─────
              The three decisions searchers came for - price, prescription,
              delivery - answered before any scrolling, from real feature data. */}
          {quickRows.length > 0 && (
            <div className="mb-12 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full table-fixed border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50/80">
                    <th className="w-[26%] py-3 pl-4 pr-2 text-[11px] font-bold uppercase tracking-[0.06em] text-gray-400 sm:w-[22%] sm:py-3.5 sm:text-[12px]">
                      At a glance
                    </th>
                    <th className="py-3 px-2 text-[13px] font-bold text-[#22362A] sm:py-3.5 sm:px-3 sm:text-[15px]">{p1.name}</th>
                    <th className="py-3 px-2 pr-4 text-[13px] font-bold text-[#22362A] sm:py-3.5 sm:px-3 sm:text-[15px]">{p2.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {quickRows.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 align-top last:border-0">
                      <td className="py-3 pl-4 pr-2 text-[12.5px] font-semibold leading-snug text-gray-500 sm:py-3.5 sm:text-[13.5px]">
                        {row.label}
                      </td>
                      {/* break-words: slash-joined values (e.g. medication lists)
                          have no natural break points and would clip on mobile */}
                      <td className="break-words py-3 px-2 text-[12.5px] leading-snug text-[#22362A] sm:py-3.5 sm:px-3 sm:text-[14px]">{row.v1}</td>
                      <td className="break-words py-3 px-2 pr-4 text-[12.5px] leading-snug text-[#22362A] sm:py-3.5 sm:px-3 sm:text-[14px]">{row.v2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Freshness line - SERP winners date-stamp their prices; ours
                  are verified against published rates on every content pass. */}
              <p className="border-t border-gray-100 px-4 py-2.5 text-[11.5px] text-gray-400">
                Prices are the providers&rsquo; published rates at our last verification - confirm the
                final figure at checkout, as offers change.{" "}
                <Link href={hubLink(ctx, "/how-we-rank")} className="font-medium text-gray-500 underline underline-offset-2 hover:text-[#1F4A33]">
                  How we verify prices
                </Link>
              </p>
            </div>
          )}

          {/* ───── 12-MONTH COST MATH ─────
              What a realistic course of treatment costs at each provider -
              the number searchers actually decide on, not the headline rate. */}
          {ctx.vertical === "weight-loss" && BATTLE_COST_MATH[slug] && (
            <div className="mb-12">
              <h2 className="mb-1.5 text-[22px] font-bold text-[#22362A]">
                What you actually pay over 12 months
              </h2>
              <p className="mb-4 max-w-[680px] text-[14px] text-gray-500">
                Headline prices are the least useful number in a comparison - this is the real math
                over a course of treatment, promo conditions applied exactly as published.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50/80">
                      <th className="w-[34%] px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400" />
                      <th className="px-4 py-3.5 text-[14px] font-bold text-[#22362A]">{p1.name}</th>
                      <th className="px-4 py-3.5 text-[14px] font-bold text-[#22362A]">{p2.name}</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13.5px]">
                    {BATTLE_COST_MATH[slug].rows.map(([label, v1, v2], i) => (
                      <tr key={i} className="border-b border-gray-100 align-top last:border-0">
                        <td className="px-4 py-3.5 text-[12.5px] font-semibold leading-snug text-gray-500">{label}</td>
                        <td className="break-words px-4 py-3.5 font-semibold text-[#22362A] [font-variant-numeric:tabular-nums]">{v1}</td>
                        <td className="break-words px-4 py-3.5 font-semibold text-[#22362A] [font-variant-numeric:tabular-nums]">{v2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-gray-400">{BATTLE_COST_MATH[slug].note}</p>
            </div>
          )}

          {/* ───── PRODUCT CAROUSEL ─────
              Shopping-style product cards for THIS matchup's two providers
              only - a battle page sells the contenders, not the whole market.
              Weight-loss only (the catalog is a WL registry). */}
          {ctx.vertical === "weight-loss" && (
            <div className="mb-12">
              <ProductCarousel
                providers={config.providers}
                title={`Shop ${p1.name} and ${p2.name} plans`}
                subtitle="Both contenders' published plans, cheapest first - conditions under every price."
                onlyProviderIds={[p1.id, p2.id]}
                pageType="battle"
                withSchema
                pageUrl={canonicalUrl(ctx, `/${slug}`)}
              />
            </div>
          )}

          {/* ───── PROVIDER CARDS (enriched) ───── */}
          <div className="relative mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* VS badge - desktop: absolute-centered between the two columns */}
            <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:flex">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1F4A33]/20 bg-white text-[13px] font-extrabold text-[#1F4A33] shadow-sm">
                VS
              </div>
            </div>

            {[p1, p2].map((provider, idx) => {
              return (
              <Fragment key={provider.id}>
                {/* VS badge - mobile: sits in the gap BETWEEN the two stacked cards */}
                {idx === 1 && (
                  <div className="flex items-center justify-center sm:hidden -my-1">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#1F4A33]/20 bg-white text-[12px] font-extrabold text-[#1F4A33]">
                      VS
                    </div>
                  </div>
                )}
              <div className="relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white px-6 pb-6 pt-7 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-[40px] w-[110px] items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={provider.logo} alt={`${provider.name} logo`} className="max-h-full max-w-full object-contain" />
                  </div>
                </div>

                <div className="mb-3 border-b border-gray-100 pb-3">
                  {provider.trustpilotRating ? (
                    <TrustpilotRating
                      rating={provider.trustpilotRating}
                      reviewCount={provider.trustpilotReviewCount}
                      starSize={16}
                    />
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-emerald-700">
                      <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
                      Editorially reviewed
                    </span>
                  )}
                </div>

                <p className="mb-4 text-[14px] leading-relaxed text-gray-500">
                  {provider.tagline}
                </p>

                <ul className="mb-5 space-y-2">
                  {provider.highlights.slice(0, 3).map((h, hi) => (
                    <li key={hi} className="flex items-start gap-2 text-[13px] text-gray-700">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2} />
                      {h}
                    </li>
                  ))}
                </ul>

                <ProviderCta
                  href={provider.affiliateUrl}
                  providerName={provider.name}
                  providerSlug={provider.id}
                  pageType="battle"
                  sourceFlow="battle_page"
                  className="mt-auto flex h-[44px] w-full items-center justify-center gap-1.5 rounded-xl bg-[#1F4A33] text-[14px] font-bold text-white transition-colors hover:bg-[#163B27]"
                >
                  Visit {provider.name}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </ProviderCta>
              </div>
              </Fragment>
              );
            })}
          </div>

          {/* ───── FEATURE COMPARISON TABLE ───── */}
          {battle.features && battle.features.length > 0 && (
            <div className="mb-14">
              <h2 className="text-[22px] font-bold leading-tight text-[#22362A] sm:text-[24px]">
                {p1.name} vs. {p2.name}: What&rsquo;s the Difference?
              </h2>
              <p className="mt-2 mb-5 max-w-[640px] text-[15px] leading-relaxed text-gray-500">
                The key differences to consider when comparing the two providers.
              </p>

              <table className="w-full table-fixed border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="w-[32%] py-3 pr-2 align-bottom" />
                    <th className="w-[34%] py-3 px-2 align-bottom text-[13px] font-bold text-[#22362A] sm:px-3 sm:text-[15px]">
                      {p1.name}
                    </th>
                    <th className="w-[34%] py-3 pl-2 align-bottom text-[13px] font-bold text-[#22362A] sm:pl-3 sm:text-[15px]">
                      {p2.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {battle.features.map((row, i) => {
                    const norm = (s?: string) => (s ?? "").trim().toLowerCase();
                    const same = norm(row.provider1Value) === norm(row.provider2Value);
                    const bestFor = /best[\s-]?for/i.test(row.feature);
                    // Differences read in full contrast; identical rows stay quiet so
                    // the eye is drawn to what actually separates the two providers.
                    const value = `${same ? "text-gray-400" : "text-[#22362A]"} ${bestFor ? "font-semibold" : "font-normal"}`;
                    return (
                      <tr key={i} className="border-b border-gray-100 align-top">
                        <td
                          className={`py-3 pr-2 text-[12.5px] leading-snug sm:py-3.5 sm:text-[14px] ${
                            bestFor ? "font-semibold text-[#22362A]" : "font-medium text-gray-500"
                          }`}
                        >
                          {row.feature}
                        </td>
                        <td className={`py-3 px-2 text-[12.5px] leading-snug sm:py-3.5 sm:px-3 sm:text-[14.5px] ${value}`}>
                          {row.provider1Value}
                        </td>
                        <td className={`py-3 pl-2 text-[12.5px] leading-snug sm:py-3.5 sm:pl-3 sm:text-[14.5px] ${value}`}>
                          {row.provider2Value}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ───── FIT FINDER ─────
              Turns the comparison above into decisions, from each battle's own
              verdict points - find the line that sounds like you. */}
          {verdictWinner && verdictRunnerUp && (winnerPts.length > 0 || runnerUpPts.length > 0) && (
            <div className="mb-14 max-w-[820px]">
              <h2 className="mb-1.5 text-[22px] font-bold text-[#22362A]">
                So which one should you pick?
              </h2>
              <p className="mb-4 text-[14px] text-gray-500">
                Find the line that sounds like you - that&rsquo;s your answer.
              </p>
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                {[
                  ...winnerPts.slice(0, 3).map((pt) => [pt, verdictWinner.name] as const),
                  ...runnerUpPts.slice(0, 3).map((pt) => [pt, verdictRunnerUp.name] as const),
                ].map(([need, pick], i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 last:border-0 sm:px-5"
                  >
                    <span className="text-[13.5px] leading-snug text-gray-600 sm:text-[14px]">
                      <BoldKeyFacts text={need} />
                    </span>
                    <span className="shrink-0 text-[13.5px] font-bold text-[#1F4A33] sm:text-[14px]">{pick}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ───── REDDIT COMMUNITY CAROUSEL (verified threads only) ───── */}
          {ctx.vertical === "weight-loss" && (
            <RedditThreadCarousel
              providers={[p1, p2]}
              reviewHrefFor={(id) => hubLink(ctx, `/reviews/${id}`)}
            />
          )}

          {/* ───── EVIDENCE -> CONCLUSION SYNTHESIS ─────
              Reads the threads shown directly above and says what keeps coming
              up - one written summary per provider, from the same registry as
              the threads themselves, so it only renders on verified material. */}
          {ctx.vertical === "weight-loss" &&
            [p1, p2].some((p) => REDDIT_COMMUNITY_FEEDBACK[p.id]?.themes) && (
              <div className="mb-14 max-w-[820px] rounded-2xl border border-gray-200 bg-gray-50/60 p-5 sm:p-6">
                <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.07em] text-[#1F4A33]">
                  What we found
                </p>
                <div className="space-y-3 text-[14px] leading-[1.7] text-gray-600">
                  {[p1, p2].map((p) =>
                    REDDIT_COMMUNITY_FEEDBACK[p.id]?.themes ? (
                      <p key={p.id}>
                        <span className="font-bold text-[#22362A]">{p.name}:</span>{" "}
                        {REDDIT_COMMUNITY_FEEDBACK[p.id].themes}
                      </p>
                    ) : null
                  )}
                </div>
              </div>
            )}

          {/* ───── PER-PROVIDER DEEP DIVES ───── */}
          <div className="mb-14">
            <div className="mb-8 max-w-[760px]">
              <p className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.07em] text-[#1F4A33]">
                The full breakdown
              </p>
              <h2 className="text-[24px] font-bold text-[#22362A]">
                {p1.name} vs {p2.name}: a closer look at each
              </h2>
              <p className="mt-3 text-[15px] leading-[1.8] text-gray-600">
                {ctx.vertical === "weight-loss"
                  ? "Both are solid GLP-1 weight loss providers, and honestly you can’t go too wrong either way."
                  : "Both are credible providers in this category, and the right pick comes down to fit."}{" "}
                So instead of crowning a &ldquo;winner,&rdquo; here&rsquo;s the
                real rundown on each - what you get, what it actually costs, and what
                real customers are saying - so you can pick the one that fits <em>you</em>.
              </p>
            </div>

            <div className="space-y-10">
              {deepDives.map(({ provider, review, bestForFallback }) => {
                const features = review?.keyFeatures?.length ? review.keyFeatures : provider.highlights;
                const bestFor = review?.bestFor?.length ? review.bestFor : bestForFallback;
                const plans = review?.pricingPlans ?? [];
                const pros = review?.pros ?? [];
                const cons = review?.cons ?? [];
                const badges = review?.trustBadges ?? [];
                const lead = review?.reviewIntro || provider.tagline;
                const reviewCount = provider.trustpilotReviews?.length ?? 0;

                return (
                  <section
                    key={provider.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                  >
                    {/* Accent bar */}
                    <div className="h-1 bg-gradient-to-r from-[#1F4A33] via-[#1a8cd8] to-[#1F4A33]" />

                    <div className="p-6 sm:p-8">
                      {/* Header: logo + Trustpilot rating + quick CTA */}
                      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex h-[44px] w-[130px] items-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={provider.logo} alt={`${provider.name} logo`} className="max-h-full max-w-full object-contain" />
                          </div>
                          {provider.trustpilotRating ? (
                            <div className="border-l border-gray-200 pl-4">
                              <TrustpilotRating
                                rating={provider.trustpilotRating}
                                reviewCount={provider.trustpilotReviewCount}
                                starSize={15}
                              />
                            </div>
                          ) : (
                            <div className="border-l border-gray-200 pl-4">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-emerald-700">
                                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
                                Editorially reviewed
                              </span>
                            </div>
                          )}
                        </div>
                        <ProviderCta
                          href={provider.affiliateUrl}
                          providerName={provider.name}
                          providerSlug={provider.id}
                          pageType="battle"
                          sourceFlow="battle_page"
                          className="inline-flex h-[42px] items-center justify-center gap-1.5 rounded-xl bg-[#1F4A33] px-5 text-[14px] font-bold text-white transition-colors hover:bg-[#163B27]"
                        >
                          Visit {provider.name}
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </ProviderCta>
                      </div>

                      {/* Intro */}
                      <h3 className="mb-2.5 text-[20px] font-bold text-[#22362A]">
                        What is {provider.name}?
                      </h3>
                      <ReadMoreProse text={lead} label={`Read the full ${provider.name} breakdown`} />

                      {/* Trust badges */}
                      {badges.length > 0 && (
                        <div className="mb-8 flex flex-wrap gap-2">
                          {badges.map((b, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[12px] font-semibold text-gray-600"
                            >
                              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
                              {b}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* What you get + Who it's best for */}
                      <div className="mb-8 grid gap-6 sm:grid-cols-2">
                        <div>
                          <h4 className="mb-3 flex items-center gap-2 text-[15px] font-bold text-[#22362A]">
                            <Check className="h-4 w-4 text-emerald-500" strokeWidth={2.5} />
                            What you get with {provider.name}
                          </h4>
                          <ul className="space-y-2">
                            {features.map((f, i) => (
                              <li key={i} className="flex items-start gap-2 text-[14px] leading-[1.6] text-gray-600">
                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2} />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {bestFor.length > 0 && (
                          <div>
                            <h4 className="mb-3 flex items-center gap-2 text-[15px] font-bold text-[#22362A]">
                              <Sparkles className="h-4 w-4 text-[#1F4A33]" strokeWidth={2} />
                              Who {provider.name} is best for
                            </h4>
                            <ul className="space-y-2">
                              {bestFor.map((f, i) => (
                                <li key={i} className="flex items-start gap-2 text-[14px] leading-[1.6] text-gray-600">
                                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1F4A33]" strokeWidth={2} />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Pricing */}
                      {plans.length > 0 ? (
                        <div className="mb-8">
                          <h4 className="mb-1.5 text-[17px] font-bold text-[#22362A]">
                            How much does {provider.name} cost?
                          </h4>
                          {review?.pricingSummary && (
                            <div className="mb-4 [&>div]:mb-0 [&_p]:text-[14px] [&_p]:leading-[1.7] [&_p]:text-gray-500">
                              <ReadMoreProse
                                text={review.pricingSummary}
                                label="Full pricing details"
                                visibleSentences={1}
                              />
                            </div>
                          )}
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {plans.map((plan, i) => (
                              <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
                                <p className="text-[13px] font-bold text-[#22362A]">{plan.name}</p>
                                <p className="mb-2 text-[12px] text-gray-500">{plan.medication}</p>
                                <div className="flex items-baseline gap-1.5">
                                  <span className="text-[22px] font-extrabold text-[#1F4A33]">{plan.price}</span>
                                  {plan.regularPrice && (
                                    <span className="text-[13px] text-gray-400 line-through">{plan.regularPrice}</span>
                                  )}
                                  {plan.unit && <span className="text-[12px] text-gray-400">{plan.unit}</span>}
                                </div>
                                {plan.cadence && (
                                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                                    {plan.cadence}
                                  </p>
                                )}
                                {plan.highlights && plan.highlights.length > 0 && (
                                  <ul className="mt-3 space-y-1.5 border-t border-gray-200 pt-3">
                                    {plan.highlights.map((h, hi) => (
                                      <li key={hi} className="flex items-start gap-1.5 text-[12px] leading-[1.5] text-gray-500">
                                        <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" strokeWidth={2} />
                                        {h}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : review?.pricingSummary ? (
                        <div className="mb-8">
                          <h4 className="mb-1.5 text-[17px] font-bold text-[#22362A]">
                            How much does {provider.name} cost?
                          </h4>
                          <p className="max-w-[820px] text-[14px] leading-[1.7] text-gray-500">
                            {review.pricingSummary}
                          </p>
                        </div>
                      ) : null}

                      {/* Pros / cons */}
                      {(pros.length > 0 || cons.length > 0) && (
                        <div className="mb-8 grid gap-4 sm:grid-cols-2">
                          {pros.length > 0 && (
                            <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-5">
                              <p className="mb-3 text-[14px] font-bold text-emerald-800">
                                What we like about {provider.name}
                              </p>
                              <ul className="space-y-2">
                                {pros.map((pt, i) => (
                                  <li key={i} className="flex items-start gap-2 text-[13.5px] leading-[1.55] text-gray-700">
                                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2.5} />
                                    {pt}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {cons.length > 0 && (
                            <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-5">
                              <p className="mb-3 text-[14px] font-bold text-gray-700">
                                Worth keeping in mind
                              </p>
                              <ul className="space-y-2">
                                {cons.map((c, i) => (
                                  <li key={i} className="flex items-start gap-2 text-[13.5px] leading-[1.55] text-gray-600">
                                    <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={2} />
                                    {c}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {/* This provider's Trustpilot reviews */}
                      {reviewCount > 0 && (
                        <div className="mb-8">
                          <h4 className="mb-4 text-[17px] font-bold text-[#22362A]">
                            What real {provider.name} customers are saying
                          </h4>
                          <TrustpilotCarousel
                            providerName={provider.name}
                            providerLogo={provider.logo}
                            reviews={provider.trustpilotReviews!}
                            rating={provider.trustpilotRating}
                            reviewCount={provider.trustpilotReviewCount}
                          />
                        </div>
                      )}

                      {/* Bottom CTA */}
                      <ProviderCta
                        href={provider.affiliateUrl}
                        providerName={provider.name}
                        providerSlug={provider.id}
                        pageType="battle"
                        sourceFlow="battle_page"
                        className="flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#1F4A33] text-[15px] font-bold text-white transition-colors hover:bg-[#163B27]"
                      >
                        Get started with {provider.name}
                        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                      </ProviderCta>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>

          {/* ───── BOTTOM CTAs ───── */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            {[
              { provider: p1, color: "from-gray-50 to-gray-50/50", hoverColor: "hover:border-[#1F4A33]/30", textColor: "text-[#22362A]" },
              { provider: p2, color: "from-gray-50 to-gray-50/50", hoverColor: "hover:border-[#1F4A33]/30", textColor: "text-[#22362A]" },
            ].map(({ provider, color, hoverColor, textColor }) => (
              <ProviderCta
                key={provider.id}
                href={provider.affiliateUrl}
                providerName={provider.name}
                providerSlug={provider.id}
                pageType="battle"
                sourceFlow="battle_page"
                className={`group flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-gradient-to-b ${color} px-4 py-6 transition-all ${hoverColor} hover:shadow-md`}
              >
                <div className="flex h-[36px] w-[100px] items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={provider.logo}
                    alt={`${provider.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <span className={`flex items-center gap-1 text-[13px] font-bold ${textColor} group-hover:underline`}>
                  Visit Site
                  <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                </span>
              </ProviderCta>
            ))}
          </div>

          {/* ───── FAQ ───── */}
          {battleFaqs.length > 0 && (
            <div className="mb-14">
              <h2 className="mb-6 text-[24px] font-bold text-[#22362A]">
                {matchupLabel}: FAQs
              </h2>
              <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                {battleFaqs.map((f, i) => (
                  <div key={i} className="p-6">
                    <h3 className="mb-2 text-[16px] font-bold text-[#22362A]">{f.question}</h3>
                    <p className="text-[14px] leading-[1.7] text-gray-600">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ───── RELATED COMPARISONS ───── */}
          {relatedBattles.length > 0 && (
            <div className="mb-10">
              <h2 className="mb-5 text-[20px] font-bold text-[#22362A]">Related Comparisons</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {relatedBattles.map(({ slug: relSlug, bp1, bp2 }) => (
                  <Link
                    key={relSlug}
                    href={hubLink(ctx, `/${relSlug}`)}
                    className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition-colors hover:border-[#1F4A33]/30 hover:bg-[#1F4A33]/[0.02]"
                  >
                    <div className="flex items-center gap-2 text-[13px] font-bold text-[#22362A]">
                      <span>{bp1.name}</span>
                      <span className="text-[11px] font-extrabold text-gray-300">VS</span>
                      <span>{bp2.name}</span>
                    </div>
                    <span className="ml-auto inline-flex items-center gap-1 text-[13px] font-semibold text-[#1F4A33] group-hover:underline">
                      Compare
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related links */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-4 text-[13px]">
            <Link href={hubLink(ctx, `/reviews/${p1.id}`)} className="font-semibold text-[#1F4A33] hover:underline">
              {p1.name} Review
            </Link>
            <span className="text-gray-300">|</span>
            <Link href={hubLink(ctx, `/reviews/${p2.id}`)} className="font-semibold text-[#1F4A33] hover:underline">
              {p2.name} Review
            </Link>
            <span className="text-gray-300">|</span>
            <Link href={hubLink(ctx, "/")} className="font-semibold text-[#1F4A33] hover:underline">
              Compare All Providers
            </Link>
          </div>

          <SourcesMethodology
            ctx={ctx}
            providers={[{ id: p1.id, name: p1.name }, { id: p2.id, name: p2.name }]}
            headingLabel={`${p1.name} and ${p2.name}`}
          />
        </div>
      </div>

      {/* Mobile-only sticky CTA - both providers, appears after the hero */}
      <BattleStickyCta
        p1={{ id: p1.id, name: p1.name, affiliateUrl: p1.affiliateUrl }}
        p2={{ id: p2.id, name: p2.name, affiliateUrl: p2.affiliateUrl }}
        recommendedId={verdictWinner?.id}
      />

      {/* Mobile-only promo popup - the highest-priority featured provider that
          has a creative (e.g. Embody outranks TrimRx on an Embody-vs-TrimRx
          page, so TrimRx shows on all its other comparisons but not that one) */}
      {promoPopup && (
        <PromoPopup
          spec={promoPopup}
          href={(promoPopup.providerId === p1.id ? p1 : p2).affiliateUrl}
          position={promoPopup.providerId === p1.id ? 1 : 2}
        />
      )}
    </>
  );
}
