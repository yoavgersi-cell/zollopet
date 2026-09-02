import type {
  SiteConfig,
  Provider,
  ReviewData,
  BattleData,
  FaqItem,
} from "../config";
import { freshCatFoodArticles } from "./articles-fresh-cat-food";

// ─────────────────────────────────────────────────────────────────────────────
// Fresh Cat Food vertical
//
// House rules, same as every vertical: real brands with truthful, general
// descriptions and NO invented data - no fabricated prices, ratings, recipe
// specs or health claims. Where we haven't verified a brand's published
// pricing or current recipe lineup, the copy says so and points to the brand's
// site. Affiliate links and verified pricing get filled in as partnerships
// come online.
// ─────────────────────────────────────────────────────────────────────────────

const UPDATED = "2026-08-31";
const PRICING_TBD =
  "We haven't verified this brand's current published pricing yet - fresh cat food is typically priced per cat and per plan, so check the brand's own quote flow for your cat's actual rate. This page will carry verified pricing detail once we've confirmed it.";

const providers: Provider[] = [
  {
    id: "smalls",
    name: "Smalls",
    tagline: "Fresh, human-grade food made specifically for cats",
    logo: "/logos/smalls.svg",
    smallLogo: "/logos/smalls-icon.svg",
    highlights: [
      "Cat-only brand - fresh food built around feline nutrition",
      "Human-grade ingredients",
      "Subscription delivery to your door",
    ],
    affiliateUrl: "https://www.smalls.com",
    ctaText: "Visit Site",
  },
  {
    id: "raised-right",
    name: "Raised Right",
    tagline: "Human-grade recipes for cats, cooked in small batches",
    logo: "/logos/raised-right.svg",
    smallLogo: "/logos/raised-right-icon.svg",
    highlights: [
      "Human-grade, low-carbohydrate recipes",
      "Family-run brand serving cats and dogs",
      "Shipped frozen to your door",
    ],
    affiliateUrl: "https://www.raisedrightpets.com",
    ctaText: "Visit Site",
  },
  {
    id: "darwins",
    name: "Darwin's Natural Pet",
    tagline: "Raw food meals for cats, delivered on a subscription",
    logo: "/logos/darwins.svg",
    smallLogo: "/logos/darwins-icon.svg",
    highlights: [
      "Raw-food meals formulated for cats",
      "Longstanding raw-feeding specialist brand",
      "Recurring frozen delivery",
    ],
    affiliateUrl: "https://www.darwinspet.com",
    ctaText: "Visit Site",
  },
];

