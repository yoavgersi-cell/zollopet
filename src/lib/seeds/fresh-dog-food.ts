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
    // Verified against The Farmer's Dog's public Trustpilot profile,
    // September 2026 (claimed profile since March 2021). Quotes below are
    // real, unprompted Trustpilot reviews reproduced with rating and date.
    trustpilotRating: "3.9",
    trustpilotReviewCount: "1,699",
    trustpilotReviews: [
      {
        title: "Loki is loving Farmers Dog",
        text: "He has never gone after any dog food before but with Farmers Dog, he gets excited and can't wait for the next bite or bag!! We don't have to coax him to eat anymore and we've noticed an improvement in his physical condition. Sometimes I think he wants more than one bag per day.. that is how much he loves it.",
        name: "Ellen Teckman",
        location: "US",
        rating: 5,
        date: "Aug 28, 2026",
      },
      {
        title: "Great food - delivery needs work",
        text: "Farmers Dog is great food and my dog loves it. Their customer service exceeds almost any you will find. You can actually get hold of a real person. But their delivery is HORRIBLE. Twice they have delivered after dark... I have asked for a 7 pm latest delivery and they say they cannot do it.",
        name: "Karen Heald",
        location: "US",
        rating: 3,
        date: "Aug 27, 2026",
      },
      {
        title: "Exceptional Customer Service",
        text: "Not only is the food is great quality for my dogs, they have the BEST customer service team of any company I have ever spoken to. 10/10 would recommend. Thank you farmer's dog for being exceptional.",
        name: "Madi",
        location: "US",
        rating: 5,
        date: "Aug 26, 2026",
      },
      {
        title: "Awesome in more ways than one!",
        text: "I have been feeding my Gold Retriever Farmer's Dog for many years. Ansel is a finicky eater, he took to Farmer's Dog food right away. The condition of his coat changed within the first month. He lived a long happy life, at 14 he was still running, playing, and able to jump up into our truck. I also want to praise their outstanding customer service.",
        name: "Treas",
        location: "US",
        rating: 5,
        date: "Aug 7, 2026",
      },
      {
        title: "Great customer service",
        text: "Great customer service. The only draw back I could see was the pricing! It's a bit pricey. My dog seemed to like it. Thought I could afford it, but it ended up being almost the price of a low priced car payment. lol",
        name: "Alicia Escalante",
        location: "US",
        rating: 4,
        date: "Jun 15, 2026",
      },
    ],
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
    // Verified against Ollie's public Trustpilot profile, September 2026
    // (claimed profile since January 2026). Quotes below are real,
    // unprompted Trustpilot reviews reproduced with rating and date.
    trustpilotRating: "4.6",
    trustpilotReviewCount: "11,133",
    trustpilotReviews: [
      {
        title: "Amazing customer service",
        text: "It's nice to call with an issue and have someone take the time to figure it out and correct the situation.",
        name: "Lois",
        location: "US",
        rating: 5,
        date: "Sep 1, 2026",
      },
      {
        title: "Temperatures",
        text: "My order even with temperatures reaching 100 degrees came frozen and intact. It is a little inconvenient to handle frozen goods to get in freezer before defrosting, but my dog loves Ollie.",
        name: "Shirley Ray",
        location: "US",
        rating: 5,
        date: "Aug 28, 2026",
      },
      {
        title: "I love the complete care this company gives",
        text: "It doesn't just provide a dog food that my dog loves, but analyzes the digestive, skin coat, mouth and weigh parameters to keep him healthy. This is an above and beyond benefit provided free!",
        name: "Daniel Alvarez III",
        location: "US",
        rating: 5,
        date: "Aug 27, 2026",
      },
    ],
  },
  {
    id: "nom-nom",
    name: "Nom Nom",
    tagline: "Fresh, pre-portioned recipes formulated by veterinary nutritionists",
    logo: "/logos/nomnomlogo.png",
    smallLogo: "/logos/nom-nom-icon.svg",
    highlights: [
      "Fresh food in pre-portioned packs",
      "Recipes formulated by board-certified veterinary nutritionists",
      "Subscription delivery to your door",
    ],
    affiliateUrl: "https://www.nomnomnow.com",
    ctaText: "Visit Site",
    // Verified against Nom Nom's public Trustpilot profile, September 2026
    // (claimed profile since August 2017). Quotes below are real, verified
    // Trustpilot reviews reproduced with rating and date.
    trustpilotRating: "4.4",
    trustpilotReviewCount: "1,860",
    trustpilotReviews: [
      {
        title: "Dogs are loving it",
        text: "Dogs are loving it! And the food actually looks like human food and not just a paste like some other brands.",
        name: "DL",
        location: "US",
        rating: 5,
        date: "Jul 24, 2026",
      },
      {
        title: "The customer service and caring follow-up",
        text: "The customer service and caring follow-up from this well trained staff is worth the spend.",
        name: "Marie Maher",
        location: "US",
        rating: 5,
        date: "Jul 23, 2026",
      },
      {
        title: "Great food and experience",
        text: "Lots of good information, ordering was easy and our girls got their food in record time.",
        name: "Micki Baker",
        location: "US",
        rating: 5,
        date: "Jul 16, 2026",
      },
    ],
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
    // Verified against Spot & Tango's public Trustpilot profile, September
    // 2026 (claimed profile since July 2022). Quotes below are real,
    // unprompted Trustpilot reviews reproduced with rating and date.
    trustpilotRating: "4.6",
    trustpilotReviewCount: "2,723",
    trustpilotReviews: [
      {
        title: "My dog loves this food",
        text: "He's a 14 year-old toothless Biewer terrier. Tons of stomach problems, lots of vomiting. He's a very picky eater as well. We switched him over to the UnKibble and he can't get enough of it. He absolutely loves it. We've had no stomach issues. Eats it every time within seconds. Bravo!",
        name: "Terri Kavanagh",
        location: "CA",
        rating: 5,
        date: "Sep 1, 2026",
      },
      {
        title: "A Life Changing Diet for our Cocker Spaniel",
        text: "Our cocker spaniel, Shiloh, has had issues for ~8 years with allergies and drippy poops. It was not until we put him on a Spot & Tango diet several months ago did he get relief. Now he no longer kicks his ears/licks his paws for hours each day AND now has firm poops. He is more energetic and GOBBLES his breakfast and dinner.",
        name: "Mary Roush",
        location: "PA",
        rating: 5,
        date: "Aug 29, 2026",
      },
      {
        title: "First few days!!!",
        text: "So far, just 5 days in, my little dog Abby is loving this new food!!! She eats it way before she touches the old thats left in her dish!! The customer service is top notch so far also!!!",
        name: "Elizabeth Maddox",
        location: "US",
        rating: 5,
        date: "Aug 31, 2026",
      },
      {
        title: "good product. Too many emails",
        text: "My dog is a picky eater and for now he likes this food. Very happy with everything but maybe way too many emails from spot and tango. I think everyone gets too many and anything around 5 per week is a major hassle. They seem like good people and a good product.",
        name: "Rob Whitfield",
        location: "CA",
        rating: 4,
        date: "Aug 31, 2026",
      },
    ],
  },
  {
    id: "the-pets-table",
    name: "The Pets Table",
    tagline: "HelloFresh's fresh & air-dried dog food, planned to your dog",
    logo: "/logos/thepetstablelogo.png",
    smallLogo: "/logos/thepetstablelogo.png",
    highlights: [
      "Fresh and air-dried plans, including mixed options",
      "Developed with veterinarians, AAFCO-formulated",
      "Backed by HelloFresh's meal-delivery infrastructure",
    ],
    affiliateUrl: "https://thepetstable.com",
    ctaText: "Visit Site",
  },
  {
    id: "we-feed-raw",
    name: "We Feed Raw",
    tagline: "Raw meal plans, portioned to your dog and delivered frozen",
    logo: "/logos/wefeedrawlogo.png",
    smallLogo: "/logos/wefeedrawlogo.png",
    highlights: [
      "One tailored raw meal plan, not a shelf of products",
      "Full or partial plans - mix raw with your current food",
      "Delivered frozen on a recurring subscription",
    ],
    affiliateUrl: "https://wefeedraw.com",
    ctaText: "Visit Site",
  },
  {
    id: "maxbone",
    name: "maxbone",
    tagline: "Premium dog lifestyle brand with a freeze-dried raw food line",
    logo: "/logos/maxbonelogo.webp",
    smallLogo: "/logos/maxbonelogo.webp",
    highlights: [
      "Freeze-dried raw recipes developed with veterinary input",
      "Shelf-stable format - no fridge or freezer required",
      "Design-led brand spanning food, accessories and essentials",
    ],
    affiliateUrl: "https://maxbone.com",
    ctaText: "Visit Site",
  },
  {
    id: "redbarn",
    name: "Redbarn",
    tagline: "Family-founded pet food maker - rolled, air-dried and dry lines",
    logo: "/logos/radbarnlogo.png",
    smallLogo: "/logos/radbarnlogo.png",
    highlights: [
      "Rolled fresh-style food alongside air-dried and dry lines",
      "Recipes formulated to AAFCO nutrient profiles",
      "Sold through pet retailers - no subscription required",
    ],
    affiliateUrl: "https://redbarn.com",
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
      "The Farmer's Dog is the most widely recognized name in fresh dog food. The model is the category's blueprint: you build a profile for your dog (age, breed, weight, activity, sensitivities), and the company ships fresh, human-grade food in pre-portioned packs matched to your dog's calorie needs, on a recurring delivery schedule. Recipes are developed with veterinary nutritionists and formulated to complete-and-balanced standards. We haven't yet verified the brand's current recipe lineup or per-day pricing for specific dog profiles - but we have checked its public Trustpilot record (September 2026): a 3.9/5 TrustScore across 1,699 reviews, where recent reviewers consistently praise palatability and customer service, and the sharpest complaints target delivery logistics and overall price.",
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
      "Customer service earns consistent praise in recent Trustpilot reviews",
    ],
    cons: [
      "We haven't verified current recipes, pricing or plan terms",
      "Fresh food needs fridge/freezer space and costs more than typical kibble",
      "Trustpilot average is a mixed 3.9/5 - delivery timing and price are the recurring complaints",
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
      "Ollie is one of the leading fresh dog food subscriptions, and its clearest differentiator is format range: alongside fresh recipes it offers a gently baked line, so owners can feed fresh, baked, or a mix. Like the rest of the category, everything starts from your dog's profile - portions and recommendations are matched to age, weight and activity, and food arrives on a recurring delivery. Ingredients are human-grade. We haven't yet verified Ollie's current recipe lineup or pricing for specific dog profiles - but we have checked its public Trustpilot record (September 2026): an excellent 4.6/5 TrustScore across 11,133 reviews, with recent reviewers praising customer service, palatability and deliveries arriving frozen even in summer heat.",
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
      "Excellent Trustpilot record - 4.6/5 across 11,133 reviews",
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
      "Nom Nom is one of the established names in fresh dog food, with a nutrition-science-forward positioning: its recipes are formulated by board-certified veterinary nutritionists, and food ships fresh in pre-portioned packs sized to your dog's calorie needs. The buying model matches the category standard - build your dog's profile, get a plan, receive recurring deliveries. We haven't yet verified Nom Nom's current recipe lineup or pricing for specific dog profiles - but we have checked its public Trustpilot record (September 2026): a strong 4.4/5 TrustScore across 1,860 reviews on a profile the brand has maintained since 2017, with recent reviewers praising palatability, food quality and attentive customer service.",
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
      "Strong Trustpilot record - 4.4/5 across 1,860 reviews",
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
      "Spot & Tango runs the standard fresh-dog-food playbook - personalized plans, human-grade ingredients, subscription delivery - with one distinctive addition: UnKibble, a dry-format food made with a fresh-style ingredient approach. That gives owners a middle path between fresh packs and conventional kibble: easier storage and serving than fresh, with a cleaner ingredient pitch than typical dry food. We haven't yet verified Spot & Tango's current recipe lineup or pricing for specific dog profiles - but we have checked its public Trustpilot record (September 2026): an excellent 4.6/5 TrustScore across 2,723 reviews, where UnKibble draws standout praise from owners of picky and sensitive-stomach dogs.",
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
      "Excellent Trustpilot record - 4.6/5 across 2,723 reviews",
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
  {
    slug: "the-pets-table",
    providerId: "the-pets-table",
    shortSummary:
      "HelloFresh's dog food brand: fresh and air-dried plans developed with veterinarians, delivered on a subscription planned to your dog.",
    reviewIntro:
      "The Pets Table is HelloFresh's entry into dog food, launched in 2023, and it brings the parent company's meal-delivery DNA to the category: you build your dog's profile, and the service plans a subscription around its calorie needs - fresh recipes (shipped flash-frozen), air-dried recipes, or mixed plans that combine the two formats. Recipes are developed with veterinarians and formulated to AAFCO nutrient profiles. The format flexibility is the structural differentiator: mixed and partial plans make it one of the easier services to run alongside existing food rather than as a full replacement. We haven't yet verified the brand's current recipe lineup or pricing against its own site, and we haven't completed our review of its public customer record - this page will carry that detail once checked.",
    keyFeatures: [
      "Fresh (flash-frozen) and air-dried recipe formats",
      "Mixed and partial plans that combine formats",
      "Developed with veterinarians, AAFCO-formulated",
      "Subscription planned from your dog's profile",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Fresh recipes (current lineup to be verified on the brand's site)",
      "Air-dried recipes (current lineup to be verified on the brand's site)",
      "Mixed / partial plans (current options to be verified on the brand's site)",
    ],
    pros: [
      "Format range - fresh, air-dried, or a mix in one plan",
      "HelloFresh's delivery infrastructure behind the logistics",
      "Partial plans lower the cost of entry into fresh feeding",
    ],
    cons: [
      "We haven't verified current recipes, pricing or plan terms",
      "A young brand next to the category's dedicated specialists",
      "Fresh recipes need freezer space like every flash-frozen service",
    ],
    bestFor: [
      "Owners who want fresh and air-dried formats inside one subscription",
      "Households easing into fresh feeding with a mixed or partial plan",
    ],
    finalVerdict:
      "The Pets Table's pitch is flexibility on familiar rails: HelloFresh logistics, vet-developed recipes, and plans that mix fresh with air-dried or cover only part of the bowl - a genuinely lower-commitment way into fresh feeding than all-or-nothing subscriptions. The honest caveats: it is a young brand, and we haven't yet verified its current lineup, pricing or customer record ourselves. Run the quote flow for your dog's actual price, and as with any switch, transition gradually. We'll update this review with verified detail as we complete our checks.",
    trustBadges: ["Fresh & air-dried formats", "Vet-developed", "Mixed plans"],
    updatedAt: "2026-11-06",
  },
  {
    slug: "we-feed-raw",
    providerId: "we-feed-raw",
    shortSummary:
      "Raw feeding on subscription rails: one meal plan tailored to your dog, delivered frozen, with partial plans that mix raw into your current routine.",
    reviewIntro:
      "We Feed Raw is the raw-feeding specialist of this page: instead of a catalog of products, you complete a profile for your dog and the service builds a single tailored meal plan - raw, pre-portioned, shipped frozen on a recurring delivery. Plans can cover the full bowl or part of it (full, three-quarter and half options), which makes structured raw feeding practical without abandoning your current food entirely, and a freeze-dried line extends the format range. The honest framing matters more here than anywhere else on this page: raw feeding is its own nutritional philosophy with genuine trade-offs - handling hygiene, storage logistics, and a scientific debate owners should walk through with their vet before switching. We haven't yet verified the brand's current plan options or pricing against its own site, and we haven't completed our review of its public customer record - this page will carry that detail once checked.",
    keyFeatures: [
      "One tailored raw meal plan built from your dog's profile",
      "Full, 75% and 50% plan sizes - mix raw with existing food",
      "Delivered frozen; thaw before serving",
      "Freeze-dried line alongside the frozen plans",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Frozen raw meal plans (current options to be verified on the brand's site)",
      "Freeze-dried raw (current lineup to be verified on the brand's site)",
    ],
    pros: [
      "The structured, pre-portioned route into raw feeding",
      "Partial plans make raw practical without a full switch",
      "Subscription logistics replace DIY raw preparation entirely",
    ],
    cons: [
      "We haven't verified current plans, pricing or terms",
      "Raw feeding itself is a debated choice - talk to your vet first",
      "Frozen delivery demands real freezer space and thaw-ahead discipline",
    ],
    bestFor: [
      "Owners already committed to raw who want it portioned and delivered",
      "Raw-curious households starting with a half or three-quarter plan",
    ],
    finalVerdict:
      "We Feed Raw does for raw feeding what the fresh brands did for home cooking: it takes a demanding feeding philosophy and puts it on pre-portioned subscription rails, with partial plans as a pragmatic on-ramp. Whether raw itself is right for your dog is a genuine veterinary conversation - raw feeding has committed advocates and legitimate scientific skeptics, and this site takes no side your vet should be taking for you. We haven't yet verified current plans, pricing or the brand's customer record; check its site for today's detail, and loop in your vet before any switch. We'll update this review as our checks complete.",
    trustBadges: ["Tailored raw plans", "Partial-plan options", "Frozen delivery"],
    updatedAt: "2026-11-06",
  },
  {
    slug: "maxbone",
    providerId: "maxbone",
    shortSummary:
      "A design-led dog lifestyle brand whose food play is freeze-dried raw - shelf-stable, subscription-friendly, and different from the fridge-and-freezer fresh model.",
    reviewIntro:
      "maxbone is best known as a premium dog lifestyle brand - accessories, apparel and essentials with a strong design identity - and its food line takes a different route from the refrigerated brands on this page: freeze-dried raw recipes, developed with veterinary input, sold direct from the brand's site. The format matters: freeze-drying preserves raw ingredients in a shelf-stable form, so there's no cold chain to manage - a genuine practical difference from fresh-cooked delivery. We haven't yet verified the brand's current recipe lineup or pricing against its site, and we haven't completed our review of its public customer record - this page will carry that detail once checked. Until then, treat this as what it honestly is: a boutique entrant whose food line is young and small next to the category's dedicated fresh-food specialists.",
    keyFeatures: [
      "Freeze-dried raw recipes developed with veterinary input",
      "Shelf-stable - no fridge or freezer space required",
      "Direct-to-consumer, subscription-friendly ordering",
      "Part of a broader design-led dog brand",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Freeze-dried raw recipes (current lineup to be verified on the brand's site)",
    ],
    pros: [
      "Shelf-stable format sidesteps the freezer-space problem entirely",
      "Veterinary input behind the recipes",
      "A clean option for owners already shopping the brand's accessories",
    ],
    cons: [
      "We haven't verified current recipes, pricing or plan terms",
      "A small food line from a brand whose core business is accessories, not nutrition",
      "Freeze-dried raw is still raw - walk the trade-offs through with your vet",
    ],
    bestFor: [
      "Owners who want a raw-style format without cold-chain logistics",
      "Fans of the brand's lifestyle range who want food from the same shelf",
    ],
    finalVerdict:
      "maxbone's food line is an interesting boutique alternative rather than a head-on competitor to the fresh-cooked subscriptions this category is built around: freeze-dried raw, shelf-stable, design-led. That format genuinely solves the freezer problem, but it belongs to the raw family - a conversation to have with your vet before switching. We haven't verified the current lineup, pricing or customer record yet, so check the brand's site for today's detail. For dedicated fresh-cooked feeding at scale, the established specialists above remain the default comparison.",
    trustBadges: ["Freeze-dried raw", "Vet-developed recipes", "Shelf-stable"],
    updatedAt: "2026-11-06",
  },
  {
    slug: "redbarn",
    providerId: "redbarn",
    shortSummary:
      "A family-founded pet food maker selling rolled fresh-style, air-dried and dry food through retail - the no-subscription route into less-processed feeding.",
    reviewIntro:
      "Redbarn Pet Products is a different animal from the delivery subscriptions on this page: a family-founded pet food company whose dog lines - rolled food, air-dried recipes and dry food, alongside a large treats and chews range - are sold through pet retailers and online stores rather than a quiz-and-subscribe flow. Its rolled food sits closest to the fresh idea: a refrigerated-style, meat-forward format you can buy off a shelf in the amount you choose, with recipes formulated to AAFCO nutrient profiles. We haven't yet verified the brand's current product lineup or retail pricing, and we haven't completed our review of its public customer record - this page will carry that detail once checked. The structural point stands regardless: Redbarn is the retail path - no subscription, no delivery window, no commitment.",
    keyFeatures: [
      "Rolled fresh-style food you can buy at retail",
      "Air-dried and dry recipe lines",
      "Recipes formulated to AAFCO nutrient profiles",
      "No subscription - buy where you already shop",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Rolled food (current lineup to be verified on the brand's site)",
      "Air-dried recipes (current lineup to be verified on the brand's site)",
      "Dry food (current lineup to be verified on the brand's site)",
    ],
    pros: [
      "Zero commitment - buy today, locally, in the amount you want",
      "Rolled format is a practical, affordable step toward less-processed feeding",
      "Established, family-founded company with a wide retail footprint",
    ],
    cons: [
      "We haven't verified the current lineup or retail pricing",
      "No personalization - portioning and recipe choice are entirely on you",
      "Not a delivery service - if doorstep subscription is the point, look above",
    ],
    bestFor: [
      "Owners who want fresher-style feeding without any subscription",
      "Households testing the fresh idea before committing to a delivery plan",
    ],
    finalVerdict:
      "Redbarn earns its place on this page as the retail alternative: if the personalized-subscription model is the part of fresh feeding you don't want, its rolled and air-dried lines are the practical way to feed less-processed food on your own terms. The honest trade-off is the mirror image of the subscriptions' - total flexibility, zero personalization, portion discipline entirely on you. We haven't verified the current lineup, pricing or customer record yet, so check the brand's site and your retailer's shelf. For hands-off, portioned-to-your-dog feeding, the delivery brands above remain the comparison to run.",
    trustBadges: ["Retail availability", "AAFCO-formulated", "No subscription"],
    updatedAt: "2026-11-06",
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
      "The Farmer's Dog vs Ollie: two leading fresh dog food subscriptions compared - formats, verified Trustpilot records, and what to check before buying.",
    intro:
      "The Farmer's Dog and Ollie are the two names most owners meet first when they look into fresh dog food, and they share the category's core promise: human-grade food, portioned to your dog's profile, delivered on a subscription. The honest starting point is that we haven't yet verified either brand's current per-day pricing for specific dog profiles - fresh food is quoted per dog, so no comparison table can hand you your own number. What we can compare is how the two models differ, and exactly what to check in each quote flow before you commit.",
    verdict:
      "With verified data in hand, Ollie takes this matchup. Its public Trustpilot record is excellent - 4.6/5 across 11,133 reviews, against The Farmer's Dog's 3.9/5 across 1,699, where delivery logistics draw the sharpest complaints - and its menu is wider, with fresh and gently baked lines blendable in one plan. The Farmer's Dog remains the category's most established name, and owners who want the straight fresh experience from the biggest brand still have a strong option in it. But on what we can actually verify today, Ollie holds the better record. As always, run both quote flows for your dog and compare the actual per-day numbers before committing.",
    verdictWinnerPoints: [
      "Excellent Trustpilot record - 4.6/5 across 11,133 reviews",
      "Fresh plus gently baked formats in one subscription",
      "Human-grade ingredients, personalized portions",
    ],
    verdictLoserPoints: [
      "The category's most established fresh dog food brand",
      "Pre-portioned packs matched to your dog's profile",
      "Trustpilot 3.9/5 - delivery logistics draw complaints",
    ],
    winnerId: "ollie",
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
        winner: "provider2",
        explanation:
          "Pricing is still unverified at both brands - each quotes per dog, so run both flows with the same profile. What we HAVE verified (September 2026) is the public Trustpilot record, and it favors Ollie: 4.6/5 across 11,133 reviews versus The Farmer's Dog's 3.9/5 across 1,699, where delivery logistics draw the sharpest complaints.",
        supportingPoints: [
          "Trustpilot: Ollie 4.6/5 (11,133 reviews) vs 3.9/5 (1,699)",
          "Pricing quoted per dog at both - get both quotes",
        ],
      },
    ],
    features: [
      { feature: "Category", provider1Value: "Fresh dog food subscription", provider2Value: "Fresh dog food subscription", highlight: "both" },
      { feature: "Trustpilot (Sept 2026)", provider1Value: "3.9/5 - 1,699 reviews", provider2Value: "4.6/5 - 11,133 reviews", highlight: "provider2" },
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
      "With verified data in hand, Nom Nom edges this one. Its public Trustpilot record is the stronger of the two - 4.4/5 across 1,860 reviews on a profile held since 2017, against The Farmer's Dog's 3.9/5 across 1,699 - and its recipes are formulated by board-certified veterinary nutritionists, the strongest formulation credential in the matchup. The Farmer's Dog still brings the category's biggest brand footprint, which counts for something in an ongoing subscription. But both ship the same style of fresh, pre-portioned product, and with the review record and the nutrition credential both pointing Nom Nom's way, it takes the win. Run both quote flows with the same dog profile and let the per-day numbers confirm the call.",
    verdictWinnerPoints: [
      "Recipes formulated by board-certified veterinary nutritionists",
      "Stronger Trustpilot record - 4.4/5 across 1,860 reviews",
      "Fresh, pre-portioned packs matched to your dog",
    ],
    verdictLoserPoints: [
      "The category's most established fresh dog food brand",
      "Pre-portioned packs matched to your dog's profile",
      "Trustpilot 3.9/5 - delivery logistics draw complaints",
    ],
    winnerId: "nom-nom",
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
        winner: "provider2",
        explanation:
          "Pricing is still unverified at both brands - each quotes per dog, so run both flows with the same profile. What we HAVE verified (September 2026) is the public Trustpilot record, and it favors Nom Nom: 4.4/5 across 1,860 reviews on a profile held since 2017, versus The Farmer's Dog's 3.9/5 across 1,699, where delivery logistics draw the sharpest complaints.",
        supportingPoints: [
          "Trustpilot: Nom Nom 4.4/5 (1,860 reviews) vs 3.9/5 (1,699)",
          "Pricing quoted per dog at both - get both quotes",
        ],
      },
    ],
    features: [
      { feature: "Category", provider1Value: "Fresh dog food subscription", provider2Value: "Fresh dog food subscription", highlight: "both" },
      { feature: "Trustpilot (Sept 2026)", provider1Value: "3.9/5 - 1,699 reviews", provider2Value: "4.4/5 - 1,860 reviews", highlight: "provider2" },
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
      "Ollie vs Nom Nom: fresh + baked format range against vet-nutritionist-led recipes - verified Trustpilot records and what to verify before buying.",
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
        winner: "provider1",
        explanation:
          "Pricing is still unverified at both brands - each quotes per dog, so run both flows with the same profile. What we HAVE verified (September 2026) is the public Trustpilot record, and both look good: Ollie leads with 4.6/5 across 11,133 reviews, while Nom Nom holds a strong 4.4/5 across 1,860 on a profile maintained since 2017.",
        supportingPoints: [
          "Trustpilot: Ollie 4.6/5 (11,133) vs Nom Nom 4.4/5 (1,860)",
          "Pricing quoted per dog at both - get both quotes",
        ],
      },
    ],
    features: [
      { feature: "Category", provider1Value: "Fresh dog food subscription", provider2Value: "Fresh dog food subscription", highlight: "both" },
      { feature: "Trustpilot (Sept 2026)", provider1Value: "4.6/5 - 11,133 reviews", provider2Value: "4.4/5 - 1,860 reviews", highlight: "provider1" },
      { feature: "Formats", provider1Value: "Fresh + gently baked", provider2Value: "Fresh", highlight: "provider1" },
      { feature: "Formulation", provider1Value: "Complete-and-balanced recipes", provider2Value: "Board-certified veterinary nutritionists", highlight: "provider2" },
      { feature: "Portioning", provider1Value: "Personalized to your dog", provider2Value: "Pre-portioned to your dog", highlight: "both" },
      { feature: "Pricing", provider1Value: "Quoted per dog - verify on site", provider2Value: "Quoted per dog - verify on site", highlight: "none" },
      { feature: "Trial & cancellation", provider1Value: "Verify on site", provider2Value: "Verify on site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "farmers-dog-vs-spot-tango",
    provider1Id: "farmers-dog",
    provider2Id: "spot-tango",
    title: "The Farmer's Dog vs Spot & Tango: Fresh Dog Food Compared (2026)",
    matchupLabel: "The Farmer's Dog vs Spot & Tango",
    subtitle: "The category's reference brand vs the fresh brand with a dry-format twist.",
    description:
      "The Farmer's Dog vs Spot & Tango: the category's biggest name against the brand behind UnKibble - verified records and what to check before buying.",
    intro:
      "The Farmer's Dog and Spot & Tango sell the same core promise - personalized, human-grade dog food on a subscription - but they answer the format question differently. The Farmer's Dog is fresh-only and proudly so; Spot & Tango offers fresh recipes plus UnKibble, a dry-format food built with a fresh-style ingredient approach. We haven't verified either brand's current per-dog pricing or exact recipe lineup, so this comparison sticks to how the models differ and what to check in each quote flow before you commit.",
    verdict:
      "With verified data in hand, Spot & Tango takes this matchup. Its public Trustpilot record is excellent - 4.6/5 across 2,723 reviews, against The Farmer's Dog's 3.9/5 across 1,699, where delivery logistics draw the sharpest complaints - and it offers the format flexibility of UnKibble, a dry option The Farmer's Dog simply doesn't have. The Farmer's Dog remains the category's most recognized name and a fine pick for the classic fresh-pack experience. But on the review record and on format range, Spot & Tango holds the stronger hand today. Run both quote flows with your dog's real profile and compare the per-day numbers before committing.",
    verdictWinnerPoints: [
      "Excellent Trustpilot record - 4.6/5 across 2,723 reviews",
      "UnKibble: a dry format with a fresh-style ingredient approach",
      "Fresh and dry formats under one subscription",
    ],
    verdictLoserPoints: [
      "The category's most established fresh dog food brand",
      "Pre-portioned packs matched to your dog's profile",
      "Trustpilot 3.9/5 - delivery logistics draw complaints",
    ],
    winnerId: "spot-tango",
    categories: [
      {
        name: "Brand Track Record",
        winner: "provider1",
        explanation:
          "The Farmer's Dog is the brand that made fresh dog food mainstream and remains the category's reference point. Spot & Tango is an established competitor, but its public footprint is smaller.",
        supportingPoints: [
          "Category reference brand (The Farmer's Dog)",
          "Smaller but established competitor (Spot & Tango)",
        ],
      },
      {
        name: "Format Flexibility",
        winner: "provider2",
        explanation:
          "Spot & Tango runs two formats - fresh recipes and UnKibble, its dry-format line - while The Farmer's Dog is fresh-only. For owners short on fridge space, travelling often, or easing off conventional kibble, that dry option is a real practical advantage.",
        supportingPoints: [
          "Fresh + UnKibble dry format (Spot & Tango)",
          "Fresh-only lineup (The Farmer's Dog)",
        ],
      },
      {
        name: "What We Can Verify Today",
        winner: "provider2",
        explanation:
          "Pricing is still unverified at both brands - each quotes per dog, so run both flows with the same profile. What we HAVE verified (September 2026) is the public Trustpilot record, and it favors Spot & Tango: an excellent 4.6/5 across 2,723 reviews versus The Farmer's Dog's 3.9/5 across 1,699, where delivery logistics draw the sharpest complaints.",
        supportingPoints: [
          "Trustpilot: Spot & Tango 4.6/5 (2,723) vs 3.9/5 (1,699)",
          "Pricing quoted per dog at both - get both quotes",
        ],
      },
    ],
    features: [
      { feature: "Category", provider1Value: "Fresh dog food subscription", provider2Value: "Fresh dog food subscription", highlight: "both" },
      { feature: "Trustpilot (Sept 2026)", provider1Value: "3.9/5 - 1,699 reviews", provider2Value: "4.6/5 - 2,723 reviews", highlight: "provider2" },
      { feature: "Ingredients", provider1Value: "Human-grade", provider2Value: "Human-grade", highlight: "both" },
      { feature: "Formats", provider1Value: "Fresh", provider2Value: "Fresh + UnKibble (dry)", highlight: "provider2" },
      { feature: "Portioning", provider1Value: "Pre-portioned to your dog", provider2Value: "Personalized to your dog", highlight: "both" },
      { feature: "Brand footprint", provider1Value: "Category's most established", provider2Value: "Established", highlight: "provider1" },
      { feature: "Pricing", provider1Value: "Quoted per dog - verify on site", provider2Value: "Quoted per dog - verify on site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "ollie-vs-spot-tango",
    provider1Id: "ollie",
    provider2Id: "spot-tango",
    title: "Ollie vs Spot & Tango: Which Fresh Dog Food in 2026?",
    matchupLabel: "Ollie vs Spot & Tango",
    subtitle: "The two multi-format fresh brands - fresh + baked vs fresh + UnKibble.",
    description:
      "Ollie vs Spot & Tango: the two multi-format fresh brands - gently baked vs UnKibble dry - compared on verified records and format fit.",
    intro:
      "Ollie and Spot & Tango are the format-flexible pair of the fresh dog food category: both run the standard personalized, human-grade subscription model, and both offer a second format alongside fresh packs. Ollie's is a gently baked line; Spot & Tango's is UnKibble, a true dry-format food with a fresh-style ingredient approach. We haven't verified current per-dog pricing or exact recipe lineups at either brand, so this comparison sticks to the observable differences and what to check in both quote flows.",
    verdict:
      "Ollie takes this on overall standing: it is one of the fresh category's long-established names, with fresh and baked lines that blend in a single plan. Spot & Tango's counterpunch is real, though - UnKibble is the closer substitute for conventional kibble of the two second formats, stored and served like ordinary dry food, which makes it the easier off-ramp for a household that isn't ready for a fridge full of fresh packs. If you want mostly fresh with some flexibility, Ollie is the safer pick; if the dry format is the main event for you, Spot & Tango is built around exactly that. Quote both with your dog's real profile and compare the per-day numbers before deciding.",
    verdictWinnerPoints: [
      "Long-established fresh dog food brand",
      "Fresh plus gently baked formats, blendable in one plan",
      "Human-grade ingredients, personalized portions",
    ],
    verdictLoserPoints: [
      "UnKibble: a true dry format with fresh-style ingredients",
      "Stored and served like conventional kibble",
      "Worth quoting side by side on your dog's actual price",
    ],
    winnerId: "ollie",
    categories: [
      {
        name: "Brand Track Record",
        winner: "provider1",
        explanation:
          "Ollie is one of the fresh category's long-established names with a larger public footprint; Spot & Tango is established but smaller. For a recurring subscription, the more proven operation earns the edge.",
        supportingPoints: [
          "Long-established fresh brand (Ollie)",
          "Smaller but established competitor (Spot & Tango)",
        ],
      },
      {
        name: "Dry-Format Convenience",
        winner: "provider2",
        explanation:
          "Both brands offer a second format, but they're not equivalent: Spot & Tango's UnKibble is a genuinely dry, scoop-and-serve food, while Ollie's baked line is a gently baked product. For no-fridge storage, travel and kibble-like serving, UnKibble is the more practical dry option.",
        supportingPoints: [
          "UnKibble stores and serves like dry food (Spot & Tango)",
          "Gently baked second format (Ollie)",
        ],
      },
      {
        name: "What We Can Verify Today",
        winner: "tie",
        explanation:
          "Pricing is still unverified at both brands - each quotes per dog, so run both flows with the same profile. What we HAVE verified (September 2026) is the public Trustpilot record, and it is a genuine dead heat: both hold an excellent 4.6/5 - Ollie across 11,133 reviews, Spot & Tango across 2,723.",
        supportingPoints: [
          "Trustpilot: both 4.6/5 (Ollie 11,133 reviews; S&T 2,723)",
          "Pricing quoted per dog at both - get both quotes",
        ],
      },
    ],
    features: [
      { feature: "Category", provider1Value: "Fresh dog food subscription", provider2Value: "Fresh dog food subscription", highlight: "both" },
      { feature: "Trustpilot (Sept 2026)", provider1Value: "4.6/5 - 11,133 reviews", provider2Value: "4.6/5 - 2,723 reviews", highlight: "both" },
      { feature: "Ingredients", provider1Value: "Human-grade", provider2Value: "Human-grade", highlight: "both" },
      { feature: "Formats", provider1Value: "Fresh + gently baked", provider2Value: "Fresh + UnKibble (dry)", highlight: "both" },
      { feature: "Dry-food substitute", provider1Value: "Baked (not a dry food)", provider2Value: "UnKibble - true dry format", highlight: "provider2" },
      { feature: "Brand footprint", provider1Value: "Long-established", provider2Value: "Established", highlight: "provider1" },
      { feature: "Pricing", provider1Value: "Quoted per dog - verify on site", provider2Value: "Quoted per dog - verify on site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "nom-nom-vs-spot-tango",
    provider1Id: "nom-nom",
    provider2Id: "spot-tango",
    title: "Nom Nom vs Spot & Tango: Fresh Dog Food Compared (2026)",
    matchupLabel: "Nom Nom vs Spot & Tango",
    subtitle: "Nutrition-science positioning vs format flexibility - two fresh subscriptions compared.",
    description:
      "Nom Nom vs Spot & Tango: vet-nutritionist-led fresh food against the brand behind UnKibble. How the two differ on formulation and formats, and what to verify before buying.",
    intro:
      "Nom Nom and Spot & Tango both run the standard fresh dog food playbook - personalized plans, human-grade-quality recipes, recurring delivery - and each stakes its identity on something different. Nom Nom leads with nutrition science: recipes formulated by board-certified veterinary nutritionists. Spot & Tango leads with format range: fresh recipes plus UnKibble, its dry-format line. We haven't verified current per-dog pricing or exact recipe lineups at either brand, so this comparison sticks to the observable differences and what to check in both quote flows.",
    verdict:
      "Spot & Tango takes this one on the strength of what we can verify. Its public Trustpilot record leads - an excellent 4.6/5 across 2,723 reviews, against Nom Nom's strong-but-lower 4.4/5 across 1,860 - and it offers the format range of fresh recipes plus UnKibble, which Nom Nom's fresh-only lineup can't match. Nom Nom keeps the stronger formulation credential, with board-certified veterinary nutritionists behind its recipes, and remains the better pick for owners who weight that most heavily. For everyone else, the review record and the flexibility point the same way. Run both quote flows with the same dog profile and compare the per-day price before you commit.",
    verdictWinnerPoints: [
      "Excellent Trustpilot record - 4.6/5 across 2,723 reviews",
      "Fresh plus UnKibble dry format in one brand",
      "Human-grade ingredients, personalized plans",
    ],
    verdictLoserPoints: [
      "Recipes formulated by board-certified veterinary nutritionists",
      "Strong Trustpilot record - 4.4/5 across 1,860 reviews",
      "Fresh, pre-portioned packs matched to your dog",
    ],
    winnerId: "spot-tango",
    categories: [
      {
        name: "Nutrition Credentials",
        winner: "provider1",
        explanation:
          "Nom Nom's recipes are formulated by board-certified veterinary nutritionists, and that credential anchors its brand. Spot & Tango's recipes are built to complete-and-balanced standards, but the formal nutrition-science depth is more central at Nom Nom.",
        supportingPoints: [
          "Board-certified veterinary nutritionist formulation (Nom Nom)",
          "Complete-and-balanced personalized recipes (Spot & Tango)",
        ],
      },
      {
        name: "Format Flexibility",
        winner: "provider2",
        explanation:
          "Spot & Tango offers fresh recipes and UnKibble, a dry-format line; Nom Nom ships fresh only. For owners who want a no-fridge option or a gentler step up from conventional kibble, that range is the most practical difference between the two.",
        supportingPoints: [
          "Fresh + UnKibble dry format (Spot & Tango)",
          "Fresh-only lineup (Nom Nom)",
        ],
      },
      {
        name: "What We Can Verify Today",
        winner: "provider2",
        explanation:
          "Pricing is still unverified at both brands - each quotes per dog, so run both flows with the same profile. What we HAVE verified (September 2026) is the public Trustpilot record, where both look strong but Spot & Tango leads: 4.6/5 across 2,723 reviews versus Nom Nom's 4.4/5 across 1,860.",
        supportingPoints: [
          "Trustpilot: Spot & Tango 4.6/5 (2,723) vs Nom Nom 4.4/5 (1,860)",
          "Pricing quoted per dog at both - get both quotes",
        ],
      },
    ],
    features: [
      { feature: "Category", provider1Value: "Fresh dog food subscription", provider2Value: "Fresh dog food subscription", highlight: "both" },
      { feature: "Trustpilot (Sept 2026)", provider1Value: "4.4/5 - 1,860 reviews", provider2Value: "4.6/5 - 2,723 reviews", highlight: "provider2" },
      { feature: "Formulation", provider1Value: "Board-certified veterinary nutritionists", provider2Value: "Complete-and-balanced recipes", highlight: "provider1" },
      { feature: "Formats", provider1Value: "Fresh", provider2Value: "Fresh + UnKibble (dry)", highlight: "provider2" },
      { feature: "Portioning", provider1Value: "Pre-portioned to your dog", provider2Value: "Personalized to your dog", highlight: "both" },
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
        "Compare the leading fresh dog food services - honest verdicts, and where we haven't verified a brand's pricing, we say so.",
    },
    providers,
    sidebar: {
      ...base.sidebar,
      blockOrder: ["secureBadge", "editorialReviews", "rankingMethodology", "disclosure"],
    },
    ranking: {
      // Ranked by the verified public Trustpilot record, September 2026:
      // Ollie 4.6/11,133 - Spot & Tango 4.6/2,723 - Nom Nom 4.4/1,860 -
      // The Farmer's Dog 3.9/1,699.
      // Ranks 1-4 are the verified-Trustpilot brands (September 2026 records).
      // Ranks 5-8 are newly added and not yet verified - they sit below the
      // verified set on purpose until we check their public records.
      providerOrder: ["ollie", "spot-tango", "nom-nom", "farmers-dog", "the-pets-table", "we-feed-raw", "maxbone", "redbarn"],
      positions: base.ranking.positions,
    },
    reviews,
    battles,
    faqs,
    articles: freshDogFoodArticles,
  };
}
