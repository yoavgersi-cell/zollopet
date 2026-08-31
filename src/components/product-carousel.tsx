import { Truck } from "lucide-react";
import { PRODUCT_CATALOG, productPriceValue, type CatalogProduct } from "@/lib/product-catalog";
import { ProviderCta } from "@/components/provider-cta";
import type { Provider } from "@/lib/config";
import { AFFILIATE_PROVIDER_IDS } from "@/lib/config";

// ───── Product carousel ─────
// Google-Shopping-style product cards in a scroll-snap strip: product image,
// linked title, price with its honest condition, provider name, shipping line.
// Every price comes from the verified catalog; the whole card is the affiliate
// CTA. Cards without a supplied product image render a provider-logo tile
// rather than an invented product shot.

// Medication chip on the image corner: similar vials from one provider (or
// one shared creative) read as duplicates without a fast visual differentiator.
const MEDICATION_CHIP: Record<string, { label: string; className: string }> = {
  semaglutide: { label: "Semaglutide", className: "bg-sky-50 text-sky-700 ring-sky-200" },
  tirzepatide: { label: "Tirzepatide", className: "bg-violet-50 text-violet-700 ring-violet-200" },
};

function chipFor(product: CatalogProduct): { label: string; className: string } {
  if (product.format === "drops")
    return { label: `${product.medication === "semaglutide" ? "Sema" : "Tirz"} drops`, className: "bg-teal-50 text-teal-700 ring-teal-200" };
  if (product.format === "tablet")
    return { label: "Tablets", className: "bg-teal-50 text-teal-700 ring-teal-200" };
  if (product.id === "sprout-wegovy")
    return { label: "Brand-name", className: "bg-amber-50 text-amber-700 ring-amber-200" };
  return MEDICATION_CHIP[product.medication];
}

