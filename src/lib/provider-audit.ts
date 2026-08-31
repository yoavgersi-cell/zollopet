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
export const PROVIDER_AUDITS: Record<string, ProviderAuditEntry> = {};
