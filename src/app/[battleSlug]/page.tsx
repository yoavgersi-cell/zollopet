import type { Metadata } from "next";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED, isVertical, isPublishedVertical } from "@/lib/config";
import { hubContext, canonicalUrl, hubLink } from "@/lib/site-context";
import Link from "next/link";
import { ComparisonLayout } from "@/components/comparison-layout";
import { notFound } from "next/navigation";

export const revalidate = 60;

const RESERVED_SLUGS = [
  "about",
  "admin",
  "api",
  "articles",
  "disclaimer",
  "find-your-match",
  "reviews",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ battleSlug: string }>;
}): Promise<Metadata> {
  const { battleSlug } = await params;
  if (RESERVED_SLUGS.includes(battleSlug)) return {};
  if (!isVertical(battleSlug)) return {};

  // Vertical home (zollopet.com/<vertical>) - self-canonical.
  const vConfig = await getConfig(battleSlug);
  const canonical = `https://www.zollopet.com/${battleSlug}`;
  return {
    title: { absolute: vConfig.hero.h1 },
    description: vConfig.hero.description,
    robots: isPublishedVertical(battleSlug) ? undefined : { index: false, follow: false },
    alternates: { canonical },
    openGraph: { title: vConfig.hero.h1, description: vConfig.hero.description, url: canonical, type: "website" },
  };
}

export default async function VerticalHomePage({
  params,
}: {
  params: Promise<{ battleSlug: string }>;
}) {
  const { battleSlug } = await params;
  if (RESERVED_SLUGS.includes(battleSlug)) return notFound();

  // Only vertical homes render at this depth (zollopet.com/<vertical>); any
  // other bare slug is a 404. Battles and landing pages live one level deeper
  // at /<vertical>/<slug>.
  if (!isVertical(battleSlug)) return notFound();

  const vConfig = await getConfig(battleSlug);
  const ctx = hubContext(battleSlug);
  const author = vConfig.experts?.[0];
  const reviewer = vConfig.experts?.[1];
  const researchTeam = `The ${ctx.brandTeam.replace(/\s+Team$/i, "")} Research Team`;

  // WebPage + ItemList schema (authorship, freshness, ranked entities) and the
  // FAQ schema - E-E-A-T / rich-result signals for the vertical home.
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: vConfig.hero.h1,
    description: vConfig.hero.description,
    url: canonicalUrl(ctx, "/"),
    inLanguage: "en-US",
    datePublished: "2026-08-31",
    dateModified: CONTENT_LAST_UPDATED,
    isPartOf: { "@type": "WebSite", name: ctx.brandDomain, url: ctx.origin },
    ...(author && {
      author: { "@type": "Organization", name: researchTeam, url: canonicalUrl(ctx, "/about") },
    }),
    ...(reviewer && { reviewedBy: { "@type": "Organization", name: reviewer.name } }),
    publisher: {
      "@type": "Organization",
      name: ctx.brandDomain,
      url: ctx.origin,
      logo: { "@type": "ImageObject", url: `${ctx.origin}/zollopet.png` },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: vConfig.ranking.providerOrder.map((id, i) => {
        const p = vConfig.providers.find((pr) => pr.id === id);
        return { "@type": "ListItem", position: i + 1, name: p?.name ?? id, url: canonicalUrl(ctx, `/reviews/${id}`) };
      }),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (vConfig.faqs ?? []).map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const byline =
    author || reviewer ? (
      <div className="space-y-0.5 text-[13.5px] leading-relaxed text-gray-500">
        {author && (
          <div>
            Written by{" "}
            <Link
              href={hubLink(ctx, "/about")}
              className="font-semibold text-[#22362A] hover:text-[#1F4A33] hover:underline"
            >
              {researchTeam}
            </Link>
          </div>
        )}
        {reviewer && (
          <div>
            Reviewed by{" "}
            <Link
              href={hubLink(ctx, "/about")}
              className="font-semibold text-[#22362A] hover:text-[#1F4A33] hover:underline"
            >
              {reviewer.name}
            </Link>
          </div>
        )}
      </div>
    ) : null;

  return (
    <div className="bg-[#FAF4E6]">
      {isPublishedVertical(battleSlug) && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
          {faqSchema.mainEntity.length > 0 && (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
          )}
        </>
      )}
      <ComparisonLayout config={vConfig} linkPrefix={`/${battleSlug}`} byline={byline} />
    </div>
  );
}
