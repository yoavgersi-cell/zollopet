import { put, list } from "@vercel/blob";
import { type SiteConfig, defaultConfig, VERTICALS, DEFAULT_VERTICAL } from "./config";
import { freshDogFoodSeed } from "./seeds/fresh-dog-food";
import { freshCatFoodSeed } from "./seeds/fresh-cat-food";
import { petInsuranceSeed } from "./seeds/pet-insurance";
import { dogDnaTestsSeed } from "./seeds/dog-dna-tests";

// Every vertical is stored in its own blob, keyed by its id.
function blobKeyFor(vertical: string): string {
  return `site-config-${vertical}.json`;
}

// A brand-new vertical starts empty - no providers, reviews, comparisons, or
// articles - with neutral hero text derived from the vertical registry.
function emptyVerticalConfig(vertical: string): SiteConfig {
  const meta = VERTICALS.find((v) => v.id === vertical);
  const name = meta?.name ?? vertical;
  return {
    ...defaultConfig,
    siteName: "zollopet.com",
    hero: {
      ...defaultConfig.hero,
      backgroundImageUrl: "",
      imageAlt: "",
      h1: `Best ${name} of 2026`,
      h2: meta?.tagline ?? `Compare top ${name.toLowerCase()} brands side by side`,
      description: `Compare trusted ${name.toLowerCase()} brands side by side - what each service includes, how the pricing works, and what to verify before you buy.`,
    },
    providers: [],
    faqs: [],
    reviews: [],
    articles: [],
    battles: [],
    landingPages: [],
    sidebars: [],
  };
}

// Code-level content skeleton for a vertical, used as the base when there is no
// CMS-saved blob yet (and as the base a saved blob overlays).
function seedForVertical(vertical: string): SiteConfig {
  const base = emptyVerticalConfig(vertical);
  if (vertical === "fresh-dog-food") return freshDogFoodSeed(base);
  if (vertical === "fresh-cat-food") return freshCatFoodSeed(base);
  if (vertical === "pet-insurance") return petInsuranceSeed(base);
  if (vertical === "dog-dna-tests") return dogDnaTestsSeed(base);
  return base;
}

// Load a vertical's config: its own blob when one was saved from the CMS,
// otherwise its code seed. Kept intentionally simple - no cross-vertical
// merging.
export async function getConfig(vertical: string = DEFAULT_VERTICAL): Promise<SiteConfig> {
  const base = seedForVertical(vertical);
  try {
    const key = blobKeyFor(vertical);
    const { blobs } = await list({ prefix: key });
    const blob = blobs.find((b) => b.pathname === key);
    if (blob) {
      const res = await fetch(blob.url, { cache: "no-store" });
      if (res.ok) {
        const saved = (await res.json()) as Partial<SiteConfig>;
        return { ...base, ...saved };
      }
    }
  } catch {
    // Blob storage unavailable (e.g. local dev without a token) - serve the seed.
  }
  return base;
}

export async function saveConfig(config: SiteConfig, vertical: string = DEFAULT_VERTICAL): Promise<void> {
  await put(blobKeyFor(vertical), JSON.stringify(config, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
