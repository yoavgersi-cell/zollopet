export interface TrustpilotReview {
  title: string;
  text: string;
  name: string;
  location: string;
  rating: number;
  date?: string; // e.g. "Aug 3, 2026" - shown on the review card when present
}

// Reusable expert-team member for the site's credibility (E-E-A-T) layer.
// Populate with REAL team members; only attach veterinary credentials to
// people who actually hold them.
export interface Expert {
  id: string;
  name: string;
  role: string;          // e.g. "Lead Pet Nutrition Researcher"
  credentials?: string;  // e.g. "DVM" - real credentials only
  bio: string;
  avatar?: string;       // image URL; falls back to initials when empty
  specialties?: string[];
}

// CMS-editable promo-popup control for a provider. When `enabled`, the
// provider's creative shows (mobile) on its comparison and review pages. This
// overrides the code-side default in @/lib/promo-popups; leaving it undefined
// falls back to that default. The live countdown timer, when a creative has
// one, stays code-defined.
export interface ProviderPromoPopup {
  enabled: boolean;
  image?: string;
  alt?: string;
  priority?: number;
}

export interface Provider {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  smallLogo: string;
  sidebarImage?: string;
  highlights: string[];
  affiliateUrl: string;
  ctaText: string;
  excludedStates?: string[];
  trustpilotRating?: string;
  trustpilotReviewCount?: string;
  trustpilotReviews?: TrustpilotReview[];
  promoPopup?: ProviderPromoPopup;
}

export interface RankingPosition {
  score: number;
  starRating: number;
  label: string;
  badge?: string;
}

export interface RankingPageConfig {
  providerOrder: string[];
  positions: RankingPosition[];
}

// A single priced plan on a review page. `regularPrice` (optional) renders
// struck-through next to `price` to show an active discount.
export interface ReviewPricingPlan {
  name: string;
  medication: string;
  price: string;
  regularPrice?: string;
  unit?: string;
  cadence?: string;
  highlights?: string[];
}

// A step in the "How <provider> works" timeline on a review page.
export interface ReviewHowItWorksStep {
  timing?: string;
  title: string;
  detail?: string;
}

