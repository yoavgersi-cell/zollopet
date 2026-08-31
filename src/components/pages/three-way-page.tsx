import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { TEMPLATES_LAST_UPDATED } from "@/lib/config";
import { type SiteContext, canonicalUrl, hubLink } from "@/lib/site-context";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProviderCta } from "@/components/provider-cta";
import { TrustpilotRating } from "@/components/trustpilot-rating";
import { LastUpdated } from "@/components/last-updated";
import { MedicalSources, TrustDisclosure } from "@/components/medical-sources";
import { TRIO_FACTS, type ThreeWayComparison } from "@/lib/three-way";

// Matrix rows rendered for every trio - one place to add a row site-wide.
const MATRIX_ROWS: { label: string; key: keyof typeof TRIO_FACTS[string] }[] = [
  { label: "Semaglutide", key: "semaglutide" },
  { label: "Tirzepatide", key: "tirzepatide" },
  { label: "Billing & commitment", key: "billing" },
  { label: "Shipping", key: "shipping" },
  { label: "Support", key: "support" },
  { label: "Guarantee / refund", key: "guarantee" },
  { label: "Standout", key: "standout" },
];

export function threeWayMetadata(trio: ThreeWayComparison, ctx: SiteContext): Metadata {
  const url = canonicalUrl(ctx, `/${trio.slug}`);
  return {
    title: { absolute: `${trio.metaTitle} | ZolloPet` },
    description: trio.description,
    robots: ctx.noindex ? { index: false, follow: false } : undefined,
    alternates: { canonical: url },
    openGraph: { title: trio.metaTitle, description: trio.description, url, type: "article" },
  };
}

