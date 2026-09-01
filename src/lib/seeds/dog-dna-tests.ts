import type {
  SiteConfig,
  Provider,
  ReviewData,
  BattleData,
  FaqItem,
} from "../config";
import { dogDnaTestsArticles } from "./articles-dog-dna-tests";

// ─────────────────────────────────────────────────────────────────────────────
// Dog DNA Tests vertical
//
// House rules, same as every vertical: real brands with truthful, general
// descriptions and NO invented data - no fabricated prices, ratings, breed
// counts, marker counts or accuracy percentages. Kit lineups and claims
// change, so the copy stays general and points readers at each brand's own
// product pages. Affiliate links and verified kit details get filled in as
// partnerships come online.
// ─────────────────────────────────────────────────────────────────────────────

const UPDATED = "2026-09-01";
const PRICING_TBD =
  "We haven't verified this brand's current kit prices - dog DNA tests are one-time purchases whose list prices and frequent promotions change, and each brand sells multiple kit tiers. Check the brand's own site for current pricing on the kit tier you actually want. This page will carry verified pricing detail once we've confirmed it.";

const providers: Provider[] = [
  {
    id: "embark",
    name: "Embark",
    tagline: "Research-grade dog DNA testing for breed & health",
    logo: "/logos/embark.svg",
    smallLogo: "/logos/embark-icon.svg",
    highlights: [
      "Developed with Cornell University College of Veterinary Medicine",
      "Breed identification plus extensive genetic health screening",
      "Relative-finder connects dogs that share DNA",
    ],
    affiliateUrl: "https://embarkvet.com",
    ctaText: "Visit Site",
  },
  {
    id: "wisdom-panel",
    name: "Wisdom Panel",
    tagline: "The longest-running mass-market dog DNA test",
    logo: "/logos/wisdom-panel.svg",
    smallLogo: "/logos/wisdom-panel-icon.svg",
    highlights: [
      "One of the largest tested-dog databases in the category",
      "Breed detection with tiered health-screening kits",
      "Backed by Mars Petcare's science organization",
    ],
    affiliateUrl: "https://www.wisdompanel.com",
    ctaText: "Visit Site",
  },
];

