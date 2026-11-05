import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { NOINDEX_ARTICLE_SLUGS, latestUpdate } from "@/lib/config";
import { enhanceArticleHtml } from "@/components/prose";
import { type SiteContext, canonicalUrl, hubLink } from "@/lib/site-context";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ExpertByline } from "@/components/expert-byline";
import { MedicalSources } from "@/components/medical-sources";
import { ProductCarousel } from "@/components/product-carousel";
import { TrustpilotCarousel } from "@/components/trustpilot-carousel";
import { RedditThreadCarousel, REDDIT_COMMUNITY_FEEDBACK } from "@/components/reddit-community";
import { notFound, permanentRedirect } from "next/navigation";

// SERP meta tuning, keyed "<vertical>:<slug>". Overrides the <title> and/or
// meta description only - the on-page H1 and subtitle keep the stored text.
// Rule: titles <= 54 chars (the " | ZolloPet" template adds 11 and Google
// truncates around 65), descriptions <= 160, keywords front-loaded.
const ARTICLE_SEO_OVERRIDES: Record<string, { title?: string; description?: string }> = {
  // fresh-dog-food
  "fresh-dog-food:fresh-dog-food-guide": {
    description:
      "Fresh dog food explained - fresh vs kibble, costs, the brands compared on verified records, switching, feeding and whether your dog needs it.",
  },
  "fresh-dog-food:is-fresh-dog-food-worth-it": {
    title: "Is Fresh Dog Food Worth It? An Honest Look",
  },
  "fresh-dog-food:fresh-dog-food-vs-kibble": {
    title: "Fresh Dog Food vs Kibble: What Changes",
  },
  "fresh-dog-food:how-much-fresh-dog-food-to-feed": {
    title: "How Much Fresh Dog Food to Feed Your Dog",
  },
  "fresh-dog-food:how-to-switch-dog-food": {
    title: "How to Switch Dog Food (7-10 Day Plan)",
  },
  "fresh-dog-food:best-dog-food-for-picky-eaters": {
    title: "Best Dog Food for Picky Eaters: What Works",
  },
  "fresh-dog-food:how-to-store-fresh-dog-food": {
    title: "How to Store Fresh Dog Food Properly",
  },
  "fresh-dog-food:best-dog-food-for-sensitive-stomachs": {
    title: "Best Dog Food for Sensitive Stomachs",
  },
  "fresh-dog-food:freshpet-vs-fresh-dog-food-delivery": {
    title: "Freshpet vs Fresh Dog Food Delivery",
  },
  "fresh-dog-food:fresh-dog-food-for-puppies": {
    description:
      "Fresh dog food for puppies: growth formulation, the large-breed calcium question, portion updates as your puppy grows, and what to verify per brand.",
  },
  // fresh-cat-food
  "fresh-cat-food:fresh-cat-food-delivery-guide": {
    description:
      "Fresh cat food delivery explained - how it compares to wet and dry, cooked vs raw, cost, switching a picky cat, and whether your cat needs it.",
  },
  "fresh-cat-food:how-to-get-cat-to-drink-more-water": {
    title: "How to Get Your Cat to Drink More Water",
  },
  "fresh-cat-food:is-fresh-food-good-for-cats": {
    title: "Is Fresh Food Good for Cats?",
  },
  "fresh-cat-food:wet-vs-dry-vs-fresh-cat-food": {
    title: "Wet vs Dry vs Fresh Cat Food Compared",
  },
  "fresh-cat-food:how-to-get-picky-cat-to-eat-new-food": {
    title: "How to Get a Picky Cat to Eat New Food",
  },
  "fresh-cat-food:why-is-my-cat-always-hungry": {
    title: "Why Is My Cat Always Hungry?",
  },
  "fresh-cat-food:kitten-food-vs-adult-cat-food": {
    title: "Kitten Food vs Adult Cat Food: Differences",
  },
  "fresh-cat-food:how-to-help-cat-lose-weight": {
    title: "How to Help a Cat Lose Weight Safely",
  },
  "fresh-cat-food:how-often-should-i-feed-my-cat": {
    title: "How Often Should I Feed My Cat?",
  },
  // pet-insurance
  "pet-insurance:how-does-pet-insurance-work": {
    description:
      "How pet insurance works - reimbursement, deductibles, limits, waiting periods, pre-existing conditions, claims and pricing - explained honestly.",
  },
  "pet-insurance:pet-insurance-pre-existing-conditions": {
    title: "Pet Insurance & Pre-Existing Conditions",
    description:
      "Does pet insurance cover pre-existing conditions? What counts as pre-existing, curable vs incurable, and what to check in a sample policy.",
  },
  "pet-insurance:when-to-get-pet-insurance": {
    title: "When to Get Pet Insurance: The Age Question",
  },
  "pet-insurance:pet-insurance-waiting-periods": {
    title: "Pet Insurance Waiting Periods, Explained",
  },
  "pet-insurance:pet-insurance-for-older-dogs": {
    title: "Pet Insurance for Older Dogs: What's Realistic",
  },
  "pet-insurance:pet-insurance-annual-limits": {
    title: "Pet Insurance Annual Limits: How Caps Work",
  },
  "pet-insurance:pet-insurance-vs-savings-account": {
    title: "Pet Insurance vs Savings Account",
    description:
      "Self-insuring vs pet insurance: where each wins, the year-one gap, the discipline problem, and the hybrid strategy many households land on.",
  },
  "pet-insurance:pet-insurance-reimbursement-rates": {
    title: "Pet Insurance Reimbursement Rates (70-90%)",
  },
  "pet-insurance:is-pet-insurance-worth-it-for-cats": {
    title: "Is Pet Insurance Worth It for Cats?",
  },
  "pet-insurance:is-pet-insurance-worth-it": {
    title: "Is Pet Insurance Worth It? Honest Framework",
    description:
      "Is pet insurance worth it? What it actually protects you from, who benefits most, the self-insurance alternative, and when it's not worth it.",
  },
  "pet-insurance:what-does-pet-insurance-not-cover": {
    title: "What Pet Insurance Doesn't Cover: Exclusions",
  },
  "pet-insurance:how-do-pet-insurance-deductibles-work": {
    title: "Pet Insurance Deductibles & Limits Explained",
  },
  "pet-insurance:how-to-file-a-pet-insurance-claim": {
    title: "How to File a Pet Insurance Claim Fast",
  },
  // dog-dna-tests
  "dog-dna-tests:dog-dna-test-guide": {
    description:
      "Dog DNA tests explained - how they work, breed ancestry, health screening, age and gut tests, verified pricing, and whether your dog needs one.",
  },
  "dog-dna-tests:are-dog-dna-tests-worth-it": {
    title: "Are Dog DNA Tests Worth It? Who Should Buy",
  },
  "dog-dna-tests:what-do-dog-dna-tests-tell-you": {
    title: "What Do Dog DNA Tests Tell You?",
    description:
      "What's in dog DNA test results: breed breakdown, health screening, trait insights and relative matching - and what each is genuinely useful for.",
  },
  "dog-dna-tests:how-to-tell-what-breed-my-dog-is": {
    title: "How to Tell What Breed Your Dog Is",
  },
  "dog-dna-tests:dog-dna-test-for-mixed-breeds": {
    title: "Dog DNA Tests for Mixed Breeds, Explained",
    description:
      "DNA testing a mixed-breed dog: how results look for real mutts, what 'supermutt' means, why trace breeds are fuzzy, and who benefits most.",
  },
  "dog-dna-tests:how-accurate-are-dog-dna-tests": {
    title: "How Accurate Are Dog DNA Tests?",
  },
  "dog-dna-tests:dog-dna-testing-market": {
    title: "The Dog DNA Testing Market: Who's Who",
  },
};