const reviews: ReviewData[] = [
  {
    slug: "smalls",
    providerId: "smalls",
    shortSummary:
      "The leading cat-specialist fresh food brand: human-grade recipes built around feline nutrition, delivered on a subscription.",
    reviewIntro:
      "Smalls is the best-known name in fresh cat food, and its defining trait is focus: it is a cat-only brand, with recipes built around what obligate carnivores actually need rather than adapted from a dog-food lineup. Food is made from human-grade ingredients and ships on a recurring delivery. We haven't yet verified Smalls' current recipe lineup, textures or pricing for specific plans, so this review covers the model honestly and will carry verified specifics once confirmed.",
    keyFeatures: [
      "Cat-only brand focused on feline nutrition",
      "Human-grade ingredients",
      "Multiple recipe and texture options",
      "Recurring subscription delivery",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Fresh cat food recipes (current lineup and textures to be verified on the brand's site)",
    ],
    pros: [
      "Cat-specialist focus - the whole brand is built for cats",
      "Human-grade ingredients",
      "The most established name in fresh cat food",
    ],
    cons: [
      "We haven't verified current recipes, textures or pricing",
      "Fresh food needs fridge/freezer space and costs more than typical cat food",
      "Transitioning cats to a new food can take patience - cats are famously picky",
    ],
    bestFor: [
      "Cat owners who want a fresh food designed for cats from the ground up",
      "Owners upgrading from conventional wet or dry food",
    ],
    finalVerdict:
      "Smalls is the natural starting point for fresh cat food - the category's most established brand, and the one built exclusively around cats. The honest caveats are the category's own: fresh food costs more than conventional cat food, needs cold storage, and cats can be slow to accept any new diet, so plan a gradual transition. Verify your cat's actual plan price and the current recipe and texture lineup on Smalls' site before subscribing, and involve your vet if your cat has health conditions.",
    trustBadges: ["Cat-only brand", "Human-grade ingredients", "Subscription delivery"],
    updatedAt: UPDATED,
  },
  {
    slug: "raised-right",
    providerId: "raised-right",
    shortSummary:
      "Human-grade, low-carbohydrate cat recipes from a family-run brand, shipped frozen to your door.",
    reviewIntro:
      "Raised Right is a family-run pet food brand making human-grade recipes for both cats and dogs, with a low-carbohydrate approach that fits how obligate carnivores eat. Its cat recipes are cooked and shipped frozen on a recurring delivery. The brand's identity leans on transparency and small-batch production rather than big-category marketing. We haven't yet verified Raised Right's current cat recipe lineup or pricing, so this review covers the model honestly and will carry verified specifics once confirmed.",
    keyFeatures: [
      "Human-grade, low-carbohydrate recipes",
      "Family-run brand with a transparency-forward identity",
      "Cooked recipes shipped frozen",
      "Recurring subscription delivery",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Cooked cat recipes (current lineup to be verified on the brand's site)",
    ],
    pros: [
      "Low-carbohydrate recipes suit feline nutrition",
      "Human-grade ingredients with a transparency-first pitch",
      "Serves cats and dogs - convenient for multi-pet homes",
    ],
    cons: [
      "We haven't verified current recipes or pricing",
      "Smaller brand footprint than the category leader",
      "Frozen shipping means freezer space and thaw-ahead serving",
    ],
    bestFor: [
      "Owners who value small-batch, transparency-forward brands",
      "Multi-pet households feeding cats and dogs from one supplier",
    ],
    finalVerdict:
      "Raised Right is a credible fresh option for cat owners who like knowing exactly what's in the food and who's making it, and its low-carb approach aligns with feline nutrition basics. The practical questions are the usual ones: your cat's actual plan price, the current recipe lineup, and whether frozen storage and thawing fit your routine - verify all three on the brand's site. As with any diet change for a cat, transition gradually and involve your vet if there are health conditions.",
    trustBadges: ["Human-grade ingredients", "Low-carbohydrate recipes", "Family-run brand"],
    updatedAt: UPDATED,
  },
  {
    slug: "darwins",
    providerId: "darwins",
    shortSummary:
      "A longstanding raw-feeding specialist delivering raw cat food meals on a recurring subscription.",
    reviewIntro:
      "Darwin's Natural Pet Products is one of the longstanding names in raw pet food, delivering raw meals for cats (and dogs) on a recurring frozen subscription. Raw feeding is its own category with committed adherents and real trade-offs: proponents point to how closely it matches a carnivore's natural diet, while veterinary organizations urge careful handling because raw meat can carry pathogens that affect pets and the humans in the household. We haven't yet verified Darwin's current cat formulas or pricing, so this review covers the model honestly and will carry verified specifics once confirmed.",
    keyFeatures: [
      "Raw meals formulated for cats",
      "Longstanding specialist in raw pet food",
      "Recurring frozen delivery",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Raw cat food meal plans (current formulas to be verified on the brand's site)",
    ],
    pros: [
      "Specialist brand with a long track record in raw feeding",
      "Meals formulated for cats, not just repackaged dog food",
      "Subscription delivery takes over the sourcing work of DIY raw",
    ],
    cons: [
      "We haven't verified current formulas or pricing",
      "Raw feeding requires careful food-safety handling at home",
      "Raw diets are debated - many vets recommend cooked or conventional diets instead",
    ],
    bestFor: [
      "Experienced raw feeders who want sourcing and formulation handled",
      "Owners who have discussed raw feeding with their vet and want a specialist brand",
    ],
    finalVerdict:
      "Darwin's is a serious option specifically for owners already committed to raw feeding - it has the specialist track record, and a formulated subscription beats DIY raw on both convenience and nutritional completeness. But raw is a deliberate choice, not a default: handle it with the same care you'd give raw meat for your own kitchen, and talk to your vet first, especially for kittens, seniors or immunocompromised households. Verify current formulas and your cat's plan price on Darwin's site before subscribing.",
    trustBadges: ["Raw-feeding specialist", "Formulated for cats", "Frozen delivery"],
    updatedAt: UPDATED,
  },
];

const battles: BattleData[] = [
  {
    slug: "smalls-vs-raised-right",
    provider1Id: "smalls",
    provider2Id: "raised-right",
    title: "Smalls vs Raised Right: Which Fresh Cat Food in 2026?",
    matchupLabel: "Smalls vs Raised Right",
    subtitle: "The cat-specialist category leader vs a family-run, transparency-first brand.",
    description:
      "Smalls vs Raised Right: both make human-grade fresh food for cats. The cat-only category leader against a small-batch family brand - compared honestly, with what to verify before buying.",
    intro:
      "Smalls and Raised Right both sell the same core upgrade - human-grade food for your cat, delivered on a subscription - from two very different kinds of company. Smalls is the fresh-cat-food category leader, built exclusively around cats. Raised Right is a family-run brand serving cats and dogs with low-carbohydrate, small-batch recipes and a transparency-first identity. We haven't verified current pricing or the exact recipe lineup at either brand, so this comparison sticks to what's publicly observable and what to check in both quote flows.",
    verdict:
      "Smalls takes this for most cat owners: it is the established specialist, with the category's biggest footprint and a product line built around feline nutrition from the ground up - a meaningful signal when you're committing to an ongoing subscription for a famously picky species. Raised Right is the better fit for owners who specifically want a small-batch, family-run supplier - and for multi-pet homes that want cats and dogs fed from one brand. Whichever way you lean, get both plans quoted for your cat, compare the per-day math, and check each brand's current recipe lineup and cancellation terms before subscribing.",
    verdictWinnerPoints: [
      "Cat-only brand - the fresh cat food category leader",
      "Human-grade ingredients across the lineup",
      "The most established name in fresh cat food",
    ],
    verdictLoserPoints: [
      "Human-grade, low-carbohydrate small-batch recipes",
      "Family-run, transparency-forward brand",
      "Also serves dogs - one supplier for multi-pet homes",
    ],
    winnerId: "smalls",
    categories: [
      {
        name: "Cat Focus",
        winner: "provider1",
        explanation:
          "Smalls does nothing but cat food - recipes, textures and the whole brand are built around cats. Raised Right's cat recipes are credible and low-carb, but cats share the brand with its dog lineup.",
        supportingPoints: [
          "Cat-only product line (Smalls)",
          "Cat and dog recipes from one brand (Raised Right)",
        ],
      },
      {
        name: "Brand Model",
        winner: "provider2",
        explanation:
          "Raised Right's family-run, small-batch, transparency-first model is its genuine differentiator - for owners who want to know exactly who makes their pet's food and how, that identity carries real weight against a bigger brand.",
        supportingPoints: [
          "Family-run with a transparency-first pitch (Raised Right)",
          "Category-leader scale (Smalls)",
        ],
      },
      {
        name: "What We Can Verify Today",
        winner: "tie",
        explanation:
          "We haven't verified current pricing or exact recipe lineups at either brand, so neither earns a data-backed edge here. Quote both plans for your cat, compare the per-day price and the textures and proteins your cat will actually eat, and check current trial and cancellation terms.",
        supportingPoints: [
          "Pricing unverified at both - quote both plans",
          "Compare textures, proteins and cancellation terms directly",
        ],
      },
    ],
    features: [
      { feature: "Category", provider1Value: "Fresh cat food subscription", provider2Value: "Fresh cat food subscription", highlight: "both" },
      { feature: "Ingredients", provider1Value: "Human-grade", provider2Value: "Human-grade", highlight: "both" },
      { feature: "Brand focus", provider1Value: "Cats only", provider2Value: "Cats and dogs", highlight: "provider1" },
      { feature: "Production model", provider1Value: "Category-leader scale", provider2Value: "Family-run, small batches", highlight: "provider2" },
      { feature: "Pricing", provider1Value: "Verify on site", provider2Value: "Verify on site", highlight: "none" },
      { feature: "Trial & cancellation", provider1Value: "Verify on site", provider2Value: "Verify on site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "smalls-vs-darwins",
    provider1Id: "smalls",
    provider2Id: "darwins",
    title: "Smalls vs Darwin's: Cooked Fresh vs Raw Cat Food (2026)",
    matchupLabel: "Smalls vs Darwin's",
    subtitle: "The fresh cat food leader vs the raw-feeding specialist - a cooked-vs-raw decision.",
    description:
      "Smalls vs Darwin's Natural Pet: gently cooked, human-grade cat food against a raw-feeding specialist. The cooked-vs-raw trade-offs, compared honestly, with what to verify before buying.",
    intro:
      "Smalls and Darwin's aren't just two brands - they're two philosophies. Smalls is the fresh cat food category leader, shipping gently cooked, human-grade recipes built exclusively for cats. Darwin's is a longstanding raw-feeding specialist, delivering uncooked, formulated raw meals. That makes this less a brand shootout than a cooked-vs-raw decision, and the honest comparison is about those trade-offs. We haven't verified current pricing or exact recipe lineups at either brand, so this sticks to what's publicly observable and what to check before subscribing.",
    verdict:
      "For most cat owners, Smalls is the right call: cooked, human-grade food captures most of what draws people to fresh feeding - whole ingredients, high protein, real moisture - without the pathogen-handling protocols that raw meat demands, and mainstream veterinary organizations urge caution on raw diets for exactly that reason. Darwin's is the better pick only for a specific owner: one who has already chosen raw feeding, ideally with their vet's input, and wants a longstanding specialist to handle formulation and sourcing instead of DIY. If you're undecided between the two, that's effectively a decision about raw itself - talk to your vet first, then verify your cat's actual plan price and the current recipe lineup on whichever site you land on.",
    verdictWinnerPoints: [
      "Gently cooked, human-grade recipes - no raw-handling protocols",
      "Cat-only brand, the fresh category's most established name",
      "The mainstream-safe way into fresh feeding",
    ],
    verdictLoserPoints: [
      "Longstanding raw-feeding specialist with formulated meals",
      "Beats DIY raw on formulation and sourcing",
      "A deliberate choice - discuss raw with your vet first",
    ],
    winnerId: "smalls",
    categories: [
      {
        name: "Everyday Fit & Food Safety",
        winner: "provider1",
        explanation:
          "Smalls' recipes are cooked, which sidesteps the food-safety handling that raw feeding requires - veterinary organizations caution that raw meat can carry pathogens affecting both pets and people in the household. For a typical home, cooked fresh is the lower-friction, lower-risk upgrade.",
        supportingPoints: [
          "Cooked recipes, ordinary kitchen handling (Smalls)",
          "Raw meals require strict food-safety practices (Darwin's)",
        ],
      },
      {
        name: "Raw-Feeding Specialism",
        winner: "provider2",
        explanation:
          "If raw is the diet you've chosen, Darwin's is the stronger operation for it: a longstanding specialist whose whole model is formulated raw meals on a recurring delivery. Smalls doesn't compete in raw at all.",
        supportingPoints: [
          "Decades-long raw specialist track record (Darwin's)",
          "No raw offering (Smalls)",
        ],
      },
      {
        name: "What We Can Verify Today",
        winner: "tie",
        explanation:
          "We haven't verified current pricing or exact recipe lineups at either brand, so neither earns a data-backed edge here. Quote both plans for your cat, compare the per-day price and the proteins and textures your cat will actually eat, and check current trial and cancellation terms.",
        supportingPoints: [
          "Pricing unverified at both - quote both plans",
          "Compare proteins, textures and cancellation terms directly",
        ],
      },
    ],
    features: [
      { feature: "Food style", provider1Value: "Gently cooked, human-grade", provider2Value: "Raw, formulated meals", highlight: "none" },
      { feature: "Brand focus", provider1Value: "Cats only", provider2Value: "Cats and dogs, raw specialist", highlight: "provider1" },
      { feature: "Handling at home", provider1Value: "Ordinary kitchen handling", provider2Value: "Raw-meat food-safety protocols", highlight: "provider1" },
      { feature: "Best suited to", provider1Value: "Most fresh-food buyers", provider2Value: "Committed raw feeders", highlight: "none" },
      { feature: "Vet consultation", provider1Value: "Advised for any diet change", provider2Value: "Strongly advised before going raw", highlight: "none" },
      { feature: "Pricing", provider1Value: "Verify on site", provider2Value: "Verify on site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "raised-right-vs-darwins",
    provider1Id: "raised-right",
    provider2Id: "darwins",
    title: "Raised Right vs Darwin's: Cooked vs Raw Cat Food (2026)",
    matchupLabel: "Raised Right vs Darwin's",
    subtitle: "Two specialist brands, two philosophies - small-batch cooked vs formulated raw.",
    description:
      "Raised Right vs Darwin's Natural Pet: a family-run, human-grade cooked brand against a longstanding raw-feeding specialist. The cooked-vs-raw trade-offs and what to verify before buying.",
    intro:
      "Raised Right and Darwin's both sit outside the category's mainstream - neither is the big-name default - and each has a clear identity. Raised Right is a family-run brand cooking human-grade, low-carbohydrate recipes in small batches, shipped frozen. Darwin's is a longstanding raw-feeding specialist delivering formulated raw meals. The real fork in the road is cooked versus raw, and this comparison is honest about those trade-offs. We haven't verified current pricing or recipe lineups at either brand, so it sticks to what's publicly observable and what to check before subscribing.",
    verdict:
      "Raised Right wins this for most households: its recipes are cooked, which delivers the whole-ingredient, low-carbohydrate feeding that suits cats without the pathogen-handling that raw meat demands - the reason mainstream veterinary organizations urge caution on raw diets. Its transparency-first, small-batch identity also gives cautious buyers something concrete to check. Darwin's remains the stronger choice for one specific owner: the committed raw feeder who wants a longstanding specialist handling formulation and sourcing. If you haven't settled the cooked-vs-raw question, settle it with your vet before picking either - then verify your cat's actual plan price and the current recipe lineup on the brand's site.",
    verdictWinnerPoints: [
      "Cooked, human-grade, low-carbohydrate recipes",
      "Family-run brand with a transparency-first identity",
      "No raw-meat handling protocols at home",
    ],
    verdictLoserPoints: [
      "Longstanding raw-feeding specialist with formulated meals",
      "Beats DIY raw on formulation and sourcing",
      "A deliberate choice - discuss raw with your vet first",
    ],
    winnerId: "raised-right",
    categories: [
      {
        name: "Cooked vs Raw Trade-off",
        winner: "provider1",
        explanation:
          "Raised Right's recipes are cooked, capturing the low-carb, whole-ingredient upside of fresh feeding without raw meat's food-safety burden - a burden veterinary organizations specifically caution about for pets and the people around them. For the typical home, cooked is the sounder default.",
        supportingPoints: [
          "Cooked, low-carbohydrate recipes (Raised Right)",
          "Raw meals require strict food-safety practices (Darwin's)",
        ],
      },
      {
        name: "Raw-Feeding Specialism",
        winner: "provider2",
        explanation:
          "For owners who have already chosen raw, Darwin's is the purpose-built option: a specialist with a long track record whose entire model is formulated raw meals on recurring delivery. Raised Right doesn't offer raw.",
        supportingPoints: [
          "Longstanding raw specialist track record (Darwin's)",
          "No raw offering (Raised Right)",
        ],
      },
      {
        name: "What We Can Verify Today",
        winner: "tie",
        explanation:
          "We haven't verified current pricing or exact recipe lineups at either brand, so neither earns a data-backed edge here. Quote both plans for your cat, compare the per-day math and the proteins your cat will actually eat, and check current trial and cancellation terms.",
        supportingPoints: [
          "Pricing unverified at both - quote both plans",
          "Compare proteins, textures and cancellation terms directly",
        ],
      },
    ],
    features: [
      { feature: "Food style", provider1Value: "Cooked, human-grade, low-carb", provider2Value: "Raw, formulated meals", highlight: "none" },
      { feature: "Brand model", provider1Value: "Family-run, small batches", provider2Value: "Longstanding raw specialist", highlight: "none" },
      { feature: "Handling at home", provider1Value: "Ordinary kitchen handling", provider2Value: "Raw-meat food-safety protocols", highlight: "provider1" },
      { feature: "Best suited to", provider1Value: "Most fresh-food buyers", provider2Value: "Committed raw feeders", highlight: "none" },
      { feature: "Multi-pet homes", provider1Value: "Cat and dog recipes", provider2Value: "Cat and dog meals", highlight: "both" },
      { feature: "Pricing", provider1Value: "Verify on site", provider2Value: "Verify on site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
];

const faqs: FaqItem[] = [
  {
    question: "What is fresh cat food?",
    answer:
      "Fresh cat food is lightly cooked (or, from raw-feeding brands, uncooked) food made from whole, typically human-grade ingredients, kept refrigerated or frozen rather than shelf-stable. Subscription brands portion it for your cat and deliver on a recurring schedule.",
  },
  {
    question: "Is fresh food better for cats than regular wet or dry food?",
    answer:
      "Not automatically. Reputable fresh recipes are formulated to complete-and-balanced standards (AAFCO), use whole ingredients, and are typically low in carbohydrates - a good fit for obligate carnivores. But quality conventional wet food also feeds millions of cats well, at a lower price. What matters most is complete nutrition, adequate moisture, and a food your cat will actually eat. Ask your vet before switching a cat with health conditions.",
  },
  {
    question: "How much does fresh cat food cost?",
    answer:
      "It varies by brand, plan and your cat's needs, and most brands quote per cat after a short quiz. Fresh food generally costs meaningfully more than conventional cat food. We list a brand's exact pricing only after we've verified it - where we haven't yet, we say so and link to the brand's own quote flow.",
  },
  {
    question: "How do I switch my cat to fresh food?",
    answer:
      "Slowly and patiently - cats are habit-driven eaters. Mix small, increasing amounts of the new food into the old over a week or more, and don't be surprised if a cat needs several tries or a different texture. Never let a cat simply stop eating during a transition: cats that go without food for more than a day or two risk serious liver problems, so involve your vet if your cat refuses food.",
  },
  {
    question: "Is raw cat food safe?",
    answer:
      "Raw feeding is debated. Supporters point to how closely it matches a cat's natural diet; the mainstream veterinary position urges caution because raw meat can carry bacteria like Salmonella that pose risks to pets and people in the household. If you're considering raw, use a reputable formulated product rather than DIY, follow strict kitchen hygiene, and talk to your vet first - especially with kittens, seniors, or immunocompromised people at home.",
  },
  {
    question: "What should I check before choosing a fresh cat food brand?",
    answer:
      "Four things: the real per-day price from the brand's quote flow, the protein and texture options (a perfect recipe your cat won't eat is worth nothing), the storage and serving logistics for your kitchen, and the current trial, pause and cancellation terms. Cats being picky is the category's biggest practical risk - favor brands whose trial terms let you test acceptance cheaply.",
  },
];

export function freshCatFoodSeed(base: SiteConfig): SiteConfig {
  return {
    ...base,
    siteName: "zollopet.com",
    hero: {
      ...base.hero,
      backgroundImageUrl: "",
      imageAlt: "",
      updatedLabel: "Last Updated: August 2026",
      h1: "Best Fresh Cat Food Delivery Services of 2026",
      h2: "Compare fresh & human-grade cat food subscriptions side by side",
      description:
        "Compare the leading fresh cat food services - honest verdicts, and where we haven't verified a brand's pricing, we say so.",
    },
    providers,
    sidebar: {
      ...base.sidebar,
      blockOrder: ["secureBadge", "editorialReviews", "rankingMethodology", "disclosure"],
    },
    ranking: {
      providerOrder: providers.map((p) => p.id),
      positions: base.ranking.positions,
    },
    reviews,
    battles,
    faqs,
    articles: freshCatFoodArticles,
  };
}
