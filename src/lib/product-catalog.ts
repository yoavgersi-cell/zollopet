// ───── The product catalog ─────
// Ecommerce-style product entries for the shopping carousel. Prices must be
// verified figures (one source of truth for numbers, this file adds the
// product framing + images). Images are provider-published product creatives
// supplied by the site operator - never generated. A null image renders the
// provider-logo tile fallback; never invent a product shot. Empty at launch.

export type CatalogProduct = {
  id: string;
  providerId: string;
  /** Shopping-card product title. */
  name: string;
  medication: "semaglutide" | "tirzepatide";
  format: "injection" | "drops" | "tablet";
  /** Headline monthly price, digits only after $ (used for sorting + schema). */
  price: string;
  /** Struck-through regular price when the headline is promotional. */
  regularPrice?: string;
  /** The honest condition attached to the price. */
  priceNote: string;
  shipping: string;
  image: string | null;
};

export const PRODUCT_CATALOG: CatalogProduct[] = [];

/** Numeric value for sorting ("from $179" → 179). */
export function productPriceValue(p: CatalogProduct): number {
  return Number(p.price.replace(/[^0-9]/g, "")) || 9999;
}