// The hub-and-spoke map: each vertical's ~12,500-word pillar guide. Every
// cluster article links up to it with a "start here" box, concentrating
// topical authority on one canonical page per vertical.
const PILLAR_SLUGS: Record<string, string> = {
  "fresh-dog-food": "fresh-dog-food-guide",
  "fresh-cat-food": "fresh-cat-food-delivery-guide",
  "pet-insurance": "how-does-pet-insurance-work",
  "dog-dna-tests": "dog-dna-test-guide",
};

// Query-shaped quick answers rendered above the article body for target
// slugs. Empty at launch - add entries only with verified facts.
const ARTICLE_QUICK_ANSWERS: Record<string, string> = {};

export async function articleMetadata(slug: string, ctx: SiteContext): Promise<Metadata> {
  const config = await getConfig(ctx.vertical);
  const article = (config.articles ?? []).find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };

  const url = canonicalUrl(ctx, `/articles/${slug}`);

  // CTR override (code-controlled) wins over stored meta for target articles.
  const override = ARTICLE_SEO_OVERRIDES[`${ctx.vertical}:${slug}`];

  return {
    title: override?.title ?? article.title,
    description: override?.description ?? article.description,
    robots: ctx.noindex
      ? { index: false, follow: false }
      : NOINDEX_ARTICLE_SLUGS.includes(slug)
        ? { index: false, follow: true }
        : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      images: [{ url: "https://www.zollopet.com/og.png", width: 1200, height: 630 }],
      title: override?.title ?? article.title,
      description: override?.description ?? article.description,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: latestUpdate(article.updatedAt),
      authors: [article.author || ctx.brandDomain],
    },
  };
}

