import type {
  SiteConfig,
  Provider,
  ReviewData,
  BattleData,
  FaqItem,
} from "../config";
import { freshDogFoodArticles } from "./articles-fresh-dog-food";

// ─────────────────────────────────────────────────────────────────────────────
// Fresh Dog Food vertical
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
  "We haven't verified this brand's current published pricing yet - fresh dog food is priced per dog (size, age, activity and recipe all move the number), so check the brand's own quote flow for your dog's actual rate. This page will carry verified pricing detail once we've confirmed it.";

const providers: Provider[] = [
  {
    id: "farmers-dog",
    name: "The Farmer's Dog",
    tagline: "Fresh, pre-portioned dog food delivered on a subscription",
    logo: "/logos/thefarmersdoglogo.png",
    smallLogo: "/logos/farmers-dog-icon.svg",
    highlights: [
      "Fresh food made from human-grade ingredients",
      "Pre-portioned packs personalized to your dog",
      "Recipes developed with veterinary nutritionists",
    ],
    affiliateUrl: "https://www.thefarmersdog.com",
    ctaText: "Visit Site",
  },
  {
    id: "ollie",
    name: "Ollie",
    tagline: "Human-grade fresh and baked dog food, portioned to your dog",
    logo: "/logos/ollielogo.png",
    smallLogo: "/logos/ollie-icon.svg",
    highlights: [
      "Fresh and gently baked recipe formats",
      "Portions personalized from your dog's profile",
      "Human-grade ingredients",
    ],
    affiliateUrl: "https://www.myollie.com",
    ctaText: "Visit Site",
  },
  {
    id: "nom-nom",
    name: "Nom Nom",
    tagline: "Fresh, pre-portioned recipes formulated by veterinary nutritionists",
    logo: "/logos/nom-nom.svg",
    smallLogo: "/logos/nom-nom-icon.svg",
    highlights: [
      "Fresh food in pre-portioned packs",
      "Recipes formulated by board-certified veterinary nutritionists",
      "Subscription delivery to your door",
    ],
    affiliateUrl: "https://www.nomnomnow.com",
    ctaText: "Visit Site",
  },
  {
    id: "spot-tango",
    name: "Spot & Tango",
    tagline: "Fresh recipes plus UnKibble, a fresh-made dry alternative",
    logo: "/logos/spotandtangologo.png",
    smallLogo: "/logos/spot-tango-icon.svg",
    highlights: [
      "Fresh recipes and the UnKibble fresh-dry format",
      "Personalized portions from your dog's profile",
      "Human-grade ingredients",
    ],
    affiliateUrl: "https://spotandtango.com",
    ctaText: "Visit Site",
  },
];

