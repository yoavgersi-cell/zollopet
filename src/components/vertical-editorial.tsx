import Link from "next/link";
import { ArrowRight, Swords, BookOpen } from "lucide-react";
import type { SiteConfig } from "@/lib/config";

// ─────────────────────────────────────────────────────────────────────────────
// Editorial content rendered on each vertical home, below the ranking and
// above the FAQ. House rules apply: genuinely useful decision guidance with
// truthful, general claims only - no invented prices, statistics or brand
// specifics we haven't verified. The battle and guide link blocks are built
// from the vertical's live config, so they stay correct as content is added
// in the CMS.
// ─────────────────────────────────────────────────────────────────────────────

interface EditorialSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

const EDITORIAL: Record<string, { title: string; intro: string; sections: EditorialSection[] }> = {
  "fresh-dog-food": {
    title: "How to Choose a Fresh Dog Food Service",
    intro:
      "The fresh dog food brands all make the same big promises - human-grade ingredients, personalized portions, happier dogs. The real differences live in the details. Here's the decision framework we'd use for our own dogs.",
    sections: [
      {
        heading: "Start with the question fresh food actually answers",
        paragraphs: [
          "Fresh food is an upgrade with a specific shape: whole ingredients instead of extrusion, portions calculated to your dog's calorie needs instead of a scoop, and delivery instead of a bag from the store. Those advantages matter most for picky eaters, dogs fighting their weight, and owners who want to know exactly what's in the bowl. They matter least for a healthy dog already thriving on quality kibble - a dog eating a complete-and-balanced diet enthusiastically doesn't need rescuing, and choosing to stay with kibble is a legitimate decision, not a lesser one.",
          "If fresh is right for your situation, the brand decision comes down to three things: format, recipe fit, and the per-day price for your actual dog.",
        ],
      },
      {
        heading: "Format is the most practical difference between brands",
        paragraphs: [
          "The category looks uniform but isn't. Some brands are fresh-only, shipping refrigerated packs that live in your fridge or freezer. Others add alternatives - gently baked lines, or fresh-made dry formats - that can be blended into one plan. That flexibility sounds minor until you price a large dog's fully-fresh plan, plan a road trip with a cooler, or run out of freezer space. Before comparing anything else, decide honestly how much cold storage and serving ritual your household will sustain every single day, and let that filter the field.",
        ],
      },
      {
        heading: "Get real quotes - advertised prices are not your price",
        paragraphs: [
          "Every fresh brand prices per dog: the quote flow asks for age, weight, activity and sensitivities, and the per-day price scales accordingly. A small terrier and a large shepherd can get wildly different numbers from the same brand - which is why we don't print prices we haven't verified, and why no comparison table can hand you your own number.",
          "The single most useful thirty minutes in this decision: run two or three quote flows with the same dog profile, and compare the per-day figures side by side. While you're in each flow, note the trial offer, how easy pausing looks, and the cancellation terms - subscriptions are easy to start everywhere; the good ones are also easy to leave.",
        ],
      },
      {
        heading: "Before you commit, check these four things",
        paragraphs: [],
        bullets: [
          "The recipes actually available for your dog's needs - sensitivities, life stage, and protein preferences narrow every menu.",
          "Complete-and-balanced formulation (AAFCO) - the non-negotiable baseline every reputable brand meets; confirm it anyway.",
          "The transition plan - switch gradually over 7-10 days, and involve your vet if your dog has any health condition.",
          "The math against your current spend - fresh should fit your budget without strain, or a topper/mixed approach may be the smarter entry point.",
        ],
      },
    ],
  },
  "fresh-cat-food": {
    title: "How to Choose a Fresh Cat Food Service",
    intro:
      "Cats are obligate carnivores with strong opinions - which makes choosing a fresh cat food equal parts nutrition science and diplomacy. Here's what actually matters, in order.",
    sections: [
      {
        heading: "What matters in any cat food, fresh or not",
        paragraphs: [
          "Three things carry most of the weight in feline nutrition. First, complete-and-balanced formulation to AAFCO standards - the baseline every reputable food must meet, fresh or conventional. Second, a species-appropriate profile: high animal protein, moderate fat, low carbohydrate, because cats' metabolism is built for meat in a way that goes beyond preference. Third, moisture - cats evolved getting water from prey and many drink too little on dry-only diets, which is why high-moisture feeding is one of the most common recommendations vets make.",
          "Fresh food delivers all three - but so does quality canned food at a lower price. Fresh earns its premium through ingredient sourcing, personalization, and palatability. Be honest with yourself about which of those you're paying for.",
        ],
      },
      {
        heading: "The picky-cat reality should drive your brand choice",
        paragraphs: [
          "The biggest practical risk in this category isn't nutrition - it's rejection. Cats imprint on textures and flavors early, distrust novelty, and will absolutely refuse a nutritionally perfect food. That has two consequences for how you shop. Favor brands with texture variety, because a pate cat and a shreds cat are different customers. And weigh trial terms heavily: a brand that lets you test acceptance cheaply is worth more than a marginally cheaper one that doesn't, because a failed transition with generous trial terms costs you almost nothing.",
          "One rule outranks everything else: never let a transitioning cat simply stop eating. A cat that goes without food for more than a day or two risks hepatic lipidosis, a serious liver condition. If the new food is refused, go back to what works and try again more slowly - and call your vet if refusal persists.",
        ],
      },
      {
        heading: "Cooked fresh vs raw - know which category you're in",
        paragraphs: [
          "This vertical includes gently cooked fresh food and raw-food subscriptions, and they're different decisions. Cooked fresh is the mainstream upgrade path. Raw feeding has committed adherents and real specialist brands, but mainstream veterinary organizations urge caution because raw meat can carry bacteria that pose risks to pets and people in the household. If you're considering raw, treat it as a deliberate choice made with your vet - especially with kittens, seniors, or immunocompromised people at home - not a default.",
        ],
      },
      {
        heading: "Before you subscribe, check these four things",
        paragraphs: [],
        bullets: [
          "The per-day price from the brand's own quote flow - fresh cat food is priced per cat and per plan.",
          "Protein and texture options your specific cat is likely to accept.",
          "Storage and serving logistics - frozen shipping means freezer space and thaw-ahead routines.",
          "Trial, pause and cancellation terms - the cheapest way to find out whether your cat agrees with your research.",
        ],
      },
    ],
  },
  "pet-insurance": {
    title: "How to Choose a Pet Insurance Policy",
    intro:
      "Pet insurance is one product where the marketing pages all sound identical and the sample policies genuinely differ. Here's how to cut through it - what insurance is actually for, the three dials that define every policy, and the checks that separate a good decision from a guess.",
    sections: [
      {
        heading: "Buy it for the catastrophe, not the checkup",
        paragraphs: [
          "The core product - accident and illness coverage - exists for the large, unpredictable vet bill: the emergency surgery, the swallowed sock, the chronic diagnosis that arrives without warning. Its real value is being able to say yes to treatment without a financial crisis. Routine care is a different animal: checkups and vaccines are predictable expenses, and wellness add-ons that cover them are budgeting tools, not insurance - judge them by comparing exactly what they reimburse against what they cost.",
          "Timing decides most of the value. Every mainstream insurer excludes pre-existing conditions - anything that showed signs before coverage started - which makes insuring a young, healthy pet the strongest version of this purchase, and buying reactively after a diagnosis the one strategy that reliably fails.",
        ],
      },
      {
        heading: "The three dials that define every policy",
        paragraphs: [
          "Almost every policy is defined by the deductible (what you pay first), the reimbursement percentage (the share of covered costs the insurer pays after it), and the annual limit (the payout cap, with unlimited options at some insurers). Together they set both your premium and your worst-case exposure - and they make honest comparison possible: two insurers' premiums mean nothing side by side unless all three dials are matched.",
          "Structural differences hide behind the dials too. Most insurers reset the deductible annually; a per-condition deductible model behaves very differently for chronic illness. Most reimburse you after you've paid the vet; a few can pay participating vets directly at checkout - worth a call to your own vet to check before that feature influences your choice.",
        ],
      },
      {
        heading: "Read the sample policy - it's where the truth lives",
        paragraphs: [
          "Before buying any policy, spend fifteen minutes with the insurer's sample policy document rather than its marketing page. You're looking for five things: the exact pre-existing condition definition (signs in the vet record can count, not just diagnoses), waiting periods by category (orthopedic conditions often carry longer ones), what counts as covered (exam fees vary by insurer), bilateral-condition language (a problem on one side of the body can exclude the other), and how premiums behave as your pet ages. None of this is fine print trivia - it's the actual product.",
        ],
      },
      {
        heading: "The comparison routine that actually works",
        paragraphs: [],
        bullets: [
          "Quote your actual pet at two or three insurers - premiums are priced per pet from species, breed, age and ZIP.",
          "Match the deductible, reimbursement percentage and annual limit across all quotes before comparing prices.",
          "Read each sample policy for exclusions, waiting periods and age-related terms.",
          "Note when your waiting periods end - conditions arising during them are typically treated as pre-existing.",
        ],
      },
    ],
  },
  "dog-dna-tests": {
    title: "How to Choose a Dog DNA Test",
    intro:
      "Dog DNA testing has two serious players and a clear decision logic once you know what you're actually buying. Here's how to pick the right test - and how to read the results like the estimates and indicators they are.",
    sections: [
      {
        heading: "Decide what your question is first",
        paragraphs: [
          "A dog DNA test answers two different questions, and the brands weight them differently. If your question is 'what breeds is my dog?', database scale is the asset that matters most - breed results are statistical matches against a reference panel, so the company that has tested the most dogs has the raw material advantage. If your question is 'what should I know about my dog's health?', the depth and scientific grounding of the genetic health panel matters more than the breed pie. Knowing which question you're really paying to answer settles most of the brand decision - and determines whether a breed-only kit or a breed-plus-health tier is the right purchase.",
        ],
      },
      {
        heading: "What the results are - and what they aren't",
        paragraphs: [
          "Breed percentages are estimates, not certificates. They're strongest for well-represented breeds and recent mixes, and fuzziest at the trace level, where small percentages can differ between companies without either being wrong. Health results are risk indicators and carrier statuses: a flagged variant means something to monitor with your vet, not a diagnosis, and a clean panel is not a health guarantee, because most canine health problems aren't purely genetic.",
          "That framing isn't a reason to skip testing - it's the reason the health tier is valuable when used correctly. Surfacing a drug sensitivity or a risk marker years before symptoms is exactly the kind of information that improves vet conversations. The habit that converts a DNA test from trivia into care: bring the health section to your next vet visit instead of interpreting it alone.",
        ],
      },
      {
        heading: "Who benefits most - and who can skip it",
        paragraphs: [
          "Mixed-breed and rescue owners get the most from testing: ancestry that explains behavior, predicted size for a growing adoptee, and health screening where no breeder records exist. Registered purebreds with documented pedigrees have the least to gain - ancestry is known, and responsible breeders already screen for the breed's relevant conditions. And if unactionable risk information would worry you more than help you, a breed-only kit is a perfectly good way to have the fun without the anxiety.",
        ],
      },
      {
        heading: "Buying smart in this category",
        paragraphs: [],
        bullets: [
          "Compare equivalent kit tiers between brands - each company's cheapest and fullest kits are different products.",
          "Both leading brands run frequent promotions; for a one-time purchase, waiting for one rarely costs anything.",
          "Verify current panel contents and prices on the product page - kits change faster than reviews do.",
          "Plan to share health findings with your vet - that's where the test's practical value gets realized.",
        ],
      },
    ],
  },
};

