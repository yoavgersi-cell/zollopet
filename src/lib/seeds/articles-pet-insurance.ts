import type { ArticleData } from "../config";

// Long-tail editorial guides for the pet-insurance vertical. House rules:
// general, truthful guidance only - no invented premiums, statistics, or
// insurer-specific claims we haven't verified. Policy mechanics are described
// generally; readers are always pointed at the insurer's own sample policy.

const PUBLISHED = "2026-09-01";

export const petInsuranceArticles: ArticleData[] = [
  {
    slug: "is-pet-insurance-worth-it",
    title: "Is Pet Insurance Worth It? An Honest Framework for Deciding",
    description:
      "Is pet insurance worth it? An honest framework: what insurance actually protects you from, who benefits most, the self-insurance alternative, and when it's not worth it.",
    category: "Insurance 101",
    readTime: "7 min read",
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    heroColor: "#1F4A33",
    keyTakeaways: [
      "Pet insurance is a hedge against large, unpredictable vet bills - not a way to save money on routine care.",
      "It's worth most when bought young, before anything becomes a pre-existing condition.",
      "A dedicated savings account is a real alternative - if you'd actually fund it and could cover a large emergency early on.",
      "The decision is about your finances and risk tolerance as much as your pet.",
    ],
    sections: [
      {
        heading: "What pet insurance is actually for",
        body:
          "Pet insurance exists for one scenario: the large, unpredictable vet bill - the emergency surgery, the swallowed object, the chronic illness that arrives without warning and costs thousands to treat. It reimburses a share of covered costs after a deductible, so a financial catastrophe becomes a manageable expense. What it is not: a discount program for routine care. Checkups, vaccines and dental cleanings are predictable expenses, and paying an insurer to route predictable money through claims paperwork rarely beats just budgeting for them - which is why wellness add-ons should be judged as budgeting tools, not insurance.",
      },
      {
        heading: "The real value is being able to say yes",
        body:
          "Ask veterinary staff about 'economic euthanasia' and you'll understand what insurance actually buys: the ability to say yes to treatment without a financial crisis. When a treatable emergency carries a four-figure estimate, uninsured owners sometimes face a choice no one wants to make. For many people, removing that scenario is the entire value proposition, and it's a legitimate one even in years when premiums exceed claims - the same way home insurance is 'worth it' in years your house doesn't burn down.",
      },
      {
        heading: "Timing decides most of the value",
        body:
          "Every mainstream pet insurer excludes pre-existing conditions - anything that showed signs before coverage began or during a waiting period. That single rule makes timing the biggest lever in the whole decision: insure a young, healthy animal and everything that develops later is coverable; wait until symptoms appear and that condition is excluded for life at essentially every insurer. Premiums are also lowest for young pets. Buying insurance reactively, after a diagnosis, is the one strategy that reliably doesn't work.",
      },
      {
        heading: "The self-insurance alternative, honestly",
        body:
          "Putting a monthly amount into a dedicated pet savings account is a genuine alternative with real advantages: you keep unspent money, nothing is excluded, and there's no claims process. Its two weaknesses are discipline and timing - most people don't actually fund the account with insurance-premium consistency, and a major emergency in year one arrives before savings have accumulated. Self-insurance suits people with existing emergency funds who could absorb a large bill today; insurance suits people for whom that bill would be a crisis. Some owners run both: a high-deductible policy for catastrophes plus savings for everything under it.",
      },
      {
        heading: "So - worth it?",
        body:
          "Worth it: young pets insured early, breeds prone to expensive conditions, and any household where a multi-thousand-dollar surprise would force a bad decision. Less compelling: owners with deep emergency funds who genuinely prefer to carry the risk, and policies bought late in life at high premiums with existing conditions excluded - run those numbers skeptically. If you decide to buy, compare quotes for your actual pet with matched deductibles and limits, and read each sample policy's exclusions and waiting periods before paying - our pet insurance comparison covers how the major insurers' mechanics differ.",
      },
    ],
  },
  {
    slug: "pet-insurance-pre-existing-conditions",
    title: "Pet Insurance and Pre-Existing Conditions: What's Really Excluded",
    description:
      "Does pet insurance cover pre-existing conditions? What counts as pre-existing, how waiting periods work, curable vs incurable conditions, and what to check in a sample policy.",
    category: "Insurance 101",
    readTime: "6 min read",
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    heroColor: "#163B27",
    keyTakeaways: [
      "Essentially no mainstream pet insurer covers pre-existing conditions - the question is how each defines and applies the exclusion.",
      "A condition can count as pre-existing from signs and symptoms in the record, not just a formal diagnosis.",
      "Some insurers distinguish curable from incurable pre-existing conditions - a distinction worth checking in the sample policy.",
      "Waiting periods function as a short pre-existing window after purchase; anything arising during them is typically excluded too.",
    ],
    sections: [
      {
        heading: "The universal rule",
        body:
          "Start with the blunt version: pet insurance does not cover pre-existing conditions, at essentially every mainstream insurer. A pre-existing condition is one that showed signs, symptoms, or a diagnosis before your coverage started - or during the waiting period after purchase. This isn't a gotcha unique to bad insurers; it's how the product stays viable, since covering already-sick pets at healthy-pet prices doesn't work as insurance. What varies between insurers is not whether they exclude pre-existing conditions, but how they define, review, and apply the exclusion.",
      },
      {
        heading: "Signs count, not just diagnoses",
        body:
          "The detail that surprises owners: a condition doesn't need a formal diagnosis to be pre-existing. If the vet record shows limping last spring, a cruciate injury claimed this year may be reviewed against that note - insurers commonly review medical records when claims arrive. This has two practical implications. First, honesty at enrollment protects you: hiding history doesn't work when the insurer can request records. Second, it's another reason early enrollment is so valuable - the shorter the medical history before coverage, the less there is to exclude.",
      },
      {
        heading: "Curable vs incurable, and bilateral conditions",
        body:
          "Two policy details are worth hunting for in any sample policy. Some insurers treat curable pre-existing conditions - say, a respiratory infection that fully resolved - as coverable again after a defined symptom-free period, while incurable conditions stay excluded for life; whether an insurer makes this distinction, and on what terms, differs by company. Separately, look for bilateral-condition language: if a pet had a problem on one side of the body (a knee, a hip, an eye) before coverage, many policies treat the other side as pre-existing too. Neither detail is standardized, which is exactly why the sample policy - not the marketing page - is the document to read.",
      },
      {
        heading: "Waiting periods and what to actually check",
        body:
          "Every policy carries waiting periods after purchase - commonly days for accidents and longer for illnesses, with some conditions (often orthopedic ones) carrying extended waits that vary by insurer. Conditions arising during a waiting period are typically treated as pre-existing. Before buying any policy, check four things in the insurer's own materials: the exact pre-existing definition, the waiting periods by category, any curable-condition pathway, and bilateral-condition language. And the meta-lesson of this whole topic: the best defense against pre-existing exclusions is enrolling while there's nothing to exclude - which is why the strongest pet insurance decision is usually an early one.",
      },
    ],
  },
  {
    slug: "how-do-pet-insurance-deductibles-work",
    title: "How Pet Insurance Deductibles, Reimbursement & Limits Work",
    description:
      "Pet insurance deductibles explained: annual vs per-condition deductibles, reimbursement percentages, annual limits - and how the three dials interact in real claims.",
    category: "Insurance 101",
    readTime: "6 min read",
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    heroColor: "#2E6B47",
    keyTakeaways: [
      "Three dials define what a policy pays: deductible, reimbursement percentage, and annual limit.",
      "Most insurers use annual deductibles; per-condition deductibles (notably Trupanion's model) behave very differently for chronic conditions.",
      "Reimbursement is a percentage of covered costs after the deductible - and 'covered' is defined by the policy, not the vet bill.",
      "Compare quotes only with all three dials matched, or the premiums aren't comparable.",
    ],
    sections: [
      {
        heading: "The three dials",
        body:
          "Almost every pet insurance policy is defined by three numbers you choose at purchase. The deductible is what you pay before reimbursement starts. The reimbursement percentage is the share of covered costs the insurer pays after that. The annual limit caps total payouts per policy year - some insurers offer unlimited options. Together they drive both your premium and your payout: higher deductible, lower reimbursement, or lower limit all cheapen the premium by shifting risk back to you. Neither direction is 'correct' - it's a genuine trade-off between monthly cost and worst-case exposure.",
      },
      {
        heading: "Annual vs per-condition deductibles",
        body:
          "Most insurers apply the deductible annually: you meet it once per policy year, across all conditions, and it resets at renewal. A minority - Trupanion is the notable example - apply it per condition: each condition has its own deductible, but once met for that condition, it never resets. The difference matters most for chronic illness. With an annual deductible, a diabetic pet's owner re-pays the deductible every year for life; with a per-condition deductible, that condition's deductible is met once and claims for it are reimbursed thereafter. For a pet that develops several unrelated one-off issues, the annual model can come out ahead instead. Neither is universally better - but they are genuinely different products, not different numbers on the same product.",
      },
      {
        heading: "How a claim actually plays out",
        body:
          "The standard flow: you pay the vet in full, submit the itemized bill, and the insurer reimburses covered costs minus your deductible, at your reimbursement percentage, up to your limit. Two honest caveats live inside that sentence. 'Covered' is defined by the policy - exam fees, for instance, are covered by some insurers and excluded by others, and exclusions always apply - so the reimbursement math runs on the covered portion, not the bill total. And because you front the money, a large bill is still a cash-flow event even with great insurance; a few insurers can pay participating vets directly at checkout, which is worth checking with your own vet if fronting bills would strain you.",
      },
      {
        heading: "Using the dials when you compare",
        body:
          "The dials make honest comparison possible - and dishonest comparison easy. Two insurers' premiums mean nothing side by side unless the deductible, reimbursement percentage, and limit are matched, so set all three identically when quoting your pet across companies. Then read each sample policy for what 'covered' includes, the waiting periods, and how premiums change as your pet ages. If you're choosing dial settings for the first time: a higher deductible with a solid reimbursement percentage and a high or unlimited cap keeps the catastrophic protection - the thing insurance is actually for - while containing the premium. Our pet insurance comparison lays out how the major insurers' mechanics differ from there.",
      },
    ],
  },
  {
    slug: "when-to-get-pet-insurance",
    title: "When Should You Get Pet Insurance? (The Age Question, Answered)",
    description:
      "What's the best age to get pet insurance? Why early enrollment matters so much, whether older pets can still be insured, and the moments people usually decide.",
    category: "Insurance 101",
    readTime: "5 min read",
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    heroColor: "#8A6D1F",
    keyTakeaways: [
      "The financially strongest time to insure is when the pet is young and healthy - before anything becomes pre-existing.",
      "Waiting to see if you'll need it is the one strategy that reliably fails, because the trigger event creates the exclusion.",
      "Older pets can usually still be insured, but at higher premiums and with accumulated history excluded - judge it honestly.",
      "Whenever you buy, the enrollment-day rules are the same: read the sample policy, note the waiting periods.",
    ],
    sections: [
      {
        heading: "Why early wins",
        body:
          "Two forces make early enrollment the financially strongest move. Premiums are priced on age, so a young animal locks in coverage at the low end of the curve. More importantly, pre-existing exclusions only apply to what's already in the medical record - insure a healthy young pet and the record is nearly empty, so essentially everything that happens later is coverable. Every month of waiting adds history that could become an exclusion. Puppies and kittens also have a talent for expensive accidents - swallowed objects and broken bones don't wait for middle age - so the coverage isn't just cheap early, it's useful early.",
      },
      {
        heading: "The waiting trap",
        body:
          "The intuitive strategy - 'I'll get insurance when my pet gets older and starts having problems' - is the one approach that reliably fails, because the event that convinces you to buy is the same event that gets excluded. The limp that worries you into shopping becomes the pre-existing condition no policy will touch. Insurance only ever covers the future, and the future starts when coverage does (after waiting periods, at that). If you find yourself shopping because of a symptom, be honest with yourself about what a new policy can and cannot do: it can protect you from the next problem, not the current one.",
      },
      {
        heading: "Insuring an older pet - honestly",
        body:
          "Can you still insure a senior? Usually yes - many insurers enroll older pets, though some products carry age-related terms, and premiums will reflect the age. The honest math: the premium is higher, anything in the accumulated medical record is excluded, and some policies adjust terms with age - so read the sample policy with extra care, particularly around how premiums change at renewal as the pet ages. It can still be rational, especially for a senior with a clean history and an owner who wants catastrophe protection. It's just a weaker deal than the same decision made years earlier - which is information for your next pet, not a reason to feel bad about this one.",
      },
      {
        heading: "Whenever you decide, do it properly",
        body:
          "The enrollment-day checklist doesn't change with age. Quote your actual pet at two or three insurers with matched deductibles, reimbursement percentages and limits. Read each sample policy for the pre-existing definition, waiting periods by category, and premium behavior at renewal. Note the date your waiting periods end. And if you've just brought home a puppy or kitten, run the quotes this month, not 'eventually' - early is the entire advantage. Our pet insurance comparison breaks down how the major insurers' models differ when you're ready to choose.",
      },
    ],
  },
  {
    slug: "pet-insurance-for-older-dogs",
    title: "Pet Insurance for Older Dogs: What's Realistic (and What Isn't)",
    description:
      "Can you insure a senior dog? What changes with age - premiums, exclusions, enrollment caps - an honest framework for deciding, and the alternatives worth weighing.",
    category: "Insurance 101",
    readTime: "6 min read",
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-01",
    heroColor: "#1F4A33",
    keyTakeaways: [
      "Most insurers will enroll older dogs, but some products carry maximum enrollment ages - check before falling for a brand.",
      "Everything already in the medical record is excluded as pre-existing; a senior policy protects against new problems only.",
      "Premiums are higher and typically rise at renewal as your dog ages - ask how before buying, not after.",
      "It can still be rational for a senior with a clean history; run the honest math instead of buying on fear.",
    ],
    sections: [
      {
        heading: "What actually changes with age",
        body:
          "Insuring a senior dog is usually possible but structurally different from insuring a puppy. Premiums are priced on age, so the starting number is higher and typically continues rising at renewals. Some insurers cap enrollment age for their full accident-and-illness products - while others enroll at any age - so the first filter is simply which companies will quote your dog at all. And the pre-existing exclusion does its heaviest work here: a decade of vet records is a decade of potential exclusions, because anything that already showed signs is off the table at essentially every insurer.",
      },
      {
        heading: "The honest math for seniors",
        body:
          "A senior policy is a bet that new, unrelated problems will arrive - and in older dogs they genuinely do, which is both the reason to consider coverage and the reason it costs more. The evaluation that keeps you honest: get real quotes for your dog, ask each insurer how premiums have typically changed at renewal for aging pets, read the sample policy for age-related terms, and then weigh the annual cost against your ability to absorb a large bill directly. For a senior with a long problem list, so much may be excluded that self-funding wins; for a healthy senior with a thin record, catastrophe coverage can still be a sound purchase.",
      },
      {
        heading: "Options beyond the full policy",
        body:
          "If full accident-and-illness coverage prices out of reach, the menu isn't empty. Some insurers offer accident-only coverage - cheaper, age-friendlier, and genuinely useful for the swallowed-object and broken-bone category of disaster, though it ignores illness entirely, which is where most senior spending lives. A dedicated savings account funded with the premium you would have paid is the other classic route: no exclusions, no claims process, and the money stays yours - its weakness is a major bill arriving before the balance has grown. Some households run a hybrid: accident-only coverage plus aggressive saving for illness.",
      },
      {
        heading: "The takeaway for senior owners",
        body:
          "Don't buy from fear, and don't skip from fatalism - run the actual numbers. Quote two or three insurers with matched terms, ask directly about enrollment caps and renewal pricing, read the exclusions against your dog's real medical history, and compare the result against a disciplined savings plan. And if the conclusion of this exercise is mostly regret about not insuring earlier: that's information worth acting on for your next dog, starting in puppyhood - which is exactly when this decision is at its strongest. Our guide on the best age to buy covers that side of the story.",
      },
    ],
  },
  {
    slug: "what-does-pet-insurance-not-cover",
    title: "What Pet Insurance Doesn't Cover: The Full Exclusions Tour",
    description:
      "The exclusions every pet policy shares - pre-existing conditions, routine care, waiting periods - plus the quieter ones (exam fees, bilateral clauses) that surprise owners at claim time.",
    category: "Insurance 101",
    readTime: "6 min read",
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-01",
    heroColor: "#163B27",
    keyTakeaways: [
      "The universal exclusions: pre-existing conditions, routine and preventative care (without an add-on), and anything arising during waiting periods.",
      "The surprises live in the quieter clauses: exam fees, bilateral conditions, breeding, and cosmetic procedures.",
      "Some policies limit coverage for conditions that were preventable by declined vaccines or routine prevention - read that clause.",
      "The sample policy is the product; fifteen minutes with it beats any marketing page, including ours.",
    ],
    sections: [
      {
        heading: "The exclusions every policy shares",
        body:
          "Three exclusions are effectively universal. Pre-existing conditions - anything that showed signs before coverage began - are excluded everywhere; it's the defining rule of the product. Routine and preventative care - checkups, vaccines, parasite prevention, dental cleanings - sits outside accident-and-illness coverage, purchasable only via wellness add-ons that are budgeting tools rather than insurance. And waiting periods after purchase function as a short exclusion window: conditions arising before they end are typically treated as pre-existing, with orthopedic conditions often carrying the longest waits.",
      },
      {
        heading: "The quieter clauses that surprise people",
        body:
          "The claim-time surprises usually come from less famous fine print. Exam fees - the consultation charge itself - are covered by some insurers and excluded by others, which meaningfully changes the math on every vet visit. Bilateral-condition clauses treat a problem on one side of the body (a knee, a hip, an eye) as pre-existing for the other side if the first predates coverage. Breeding and pregnancy costs are standard exclusions, as are cosmetic and elective procedures. None of these is hidden, exactly - they're all in the sample policy - but they're rarely on the marketing page.",
      },
      {
        heading: "The responsibility clauses",
        body:
          "A family of exclusions ties coverage to your own care decisions. Some policies limit or deny claims for conditions that standard prevention would have averted - an illness a declined vaccine protects against, or parasite-borne disease without prevention - and injuries from activities the policy names (racing, commercial guarding) can sit outside coverage too. The theme: insurers cover misfortune, not forgone prevention. Keeping up with the boring basics - vaccines, parasite control, dental care - protects your pet first, and quietly protects your claims too.",
      },
      {
        heading: "How to read a sample policy in fifteen minutes",
        body:
          "Every insurer publishes a sample policy, and it's the only document that actually defines the product. The efficient pass: find the pre-existing definition (does it distinguish curable from incurable conditions?), the waiting periods by category, the exclusions list, whether exam fees are covered, the bilateral clause, and how premiums and terms change with age. Fifteen minutes, once per finalist insurer, with your own pet's history in mind. It's the least glamorous step in the whole purchase and the one that prevents essentially every unpleasant claim-time surprise - our insurer comparison links out to where each brand's terms live.",
      },
    ],
  },
  {
    slug: "pet-insurance-vs-savings-account",
    title: "Pet Insurance vs a Savings Account: The Honest Head-to-Head",
    description:
      "Self-insuring vs pet insurance, compared honestly: where each wins, the year-one gap and discipline problem, and the hybrid strategy many households actually land on.",
    category: "Insurance 101",
    readTime: "6 min read",
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-01",
    heroColor: "#2E6B47",
    keyTakeaways: [
      "Insurance buys certainty against catastrophic bills; savings keep unspent money and exclude nothing.",
      "Self-insuring fails two ways: the emergency that arrives before the balance grows, and the funding discipline that quietly lapses.",
      "Insurance's weaknesses are premiums that never come back, exclusions, and claims friction.",
      "The hybrid - high-deductible coverage plus savings for everything under it - is the quietly sensible middle path.",
    ],
    sections: [
      {
        heading: "What each option actually is",
        body:
          "Strip the marketing and the choice is clean. Insurance converts an unpredictable, potentially huge cost into a predictable premium: you pay every month, and if catastrophe comes, most of the covered bill isn't yours. Self-insuring - a dedicated savings account fed monthly - keeps every unspent shekel of that money yours, excludes nothing, involves no claims process, and rolls over to your next pet. One is certainty purchased at a price; the other is risk retained with interest. Neither is irrational; they fail in different ways, which is the actual comparison.",
      },
      {
        heading: "Where savings win - and their two failure modes",
        body:
          "Over the lifetime of a mostly-healthy pet, the disciplined saver often comes out ahead - that's how insurance economics must work on average. Savings also cover what insurance never will: pre-existing conditions, routine care, the next pet. But self-insuring has two well-known failure modes. Timing: a multi-thousand emergency in year one arrives before the balance can cover it, and 'I'll have enough eventually' doesn't pay tonight's surgery estimate. Discipline: most people don't actually transfer the premium every month with an insurer's ruthlessness - the account starts strong and quietly stops growing.",
      },
      {
        heading: "Where insurance wins - and what it costs you",
        body:
          "Insurance's core win is the scenario that breaks savers: the huge bill, early or anytime, answered without a financial crisis - and with it, immunity from the worst decision in veterinary medicine, declining treatable care over money. Its costs are equally real: premiums are gone whether or not you claim and typically rise with age; exclusions mean it never covers everything; and claims involve fronting money and paperwork at most insurers. Buying it late compounds all of this, since accumulated history becomes excluded pre-existing conditions.",
      },
      {
        heading: "The hybrid most households should at least consider",
        body:
          "The quietly sensible answer is often both, tuned by deductible: a policy with a higher deductible and strong reimbursement above it - keeping the premium contained while capping catastrophe - plus a savings account that covers the deductible and the routine care insurance ignores. You've bought certainty only where uncertainty is dangerous, and kept self-funding where it's efficient. Whichever mix you choose, decide while your pet is young and healthy: every option on this page is strongest then, and the do-nothing default is the only strategy with no good version.",
      },
    ],
  },
  {
    slug: "is-pet-insurance-worth-it-for-cats",
    title: "Is Pet Insurance Worth It for Cats? The Indoor-Cat Question",
    description:
      "Cat insurance, honestly: why 'my cat stays indoors' is weaker protection than it feels, the feline illnesses that drive claims, and who should insure vs save.",
    category: "Insurance 101",
    readTime: "6 min read",
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-01",
    heroColor: "#8A6D1F",
    keyTakeaways: [
      "Indoor life prevents accidents, not illness - and illness is where feline vet spending concentrates.",
      "Urinary blockages, kidney disease, hyperthyroidism and diabetes are the classic expensive cat conditions, and none checks whether the window was closed.",
      "Cat premiums typically run lower than dog premiums, which changes the value math in cats' favor.",
      "The strongest cat case: insure young, before anything enters the record; for seniors with history, weigh savings honestly.",
    ],
    sections: [
      {
        heading: "The indoor-cat fallacy",
        body:
          "The most common reason owners skip cat insurance - 'she's indoors, what could happen?' - protects against the wrong category. Indoor life genuinely reduces accidents: traffic, fights, misadventure. It does approximately nothing about illness, and illness is where feline veterinary spending concentrates. A cat that has never seen the street can still block its urinary tract at 2am, develop kidney disease at ten, or swallow the hair tie it spent three weeks stalking. Indoor is a lifestyle, not a warranty.",
      },
      {
        heading: "What actually gets expensive in cats",
        body:
          "The feline claim classics are worth knowing by name. Urinary obstruction - overwhelmingly in male cats - is a genuine emergency requiring immediate treatment and sometimes surgery. Chronic kidney disease is among the most common conditions of older cats, bringing years of monitoring, diets and medication. Hyperthyroidism and diabetes both feature prominently in senior cats, each with meaningful ongoing costs. Add dental disease and the eaten-string category of surgical emergency, and the picture is clear: cats aren't cheaper patients because they're smaller - they're differently expensive, with illness doing the heavy billing.",
      },
      {
        heading: "The math tilts differently for cats",
        body:
          "Two structural facts shape the cat decision. Premiums for cats typically run lower than for dogs, so the certainty insurance sells costs less to buy - the worth-it bar sits lower. And feline pre-existing exclusions bite hard, because the classic cat conditions are chronic: a kidney value that drifted once, a urinary episode in the record, and that entire territory is excluded at essentially every insurer, forever. Together those push the same conclusion from both directions: cat insurance is at its absolute strongest bought young and healthy, and weakens faster with waiting than dog insurance does.",
      },
      {
        heading: "Who should insure, who should save",
        body:
          "Insure if: the cat is young with a clean record, a four-figure emergency would strain you, or you know yourself well enough to know the savings account wouldn't actually get funded. Lean savings if: the cat is older with a history that guts coverage, or you have real reserves and genuinely prefer retaining the risk. Either way, apply the standard discipline - quotes for your actual cat with matched terms, a pass through the sample policy, waiting periods noted - and decide now rather than after the first symptom, because in cats especially, the record is destiny. Our insurer comparison covers how the major brands differ once you've chosen a direction.",
      },
    ],
  }
];