const reviews: ReviewData[] = [
  {
    slug: "farmers-dog",
    providerId: "farmers-dog",
    shortSummary:
      "The best-known fresh dog food brand: human-grade recipes, pre-portioned to your dog and delivered on a subscription.",
    reviewIntro:
      "The Farmer's Dog is the most widely recognized name in fresh dog food. The model is the category's blueprint: you build a profile for your dog (age, breed, weight, activity, sensitivities), and the company ships fresh, human-grade food in pre-portioned packs matched to your dog's calorie needs, on a recurring delivery schedule. Recipes are developed with veterinary nutritionists and formulated to complete-and-balanced standards. We haven't yet verified the brand's current recipe lineup or per-day pricing for specific dog profiles, so this review covers the model honestly and will carry verified specifics once confirmed.",
    keyFeatures: [
      "Fresh food made from human-grade ingredients",
      "Pre-portioned packs matched to your dog's profile",
      "Recipes developed with veterinary nutritionists",
      "Recurring subscription delivery",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Fresh recipes (current lineup to be verified on the brand's site)",
    ],
    pros: [
      "The category's most established brand footprint",
      "Personalized, pre-portioned packs take the measuring out of feeding",
      "Human-grade ingredients and vet-nutritionist-developed recipes",
    ],
    cons: [
      "We haven't verified current recipes, pricing or plan terms",
      "Fresh food needs fridge/freezer space and costs more than typical kibble",
      "Subscription-only model - no retail bag to grab in a pinch",
    ],
    bestFor: [
      "Dog owners who want fresh food from the category's most established brand",
      "Owners who value pre-portioned packs over scooping and measuring",
    ],
    finalVerdict:
      "The Farmer's Dog is the default starting point when comparing fresh dog food - it defined the personalized, pre-portioned subscription model and has the category's biggest brand footprint. The honest trade-offs are the fresh category's own: it costs more than kibble, needs cold storage, and runs on a subscription. Before you buy, run the brand's quote flow for your dog's actual per-day price and check the current recipe lineup - and as with any diet change, transition gradually and loop in your vet if your dog has health conditions.",
    trustBadges: ["Human-grade ingredients", "Pre-portioned packs", "Subscription delivery"],
    updatedAt: UPDATED,
  },
  {
    slug: "ollie",
    providerId: "ollie",
    shortSummary:
      "Human-grade dog food with a choice of formats - fresh and gently baked - portioned to your dog's profile.",
    reviewIntro:
      "Ollie is one of the leading fresh dog food subscriptions, and its clearest differentiator is format range: alongside fresh recipes it offers a gently baked line, so owners can feed fresh, baked, or a mix. Like the rest of the category, everything starts from your dog's profile - portions and recommendations are matched to age, weight and activity, and food arrives on a recurring delivery. Ingredients are human-grade. We haven't yet verified Ollie's current recipe lineup or pricing for specific dog profiles, so this review keeps to the model and will carry verified specifics once confirmed.",
    keyFeatures: [
      "Fresh and gently baked recipe formats",
      "Human-grade ingredients",
      "Portions personalized from your dog's profile",
      "Recurring subscription delivery",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Fresh recipes (current lineup to be verified on the brand's site)",
      "Gently baked recipes (current lineup to be verified on the brand's site)",
    ],
    pros: [
      "Format flexibility - fresh, baked, or a mixed plan",
      "Human-grade ingredients with personalized portions",
      "One of the most established brands in the category",
    ],
    cons: [
      "We haven't verified current recipes, pricing or plan terms",
      "Fresh plans need fridge/freezer space",
      "Costs more than typical kibble, like the rest of the category",
    ],
    bestFor: [
      "Owners who want fresh food but also a shelf-friendlier baked option",
      "Picky eaters that may do better with a mix of formats",
    ],
    finalVerdict:
      "Ollie's mixed-format approach is a genuinely useful angle in a category that is otherwise fairly uniform: if you want the benefits of fresh food but also a baked option for convenience, travel or budget, Ollie lets you blend them in one subscription. Verify your dog's actual per-day quote and the current recipe lineup on Ollie's site before committing, and transition gradually as with any food switch.",
    trustBadges: ["Human-grade ingredients", "Fresh & baked formats", "Personalized portions"],
    updatedAt: UPDATED,
  },
  {
    slug: "nom-nom",
    providerId: "nom-nom",
    shortSummary:
      "Fresh, pre-portioned dog food with recipes formulated by board-certified veterinary nutritionists.",
    reviewIntro:
      "Nom Nom is one of the established names in fresh dog food, with a nutrition-science-forward positioning: its recipes are formulated by board-certified veterinary nutritionists, and food ships fresh in pre-portioned packs sized to your dog's calorie needs. The buying model matches the category standard - build your dog's profile, get a plan, receive recurring deliveries. We haven't yet verified Nom Nom's current recipe lineup or pricing for specific dog profiles, so this review covers the model honestly and will carry verified specifics once confirmed.",
    keyFeatures: [
      "Fresh food in pre-portioned packs",
      "Recipes formulated by board-certified veterinary nutritionists",
      "Portions matched to your dog's calorie needs",
      "Recurring subscription delivery",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Fresh recipes (current lineup to be verified on the brand's site)",
    ],
    pros: [
      "Strong nutrition-science positioning behind its recipes",
      "Pre-portioned packs matched to your dog",
      "Established brand in the fresh category",
    ],
    cons: [
      "We haven't verified current recipes, pricing or plan terms",
      "Fresh-only format - no baked or dry alternative in the same plan",
      "Needs cold storage and costs more than typical kibble",
    ],
    bestFor: [
      "Owners who weight veterinary-nutritionist formulation heavily",
      "Dogs whose owners want precise, pre-portioned calorie control",
    ],
    finalVerdict:
      "Nom Nom competes on the same fresh, personalized, pre-portioned model as the category leaders, with formulation by board-certified veterinary nutritionists as its calling card. The practical decision comes down to your dog's actual quote and recipe fit, so run the brand's quote flow and compare the per-day price against the other fresh brands before committing. As always: transition gradually and involve your vet for dogs with health conditions.",
    trustBadges: ["Vet-nutritionist formulated", "Pre-portioned packs", "Fresh delivery"],
    updatedAt: UPDATED,
  },
  {
    slug: "spot-tango",
    providerId: "spot-tango",
    shortSummary:
      "Fresh recipes plus UnKibble - a fresh-made dry format - personalized to your dog and delivered on a subscription.",
    reviewIntro:
      "Spot & Tango runs the standard fresh-dog-food playbook - personalized plans, human-grade ingredients, subscription delivery - with one distinctive addition: UnKibble, a dry-format food made with a fresh-style ingredient approach. That gives owners a middle path between fresh packs and conventional kibble: easier storage and serving than fresh, with a cleaner ingredient pitch than typical dry food. We haven't yet verified Spot & Tango's current recipe lineup or pricing for specific dog profiles, so this review covers the model honestly and will carry verified specifics once confirmed.",
    keyFeatures: [
      "Fresh recipes and the UnKibble fresh-dry format",
      "Human-grade ingredients",
      "Personalized portions from your dog's profile",
      "Recurring subscription delivery",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Fresh recipes (current lineup to be verified on the brand's site)",
      "UnKibble dry-format recipes (current lineup to be verified on the brand's site)",
    ],
    pros: [
      "UnKibble offers a storage-friendly alternative to fresh packs",
      "Personalized plans with human-grade ingredients",
      "Two formats under one subscription brand",
    ],
    cons: [
      "We haven't verified current recipes, pricing or plan terms",
      "Smaller brand footprint than the biggest fresh names",
      "Fresh plans still need cold storage, like the rest of the category",
    ],
    bestFor: [
      "Owners drawn to fresh-quality ingredients but wanting dry-food convenience",
      "Households comparing fresh subscriptions on format flexibility",
    ],
    finalVerdict:
      "Spot & Tango's UnKibble is the most practical answer in the category for owners who want to upgrade from conventional kibble without committing to a fridge full of fresh packs. If you want classic fresh food, it competes on the same personalized model as the bigger names. Run the quote flow for your dog's actual price in both formats, verify the current recipe lineup, and transition gradually as with any diet change.",
    trustBadges: ["Human-grade ingredients", "Fresh & UnKibble formats", "Personalized plans"],
    updatedAt: UPDATED,
  },
];

const battles: BattleData[] = [
  {
    slug: "farmers-dog-vs-ollie",
    provider1Id: "farmers-dog",
    provider2Id: "ollie",
    title: "The Farmer's Dog vs Ollie: Which Fresh Dog Food in 2026?",
    matchupLabel: "The Farmer's Dog vs Ollie",
    subtitle: "The category's two best-known fresh dog food subscriptions, compared honestly.",
    description:
      "The Farmer's Dog vs Ollie: both deliver human-grade, personalized dog food on a subscription. How the two leaders differ - formats, model and what to verify before you buy either.",
    intro:
      "The Farmer's Dog and Ollie are the two names most owners meet first when they look into fresh dog food, and they share the category's core promise: human-grade food, portioned to your dog's profile, delivered on a subscription. The honest starting point is that we haven't yet verified either brand's current per-day pricing for specific dog profiles - fresh food is quoted per dog, so no comparison table can hand you your own number. What we can compare is how the two models differ, and exactly what to check in each quote flow before you commit.",
    verdict:
      "The Farmer's Dog is the category's most established brand - fresh-only, pre-portioned, with the biggest public footprint in fresh dog food, which is worth something when you're buying an ongoing subscription. Ollie's edge is format range: fresh plus a gently baked line, blendable in one plan, which The Farmer's Dog doesn't offer. If you want the straight fresh experience from the biggest name, start with The Farmer's Dog; if a mixed fresh-and-baked plan fits your storage, budget or travel reality better, Ollie has the more flexible menu. Whichever way you lean, run both quote flows for your dog and compare the actual per-day numbers - that comparison, not brand marketing, should make the call.",
    verdictWinnerPoints: [
      "The category's most established fresh dog food brand",
      "Pre-portioned packs matched to your dog's profile",
      "Recipes developed with veterinary nutritionists",
    ],
    verdictLoserPoints: [
      "Fresh plus gently baked formats in one subscription",
      "Human-grade ingredients, personalized portions",
      "Worth quoting side by side on your dog's actual price",
    ],
    winnerId: "farmers-dog",
    categories: [
      {
        name: "Brand Track Record",
        winner: "provider1",
        explanation:
          "The Farmer's Dog has the larger public footprint of the two - it is the brand that pushed fresh dog food into the mainstream and remains the category's reference point. Ollie is itself a long-established fresh brand, so this is a lead, not a gulf.",
        supportingPoints: [
          "The category's reference brand (The Farmer's Dog)",
          "Long-established fresh competitor (Ollie)",
        ],
      },
      {
        name: "Food Formats",
        winner: "provider2",
        explanation:
          "Ollie offers fresh and gently baked lines that can be combined in one plan; The Farmer's Dog is fresh-only. For owners who want flexibility on storage, travel or budget, Ollie's menu is simply wider.",
        supportingPoints: [
          "Fresh + baked, blendable in one plan (Ollie)",
          "Fresh-only lineup (The Farmer's Dog)",
        ],
      },
      {
        name: "What We Can Verify Today",
        winner: "tie",
        explanation:
          "We haven't verified current per-dog pricing or the exact recipe lineup at either brand, so neither earns a data-backed edge here. Both quote per dog: run both flows with the same profile and compare the per-day price, the recipe options for your dog's needs, and each brand's current trial or cancellation terms.",
        supportingPoints: [
          "Pricing is quoted per dog at both - get both quotes",
          "Compare trial offers and cancellation terms directly",
        ],
      },
    ],
    features: [
      { feature: "Category", provider1Value: "Fresh dog food subscription", provider2Value: "Fresh dog food subscription", highlight: "both" },
      { feature: "Ingredients", provider1Value: "Human-grade", provider2Value: "Human-grade", highlight: "both" },
      { feature: "Formats", provider1Value: "Fresh", provider2Value: "Fresh + gently baked", highlight: "provider2" },
      { feature: "Portioning", provider1Value: "Pre-portioned to your dog", provider2Value: "Personalized to your dog", highlight: "both" },
      { feature: "Brand footprint", provider1Value: "Category's most established", provider2Value: "Long-established", highlight: "provider1" },
      { feature: "Pricing", provider1Value: "Quoted per dog - verify on site", provider2Value: "Quoted per dog - verify on site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "farmers-dog-vs-nom-nom",
    provider1Id: "farmers-dog",
    provider2Id: "nom-nom",
    title: "The Farmer's Dog vs Nom Nom: Fresh Dog Food Compared (2026)",
    matchupLabel: "The Farmer's Dog vs Nom Nom",
    subtitle: "Two fresh, pre-portioned dog food subscriptions with the same core model, compared honestly.",
    description:
      "The Farmer's Dog vs Nom Nom: both ship fresh, pre-portioned, personalized dog food. How the two compare on model and positioning, and what to verify in each quote flow.",
    intro:
      "The Farmer's Dog and Nom Nom run nearly identical models: fresh food, human-grade ingredients, pre-portioned packs sized from your dog's profile, recurring delivery. That makes this comparison less about the model and more about the brands behind it - and about the per-day quote each one gives your actual dog, which is the number that should decide it. We haven't verified either brand's current pricing or full recipe lineup, so this comparison stays on what's publicly observable and on exactly what to check before buying.",
    verdict:
      "On what's publicly observable, The Farmer's Dog is the more established brand - the category's reference name with the larger footprint. Nom Nom's counter is its nutrition-science positioning: recipes formulated by board-certified veterinary nutritionists, a credential it puts at the center of the pitch. Both ship the same style of fresh, pre-portioned product, so for most owners this decision comes down to the two quote flows: same dog profile, compare the per-day price, the recipes offered, and current trial and cancellation terms. If the numbers land close, the bigger brand footprint is a reasonable tiebreaker for a long-running subscription.",
    verdictWinnerPoints: [
      "The category's most established fresh dog food brand",
      "Pre-portioned packs matched to your dog's profile",
      "Recipes developed with veterinary nutritionists",
    ],
    verdictLoserPoints: [
      "Recipes formulated by board-certified veterinary nutritionists",
      "Same fresh, pre-portioned subscription model",
      "Worth quoting side by side on your dog's actual price",
    ],
    winnerId: "farmers-dog",
    categories: [
      {
        name: "Brand Track Record",
        winner: "provider1",
        explanation:
          "The Farmer's Dog has the bigger public footprint - it is the brand most owners name first in fresh dog food. Nom Nom is an established competitor with years in the category, so the gap is one of scale and recognition rather than legitimacy.",
        supportingPoints: [
          "Category reference brand (The Farmer's Dog)",
          "Established fresh competitor (Nom Nom)",
        ],
      },
      {
        name: "Nutrition Positioning",
        winner: "provider2",
        explanation:
          "Nom Nom leads its pitch with formulation by board-certified veterinary nutritionists. The Farmer's Dog also develops recipes with veterinary nutritionists, so both take formulation seriously - but the depth of that credential is more central to Nom Nom's identity.",
        supportingPoints: [
          "Board-certified veterinary nutritionist formulation (Nom Nom)",
          "Vet-nutritionist-developed recipes (The Farmer's Dog)",
        ],
      },
      {
        name: "What We Can Verify Today",
        winner: "tie",
        explanation:
          "We haven't verified current per-dog pricing or the exact recipe lineup at either brand. Both quote per dog: run both flows with the same profile and compare the per-day price, recipe fit for your dog, and each brand's current trial and cancellation terms before committing.",
        supportingPoints: [
          "Pricing is quoted per dog at both - get both quotes",
          "Compare trial offers and cancellation terms directly",
        ],
      },
    ],
    features: [
      { feature: "Category", provider1Value: "Fresh dog food subscription", provider2Value: "Fresh dog food subscription", highlight: "both" },
      { feature: "Ingredients", provider1Value: "Human-grade", provider2Value: "Fresh, pre-portioned recipes", highlight: "both" },
      { feature: "Formats", provider1Value: "Fresh", provider2Value: "Fresh", highlight: "both" },
      { feature: "Formulation", provider1Value: "With veterinary nutritionists", provider2Value: "Board-certified veterinary nutritionists", highlight: "provider2" },
      { feature: "Brand footprint", provider1Value: "Category's most established", provider2Value: "Established", highlight: "provider1" },
      { feature: "Pricing", provider1Value: "Quoted per dog - verify on site", provider2Value: "Quoted per dog - verify on site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "ollie-vs-nom-nom",
    provider1Id: "ollie",
    provider2Id: "nom-nom",
    title: "Ollie vs Nom Nom: Which Fresh Dog Food Subscription in 2026?",
    matchupLabel: "Ollie vs Nom Nom",
    subtitle: "Two established fresh dog food subscriptions - format range vs nutrition-science positioning.",
    description:
      "Ollie vs Nom Nom: two established fresh dog food brands compared - Ollie's fresh + baked format range against Nom Nom's vet-nutritionist-led positioning, and what to verify before buying.",
    intro:
      "Ollie and Nom Nom are both established fresh dog food subscriptions running the category's standard model: personalized plans, human-grade-quality recipes, recurring delivery. The real differences are at the edges - Ollie offers fresh and gently baked formats in one plan, while Nom Nom centers its pitch on recipes formulated by board-certified veterinary nutritionists. We haven't verified either brand's current pricing or full recipe lineup, so this comparison sticks to what's publicly observable and what to check in each quote flow.",
    verdict:
      "Ollie takes this on practical flexibility: the fresh-plus-baked menu is a real advantage for storage, travel and budget-blending that Nom Nom's fresh-only lineup can't match, and Ollie's brand footprint in the category is at least as strong. Nom Nom remains a solid pick for owners who weight the board-certified veterinary nutritionist formulation most heavily. As with every fresh brand, the deciding number is the per-day quote for your actual dog - run both flows with the same profile and compare price, recipes and current trial and cancellation terms before you commit.",
    verdictWinnerPoints: [
      "Fresh plus gently baked formats in one subscription",
      "Human-grade ingredients, personalized portions",
      "Established brand footprint in the fresh category",
    ],
    verdictLoserPoints: [
      "Board-certified veterinary nutritionist formulation",
      "Fresh, pre-portioned packs matched to your dog",
      "Worth quoting side by side on your dog's actual price",
    ],
    winnerId: "ollie",
    categories: [
      {
        name: "Food Formats",
        winner: "provider1",
        explanation:
          "Ollie offers fresh and gently baked lines that can be blended in one plan; Nom Nom ships fresh only. Format range is the most practical difference between the two for day-to-day feeding, storage and travel.",
        supportingPoints: [
          "Fresh + baked, blendable in one plan (Ollie)",
          "Fresh-only lineup (Nom Nom)",
        ],
      },
      {
        name: "Nutrition Positioning",
        winner: "provider2",
        explanation:
          "Nom Nom's recipes are formulated by board-certified veterinary nutritionists, and that credential anchors its brand. Ollie's recipes are also developed to complete-and-balanced standards, but the nutrition-science identity is more central at Nom Nom.",
        supportingPoints: [
          "Board-certified veterinary nutritionist formulation (Nom Nom)",
          "Complete-and-balanced personalized recipes (Ollie)",
        ],
      },
      {
        name: "What We Can Verify Today",
        winner: "tie",
        explanation:
          "We haven't verified current per-dog pricing or exact recipe lineups at either brand. Both quote per dog - run both flows with the same profile and compare the per-day price, recipe fit, and each brand's current trial and cancellation terms.",
        supportingPoints: [
          "Pricing is quoted per dog at both - get both quotes",
          "Compare trial offers and cancellation terms directly",
        ],
      },
    ],
    features: [
      { feature: "Category", provider1Value: "Fresh dog food subscription", provider2Value: "Fresh dog food subscription", highlight: "both" },
      { feature: "Formats", provider1Value: "Fresh + gently baked", provider2Value: "Fresh", highlight: "provider1" },
      { feature: "Formulation", provider1Value: "Complete-and-balanced recipes", provider2Value: "Board-certified veterinary nutritionists", highlight: "provider2" },
      { feature: "Portioning", provider1Value: "Personalized to your dog", provider2Value: "Pre-portioned to your dog", highlight: "both" },
      { feature: "Pricing", provider1Value: "Quoted per dog - verify on site", provider2Value: "Quoted per dog - verify on site", highlight: "none" },
      { feature: "Trial & cancellation", provider1Value: "Verify on site", provider2Value: "Verify on site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
];

const faqs: FaqItem[] = [
  {
    question: "What is fresh dog food?",
    answer:
      "Fresh dog food is lightly cooked food made from whole ingredients - typically human-grade meat, vegetables and grains - refrigerated or frozen rather than shelf-stable like kibble. The subscription brands in this category personalize portions to your dog's age, weight and activity, and deliver on a recurring schedule.",
  },
  {
    question: "Is fresh dog food better than kibble?",
    answer:
      "It depends on the dog and the budget. Fresh recipes from the major brands are formulated to the same complete-and-balanced nutrition standards (AAFCO) that quality kibble meets, with less processing and whole ingredients - but at a meaningfully higher cost and with cold-storage requirements. Many dogs do very well on quality kibble. If your dog has health conditions, ask your vet before switching diets.",
  },
  {
    question: "How much does fresh dog food cost?",
    answer:
      "Fresh dog food is priced per dog - the brands quote you after you enter your dog's age, weight and activity level, so a 70-pound Labrador and a 12-pound terrier get very different numbers. Because of that, we only list a brand's pricing once we've verified it; where we haven't, we say so and point you to the brand's own quote flow for your dog's actual rate.",
  },
  {
    question: "How do fresh dog food subscriptions work?",
    answer:
      "You build a profile for your dog, the brand recommends recipes and portion sizes, and food arrives refrigerated or frozen on a recurring schedule. You store it in the fridge or freezer and serve the pre-measured portions. Plans can typically be paused, adjusted or cancelled - check each brand's current terms before subscribing.",
  },
  {
    question: "How should I switch my dog to fresh food?",
    answer:
      "Gradually - most brands and vets recommend transitioning over roughly a week to ten days, mixing increasing amounts of the new food into the old to avoid digestive upset. If your dog has a sensitive stomach, allergies or a medical condition, involve your vet in the switch.",
  },
  {
    question: "What should I check before choosing a fresh dog food brand?",
    answer:
      "Four things: the per-day price from the brand's quote flow for your actual dog (not an advertised starting price), the recipe options for your dog's needs and sensitivities, the delivery and storage logistics for your household, and the current trial, pause and cancellation terms. Comparing two or three quote flows with the same dog profile is the single most useful step.",
  },
];

export function freshDogFoodSeed(base: SiteConfig): SiteConfig {
  return {
    ...base,
    siteName: "zollopet.com",
    hero: {
      ...base.hero,
      backgroundImageUrl: "",
      imageAlt: "",
      updatedLabel: "Last Updated: August 2026",
      h1: "Best Fresh Dog Food Delivery Services of 2026",
      h2: "Compare fresh, human-grade dog food subscriptions side by side",
      description:
        "Compare the leading fresh dog food delivery services - how the brands differ, what fresh food does and doesn't change, and exactly what to verify in each quote flow. Where we haven't verified a brand's pricing yet, we say so instead of guessing.",
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
    articles: freshDogFoodArticles,
  };
}
