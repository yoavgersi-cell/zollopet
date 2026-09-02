import type {
  SiteConfig,
  Provider,
  ReviewData,
  BattleData,
  FaqItem,
} from "../config";
import { petInsuranceArticles } from "./articles-pet-insurance";

// ─────────────────────────────────────────────────────────────────────────────
// Pet Insurance vertical
//
// House rules, same as every vertical: real brands with truthful, general
// descriptions and NO invented data - no fabricated premiums, ratings, limits
// or coverage specifics. Pet insurance pricing depends on species, breed, age
// and location, and policy terms change - so the copy stays general and points
// readers at each insurer's own quote flow and sample policy. Affiliate links
// and verified plan details get filled in as partnerships come online.
// ─────────────────────────────────────────────────────────────────────────────

const UPDATED = "2026-08-31";
const PRICING_TBD =
  "We haven't verified this insurer's current rates - pet insurance premiums are quoted per pet, from species, breed, age and ZIP code, so the only number that matters is your own quote. This page will carry verified plan detail once we've confirmed it against the insurer's published materials.";

const providers: Provider[] = [
  {
    id: "lemonade",
    name: "Lemonade",
    tagline: "Digital-first pet insurance with app-based claims",
    logo: "/logos/lemonade.svg",
    smallLogo: "/logos/lemonade-icon.svg",
    highlights: [
      "Fully digital sign-up and claims via the app",
      "Customizable coverage with optional add-ons",
      "Part of a broader digital insurance company",
    ],
    affiliateUrl: "https://www.lemonade.com/pet",
    ctaText: "Get a Quote",
  },
  {
    id: "healthy-paws",
    name: "Healthy Paws",
    tagline: "One straightforward accident & illness plan",
    logo: "/logos/healthy-paws.svg",
    smallLogo: "/logos/healthy-paws-icon.svg",
    highlights: [
      "A single accident & illness plan - simple to understand",
      "Established pet-insurance specialist brand",
      "Claims submitted by photographing the vet bill",
    ],
    affiliateUrl: "https://www.healthypawspetinsurance.com",
    ctaText: "Get a Quote",
  },
  {
    id: "trupanion",
    name: "Trupanion",
    tagline: "Per-condition deductible model, can pay vets directly",
    logo: "/logos/trupanion.svg",
    smallLogo: "/logos/trupanion-icon.svg",
    highlights: [
      "Deductible applied per condition rather than per year",
      "Can pay participating vets directly at checkout",
      "Longstanding pet-insurance specialist",
    ],
    affiliateUrl: "https://www.trupanion.com",
    ctaText: "Get a Quote",
  },
  {
    id: "embrace",
    name: "Embrace",
    tagline: "Accident & illness cover with flexible options",
    logo: "/logos/embrace.svg",
    smallLogo: "/logos/embrace-icon.svg",
    highlights: [
      "Accident & illness coverage with adjustable terms",
      "Optional non-insurance wellness plan for routine care",
      "Diminishing-deductible feature for claim-free years",
    ],
    affiliateUrl: "https://www.embracepetinsurance.com",
    ctaText: "Get a Quote",
  },
];

