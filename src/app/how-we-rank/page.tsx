import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, Database, ShieldCheck, Scale, Trophy, RefreshCw, Check, X } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { ExpertTeam } from "@/components/expert-team";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { CONTENT_LAST_UPDATED, DEFAULT_VERTICAL } from "@/lib/config";

export const revalidate = 60;

const CANONICAL = `https://www.zollopet.com/${DEFAULT_VERTICAL}/how-we-rank`;

export const metadata: Metadata = {
  title: "How We Rank & Review Pet Brands - Our Methodology",
  description:
    "Our full methodology for ranking and reviewing pet brands: the factors we score, where our data comes from, how we verify accuracy, and how we pick winners in head-to-head comparisons.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "How We Rank & Review Pet Brands - Our Methodology",
    description:
      "The factors we score, where our data comes from, how we verify accuracy, and how we pick winners in our pet brand comparisons.",
    url: CANONICAL,
    type: "article",
  },
};

const FACTORS = [
  { category: "Value & Pricing Transparency", weight: "25%", desc: "What the money actually buys, how honestly pricing is presented (per-pet quotes, promos, plan conditions), and whether quoted prices hold up over time." },
  { category: "Product & Coverage Quality", weight: "25%", desc: "Recipe formulation standards (AAFCO complete-and-balanced, veterinary-nutritionist involvement) and ingredient quality for food; policy mechanics, limits and exclusions for insurance." },
  { category: "Trust & Track Record", weight: "20%", desc: "Brand history, published standards and certifications, and verified customer review records - never invented or estimated." },
  { category: "Customer Experience", weight: "15%", desc: "Sign-up and quote flows, delivery or claims reliability, support responsiveness, and app/site quality." },
  { category: "Flexibility", weight: "15%", desc: "Trial terms, pause and cancellation policies, and how easy it is to adjust a plan as your pet's needs change." },
];

const METHOD_FAQS = [
  {
    question: "How often is your information updated?",
    answer:
      "Whenever a brand changes its published offering and we've re-verified it. Each review and comparison displays its last-updated date, and our provider-data 'checked' month is bumped only when we've actually re-checked the underlying facts - it's a claim, not a render timestamp.",
  },
  {
    question: "Does affiliate status affect scores or rankings?",
    answer:
      "No. Partnerships can affect how brands are displayed, but never scores, review content, or head-to-head winners. Our verdicts name the runner-up's genuine strengths, and our cons lists apply to partners and non-partners alike.",
  },
  {
    question: "Why don't your pages show prices for some brands?",
    answer:
      "Because we haven't verified them yet, and we never publish numbers from memory or estimation. Fresh food is quoted per pet and insurance per policy, so where we can't state a verified figure our pages say so explicitly and point you to the brand's own quote flow.",
  },
  {
    question: "Why do some brands show no Trustpilot rating on your pages?",
    answer:
      "Because they don't publish one, or we haven't verified it - and we never invent or estimate a score. Where no verified aggregate exists, our pages say so and rely on the brand's published terms instead.",
  },
];

const SOURCES = [
  { icon: Database, title: "The brands' own materials", desc: "We pull plans, recipes, policy terms and pricing structure directly from each brand's official website and published documents - so what you read here matches what you'll see when you sign up." },
  { icon: ClipboardCheck, title: "Verified customer reviews", desc: "We read current verified reviews to gauge real-world experience - delivery, claims, support - not just marketing claims." },
  { icon: Scale, title: "In-house research", desc: "Our editors independently walk quote flows, compare plans side by side, and track how each brand's offering changes over time." },
  { icon: ShieldCheck, title: "Standards & regulators", desc: "Category claims reference real standards bodies and regulators - AAFCO and FDA for pet food, veterinary organizations for feeding guidance, insurance regulators for policy basics." },
];