export interface ReviewData {
  slug: string;
  providerId: string;
  shortSummary: string;
  reviewIntro: string;
  keyFeatures: string[];
  pricingSummary: string;
  treatmentOptions: string[];
  pros: string[];
  cons: string[];
  bestFor: string[];
  finalVerdict: string;
  updatedAt?: string;
  // Optional richer content, rendered only when present (back-compatible).
  pricingPlans?: ReviewPricingPlan[];
  howItWorks?: ReviewHowItWorksStep[];
  trustBadges?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HeroConfig {
  backgroundImageUrl: string;
  imageAlt: string;
  updatedLabel: string;
  h1: string;
  h2: string;
  description: string;
}

export interface SidebarConfig {
  socialProofNumber: string;
  socialProofText: string;
  secureTitle: string;
  secureText: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  featuredImageLink: string;
  blockOrder?: string[];
}

export interface QuizOption {
  label: string;
  value: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  type: "cards" | "dropdown";
  options: QuizOption[];
}

export interface QuizProviderProfile {
  providerId: string;
  priceLevel: "low" | "mid" | "high";
  strengths: string[];
  matchReasons: Record<string, string>;
}

export interface QuizConfig {
  panelType?: "classic" | "chat";
  chatIntroMessage?: string;
  providerOrder?: string[];
  welcomeTitle: string;
  welcomeSubtitle: string;
  welcomeTrustPoints: string[];
  welcomeCta: string;
  midFlowMessage: string;
  pageTitle: string;
  pageSubtitle: string;
  questions: QuizQuestion[];
  providerProfiles: QuizProviderProfile[];
  resultsTitle: string;
  resultsSubtitle: string;
  resultsOthersTitle: string;
  trustStrip: string[];
  loadingMessages: string[];
  resultOverrides?: Record<string, string[]>;
  testimonials?: { text: string; name: string; state: string }[];
  loadingScreen?: {
    headline: string;
    supportingTexts: string[];
    providerLogos: string[];
    durationMs: number;
  };
}

export interface ArticleSection {
  heading: string;
  body: string;
}

export interface ArticleData {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  heroColor: string;
  author?: string;
  // 3-4 scannable takeaway bullets rendered in a box above the body -
  // verified facts only, written per-article (never auto-generated).
  keyTakeaways?: string[];
  sections: ArticleSection[];
  sidebarId?: string;
}

export interface BattleCategory {
  name: string;
  winner: "provider1" | "provider2" | "tie";
  explanation: string;
  supportingPoints: string[];
  // Legacy fields kept for backwards compat
  provider1Score?: number;
  provider2Score?: number;
  description?: string;
}

export interface BattleFeatureRow {
  feature: string;
  provider1Value: string;
  provider2Value: string;
  highlight?: "provider1" | "provider2" | "both" | "none";
}

export interface BattleData {
  slug: string;
  provider1Id: string;
  provider2Id: string;
  title: string;
  // Optional display order for the "X vs Y" label (breadcrumb, FAQ heading,
  // schema). Lets the visible matchup lead with a high-demand brand without
  // reordering provider1/provider2 (which drives the winner logic). Falls back
  // to `${p1.name} vs ${p2.name}` when unset.
  matchupLabel?: string;
  subtitle: string;
  description: string;
  intro: string;
  verdict: string;
  verdictWinnerPoints: string[];
  verdictLoserPoints: string[];
  winnerId: string;
  categories: BattleCategory[];
  features: BattleFeatureRow[];
  updatedAt?: string;
}

export interface SidebarBlock {
  type: "providers" | "quizCta" | "relatedArticles";
  enabled: boolean;
}

export interface SidebarQuizCta {
  headline: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
}

export interface SidebarConfigData {
  id: string;
  name: string;
  area: "homepage" | "articles" | "reviews" | "comparisons" | "custom";
  active: boolean;
  blocks: SidebarBlock[];
  providerIds: string[];
  quizCta: SidebarQuizCta;
  articleSlugs: string[];
}

export interface LandingEditorialSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface LandingPageData {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  h2: string;
  heroDescription: string;
  providerOrder: string[];
  editorialSections?: LandingEditorialSection[];
  updatedAt?: string;
}

// Stable fallback "last updated" date for schema when an item has no CMS
// updatedAt. Avoids emitting today's date on every request (fake freshness).
export const CONTENT_LAST_UPDATED = "2026-08-31";

// Floor date for battle, review and article pages: the shared page templates
// were last reworked on this date (site launch skeleton). A per-item updatedAt
// still wins when it is newer.
export const TEMPLATES_LAST_UPDATED = "2026-08-31";

// ISO dates compare lexicographically - returns the newer of an item's own
// updatedAt and the template-wide floor above.
export const latestUpdate = (updatedAt?: string) =>
  updatedAt && updatedAt > TEMPLATES_LAST_UPDATED ? updatedAt : TEMPLATES_LAST_UPDATED;

// Human-readable month when the operator last verified provider-published
// pricing, plans and policies against each provider's own site. Shown in the
// "Sources & methodology" block ("Checked August 2026"). Bump this only when
// the data behind the comparisons is actually re-verified - it is a claim, not
// a render timestamp.
export const PROVIDER_DATA_CHECKED = "August 2026";

// ── Verticals ────────────────────────────────────────────────────────────────
// The hub (zollopet.com) is split into fully-separated verticals. Each one is
// an independent bundle: its own providers, reviews, comparisons, articles,
// ranking, and affiliate links, edited on its own tab in the CMS and stored in
// its own blob. Adding a vertical later is a single entry here - nothing else
// in the routing or CMS is hard-coded to a specific vertical.
//
// `id` doubles as the URL segment (zollopet.com/<id>/…) and the storage
// suffix. "fresh-dog-food" is the default vertical (the hub's lead category).
export interface Vertical {
  id: string;
  name: string;
  tagline: string;
  accent: string;
}

export const VERTICALS: Vertical[] = [
  { id: "fresh-dog-food", name: "Fresh Dog Food", tagline: "Fresh, human-grade dog food delivery services, compared", accent: "#A16207" },
  { id: "fresh-cat-food", name: "Fresh Cat Food", tagline: "Fresh & human-grade cat food delivery services, compared", accent: "#0F766E" },
  { id: "pet-insurance", name: "Pet Insurance", tagline: "Pet insurance plans for dogs & cats, compared", accent: "#1D4ED8" },
];

export const DEFAULT_VERTICAL = "fresh-dog-food";
export const VERTICAL_IDS = VERTICALS.map((v) => v.id);
export const isVertical = (id: string): boolean => VERTICAL_IDS.includes(id);

// Verticals that are publicly launched: advertised as "live" on the hub, listed
// in the sitemap, and indexable. A vertical can have a full content skeleton
// (providers, comparisons, etc.) while still being unpublished - it renders for
// preview but stays out of the hub card, the sitemap, and the index until its
// affiliate data is filled in and it's added here. Add a vertical id to launch it.
export const PUBLISHED_VERTICALS = ["fresh-dog-food", "fresh-cat-food", "pet-insurance"];
export const isPublishedVertical = (id: string): boolean => PUBLISHED_VERTICALS.includes(id);

// Providers we have an affiliate relationship with. Used to gate the product
// carousel/catalog and affiliate-only landing pages. Empty at launch - fill in
// as partnerships come online.
export const AFFILIATE_PROVIDER_IDS: string[] = [];

// Articles kept out of the index (and the sitemap). Operator policy: index
// everything that can honestly be indexed; only pages with unverified numbers
// or slugs that 301 away belong here.
export const NOINDEX_ARTICLE_SLUGS: string[] = [];

export interface SiteConfig {
  providers: Provider[];
  faqs: FaqItem[];
  reviews: ReviewData[];
  articles: ArticleData[];
  battles: BattleData[];
  landingPages: LandingPageData[];
  sidebars: SidebarConfigData[];
  quiz: QuizConfig;
  hero: HeroConfig;
  sidebar: SidebarConfig;
  ranking: RankingPageConfig;
  siteName: string;
  disclosureText: string;
  cardSocialProof?: {
    number: string;
    text: string;
  };
  reviewTestimonials?: { text: string; name: string; state: string }[];
  battleWinnerBannerImageDesktop?: string;
  battleWinnerBannerImageMobile?: string;
  experts?: Expert[];
}

export const defaultConfig: SiteConfig = {
  siteName: "zollopet.com",
  disclosureText:
    "Some providers featured on this site may compensate us. This may affect the order and placement of listings but does not influence our editorial ratings or reviews.",
  hero: {
    backgroundImageUrl: "",
    imageAlt: "",
    updatedLabel: "Last Updated: August 2026",
    h1: "Compare the Best Pet Services of 2026",
    h2: "Independent comparisons for pet parents",
    description:
      "Compare trusted pet brands side by side - what each service includes, how the pricing works, and what to verify before you buy.",
  },
  sidebar: {
    socialProofNumber: "",
    socialProofText: "",
    secureTitle: "Secure & Confidential",
    secureText:
      "All providers featured on our platform use secure systems to protect your personal information.",
    featuredImageUrl: "",
    featuredImageAlt: "",
    featuredImageLink: "#",
  },
  ranking: {
    providerOrder: [],
    positions: [
      { score: 9.8, starRating: 5, label: "Exceptional", badge: "Our Most Popular" },
      { score: 9.6, starRating: 5, label: "Excellent" },
      { score: 9.5, starRating: 5, label: "Excellent" },
      { score: 9.4, starRating: 5, label: "Excellent" },
      { score: 9.3, starRating: 5, label: "Excellent" },
      { score: 9.1, starRating: 4, label: "Excellent" },
      { score: 8.9, starRating: 4, label: "Very Good" },
      { score: 8.7, starRating: 4, label: "Very Good" },
      { score: 8.5, starRating: 4, label: "Very Good" },
      { score: 8.4, starRating: 4, label: "Very Good" },
    ],
  },
  providers: [],
  faqs: [],
  reviews: [],
  articles: [],
  battles: [],
  landingPages: [],
  sidebars: [],
  quiz: {
    welcomeTitle: "Find Your Best Match",
    welcomeSubtitle: "Answer a few quick questions and we'll compare trusted brands based on your pet, preferences, and budget.",
    welcomeTrustPoints: ["Takes less than 1 minute", "Personalized recommendations", "Completely free"],
    welcomeCta: "Find My Match",
    midFlowMessage: "Great, we're narrowing down the best options for you.",
    pageTitle: "Find Your Best Match",
    pageSubtitle: "Answer a few quick questions to help us compare brands based on your pet and your preferences.",
    resultsTitle: "Your Best Match",
    resultsSubtitle: "Based on your answers, this brand is the strongest fit for you and your pet.",
    resultsOthersTitle: "Other Brands You May Want to Consider",
    trustStrip: ["Updated Monthly", "Editorially Reviewed", "Independent Comparison"],
    loadingMessages: ["Comparing trusted brands...", "Reviewing your answers...", "Finding your best match...", "Preparing your recommendation..."],
    questions: [],
    providerProfiles: [],
  },
};