const reviews: ReviewData[] = [
  {
    slug: "embark",
    providerId: "embark",
    shortSummary:
      "The research-grade option: breed ID plus deep genetic health screening, developed with Cornell's veterinary school.",
    reviewIntro:
      "Embark positions itself as the research-grade dog DNA test, and the credentials back the positioning: the company was developed in partnership with the Cornell University College of Veterinary Medicine, and its platform is built for both consumer results and canine genetics research. The experience is the category standard - swab your dog's cheek, mail it back, get results online - with Embark's emphasis falling on the depth of its genetic health screening alongside breed identification, plus features like a relative finder that connects dogs sharing DNA. Embark sells multiple kit tiers (breed-only and breed-plus-health), and we haven't verified the current lineup, marker counts or prices, so this review covers the model honestly and will carry verified specifics once confirmed.",
    keyFeatures: [
      "Breed identification from a cheek swab",
      "Extensive genetic health and trait screening (tier-dependent)",
      "Relative finder - see dogs that share your dog's DNA",
      "Developed with Cornell University College of Veterinary Medicine",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Breed ID kit (current specifications to be verified on the brand's site)",
      "Breed + health kit (current panel to be verified on the brand's site)",
    ],
    pros: [
      "The strongest research pedigree in the category",
      "Health screening depth is central to the product, not an add-on",
      "Relative finder is a genuinely fun, unique-to-DNA feature",
    ],
    cons: [
      "We haven't verified current kit tiers, panels or pricing",
      "Typically positioned at the premium end of the category",
      "Health results are risk indicators, not diagnoses - vet follow-up still applies",
    ],
    bestFor: [
      "Owners who want health screening depth, not just a breed pie chart",
      "Mixed-breed owners planning proactive care conversations with their vet",
    ],
    finalVerdict:
      "Embark is the pick when you care about what's under the hood: the Cornell partnership and research-first platform are real differentiators in a category where marketing claims are hard for consumers to evaluate. The honest caveats: verify the current kit tiers and prices on Embark's site before buying, and treat health results as conversation-starters for your vet - a genetic risk marker is not a diagnosis, and a clean panel is not a guarantee. For breed-curiosity-only buyers, compare the entry kit against Wisdom Panel's before paying a premium you may not need.",
    trustBadges: ["Cornell-partnered research", "Breed + health screening", "Cheek-swab kit"],
    updatedAt: UPDATED,
  },
  {
    slug: "wisdom-panel",
    providerId: "wisdom-panel",
    shortSummary:
      "The category's longest-running mass-market test: breed detection backed by one of the largest tested-dog databases.",
    reviewIntro:
      "Wisdom Panel is the longest-running mass-market dog DNA brand, and its scale is its calling card: it has tested millions of dogs, giving it one of the largest breed-reference and tested-dog databases in the category. It sits inside Mars Petcare's science organization, which also runs veterinary and pet-science operations. The product follows the standard model - cheek swab, mail-in, online results - with tiered kits that pair breed detection with different levels of health and trait screening. We haven't verified Wisdom Panel's current kit lineup, panel contents or prices, so this review covers the model honestly and will carry verified specifics once confirmed.",
    keyFeatures: [
      "Breed detection from a cheek swab",
      "One of the category's largest tested-dog databases",
      "Tiered kits with varying health and trait screening",
      "Part of Mars Petcare's science organization",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Breed detection kit (current specifications to be verified on the brand's site)",
      "Breed + health kit tiers (current panels to be verified on the brand's site)",
    ],
    pros: [
      "Massive tested-dog database built over the category's longest track record",
      "Typically the more accessible price point of the two leaders",
      "Corporate backing with real veterinary-science infrastructure",
    ],
    cons: [
      "We haven't verified current kit tiers, panels or pricing",
      "Research-community pedigree is less central to its pitch than Embark's",
      "Health results are risk indicators, not diagnoses - vet follow-up still applies",
    ],
    bestFor: [
      "Owners whose main question is 'what breeds is my dog?'",
      "Budget-conscious buyers who still want a category-leading database behind the answer",
    ],
    finalVerdict:
      "Wisdom Panel is the sensible default for breed-first buyers: the database scale earned over the category's longest run is exactly what matters for breed detection, and it's typically the more accessible of the two leading brands. If deep health screening is your primary goal, compare its higher tiers against Embark's before deciding. As with any DNA test: verify current kits and prices on the brand's site, and take health findings to your vet rather than acting on them alone.",
    trustBadges: ["Largest-scale database", "Tiered kits", "Cheek-swab test"],
    updatedAt: UPDATED,
  },
];

const battles: BattleData[] = [
  {
    slug: "embark-vs-wisdom-panel",
    provider1Id: "embark",
    provider2Id: "wisdom-panel",
    title: "Embark vs Wisdom Panel: Which Dog DNA Test in 2026?",
    matchupLabel: "Embark vs Wisdom Panel",
    subtitle: "The two dog DNA heavyweights - research depth vs database scale, compared honestly.",
    description:
      "Embark vs Wisdom Panel: the two leading dog DNA tests compared - Embark's Cornell-partnered health screening against Wisdom Panel's category-largest database, and what to verify before buying either.",
    intro:
      "Embark and Wisdom Panel are the two names that matter in dog DNA testing, and they've earned it from different directions. Embark built the research-grade reputation - developed with Cornell's veterinary school, health-screening-first, priced accordingly. Wisdom Panel built scale - the longest-running mass-market test with one of the largest tested-dog databases in existence. Both work the same way for you: cheek swab, mail it in, results online. We haven't verified either brand's current kit tiers, panel contents or prices - both change and both brands run frequent promotions - so this comparison sticks to the structural differences and what to check on each product page before you buy.",
    verdict:
      "Embark takes this for buyers who want the whole picture: its research pedigree and the centrality of genetic health screening make it the stronger choice when the answers might change how you care for your dog - and that's the highest-value use of a DNA test. Wisdom Panel is the better buy when your question is primarily breed identity: its database scale is exactly the asset that matters for breed detection, typically at a friendlier price. The practical decision: pick by what you'll do with the results, then compare the specific kit tiers - entry vs entry, health vs health - on both sites, where current prices and frequent promotions live. And either way, health findings are risk indicators for a vet conversation, never diagnoses.",
    verdictWinnerPoints: [
      "Developed with Cornell's veterinary school",
      "Health screening is the product's center of gravity",
      "Relative finder connects dogs sharing DNA",
    ],
    verdictLoserPoints: [
      "One of the category's largest tested-dog databases",
      "The longest mass-market track record",
      "Typically the more accessible price point",
    ],
    winnerId: "embark",
    categories: [
      {
        name: "Health Screening Depth",
        winner: "provider1",
        explanation:
          "Health screening is Embark's core identity - its research partnership and platform were built around genetic health, and its breed+health kit is the product most buyers associate with the brand. Wisdom Panel offers health screening in its higher tiers, but breed detection is its center of gravity.",
        supportingPoints: [
          "Health-first product design (Embark)",
          "Health screening as a tier upgrade (Wisdom Panel)",
        ],
      },
      {
        name: "Breed Database Scale",
        winner: "provider2",
        explanation:
          "Wisdom Panel's decades-long head start produced one of the largest tested-dog databases in the category, and database scale is the raw material of breed detection. Embark's database is large and growing, but longevity is Wisdom Panel's home turf.",
        supportingPoints: [
          "Category's longest track record and largest-scale database (Wisdom Panel)",
          "Large, research-oriented database (Embark)",
        ],
      },
      {
        name: "What We Can Verify Today",
        winner: "tie",
        explanation:
          "We haven't verified current kit tiers, panel contents or prices at either brand - and both run frequent promotions that make any printed price stale quickly. Compare the equivalent kit tiers on both sites, check current turnaround-time claims, and read what each health panel actually covers before deciding.",
        supportingPoints: [
          "Kit tiers and prices change - check both product pages",
          "Compare equivalent tiers, not the two brands' cheapest kits",
        ],
      },
    ],
    features: [
      { feature: "Category", provider1Value: "Dog DNA test kit", provider2Value: "Dog DNA test kit", highlight: "both" },
      { feature: "Sample method", provider1Value: "Cheek swab, mail-in", provider2Value: "Cheek swab, mail-in", highlight: "both" },
      { feature: "Research pedigree", provider1Value: "Developed with Cornell vet school", provider2Value: "Mars Petcare science organization", highlight: "provider1" },
      { feature: "Database scale", provider1Value: "Large, research-oriented", provider2Value: "One of the category's largest", highlight: "provider2" },
      { feature: "Product focus", provider1Value: "Health screening + breed", provider2Value: "Breed detection + tiered health", highlight: "none" },
      { feature: "Pricing", provider1Value: "Verify current kits on site", provider2Value: "Verify current kits on site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
];

const faqs: FaqItem[] = [
  {
    question: "How do dog DNA tests work?",
    answer:
      "You swab the inside of your dog's cheek with the kit's swab, mail the sample back in the prepaid packaging, and the lab genotypes the DNA and matches it against the company's reference database. Results arrive online, typically within a few weeks - each brand publishes its own current turnaround estimate.",
  },
  {
    question: "How accurate are dog DNA breed results?",
    answer:
      "Breed results are estimates, not certificates. Accuracy depends on the size and quality of the company's reference database and how well your dog's ancestry is represented in it - which is why the two category leaders compete so hard on database scale. Results are generally strong for well-represented breeds and first-generation mixes, and fuzzier for deeply mixed 'supermutt' ancestry, where small trace percentages should be read loosely.",
  },
  {
    question: "What do the health results actually mean?",
    answer:
      "Genetic health screening reports whether your dog carries variants associated with certain conditions. A flagged variant is a risk indicator - many dogs with a marker never develop the condition - and a clean panel is not a guarantee of health, since most health problems aren't purely genetic. The right use of health results is a conversation with your vet about monitoring and prevention, never a diagnosis or a treatment decision on their own.",
  },
  {
    question: "How much do dog DNA tests cost?",
    answer:
      "Kits are one-time purchases sold in tiers - breed-only kits cost less, breed-plus-health kits more - and both leading brands run frequent promotions, so list prices move around. We only publish prices we've verified; check each brand's site for the current price of the specific tier you want, and compare equivalent tiers between brands rather than each brand's cheapest kit.",
  },
  {
    question: "Are dog DNA tests worth it?",
    answer:
      "For curiosity about a mixed-breed dog's ancestry, they're a fun, reasonably priced one-time answer. The stronger case is proactive health: screening can surface risk markers worth discussing with your vet, and weight/trait insights can inform care. They're least worth it if you'd treat the health results as medical conclusions - they aren't - or for registered purebreds whose ancestry is already documented.",
  },
  {
    question: "Which is better, Embark or Wisdom Panel?",
    answer:
      "It depends on your question. If it's 'what breeds is my dog?', Wisdom Panel's category-largest database and typically friendlier pricing make it the sensible default. If it's 'what should I know about my dog's health?', Embark's Cornell-partnered, health-first platform is the stronger fit. Our full Embark vs Wisdom Panel comparison breaks the matchup down category by category.",
  },
];

export function dogDnaTestsSeed(base: SiteConfig): SiteConfig {
  return {
    ...base,
    siteName: "zollopet.com",
    hero: {
      ...base.hero,
      backgroundImageUrl: "",
      imageAlt: "",
      updatedLabel: "Last Updated: September 2026",
      h1: "Best Dog DNA Tests of 2026",
      h2: "Compare dog DNA test kits for breed ID & health screening",
      description:
        "Compare the leading dog DNA tests - how Embark and Wisdom Panel actually differ, what breed and health results can and can't tell you, and what to verify before buying. Where we haven't verified a brand's pricing yet, we say so instead of guessing.",
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
    articles: dogDnaTestsArticles,
  };
}