function ProductCard({
  product,
  provider,
  position,
  pageType,
}: {
  product: CatalogProduct;
  provider: Provider;
  position: number;
  pageType: "listing" | "review" | "battle";
}) {
  const chip = chipFor(product);
  return (
    <div className="flex w-[200px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md sm:w-[212px]">
      <ProviderCta
        href={provider.affiliateUrl}
        providerName={provider.name}
        providerSlug={provider.id}
        position={position}
        pageType={pageType}
        sourceFlow="main_comparison"
        className="flex flex-1 flex-col"
      >
        {/* Product image - or logo tile when no real product shot exists */}
        <div className="relative flex h-[150px] items-center justify-center border-b border-gray-100 bg-white p-3">
          {chip && (
            <span
              className={`absolute left-2 top-2 z-10 rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ${chip.className}`}
            >
              {chip.label}
            </span>
          )}
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={`${provider.name} ${product.name}`}
              loading="lazy"
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-[#F6EEDC] to-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={provider.logo} alt={`${provider.name} logo`} className="max-h-[36px] max-w-[120px] object-contain" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-3.5">
          <p className="text-[13px] font-semibold leading-snug text-[#1F4A33] line-clamp-2">
            {product.name}
          </p>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-[17px] font-extrabold tracking-tight text-[#22362A] [font-variant-numeric:tabular-nums]">
              {product.price}
            </span>
            <span className="text-[11px] font-semibold text-gray-400">/mo</span>
            {product.regularPrice && (
              <span className="text-[12px] font-medium text-gray-400 line-through [font-variant-numeric:tabular-nums]">
                {product.regularPrice}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-[11px] leading-snug text-gray-400">{product.priceNote}</p>
          <p className="mt-1.5 text-[12.5px] font-medium text-gray-700">{provider.name}</p>
          <div className="mt-auto flex items-center gap-1.5 pt-2 text-[11.5px] text-gray-500">
            <Truck className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            {product.shipping}
          </div>
        </div>
      </ProviderCta>
    </div>
  );
}

export function ProductCarousel({
  providers,
  title = "Shop GLP-1 treatment plans",
  subtitle = "Real published prices from licensed telehealth providers - conditions shown under every price.",
  highlightProviderIds = [],
  onlyProviderIds,
  pageType = "listing",
  withSchema = false,
  pageUrl,
}: {
  providers: Provider[];
  title?: string;
  subtitle?: string;
  /** These providers' products sort first (e.g. a battle's two contenders). */
  highlightProviderIds?: string[];
  /** Restrict to specific providers (e.g. a review page's own provider). */
  onlyProviderIds?: string[];
  pageType?: "listing" | "review" | "battle";
  /** Emit Product+Offer ItemList schema. Enable on ONE carousel per page. */
  withSchema?: boolean;
  /** Absolute page URL, required for schema offer URLs. */
  pageUrl?: string;
}) {
  const byId = new Map(providers.map((p) => [p.id, p]));
  const highlight = new Set(highlightProviderIds);

  let items = PRODUCT_CATALOG.filter(
    (p) => byId.has(p.providerId) && AFFILIATE_PROVIDER_IDS.includes(p.providerId)
  );
  if (onlyProviderIds) items = items.filter((p) => onlyProviderIds.includes(p.providerId));
  items = items.sort((a, b) => {
    const ha = highlight.has(a.providerId) ? 0 : 1;
    const hb = highlight.has(b.providerId) ? 0 : 1;
    if (ha !== hb) return ha - hb;
    return productPriceValue(a) - productPriceValue(b);
  });

  if (items.length === 0) return null;

  const schema =
    withSchema && pageUrl
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: items.map((p, i) => {
            const provider = byId.get(p.providerId)!;
            // GSC-requested enrichment, verified data only: description from
            // the catalog's own honest fields; aggregateRating + one review
            // only when the provider has a verified Trustpilot record; free-
            // shipping details only when the catalog says shipping is free.
            // hasMerchantReturnPolicy stays absent - we haven't verified
            // return policies and won't invent one.
            const tpCount = provider.trustpilotReviewCount
              ? parseInt(provider.trustpilotReviewCount.replace(/,/g, ""), 10)
              : NaN;
            const hasAggregate =
              !!provider.trustpilotRating && Number.isFinite(tpCount) && tpCount > 0;
            const firstReview = provider.trustpilotReviews?.[0];
            const freeShipping = /free/i.test(p.shipping);
            return {
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Product",
                name: `${provider.name} ${p.name}`,
                description: `${p.name} from ${provider.name} - $${productPriceValue(p)}/month (${p.priceNote}). ${p.shipping}.`,
                ...(p.image ? { image: `https://www.zollopet.com${p.image}` } : {}),
                brand: { "@type": "Brand", name: provider.name },
                ...(hasAggregate && {
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: provider.trustpilotRating,
                    reviewCount: tpCount,
                    bestRating: "5",
                  },
                }),
                ...(hasAggregate &&
                  firstReview && {
                    review: {
                      "@type": "Review",
                      reviewRating: { "@type": "Rating", ratingValue: String(firstReview.rating), bestRating: "5" },
                      author: { "@type": "Person", name: firstReview.name },
                      reviewBody: firstReview.text,
                    },
                  }),
                offers: {
                  "@type": "Offer",
                  price: String(productPriceValue(p)),
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: pageUrl,
                  ...(freeShipping && {
                    shippingDetails: {
                      "@type": "OfferShippingDetails",
                      shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "USD" },
                      shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
                    },
                  }),
                },
              },
            };
          }),
        }
      : null;

  return (
    <div>
      {schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <h2 className="text-[20px] font-bold text-[#22362A]">{title}</h2>
      </div>
      <p className="mb-4 max-w-[640px] text-[13.5px] text-gray-500">{subtitle}</p>
      <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 [scrollbar-width:thin]">
        <div className="flex snap-x snap-mandatory gap-3">
          {items.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              provider={byId.get(p.providerId)!}
              position={i + 1}
              pageType={pageType}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