const reviews: ReviewData[] = [
  {
    slug: "lemonade",
    providerId: "lemonade",
    shortSummary:
      "Digital-first pet insurance: quote, sign-up and claims all in the app, with customizable coverage and add-ons.",
    reviewIntro:
      "Lemonade brought its app-first insurance model to pets: you quote and buy coverage digitally, customize limits and options, and file claims from the app - the experience the brand is known for across its insurance lines. Its pet product covers accidents and illnesses, with optional add-ons (such as routine-care packages) that vary by policy. Availability, terms and add-ons vary by state, and premiums are quoted per pet. We haven't verified Lemonade's current plan terms or rates, so this review covers the model honestly and will carry verified specifics once confirmed.",
    keyFeatures: [
      "Fully digital quote, purchase and claims flow",
      "Accident & illness coverage with customizable terms",
      "Optional add-ons for routine and preventative care",
      "App-based claims with fast digital processing",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Accident & illness coverage (terms vary by state - verify the sample policy)",
      "Optional add-ons such as preventative/routine care (availability varies)",
    ],
    pros: [
      "Best-in-category digital experience for quoting and claims",
      "Coverage terms and add-ons are customizable",
      "Backed by an established digital insurance company",
    ],
    cons: [
      "We haven't verified current rates, terms or state availability",
      "Like all pet insurers: pre-existing conditions are excluded and waiting periods apply",
      "A newer entrant to pet insurance than the specialist brands",
    ],
    bestFor: [
      "Owners who want a fully digital insurance experience",
      "People who want to tune limits and add-ons rather than take one fixed plan",
    ],
    finalVerdict:
      "Lemonade's pitch is the experience: if you want pet insurance that quotes, sells and pays claims through a polished app, it is the reference point. The insurance fundamentals still decide whether it's right for your pet - get your own quote, read the sample policy for exclusions and waiting periods, and confirm what's available in your state. Compare that quote against a specialist insurer before deciding; premiums for the same pet can differ meaningfully between brands.",
    trustBadges: ["App-based claims", "Customizable coverage", "Digital-first insurer"],
    updatedAt: UPDATED,
  },
  {
    slug: "healthy-paws",
    providerId: "healthy-paws",
    shortSummary:
      "An established pet-insurance specialist with one straightforward accident & illness plan and photo-a-bill claims.",
    reviewIntro:
      "Healthy Paws is one of the established specialist names in US pet insurance, and its identity is simplicity: one accident & illness plan, rather than a menu of tiers and add-ons. Claims are famously simple too - photograph the vet bill in the app and submit. The trade-off for that simplicity is less ability to tune the coverage to a budget, and no routine/wellness option. Premiums are quoted per pet and terms vary by state. We haven't verified Healthy Paws' current plan parameters or rates, so this review covers the model honestly and will carry verified specifics once confirmed.",
    keyFeatures: [
      "One accident & illness plan - minimal configuration",
      "Photo-the-bill claims via the app",
      "Established pet-insurance specialist brand",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Accident & illness coverage (plan parameters vary - verify the sample policy)",
    ],
    pros: [
      "Simple to understand - one plan, no tier shopping",
      "Simple claims process",
      "Long specialist track record in pet insurance",
    ],
    cons: [
      "We haven't verified current plan parameters or rates",
      "No routine/wellness coverage option",
      "Less configurable than menu-style competitors",
    ],
    bestFor: [
      "Owners who want serious accident & illness cover without option paralysis",
      "People who value a specialist brand and a simple claims flow",
    ],
    finalVerdict:
      "Healthy Paws is the pick for owners who want pet insurance to be simple: one plan, a straightforward claims flow, and a specialist's track record. If you want wellness add-ons or fine-grained control over limits and deductibles, a menu-style insurer will fit better. As with every insurer here: get your own quote, read the sample policy - especially exclusions, waiting periods and how the plan handles your pet's age - and compare against at least one alternative before buying.",
    trustBadges: ["Specialist insurer", "One simple plan", "App-based claims"],
    updatedAt: UPDATED,
  },
  {
    slug: "trupanion",
    providerId: "trupanion",
    shortSummary:
      "A longstanding specialist with a distinctive model: per-condition deductibles and the ability to pay participating vets directly.",
    reviewIntro:
      "Trupanion is one of the longest-standing pet-insurance specialists in North America, and its policy model is genuinely different from the field in two ways. First, its deductible applies per condition rather than per year - once met for a chronic condition, that condition's deductible doesn't reset annually. Second, Trupanion can pay participating veterinary hospitals directly at checkout through its payment software, so you're not fronting the full bill and waiting for reimbursement where that's available. Premiums are quoted per pet and the direct-pay option depends on your vet's participation. We haven't verified Trupanion's current terms or rates, so this review covers the model honestly and will carry verified specifics once confirmed.",
    keyFeatures: [
      "Deductible applied per condition, not per year",
      "Direct payment to participating vets at checkout",
      "Longstanding pet-insurance specialist",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Accident & illness coverage (terms vary - verify the sample policy)",
      "Direct vet payment where the hospital participates (verify with your vet)",
    ],
    pros: [
      "Per-condition deductible model favors pets with chronic conditions",
      "Direct-pay can eliminate the front-the-bill problem at participating vets",
      "One of the category's longest track records",
    ],
    cons: [
      "We haven't verified current terms or rates",
      "Direct-pay depends on whether your vet participates - check first",
      "No routine/wellness coverage option in the core model",
    ],
    bestFor: [
      "Owners whose vets participate in Trupanion's direct-pay system",
      "Owners of breeds prone to chronic conditions, where per-condition deductibles shine",
    ],
    finalVerdict:
      "Trupanion's two structural features - per-condition deductibles and direct vet pay - are the most differentiated mechanics in mainstream pet insurance, and for the right owner (a participating vet, a breed prone to chronic issues) they're decisive. Confirm both for your situation: ask your vet whether they support Trupanion's direct payment, get your own quote, and read the sample policy for exclusions and waiting periods before deciding.",
    trustBadges: ["Per-condition deductible", "Direct vet pay", "Specialist insurer"],
    updatedAt: UPDATED,
  },
  {
    slug: "embrace",
    providerId: "embrace",
    shortSummary:
      "Accident & illness cover with flexible terms, an optional wellness plan, and a deductible that shrinks in claim-free years.",
    reviewIntro:
      "Embrace is an established pet insurer whose pitch is flexibility with a couple of distinctive mechanics. Its accident & illness policies come with adjustable terms, an optional non-insurance wellness plan (Wellness Rewards) for routine care, and a diminishing-deductible feature that reduces your deductible for each year you don't file a claim. Premiums are quoted per pet and terms vary by state. We haven't verified Embrace's current plan parameters or rates, so this review covers the model honestly and will carry verified specifics once confirmed.",
    keyFeatures: [
      "Accident & illness coverage with adjustable terms",
      "Optional Wellness Rewards plan for routine care",
      "Diminishing deductible for claim-free years",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Accident & illness coverage (terms vary by state - verify the sample policy)",
      "Optional wellness plan for routine care (non-insurance benefit - verify terms)",
    ],
    pros: [
      "Flexible policy terms plus a routine-care option",
      "Diminishing deductible rewards claim-free years",
      "Established brand in the category",
    ],
    cons: [
      "We haven't verified current plan parameters or rates",
      "More moving parts to understand than one-plan insurers",
      "Like all pet insurers: pre-existing conditions are excluded and waiting periods apply",
    ],
    bestFor: [
      "Owners who want accident & illness cover plus a routine-care budget in one place",
      "People willing to tune policy terms for the right premium",
    ],
    finalVerdict:
      "Embrace fits owners who want more than bare accident & illness cover - the wellness option and diminishing deductible are real, useful mechanics if you'll use them. The flip side is more configuration to get right, so read the sample policy carefully: what the wellness plan actually reimburses, how the diminishing deductible works, and the standard exclusions and waiting periods. Get your own quote and compare it like-for-like against a simpler competitor before deciding.",
    trustBadges: ["Flexible terms", "Wellness option", "Diminishing deductible"],
    updatedAt: UPDATED,
  },
];