const categoryColors: Record<string, string> = {
  Science: "bg-blue-50 text-blue-700",
  Guide: "bg-emerald-50 text-emerald-700",
  Advice: "bg-amber-50 text-amber-700",
  Wellness: "bg-purple-50 text-purple-700",
};

function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function ArticlePageView({ slug, ctx }: { slug: string; ctx: SiteContext }) {
  const config = await getConfig(ctx.vertical);
  const articles = config.articles ?? [];
  const experts = config.experts ?? [];

  // Head-to-head provider comparisons are canonical at the root battle URL.
  // If a battle owns this slug, consolidate /articles/<slug> → /<slug> (301/308)
  // so a duplicate or stale /articles/ URL doesn't compete with the battle page.
  if ((config.battles ?? []).some((b) => b.slug === slug)) {
    permanentRedirect(hubLink(ctx, `/${slug}`));
  }

  const article = articles.find((a) => a.slug === slug);
  if (!article) return notFound();

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const nextArticle = articles[currentIndex + 1] || null;
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;

  // Brand-cluster articles (is-embody-legit, happyhead-cost, ...) carry the
  // provider id as a slug segment. On those, surface the provider's real
  // social proof - Trustpilot and Reddit carousels - high on the page.
  // Exact segment match so "ro" never fires inside "sprout". Trustpilot data
  // lives on the current vertical's own provider record, so it's safe on any
  // vertical; the Reddit registry is weight-loss-researched and stays gated
  // (a shared provider id like directmeds must not inherit those threads).
  const slugParts = slug.split("-");
  const subjectProvider = config.providers.find((p) => slugParts.includes(p.id));
  const subjectTrustpilot =
    subjectProvider?.trustpilotReviews?.length ? subjectProvider : undefined;
  const subjectReddit =
    ctx.vertical === "weight-loss" && subjectProvider && REDDIT_COMMUNITY_FEEDBACK[subjectProvider.id]
      ? subjectProvider
      : undefined;

  // Byline author: match the article's author to a team member, else the lead
  const author = experts.find((e) => e.name === article.author) ?? experts[0];

  // Top providers for inline CTA
  const { providerOrder, positions } = config.ranking;
  const topProviders = providerOrder
    .map((id, index) => {
      const provider = config.providers.find((p) => p.id === id);
      if (!provider) return null;
      const position = positions[index] || positions[positions.length - 1];
      return { ...provider, rating: position.score, tagline: provider.tagline };
    })
    .filter(Boolean) as Array<{ id: string; name: string; logo: string; tagline: string; affiliateUrl: string; rating: number }>;

  // Hub-and-spoke: the vertical's pillar guide, linked from every cluster
  // article (never from the pillar itself).
  const pillarSlug = PILLAR_SLUGS[ctx.vertical];
  const pillarArticle =
    pillarSlug && pillarSlug !== slug
      ? articles.find((a) => a.slug === pillarSlug)
      : undefined;

  // Related articles: same category first, then others, exclude self, max 3.
  // The pillar is excluded here - it already gets its own box above the body.
  const relatedArticles = [
    ...articles.filter(
      (a) => a.slug !== slug && a.slug !== pillarArticle?.slug && a.category === article.category
    ),
    ...articles.filter(
      (a) => a.slug !== slug && a.slug !== pillarArticle?.slug && a.category !== article.category
    ),
  ].slice(0, 3);

  const formattedDate = new Date(latestUpdate(article.updatedAt)).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }
  );

  // Word count for schema
  const wordCount = article.sections.reduce(
    (sum, s) =>
      sum + s.body.replace(/<[^>]*>/g, "").split(/\s+/).length,
    0
  );

  // JSON-LD Article schema (enhanced)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: canonicalUrl(ctx, `/articles/${slug}/opengraph-image`),
    datePublished: article.publishedAt,
    dateModified: latestUpdate(article.updatedAt),
    wordCount,
    articleSection: article.category,
    author: author
      ? {
          "@type": "Person",
          name: author.credentials ? `${author.name}, ${author.credentials}` : author.name,
          jobTitle: author.role,
          url: canonicalUrl(ctx, "/about"),
        }
      : {
          "@type": "Organization",
          name: article.author || ctx.brandDomain,
          url: ctx.origin,
        },
    publisher: {
      "@type": "Organization",
      name: ctx.brandDomain,
      url: ctx.origin,
      logo: {
        "@type": "ImageObject",
        url: `${ctx.origin}/logo-mark.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl(ctx, `/articles/${slug}`),
    },
    keywords: [
      "pets",
      "pet care",
      article.category.toLowerCase(),
      ...article.sections.map((s) => s.heading),
    ],
  };

  // JSON-LD Breadcrumb
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl(ctx, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: canonicalUrl(ctx, "/articles"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl(ctx, `/articles/${slug}`),
      },
    ],
  };

  // FAQ schema - ONLY from sections that are genuinely question-shaped (heading
  // ends with "?"). Marking narrative section headings as FAQ questions is
  // non-compliant structured data (risk of a Google structured-data flag, and no
  // upside since FAQ rich results are gated to authoritative health/gov sites),
  // so we emit FAQPage only when there are at least two real questions.
  const faqEntries = article.sections.filter((s) => s.heading.trim().endsWith("?"));
  const faqSchema =
    faqEntries.length >= 2
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqEntries.map((s) => ({
            "@type": "Question",
            name: s.heading,
            acceptedAnswer: {
              "@type": "Answer",
              text: s.body.replace(/<[^>]*>/g, ""),
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Hero band - one uniform light-cream ground for every article
            (per-article heroColor is intentionally ignored: dark values made
            the dark headline unreadable). Hero images can layer on top later. */}
        <div className="w-full border-b border-[#EFE5CC] bg-[#FAF4E6]">
          <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 sm:py-14">
            <Breadcrumbs
              items={[
                { label: "Home", href: hubLink(ctx, "/") },
                { label: "Articles", href: hubLink(ctx, "/articles") },
                { label: article.title },
              ]}
            />

            <div className="flex items-center gap-3 mb-4">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${categoryColors[article.category] || "bg-gray-100 text-gray-600"}`}
              >
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-[12px] text-gray-400">
                <Clock className="h-3 w-3" strokeWidth={1.5} />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-[24px] font-bold leading-tight text-[#22362A] sm:text-[32px]">
              {article.title}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-500">
              {article.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              {author ? (
                <ExpertByline
                  // Brand the team name from the current context so the hub
                  // shows the current brand, whatever the config carries.
                  expert={{ ...author, name: author.name }}
                  label="Written by"
                />
              ) : (
                article.author && <span className="text-[12px] text-gray-500">By {article.author}</span>
              )}
              <span className="text-[12px] text-gray-400">Updated {formattedDate}</span>
              <Link
                href={hubLink(ctx, "/about")}
                className="text-[12px] font-medium text-[#1F4A33] underline-offset-2 hover:underline"
              >
                About our editorial team
              </Link>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6">
          <div>
          {/* Direct answer up top (featured-snippet target) - code-injected so
              it also covers articles whose body lives in the CMS blob. */}
          {ctx.vertical === "weight-loss" && ARTICLE_QUICK_ANSWERS[slug] && (
            <div className="article-body mb-8 text-[16px] leading-[1.75] text-gray-600">
              <div className="qa">
                <strong>The quick answer</strong>
                {ARTICLE_QUICK_ANSWERS[slug]}
              </div>
            </div>
          )}
          {/* Hub-and-spoke: descriptive-anchor link from every cluster article
              up to the vertical's pillar guide. */}
          {pillarArticle && (
            <Link
              href={hubLink(ctx, `/articles/${pillarArticle.slug}`)}
              className="group mb-8 flex items-center justify-between gap-4 rounded-xl border border-[#EFE5CC] bg-[#FAF4E6] p-5 transition-colors hover:border-[#1F4A33]/30"
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#1F4A33]/60">
                  Start here
                </p>
                <p className="mt-1 text-[15px] font-semibold text-[#22362A] group-hover:underline">
                  {pillarArticle.title}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-gray-500">
                  The complete guide this article belongs to - every question on the topic, in one place.
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-[#1F4A33]/50 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>
          )}
          {/* Table of contents - anchor jump-links. Signals structure to Google
              (eligible for "jump to" sitelinks) and improves navigation on long
              articles. Rendered only when there are enough sections to warrant it. */}
          {article.sections.length >= 4 && (
            <nav aria-label="Table of contents" className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-gray-400">
                In this article
              </p>
              <ol className="space-y-1.5">
                {article.sections.map((s, i) => (
                  <li key={i} className="flex gap-2 text-[14px] leading-snug">
                    <span className="shrink-0 font-semibold text-gray-300">{i + 1}.</span>
                    <a href={`#${slugifyHeading(s.heading)}`} className="text-[#1F4A33] hover:underline">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <article className="space-y-8">
            {article.sections.map((section, i) => (
              <div key={i}>
                <section id={slugifyHeading(section.heading)}>
                  <h2 className="mb-3 text-[20px] font-bold text-[#22362A] scroll-mt-24">
                    {section.heading}
                  </h2>
                  {/* div (not p) so author HTML can include block elements -
                      lists, tables, callouts - styled via .article-body css */}
                  <div
                    className="article-body text-[16px] leading-[1.75] text-gray-600 [&_a]:text-[#1F4A33] [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#163B27]"
                    dangerouslySetInnerHTML={{ __html: enhanceArticleHtml(section.body) }}
                  />
                </section>

                {/* Subject-provider social proof, high on the page: Trustpilot
                    carousel after the first section, Reddit carousel after the
                    second (or first, on very short articles). Verified data
                    only - providers without it simply render nothing. */}
                {i === 0 && subjectTrustpilot && (
                  <div className="my-10">
                    <TrustpilotCarousel
                      providerName={subjectTrustpilot.name}
                      providerLogo={subjectTrustpilot.logo}
                      reviews={subjectTrustpilot.trustpilotReviews!}
                      rating={subjectTrustpilot.trustpilotRating}
                      reviewCount={subjectTrustpilot.trustpilotReviewCount}
                    />
                  </div>
                )}
                {i === Math.min(1, article.sections.length - 1) && subjectReddit && (
                  <div className="my-10">
                    <RedditThreadCarousel
                      providers={[subjectReddit]}
                      reviewHrefFor={(id) => hubLink(ctx, `/reviews/${id}`)}
                    />
                  </div>
                )}

                {/* Full-catalog product carousel mid-article (weight-loss only) -
                    after roughly the halfway section, never at the bottom. */}
                {ctx.vertical === "weight-loss" &&
                  i === Math.max(0, Math.ceil(article.sections.length / 2) - 1) && (
                    <div className="my-10">
                      <ProductCarousel
                        providers={config.providers}
                        title="Shop GLP-1 plans by product"
                        subtitle="Every provider's published plans - cheapest first, conditions under each price."
                        withSchema
                        pageUrl={canonicalUrl(ctx, `/articles/${slug}`)}
                      />
                    </div>
                  )}


                {/* Inline provider CTA after 2nd section */}
                {i === 1 && topProviders.length > 0 && (
                  <div className="my-8 rounded-lg border border-gray-200 bg-white px-5 py-4">
                    <p className="mb-3 text-[13px] font-bold uppercase tracking-wider text-gray-400">Top-Rated Providers</p>
                    <div className="space-y-2.5">
                      {topProviders.slice(0, 3).map((tp) => (
                        <a
                          key={tp.id}
                          href={tp.affiliateUrl}
                          className="flex items-center justify-between rounded-lg border border-gray-100 bg-[#fafbfc] px-4 py-3 transition-colors hover:border-[#1F4A33]/20 hover:bg-[#1F4A33]/[0.02]"
                        >
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={tp.logo} alt={tp.name} className="h-[24px] w-[80px] object-contain object-left" />
                            <span className="text-[13px] text-gray-500">{tp.tagline}</span>
                          </div>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-[#1F4A33]" strokeWidth={1.5} />
                        </a>
                      ))}
                    </div>
                    <Link href={hubLink(ctx, "/find-your-match")} className="mt-3 block text-center text-[13px] font-semibold text-[#1F4A33] hover:underline">
                      Not sure? Take our free matching quiz →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </article>

          {/* CTA box */}
          <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6 text-center sm:p-8">
            <p className="text-[18px] font-bold text-[#22362A]">
              Ready to compare top brands?
            </p>
            <p className="mt-1 text-[14px] text-gray-500">
              See how top brands stack up on pricing, quality, and terms.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href={hubLink(ctx, "/")}
                className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#1F4A33] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#163B27]"
              >
                Compare Providers
              </Link>
              <Link
                href={hubLink(ctx, "/find-your-match")}
                className="inline-flex h-[44px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#22362A] transition-colors hover:bg-gray-50"
              >
                Take the Quiz
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <div className="mb-5 flex items-baseline justify-between gap-3">
                <h2 className="text-[18px] font-bold text-[#22362A]">
                  Related Articles
                </h2>
                <Link
                  href={hubLink(ctx, "/articles")}
                  className="shrink-0 text-[13px] font-semibold text-[#1F4A33] hover:underline"
                >
                  All articles →
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedArticles.map((ra) => (
                  <Link
                    key={ra.slug}
                    href={hubLink(ctx, `/articles/${ra.slug}`)}
                    className="group rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
                  >
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold mb-2 ${categoryColors[ra.category] || "bg-gray-100 text-gray-600"}`}
                    >
                      {ra.category}
                    </span>
                    <p className="text-[14px] font-semibold leading-snug text-[#22362A] group-hover:text-[#1F4A33] transition-colors">
                      {ra.title}
                    </p>
                    <p className="mt-1.5 text-[12px] text-gray-400 line-clamp-2">
                      {ra.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Prev / Next navigation */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {prevArticle ? (
              <Link
                href={hubLink(ctx, `/articles/${prevArticle.slug}`)}
                className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <ArrowLeft className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 group-hover:text-[#1F4A33] transition-colors" strokeWidth={2} />
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Previous
                  </span>
                  <p className="mt-0.5 text-[14px] font-semibold leading-snug text-[#22362A] group-hover:text-[#1F4A33] transition-colors">
                    {prevArticle.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextArticle && (
              <Link
                href={hubLink(ctx, `/articles/${nextArticle.slug}`)}
                className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md sm:text-right sm:flex-row-reverse"
              >
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 group-hover:text-[#1F4A33] transition-colors" strokeWidth={2} />
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Next
                  </span>
                  <p className="mt-0.5 text-[14px] font-semibold leading-snug text-[#22362A] group-hover:text-[#1F4A33] transition-colors">
                    {nextArticle.title}
                  </p>
                </div>
              </Link>
            )}
          </div>


          {/* Veterinary content disclaimer - every article carries it, above
              the sources, where a professional reviewer expects to find it. */}
          <div className="mt-10 rounded-xl border border-[#1F4A33]/15 bg-[#1F4A33]/[0.03] px-5 py-4">
            <p className="text-[13px] leading-relaxed text-gray-600">
              <strong className="text-[#22362A]">Veterinary disclaimer:</strong>{" "}This article is for
              general information only and is not veterinary advice. Every pet is different - always
              consult a licensed veterinarian about your pet&rsquo;s diet, health and care, and never
              delay seeking veterinary care because of something you read here.
            </p>
          </div>

          <MedicalSources vertical={ctx.vertical} />

          </div>
        </div>
      </div>
    </>
  );
}