export default async function HowWeRankPage() {
  const config = await getConfig();
  const experts = config.experts ?? [];

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "How We Rank & Review Pet Brands - Our Methodology",
    description:
      "Our full methodology for ranking and reviewing pet brands: the factors we score, where our data comes from, how we verify accuracy, and how we pick winners.",
    url: CANONICAL,
    publisher: { "@type": "Organization", name: "zollopet.com", url: "https://www.zollopet.com" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.zollopet.com" },
      { "@type": "ListItem", position: 2, name: "How We Rank", item: CANONICAL },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: METHOD_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "How We Rank" }]} />
          <h1 className="text-[28px] font-extrabold text-[#22362A] sm:text-[36px]">
            How We Rank &amp; Review Brands
          </h1>
          <p className="mt-3 max-w-[640px] text-[16px] leading-relaxed text-gray-500">
            Every review and head-to-head comparison on this site is built on the same
            repeatable, evidence-first process. Here&rsquo;s exactly how we evaluate each
            brand, where our information comes from, and how we keep it accurate.
          </p>
          <LastUpdated date={CONTENT_LAST_UPDATED} className="mt-4" />
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
        {/* Factors */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#22362A]">The 5 factors we score</h2>
          <p className="mb-6 text-[16px] leading-[1.75] text-gray-600">
            We rate every brand on a weighted evaluation across five core categories. The
            weighting reflects what matters most when you&rsquo;re committing to an ongoing
            subscription or policy for your pet.
          </p>
          <div className="space-y-4">
            {FACTORS.map(({ category, weight, desc }) => (
              <div key={category} className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
                <span className="shrink-0 rounded bg-[#1F4A33] px-2.5 py-1 text-[12px] font-bold text-white">{weight}</span>
                <div>
                  <p className="text-[14px] font-bold text-[#22362A]">{category}</p>
                  <p className="mt-0.5 text-[13px] text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What moves a score - the published rubric */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#22362A]">What earns points - and what costs them</h2>
          <p className="mb-4 text-[16px] leading-[1.75] text-gray-600">
            Within the five weighted factors, these are the specific signals that consistently move a
            brand up or down in our evaluations:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
              <p className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.06em] text-emerald-700">
                <Check className="h-4 w-4" strokeWidth={2.5} /> Earns points
              </p>
              <ul className="space-y-2 text-[14px] leading-relaxed text-gray-700">
                <li>Honest, prominent pricing - the real per-pet number, not a teaser</li>
                <li>Recipes formulated to complete-and-balanced (AAFCO) standards, with credentialed nutrition input</li>
                <li>Policy mechanics that favor the customer - clear limits, direct pay, deductibles that work for chronic conditions</li>
                <li>Generous, clearly written trial, pause and cancellation terms</li>
                <li>A large, public, verified customer record</li>
                <li>Transparency about sourcing, production, and what&rsquo;s excluded</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
              <p className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.06em] text-amber-700">
                <X className="h-4 w-4" strokeWidth={2.5} /> Costs points
              </p>
              <ul className="space-y-2 text-[14px] leading-relaxed text-gray-700">
                <li>Advertised starting prices that few real pets actually qualify for</li>
                <li>Buried exclusions, waiting periods or age-based term changes</li>
                <li>Commitments or auto-renewals a shopper could miss at checkout</li>
                <li>Thin public detail on recipes, sourcing or policy terms</li>
                <li>No published review record - noted plainly in the review</li>
                <li>A weak or mixed verified review record - we cite the real state even for partners</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Integrity rules - the house rules the content actually runs on */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#22362A]">Our review-integrity rules</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="divide-y divide-gray-100 text-[14.5px] leading-[1.75] text-gray-600">
              <p className="p-5"><strong className="text-[#22362A]">No invented ratings, ever.</strong> If a brand has no verified review aggregate on our record, our pages say exactly that - we never estimate or fabricate a score.</p>
              <p className="p-5"><strong className="text-[#22362A]">No unverified numbers.</strong> Fresh food is quoted per pet and insurance per policy. We publish a figure only after verifying it against the brand&rsquo;s own materials; until then the page says &ldquo;we haven&rsquo;t verified this yet&rdquo; and links you to the brand&rsquo;s quote flow.</p>
              <p className="p-5"><strong className="text-[#22362A]">Category claims cite real standards.</strong> Nutrition and policy basics reference AAFCO, FDA, veterinary organizations and insurance regulators - cited at the bottom of content pages - never blog folklore.</p>
              <p className="p-5"><strong className="text-[#22362A]">We don&rsquo;t republish what we can&rsquo;t verify.</strong> Claims circulating about brands - recalls, corporate changes, coverage disputes - appear on our pages only after independent verification, no matter who they help or hurt.</p>
            </div>
          </div>
        </section>

        {/* Data sources */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#22362A]">Where our data comes from</h2>
          <p className="mb-6 text-[16px] leading-[1.75] text-gray-600">
            Our evaluations only carry weight if the underlying information is real. We draw
            on four sources for every brand:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {SOURCES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1F4A33]/5">
                  <Icon className="h-5 w-5 text-[#1F4A33]" strokeWidth={1.5} />
                </div>
                <h3 className="mb-1 text-[15px] font-bold text-[#22362A]">{title}</h3>
                <p className="text-[13px] leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Accuracy commitment */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#22362A]">How we keep it accurate</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="space-y-4 text-[15px] leading-[1.75] text-gray-600">
              <p>
                <strong className="text-[#22362A]">We don&rsquo;t make things up.</strong> Plans,
                recipes, policy terms and pricing structure are taken from each brand&rsquo;s
                own official sources. We don&rsquo;t invent figures, name products a brand
                doesn&rsquo;t offer, or attach claims that aren&rsquo;t supported.
              </p>
              <p>
                <strong className="text-[#22362A]">We update when brands change.</strong> Pricing
                and offerings move. When a brand changes its plans, we revise the affected reviews
                and comparisons and refresh their &ldquo;last updated&rdquo; date.
              </p>
              <p>
                <strong className="text-[#22362A]">We separate fact from experience.</strong> Objective
                details (plan structure, policy mechanics, published standards) are reported as fact;
                customer sentiment is clearly attributed to reviews; and our own take is presented as
                editorial analysis.
              </p>
            </div>
          </div>
        </section>

        {/* Scoring */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#22362A]">How scoring works</h2>
          <p className="text-[16px] leading-[1.75] text-gray-600">
            Each brand earns an overall score on a 10-point scale, translated into a plain-English
            label - from <strong className="text-[#22362A]">Exceptional</strong> at the top through{" "}
            <strong className="text-[#22362A]">Excellent</strong> and{" "}
            <strong className="text-[#22362A]">Very Good</strong>. A score reflects the weighted result
            across the five factors above. Transparent pricing, strong published standards, and
            consistently positive verified customer feedback move a score up; hidden conditions, thin
            public detail, or recurring complaints move it down.
          </p>
        </section>

        {/* Head-to-head winners */}
        <section className="mb-12">
          <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6">
            <Trophy className="mt-0.5 h-6 w-6 shrink-0 text-amber-500" strokeWidth={2} />
            <div>
              <h2 className="mb-2 text-[22px] font-bold text-[#22362A]">How we pick a winner</h2>
              <p className="text-[15px] leading-[1.75] text-gray-600">
                In a head-to-head comparison we score the two brands category by category - value,
                quality, trust, experience, and flexibility. The brand that wins the majority of
                categories takes the matchup, and the advantage meter reflects how decisive that edge
                is. We always name the runner-up&rsquo;s genuine strengths, because the
                &ldquo;better&rdquo; brand still depends on what you and your pet need most.
              </p>
            </div>
          </div>
        </section>

        {/* Freshness */}
        <section className="mb-12">
          <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6">
            <RefreshCw className="mt-0.5 h-6 w-6 shrink-0 text-[#1F4A33]" strokeWidth={2} />
            <div>
              <h2 className="mb-2 text-[22px] font-bold text-[#22362A]">Keeping reviews current</h2>
              <p className="text-[15px] leading-[1.75] text-gray-600">
                We continuously monitor brand offerings and recent customer reviews, and revise our
                rankings, reviews, and comparisons as things change. Each review and comparison shows
                when it was last updated.
              </p>
            </div>
          </div>
        </section>

        {/* Independence */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#22362A]">Editorial independence</h2>
          <div className="space-y-4 text-[16px] leading-[1.75] text-gray-600">
            <p>
              <strong className="text-[#22362A]">Independent rankings.</strong> Our rankings and
              reviews are determined by the evaluation criteria on this page - not by commercial
              relationships.
            </p>
            <p>
              <strong className="text-[#22362A]">Transparent about affiliates.</strong> Some brands
              may compensate us through affiliate partnerships when you click through and sign up. This
              may affect how brands are displayed, but it does not influence our scores or the content
              of our reviews. See our{" "}
              <Link href={`/${DEFAULT_VERTICAL}/disclaimer`} className="font-semibold text-[#1F4A33] hover:underline">full disclaimer</Link>.
            </p>
          </div>
        </section>

        {/* Who's behind the reviews */}
        <ExpertTeam experts={experts} />

        {/* Care disclaimer */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#22362A]">Disclaimer</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[15px] leading-[1.75] text-gray-600">
              zollopet.com is not a veterinary provider, an insurer, or a licensed insurance agent.
              The information on this site is for educational and comparison purposes only and should
              not replace professional advice. Always consult a licensed veterinarian about your
              pet&rsquo;s diet and health, and read an insurer&rsquo;s sample policy before buying
              coverage. Individual pricing and results vary.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#22362A]">Methodology FAQs</h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {METHOD_FAQS.map((f, i) => (
              <div key={i} className="p-6">
                <h3 className="mb-2 text-[15.5px] font-bold text-[#22362A]">{f.question}</h3>
                <p className="text-[14px] leading-[1.75] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <p className="mb-4 text-[16px] font-bold text-[#22362A]">See the rankings in action</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/${DEFAULT_VERTICAL}`}
              className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#1F4A33] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#163B27]"
            >
              Compare Brands
            </Link>
            <Link
              href={`/${DEFAULT_VERTICAL}/reviews`}
              className="inline-flex h-[44px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#22362A] transition-colors hover:bg-gray-50"
            >
              Read Our Reviews
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
