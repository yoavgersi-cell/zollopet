// Three-way brand comparisons (/{a}-vs-{b}-vs-{c}) - programmatic long-tail
// pages built from a CURATED registry, never from arbitrary URL combinations:
// a fixed list keeps the index free of thin permutation bloat, gives every
// page one canonical provider order, and lets each trio carry a real editorial
// verdict instead of a generated one.
//
// Every fact in the matrix must come from verified provider data (published
// prices, shipping terms, guarantees). Nothing here may be invented; when a
// provider doesn't publish a figure, the cell says so. Empty at launch - add
// trios only once their facts are verified.

export interface TrioFacts {
  id: string;
  semaglutide: string;
  tirzepatide: string;
  billing: string;
  shipping: string;
  support: string;
  guarantee: string;
  standout: string;
}

// Per-provider fact rows for the comparison matrix - the single source all
// trios render from, so a price update lands everywhere at once.
export const TRIO_FACTS: Record<string, TrioFacts> = {};

export interface ThreeWayFaq {
  question: string;
  answer: string;
}

export interface ThreeWayComparison {
  slug: string;
  providerIds: [string, string, string];
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  verdict: string;
  faqs: ThreeWayFaq[];
}

export const THREE_WAY_COMPARISONS: ThreeWayComparison[] = [];

export const threeWayBySlug = new Map(THREE_WAY_COMPARISONS.map((t) => [t.slug, t]));
