// The ZolloPet provider audit - the "what we verified" registry.
//
// Every row is a fact the operator verified against the provider's own
// published information (pricing pages, plan terms, policy pages).
// Rules, in order of importance:
//   1. NEVER add a row that hasn't been verified. A missing row means "not
//      verified" - the component simply doesn't show it. No TBD, no guesses.
//   2. A provider with no entry renders no audit at all. That is the correct
//      state for providers whose data is still incomplete.
//   3. Values must agree with the same numbers shown elsewhere on the site.
//      One source of truth in substance, even where the strings are
//      hand-written.
//   4. When pricing changes, update the row AND bump PROVIDER_DATA_CHECKED
//      in @/lib/config only after actually re-checking.
//
// Empty at launch - rows are added only once verified.

export interface ProviderAuditEntry {
  rows: { label: string; value: string }[];
}

// Keyed "<vertical>:<providerId>" so a provider that exists in two verticals
// can carry a separate audit per vertical.
export const PROVIDER_AUDITS: Record<string, ProviderAuditEntry> = {
  // ── Dog DNA tests ──────────────────────────────────────────────────────────
  // Verified against Embark's own store pages, September 2026.
  "dog-dna-tests:embark": {
    rows: [
      { label: "Breed + Health kit", value: "$139 promotional (reg. $199), one-time" },
      { label: "Breed ID kit", value: "$109 promotional (reg. $129), one-time" },
      { label: "Dog Age Test", value: "$109 promotional (reg. $159), one-time" },
      { label: "Gut Health Test", value: "$129 promotional (reg. $135), one-time" },
      { label: "Health panel (published)", value: "270+ genetic health risks, 55 traits, 400+ breeds and varieties" },
      { label: "Shipping", value: "Free US shipping; pre-paid return mailer included" },
      { label: "Payment options", value: "Interest-free installments offered at checkout" },
      { label: "Research partner", value: "Cornell University College of Veterinary Medicine" },
    ],
  },
};