export async function ThreeWayPageView({ trio, ctx }: { trio: ThreeWayComparison; ctx: SiteContext }) {
  const config = await getConfig(ctx.vertical);
  const providers = trio.providerIds
    .map((id) => config.providers.find((p) => p.id === id))
    .filter(Boolean) as NonNullable<ReturnType<typeof config.providers.find>>[];
  if (providers.length !== 3) return null;

  const url = canonicalUrl(ctx, `/${trio.slug}`);

  // Related 2-way battles among this trio's providers - the natural next click.
  const ids = new Set(trio.providerIds);
  const relatedBattles = (config.battles ?? []).filter(
    (b) => ids.has(b.provider1Id) && ids.has(b.provider2Id)
  );

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: trio.metaTitle,
    description: trio.description,
    url,
    dateModified: TEMPLATES_LAST_UPDATED,
    publisher: { "@type": "Organization", name: ctx.brandDomain, url: ctx.origin },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: providers.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: canonicalUrl(ctx, `/reviews/${p.id}`),
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: trio.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl(ctx, "/") },
      { "@type": "ListItem", position: 2, name: trio.title, item: url },
    ],
  };

  return (
    <div className="bg-[#FAF4E6]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-white">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1F4A33] via-[#1a8cd8] to-[#1F4A33]" />
        <div className="mx-auto max-w-[1100px] px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-12">
          <Breadcrumbs items={[{ label: "Home", href: hubLink(ctx, "/") }, { label: trio.title }]} />
          <h1 className="text-[26px] font-extrabold leading-[1.15] text-[#22362A] sm:text-[36px]">{trio.title}</h1>
          <div className="mt-3">
            <LastUpdated date={TEMPLATES_LAST_UPDATED} />
          </div>
          <TrustDisclosure disclaimerHref={hubLink(ctx, "/disclaimer")} />
        </div>
      </section>

      <div className="mx-auto max-w-[1100px] px-4 pb-16 pt-10 sm:px-6">
        {/* Intro */}
        <div className="mb-10 max-w-[780px]">
          <p className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.07em] text-[#1F4A33]">
            Here&rsquo;s the short version
          </p>
          <p className="text-[16px] leading-[1.85] text-gray-600">{trio.intro}</p>
        </div>

        {/* Provider cards with CTAs */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {providers.map((p) => (
            <div key={p.id} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-[38px] items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.logo} alt={`${p.name} logo`} className="max-h-full max-w-[130px] object-contain" />
              </div>
              <div className="mb-3 border-b border-gray-100 pb-3">
                {p.trustpilotRating ? (
                  <TrustpilotRating rating={p.trustpilotRating} reviewCount={p.trustpilotReviewCount} starSize={14} />
                ) : (
                  <span className="text-[12px] font-semibold text-emerald-700">Editorially reviewed</span>
                )}
              </div>
              <p className="mb-4 flex-1 text-[13.5px] leading-relaxed text-gray-500">{p.tagline}</p>
              <ProviderCta
                href={p.affiliateUrl}
                providerName={p.name}
                providerSlug={p.id}
                pageType="battle"
                sourceFlow="battle_page"
                className="flex h-[42px] items-center justify-center gap-1.5 rounded-xl bg-[#1F4A33] text-[13.5px] font-bold text-white transition-colors hover:bg-[#163B27]"
              >
                Visit {p.name}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </ProviderCta>
            </div>
          ))}
        </div>

        {/* 3-column matrix */}
        <div className="mb-12">
          <h2 className="mb-1.5 text-[22px] font-bold text-[#22362A]">
            {providers.map((p) => p.name).join(" vs ")}: side by side
          </h2>
          <p className="mb-5 max-w-[640px] text-[14px] text-gray-500">
            Real published prices and terms - the differences that actually decide this matchup.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[640px] table-fixed border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50/80">
                  <th className="w-[19%] py-3.5 pl-4 pr-2 text-[11px] font-bold uppercase tracking-[0.06em] text-gray-400 sm:text-[12px]" />
                  {providers.map((p) => (
                    <th key={p.id} className="py-3.5 px-3 text-[14px] font-bold text-[#22362A] sm:text-[15px]">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX_ROWS.map((row) => (
                  <tr key={row.label} className="border-b border-gray-100 align-top last:border-0">
                    <td className="py-3.5 pl-4 pr-2 text-[12.5px] font-semibold leading-snug text-gray-500 sm:text-[13.5px]">
                      {row.label}
                    </td>
                    {trio.providerIds.map((id) => (
                      <td key={id} className="break-words py-3.5 px-3 text-[13px] leading-snug text-[#22362A] sm:text-[14px]">
                        {TRIO_FACTS[id]?.[row.key] ?? "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verdict */}
        <div className="mb-12 rounded-2xl border border-[#1F4A33]/20 bg-white p-6 shadow-sm sm:p-8">
          <p className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.07em] text-[#1F4A33]">Our verdict</p>
          <p className="text-[16px] leading-[1.85] text-gray-700">{trio.verdict}</p>
        </div>

        {/* FAQs (visible twin of the FAQPage schema) */}
        <div className="mb-12">
          <h2 className="mb-5 text-[22px] font-bold text-[#22362A]">{trio.title.split(":")[0]}: FAQs</h2>
          <div className="space-y-4">
            {trio.faqs.map((f, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="mb-2 flex items-start gap-2 text-[15px] font-semibold text-[#22362A]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.5} />
                  {f.question}
                </p>
                <p className="text-[14.5px] leading-[1.8] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Head-to-heads within the trio */}
        {relatedBattles.length > 0 && (
          <div className="mb-4">
            <h2 className="mb-1.5 text-[20px] font-bold text-[#22362A]">Break it down two at a time</h2>
            <p className="mb-4 text-[14px] text-gray-500">The head-to-head comparisons between these providers.</p>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {relatedBattles.map((b) => (
                <Link
                  key={b.slug}
                  href={hubLink(ctx, `/${b.slug}`)}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-semibold text-[#1F4A33] transition-colors hover:border-[#1F4A33]/30 hover:bg-[#1F4A33]/[0.02]"
                >
                  <span className="truncate">{b.matchupLabel ?? b.title.split(":")[0]}</span>
                  <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                </Link>
              ))}
            </div>
          </div>
        )}

        <MedicalSources vertical={ctx.vertical} />
      </div>
    </div>
  );
}