export function VerticalEditorial({
  vertical,
  config,
  linkPrefix,
}: {
  vertical: string;
  config: SiteConfig;
  linkPrefix: string;
}) {
  const content = EDITORIAL[vertical];
  if (!content) return null;

  // Head-to-head links, resolved from the vertical's live config.
  const battles = (config.battles ?? [])
    .map((b) => {
      const p1 = config.providers.find((p) => p.id === b.provider1Id);
      const p2 = config.providers.find((p) => p.id === b.provider2Id);
      return p1 && p2 ? { slug: b.slug, label: b.matchupLabel ?? `${p1.name} vs ${p2.name}` } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .slice(0, 4);

  const articles = (config.articles ?? []).slice(0, 4);

  return (
    <section className="mx-auto max-w-[820px] px-4 pb-4 pt-12 sm:pt-16">
      {/* Editorial guide - plain text flowing on the page ground, no card */}
      <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#1F4A33]">
        The ZolloPet Guide
      </p>
      <h2 className="mt-2 text-[28px] font-bold leading-tight tracking-[-0.015em] text-[#22362A] sm:text-[34px]">
        {content.title}
      </h2>
      <p className="mt-4 text-[17px] leading-[1.75] text-[#2F3E34]">{content.intro}</p>

      {content.sections.map((s) => (
        <div key={s.heading} className="mt-10">
          <h3 className="text-[20px] font-bold leading-snug text-[#22362A] sm:text-[23px] [font-family:var(--font-display),Georgia,serif]">
            {s.heading}
          </h3>
          {s.paragraphs.map((p, i) => (
            <p key={i} className="mt-4 text-[16px] leading-[1.85] text-[#2F3E34]">
              {p}
            </p>
          ))}
          {s.bullets && (
            <ul className="mt-4 space-y-2.5">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[15.5px] leading-[1.75] text-[#2F3E34]">
                  <ArrowRight className="mt-1.5 h-3.5 w-3.5 shrink-0 text-[#D99E1B]" strokeWidth={2.5} />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {/* Head-to-head links */}
      {battles.length > 0 && (
        <div className="mt-12">
          <div className="mb-1 flex items-center gap-2.5">
            <Swords className="h-[19px] w-[19px] text-[#1F4A33]" strokeWidth={2} />
            <h2 className="text-[22px] font-bold text-[#22362A]">Compare brands head-to-head</h2>
          </div>
          <p className="mb-4 text-[14.5px] text-[#2F3E34]/80">
            The direct matchups readers use to decide - honest verdicts with the runner-up&rsquo;s strengths named.
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {battles.map((b) => (
              <Link
                key={b.slug}
                href={`${linkPrefix}/${b.slug}`}
                className="group flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-[14px] font-semibold text-[#1F4A33] transition-colors hover:border-[#1F4A33]/30 hover:bg-[#1F4A33]/[0.03]"
              >
                {b.label}
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#1F4A33]" strokeWidth={2.2} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Guides */}
      {articles.length > 0 && (
        <div className="mt-10">
          <div className="mb-1 flex items-center gap-2.5">
            <BookOpen className="h-[19px] w-[19px] text-[#1F4A33]" strokeWidth={2} />
            <h2 className="text-[22px] font-bold text-[#22362A]">Keep reading</h2>
          </div>
          <p className="mb-4 text-[14.5px] text-[#2F3E34]/80">
            In-depth guides from our editorial team - the questions behind the comparison.
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`${linkPrefix}/articles/${a.slug}`}
                className="group rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition-colors hover:border-[#1F4A33]/30 hover:bg-[#1F4A33]/[0.03]"
              >
                <span className="block text-[14px] font-semibold leading-snug text-[#22362A] group-hover:text-[#1F4A33]">
                  {a.title}
                </span>
                <span className="mt-1 block text-[12px] text-gray-400">
                  {a.category}
                  {a.readTime ? ` · ${a.readTime}` : ""}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