const battles: BattleData[] = [
  {
    slug: "lemonade-vs-healthy-paws",
    provider1Id: "lemonade",
    provider2Id: "healthy-paws",
    title: "Lemonade vs Healthy Paws: Which Pet Insurance in 2026?",
    matchupLabel: "Lemonade vs Healthy Paws",
    subtitle: "The digital-first insurer vs the one-plan specialist, compared honestly.",
    description:
      "Lemonade vs Healthy Paws pet insurance: app-first, customizable coverage against one straightforward accident & illness plan. How the models differ and what to verify before you buy.",
    intro:
      "Lemonade and Healthy Paws answer the same question - how to protect yourself from a big vet bill - with opposite philosophies. Lemonade is app-first and menu-style: customize your limits, bolt on add-ons, run everything digitally. Healthy Paws is a specialist with one accident & illness plan and a deliberately simple claims flow. Premiums at both are quoted per pet from breed, age and location, and we haven't verified either insurer's current rates or plan parameters - so this comparison focuses on the structural differences and on exactly what to check in both quotes.",
    verdict:
      "Lemonade wins on flexibility and experience: customizable coverage, optional routine-care add-ons, and the smoothest digital flow in the category - if you want to tune a policy to your budget, it gives you the dials. Healthy Paws wins on simplicity: one serious accident & illness plan from a specialist brand, with nothing to configure and a famously simple claims process. Neither model is objectively better - it depends on whether you want dials or defaults. What decides it for your pet is the quote: run both for the same pet, then read both sample policies for exclusions, waiting periods and age-related terms before buying.",
    verdictWinnerPoints: [
      "Customizable limits with optional add-ons",
      "Fully digital sign-up and app-based claims",
      "Part of an established digital insurance company",
    ],
    verdictLoserPoints: [
      "One straightforward accident & illness plan",
      "Specialist brand with a long track record",
      "Simple photo-the-bill claims flow",
    ],
    winnerId: "lemonade",
    categories: [
      {
        name: "Coverage Flexibility",
        winner: "provider1",
        explanation:
          "Lemonade's menu model - adjustable terms plus optional add-ons like routine care - gives owners control over what they pay for. Healthy Paws offers one plan with no wellness option; simpler, but nothing to tune.",
        supportingPoints: [
          "Adjustable terms and optional add-ons (Lemonade)",
          "Single fixed plan, no wellness option (Healthy Paws)",
        ],
      },
      {
        name: "Simplicity",
        winner: "provider2",
        explanation:
          "Healthy Paws is the easier product to understand and buy: one plan, one decision, and claims filed by photographing the vet bill. Menu-style policies require more reading to know exactly what you bought.",
        supportingPoints: [
          "One plan, minimal configuration (Healthy Paws)",
          "More options to evaluate before buying (Lemonade)",
        ],
      },
      {
        name: "What We Can Verify Today",
        winner: "tie",
        explanation:
          "We haven't verified current rates or plan parameters at either insurer, and premiums are quoted per pet at both. Run both quotes for the same pet, then read both sample policies - exclusions, waiting periods, and how each handles older pets - before deciding.",
        supportingPoints: [
          "Premiums are per-pet quotes at both - get both",
          "Read both sample policies before buying",
        ],
      },
    ],
    features: [
      { feature: "Category", provider1Value: "Accident & illness pet insurance", provider2Value: "Accident & illness pet insurance", highlight: "both" },
      { feature: "Plan structure", provider1Value: "Customizable, with add-ons", provider2Value: "One fixed plan", highlight: "provider1" },
      { feature: "Routine/wellness option", provider1Value: "Optional add-ons (varies)", provider2Value: "Not offered", highlight: "provider1" },
      { feature: "Claims", provider1Value: "In-app, digital-first", provider2Value: "Photo the bill in the app", highlight: "both" },
      { feature: "Brand type", provider1Value: "Digital multi-line insurer", provider2Value: "Pet-insurance specialist", highlight: "none" },
      { feature: "Premiums", provider1Value: "Quoted per pet - verify", provider2Value: "Quoted per pet - verify", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "trupanion-vs-healthy-paws",
    provider1Id: "trupanion",
    provider2Id: "healthy-paws",
    title: "Trupanion vs Healthy Paws: Pet Insurance Compared (2026)",
    matchupLabel: "Trupanion vs Healthy Paws",
    subtitle: "Two longstanding specialists with genuinely different policy mechanics.",
    description:
      "Trupanion vs Healthy Paws: per-condition deductibles and direct vet pay against one simple accident & illness plan. Two specialist insurers compared honestly.",
    intro:
      "Trupanion and Healthy Paws are both pet-insurance specialists with long track records, which makes this a comparison of mechanics rather than credibility. Trupanion's model is structurally distinctive: deductibles apply per condition rather than resetting every year, and participating vets can be paid directly at checkout. Healthy Paws bets on simplicity: one accident & illness plan and a photo-the-bill claims flow. We haven't verified current rates or plan parameters at either insurer, so this comparison sticks to the structural differences and what to verify in both quotes.",
    verdict:
      "Trupanion takes this on mechanics: the per-condition deductible is a meaningful advantage for pets that develop chronic conditions, and direct vet pay - where your vet participates - removes the worst part of pet insurance, fronting a large bill and waiting for reimbursement. Healthy Paws remains the cleaner choice for owners who want one simple plan and don't have a participating vet nearby. Two checks decide it: ask your vet whether they support Trupanion's direct payment, and run both quotes for your pet - then read both sample policies for exclusions and waiting periods.",
    verdictWinnerPoints: [
      "Per-condition deductible - doesn't reset yearly per condition",
      "Direct payment to participating vets at checkout",
      "One of the category's longest track records",
    ],
    verdictLoserPoints: [
      "One straightforward accident & illness plan",
      "Simple photo-the-bill claims flow",
      "Established specialist brand",
    ],
    winnerId: "trupanion",
    categories: [
      {
        name: "Policy Mechanics",
        winner: "provider1",
        explanation:
          "Trupanion's per-condition deductible and direct-pay capability are the most differentiated mechanics between these two. For chronic conditions and for owners near participating hospitals, they change the day-to-day economics of using the policy.",
        supportingPoints: [
          "Per-condition deductible model (Trupanion)",
          "Annual-style plan mechanics (Healthy Paws)",
        ],
      },
      {
        name: "Simplicity",
        winner: "provider2",
        explanation:
          "Healthy Paws is the simpler product: one plan and a minimal claims flow. Trupanion's mechanics reward understanding them - which is a feature for engaged buyers and friction for everyone else.",
        supportingPoints: [
          "One plan, photo-a-bill claims (Healthy Paws)",
          "More distinctive mechanics to understand (Trupanion)",
        ],
      },
      {
        name: "What We Can Verify Today",
        winner: "tie",
        explanation:
          "We haven't verified current rates or plan parameters at either insurer. Ask your vet about Trupanion direct-pay participation, run both per-pet quotes, and read both sample policies - exclusions, waiting periods and age terms - before deciding.",
        supportingPoints: [
          "Check your vet's Trupanion direct-pay participation",
          "Premiums are per-pet quotes at both - get both",
        ],
      },
    ],
    features: [
      { feature: "Category", provider1Value: "Accident & illness pet insurance", provider2Value: "Accident & illness pet insurance", highlight: "both" },
      { feature: "Deductible model", provider1Value: "Per condition", provider2Value: "Plan-standard", highlight: "provider1" },
      { feature: "Paying the vet", provider1Value: "Direct pay at participating vets", provider2Value: "Reimbursement after you pay", highlight: "provider1" },
      { feature: "Plan structure", provider1Value: "Core plan, distinctive mechanics", provider2Value: "One simple plan", highlight: "provider2" },
      { feature: "Routine/wellness option", provider1Value: "Not in the core model", provider2Value: "Not offered", highlight: "none" },
      { feature: "Premiums", provider1Value: "Quoted per pet - verify", provider2Value: "Quoted per pet - verify", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "lemonade-vs-embrace",
    provider1Id: "lemonade",
    provider2Id: "embrace",
    title: "Lemonade vs Embrace: Which Pet Insurance in 2026?",
    matchupLabel: "Lemonade vs Embrace",
    subtitle: "Two flexible, menu-style pet insurers compared honestly.",
    description:
      "Lemonade vs Embrace pet insurance: two customizable accident & illness policies with wellness options - digital experience against policy-feature depth, compared honestly.",
    intro:
      "Lemonade and Embrace sit on the same side of the pet-insurance spectrum: both sell customizable accident & illness coverage with optional routine-care extras, in contrast to one-plan insurers. The difference is emphasis. Lemonade leads with experience - the app-first quote, purchase and claims flow it's known for. Embrace leads with policy features: its Wellness Rewards routine-care plan and a diminishing deductible that drops in claim-free years. We haven't verified current rates or plan parameters at either insurer, so this comparison sticks to structure and what to verify in both quotes.",
    verdict:
      "Embrace edges this on policy-feature depth: the diminishing deductible is a concrete, ongoing reward for claim-free years, and Wellness Rewards is a more established routine-care mechanism than a typical add-on - features that compound over a pet's lifetime. Lemonade counters with the category's best digital experience and remains the pick if a friction-free app flow matters most to you. Because both are menu-style products, the same advice applies doubly: quote the same pet at both, line the options up like-for-like, and read both sample policies - what wellness money actually reimburses, exclusions, and waiting periods - before you buy.",
    verdictWinnerPoints: [
      "Diminishing deductible rewards claim-free years",
      "Established Wellness Rewards routine-care option",
      "Flexible accident & illness terms",
    ],
    verdictLoserPoints: [
      "The category's smoothest digital experience",
      "Customizable coverage with add-ons",
      "App-based claims from an established digital insurer",
    ],
    winnerId: "embrace",
    categories: [
      {
        name: "Policy Features",
        winner: "provider2",
        explanation:
          "Embrace's diminishing deductible and Wellness Rewards are distinctive, durable policy mechanics. Lemonade's add-ons cover similar ground, but the feature depth and longevity of Embrace's versions carry this category.",
        supportingPoints: [
          "Diminishing deductible + Wellness Rewards (Embrace)",
          "Customizable terms and add-ons (Lemonade)",
        ],
      },
      {
        name: "Digital Experience",
        winner: "provider1",
        explanation:
          "Lemonade's app-first flow - quote to claim - is the reference experience in the category. Embrace is a capable digital insurer, but the polish of the end-to-end flow is Lemonade's home turf.",
        supportingPoints: [
          "App-first quote, purchase and claims (Lemonade)",
          "Standard digital flows (Embrace)",
        ],
      },
      {
        name: "What We Can Verify Today",
        winner: "tie",
        explanation:
          "We haven't verified current rates or plan parameters at either insurer, and both products have enough options that two quotes can hide different coverage. Quote the same pet with matched limits and deductibles at both, and read both sample policies before buying.",
        supportingPoints: [
          "Match limits and deductibles when comparing quotes",
          "Read what each wellness option actually reimburses",
        ],
      },
    ],
    features: [
      { feature: "Category", provider1Value: "Accident & illness pet insurance", provider2Value: "Accident & illness pet insurance", highlight: "both" },
      { feature: "Plan structure", provider1Value: "Customizable, with add-ons", provider2Value: "Customizable, with options", highlight: "both" },
      { feature: "Routine/wellness option", provider1Value: "Optional add-ons (varies)", provider2Value: "Wellness Rewards plan", highlight: "provider2" },
      { feature: "Deductible mechanics", provider1Value: "Standard", provider2Value: "Diminishes in claim-free years", highlight: "provider2" },
      { feature: "Claims", provider1Value: "App-first, digital", provider2Value: "Digital claims", highlight: "provider1" },
      { feature: "Premiums", provider1Value: "Quoted per pet - verify", provider2Value: "Quoted per pet - verify", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "trupanion-vs-embrace",
    provider1Id: "trupanion",
    provider2Id: "embrace",
    title: "Trupanion vs Embrace: Pet Insurance Compared (2026)",
    matchupLabel: "Trupanion vs Embrace",
    subtitle: "Per-condition deductibles and direct vet pay vs flexible terms and wellness rewards.",
    description:
      "Trupanion vs Embrace: two established pet insurers with genuinely different mechanics - per-condition deductibles and direct vet pay against diminishing deductibles and a wellness option.",
    intro:
      "Trupanion and Embrace are both established pet insurers, and this is one of the category's more interesting matchups because their mechanics genuinely differ. Trupanion applies its deductible per condition rather than per year and can pay participating vets directly at checkout. Embrace offers adjustable accident & illness terms, an optional non-insurance wellness plan for routine care, and a deductible that shrinks in claim-free years. Premiums at both are quoted per pet from species, breed, age and location, and we haven't verified either insurer's current rates or plan parameters - so this comparison focuses on how the models differ and what to confirm in each sample policy.",
    verdict:
      "Trupanion takes this on the strength of its structural mechanics: a per-condition deductible is a meaningful advantage for any pet that develops a chronic condition - it doesn't reset every year - and direct vet pay, where your hospital participates, removes the front-the-bill problem that defines most pet insurance claims. Embrace is the better fit for owners who want breadth instead: routine-care budgeting through Wellness Rewards, tunable policy terms, and a diminishing deductible that rewards healthy years. Two checks decide it in practice: ask your vet whether they support Trupanion's direct payment, and get both quotes for your actual pet - then read both sample policies for exclusions and waiting periods before buying either.",
    verdictWinnerPoints: [
      "Deductible applies per condition - it doesn't reset annually",
      "Can pay participating vets directly at checkout",
      "One of the category's longest specialist track records",
    ],
    verdictLoserPoints: [
      "Adjustable terms plus an optional wellness plan",
      "Diminishing deductible for claim-free years",
      "Worth quoting side by side on your pet's actual premium",
    ],
    winnerId: "trupanion",
    categories: [
      {
        name: "Policy Mechanics",
        winner: "provider1",
        explanation:
          "Trupanion's two signature features - per-condition deductibles and direct payment to participating vets - are the most differentiated mechanics in mainstream pet insurance. For chronic conditions and big same-day bills, they change the experience structurally, not cosmetically.",
        supportingPoints: [
          "Per-condition deductible, no annual reset (Trupanion)",
          "Direct vet pay at participating hospitals (Trupanion)",
        ],
      },
      {
        name: "Routine Care & Flexibility",
        winner: "provider2",
        explanation:
          "Embrace offers what Trupanion's core model doesn't: an optional wellness plan for routine care, adjustable policy terms to hit a budget, and a diminishing deductible in claim-free years. Owners who want one place for both illness cover and routine-care budgeting are better served here.",
        supportingPoints: [
          "Optional Wellness Rewards routine-care plan (Embrace)",
          "Adjustable terms + diminishing deductible (Embrace)",
        ],
      },
      {
        name: "What We Can Verify Today",
        winner: "tie",
        explanation:
          "We haven't verified current rates or plan parameters at either insurer, and premiums are quoted per pet. Get both quotes for your actual pet, read both sample policies - exclusions, waiting periods, how each handles your pet's age - and confirm your vet's Trupanion participation before weighing the direct-pay advantage.",
        supportingPoints: [
          "Premiums are quoted per pet - get both quotes",
          "Read both sample policies before deciding",
        ],
      },
    ],
    features: [
      { feature: "Coverage type", provider1Value: "Accident & illness", provider2Value: "Accident & illness", highlight: "both" },
      { feature: "Deductible model", provider1Value: "Per condition, no annual reset", provider2Value: "Annual, diminishes in claim-free years", highlight: "provider1" },
      { feature: "Vet payment", provider1Value: "Direct pay at participating vets", provider2Value: "Reimbursement after you pay", highlight: "provider1" },
      { feature: "Routine/wellness option", provider1Value: "Not in the core model", provider2Value: "Optional Wellness Rewards plan", highlight: "provider2" },
      { feature: "Term flexibility", provider1Value: "Simpler, fixed model", provider2Value: "Adjustable limits and terms", highlight: "provider2" },
      { feature: "Premiums", provider1Value: "Quoted per pet - get a quote", provider2Value: "Quoted per pet - get a quote", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "lemonade-vs-trupanion",
    provider1Id: "lemonade",
    provider2Id: "trupanion",
    title: "Lemonade vs Trupanion: Pet Insurance Compared (2026)",
    matchupLabel: "Lemonade vs Trupanion",
    subtitle: "The digital-first insurer vs the specialist with the most differentiated policy mechanics.",
    description:
      "Lemonade vs Trupanion: app-based quoting and claims against per-condition deductibles and direct vet pay. How the two models differ and what to verify before choosing either.",
    intro:
      "Lemonade and Trupanion approach pet insurance from opposite ends. Lemonade is the digital-first generalist: quote, buy and claim in a polished app, with customizable coverage and optional add-ons. Trupanion is the longstanding specialist whose policy mechanics are the most distinctive in the category - deductibles applied per condition rather than per year, and direct payment to participating vets at checkout. Premiums at both are quoted per pet, and we haven't verified either insurer's current rates or plan terms - so this comparison focuses on the structural differences and what to confirm before buying.",
    verdict:
      "For most owners, Lemonade is the more natural starting point: the digital experience is the category's best, coverage is customizable, and optional add-ons let you shape the policy to a budget. But Trupanion wins outright in two specific situations - if your vet participates in its direct-payment system, or if your pet's breed is prone to chronic conditions, where a per-condition deductible that never resets can matter more than any app. So run the two checks: ask your vet about Trupanion direct pay, and get both quotes for your actual pet. If neither Trupanion advantage applies to you, Lemonade's experience and flexibility carry the day; if either does, the specialist mechanics are worth the trade.",
    verdictWinnerPoints: [
      "Best-in-category digital quoting and claims experience",
      "Customizable coverage with optional add-ons",
      "Backed by an established digital insurance company",
    ],
    verdictLoserPoints: [
      "Per-condition deductible - it doesn't reset annually",
      "Direct pay at participating veterinary hospitals",
      "Worth quoting side by side on your pet's actual premium",
    ],
    winnerId: "lemonade",
    categories: [
      {
        name: "Experience & Flexibility",
        winner: "provider1",
        explanation:
          "Lemonade's app-based quote, purchase and claims flow is the reference point for digital insurance, and its adjustable terms and add-ons make it easier to shape a policy to a budget. Trupanion's model is simpler and more fixed.",
        supportingPoints: [
          "Fully digital sign-up and claims (Lemonade)",
          "Customizable limits and add-ons (Lemonade)",
        ],
      },
      {
        name: "Policy Mechanics",
        winner: "provider2",
        explanation:
          "Trupanion's per-condition deductible and direct vet pay are structural advantages no app can replicate: chronic conditions don't re-trigger a deductible each year, and participating hospitals can be paid directly so you never front the bill.",
        supportingPoints: [
          "Per-condition deductible, no annual reset (Trupanion)",
          "Direct vet pay at participating hospitals (Trupanion)",
        ],
      },
      {
        name: "What We Can Verify Today",
        winner: "tie",
        explanation:
          "We haven't verified current rates, terms or state availability at either insurer, and premiums are quoted per pet. Get both quotes for your actual pet, read both sample policies for exclusions and waiting periods, and ask your vet whether they participate in Trupanion's direct payment before weighing that feature.",
        supportingPoints: [
          "Premiums are quoted per pet - get both quotes",
          "Read both sample policies before deciding",
        ],
      },
    ],
    features: [
      { feature: "Coverage type", provider1Value: "Accident & illness + add-ons", provider2Value: "Accident & illness", highlight: "both" },
      { feature: "Sign-up & claims", provider1Value: "Fully digital, app-based", provider2Value: "Standard claims process", highlight: "provider1" },
      { feature: "Deductible model", provider1Value: "Annual, customizable", provider2Value: "Per condition, no annual reset", highlight: "provider2" },
      { feature: "Vet payment", provider1Value: "Reimbursement after you pay", provider2Value: "Direct pay at participating vets", highlight: "provider2" },
      { feature: "Routine/wellness option", provider1Value: "Optional add-ons (varies)", provider2Value: "Not in the core model", highlight: "provider1" },
      { feature: "Premiums", provider1Value: "Quoted per pet - get a quote", provider2Value: "Quoted per pet - get a quote", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "healthy-paws-vs-embrace",
    provider1Id: "healthy-paws",
    provider2Id: "embrace",
    title: "Healthy Paws vs Embrace: Pet Insurance Compared (2026)",
    matchupLabel: "Healthy Paws vs Embrace",
    subtitle: "One simple plan vs a configurable policy with wellness options.",
    description:
      "Healthy Paws vs Embrace: the one-plan specialist against the flexible insurer with wellness rewards and a diminishing deductible. How they differ and what to verify before buying.",
    intro:
      "Healthy Paws and Embrace represent the two shapes pet insurance comes in. Healthy Paws sells one accident & illness plan with a famously simple photo-the-bill claims flow - minimal configuration, minimal fine print to shop through. Embrace sells a configurable policy: adjustable terms, an optional non-insurance wellness plan for routine care, and a deductible that shrinks in claim-free years. Premiums at both are quoted per pet, and we haven't verified either insurer's current rates or plan parameters - so this comparison focuses on which shape fits you and what to confirm in each sample policy.",
    verdict:
      "Healthy Paws wins for the owner who wants pet insurance to do one job well: serious accident & illness cover from a specialist brand, bought without tier-shopping and claimed by photographing the bill. That simplicity is a genuine feature - fewer configuration decisions means fewer ways to underinsure by accident. Embrace earns the pick when you want more from the policy: a routine-care budget through Wellness Rewards, terms you can tune to a premium target, and a deductible that rewards claim-free years. Decide which shape you want first, then get both quotes for your actual pet and read both sample policies - exclusions, waiting periods, and exactly what the wellness plan reimburses - before buying either.",
    verdictWinnerPoints: [
      "One straightforward accident & illness plan",
      "Photo-the-bill claims via the app",
      "Established pet-insurance specialist brand",
    ],
    verdictLoserPoints: [
      "Adjustable terms plus an optional wellness plan",
      "Diminishing deductible for claim-free years",
      "Worth quoting side by side on your pet's actual premium",
    ],
    winnerId: "healthy-paws",
    categories: [
      {
        name: "Simplicity & Claims",
        winner: "provider1",
        explanation:
          "Healthy Paws' one-plan model and photo-the-bill claims flow make it the easiest serious policy in the category to buy and use. There are no tiers to compare and fewer configuration decisions to get wrong.",
        supportingPoints: [
          "One plan - no tier shopping (Healthy Paws)",
          "Photograph the vet bill to claim (Healthy Paws)",
        ],
      },
      {
        name: "Flexibility & Routine Care",
        winner: "provider2",
        explanation:
          "Embrace offers everything the one-plan model deliberately leaves out: adjustable limits and terms to hit a budget, an optional Wellness Rewards plan for routine care, and a diminishing deductible in claim-free years. Owners who want those levers are better served here.",
        supportingPoints: [
          "Optional Wellness Rewards routine-care plan (Embrace)",
          "Adjustable terms + diminishing deductible (Embrace)",
        ],
      },
      {
        name: "What We Can Verify Today",
        winner: "tie",
        explanation:
          "We haven't verified current rates or plan parameters at either insurer, and premiums are quoted per pet. Get both quotes for your actual pet and read both sample policies - exclusions, waiting periods, how each handles your pet's age, and precisely what Embrace's wellness plan reimburses.",
        supportingPoints: [
          "Premiums are quoted per pet - get both quotes",
          "Read both sample policies before deciding",
        ],
      },
    ],
    features: [
      { feature: "Coverage type", provider1Value: "Accident & illness", provider2Value: "Accident & illness", highlight: "both" },
      { feature: "Plan structure", provider1Value: "One plan, minimal configuration", provider2Value: "Adjustable limits and terms", highlight: "none" },
      { feature: "Claims", provider1Value: "Photo-the-bill via app", provider2Value: "Standard claims process", highlight: "provider1" },
      { feature: "Routine/wellness option", provider1Value: "None", provider2Value: "Optional Wellness Rewards plan", highlight: "provider2" },
      { feature: "Deductible feature", provider1Value: "Standard annual deductible", provider2Value: "Diminishes in claim-free years", highlight: "provider2" },
      { feature: "Premiums", provider1Value: "Quoted per pet - get a quote", provider2Value: "Quoted per pet - get a quote", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
];

const faqs: FaqItem[] = [
  {
    question: "What does pet insurance cover?",
    answer:
      "The core product is accident & illness coverage: it reimburses (or at some insurers, pays directly) a share of vet costs for unexpected injuries and illnesses, after a deductible. Routine care - checkups, vaccines, dental cleanings - is generally NOT covered unless you add a wellness plan. Every policy has exclusions and waiting periods, so the sample policy is always worth reading before you buy.",
  },
  {
    question: "What is never covered by pet insurance?",
    answer:
      "Pre-existing conditions - anything that showed signs before coverage started or during a waiting period - are excluded by essentially every pet insurer. This is the single biggest reason to insure a pet young and healthy rather than waiting. Policies also commonly exclude things like breeding costs and cosmetic procedures; the specifics live in each insurer's sample policy.",
  },
  {
    question: "How much does pet insurance cost?",
    answer:
      "Premiums are quoted per pet, based on species, breed, age and where you live - a young mixed-breed cat and a senior purebred dog in a big city get very different numbers. Because of that, we don't publish premium figures we haven't verified; get quotes for your own pet from two or three insurers, with matched deductibles and limits, and compare those.",
  },
  {
    question: "How do deductibles and reimbursement work?",
    answer:
      "With most insurers you pay the vet, submit the bill, and get reimbursed a percentage of covered costs after your deductible. Deductibles are usually annual; Trupanion notably applies them per condition instead. Some insurers can also pay participating vets directly, so you only cover your share at checkout. The percentage, the deductible and any annual limit are the three dials that drive both your premium and your payout.",
  },
  {
    question: "Is pet insurance worth it?",
    answer:
      "It's a hedge against large, unpredictable vet bills - emergency surgery or chronic illness can run into thousands. For many owners, the value is being able to say yes to treatment without a financial crisis. Alternatives like a dedicated savings account work for some households. The honest framing: insurance is worth most when bought early (before conditions become pre-existing) and least when bought reactively.",
  },
  {
    question: "What should I check before buying a pet insurance policy?",
    answer:
      "Five things, all in the insurer's own materials: your pet's actual quote; the sample policy's exclusions; waiting periods; how premiums change as your pet ages; and the claim mechanics (reimbursement vs direct pay, and typical processing). If a wellness add-on tempts you, check exactly what it reimburses against what it costs - wellness plans are budgeting tools, not insurance.",
  },
];

export function petInsuranceSeed(base: SiteConfig): SiteConfig {
  return {
    ...base,
    siteName: "zollopet.com",
    hero: {
      ...base.hero,
      backgroundImageUrl: "",
      imageAlt: "",
      updatedLabel: "Last Updated: August 2026",
      h1: "Best Pet Insurance for Dogs & Cats of 2026",
      h2: "Compare pet insurance plans and how policies actually work",
      description:
        "Compare leading pet insurance brands - how their policies really differ, and exactly what to check in your own quote.",
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
    articles: petInsuranceArticles,
  };
}
