import { NextResponse } from "next/server";
import { getConfig } from "@/lib/config-store";
import { VERTICALS, isPublishedVertical } from "@/lib/config";

// llms.txt (llmstxt.org): a curated, human-readable index of the site's most
// useful pages, written for AI answer engines (ChatGPT Search, Perplexity,
// Copilot, Gemini) that look for it. Unlike sitemap.xml this is deliberately
// SHORT and hand-picked - the highest-intent pages per vertical, with one-line
// descriptions - so a model can grasp what we cover and cite the right page.
// Generated from live config so every link stays real.
export const revalidate = 3600;

const HUB = "https://www.zollopet.com";

function line(title: string, path: string, desc?: string): string {
  const clean = (desc ?? "").replace(/\s+/g, " ").trim();
  const tail = clean ? `: ${clean.length > 110 ? clean.slice(0, 107).trimEnd() + "…" : clean}` : "";
  return `- [${title}](${HUB}${path})${tail}`;
}

export async function GET() {
  const published = VERTICALS.filter((v) => isPublishedVertical(v.id));
  const configs = await Promise.all(published.map((v) => getConfig(v.id)));

  const sections: string[] = [
    "# ZolloPet",
    "",
    "> Independent comparisons and reviews of pet products and services - fresh dog & cat food delivery, pet insurance, and dog DNA tests. We only publish pricing and ratings we have verified against a brand's own published information; everything unverified is labeled as such. Rankings in the fresh dog food category are ordered by each brand's verified public Trustpilot record.",
    "",
    "Key facts: ZolloPet is an editorial affiliate site, not a seller, vet, or insurer. Verified data is marked with the month it was checked. Real customer quotes shown on review pages are reproduced from the brands' public Trustpilot profiles, including critical ones.",
    "",
  ];

  for (let i = 0; i < published.length; i++) {
    const v = published[i];
    const c = configs[i];
    sections.push(`## ${v.name}`);
    sections.push("");
    sections.push(line(`Best ${v.name} of 2026 (ranked comparison)`, `/${v.id}`, c.hero.description));
    for (const b of (c.battles ?? []).slice(0, 4)) {
      sections.push(line(b.title, `/${v.id}/${b.slug}`, b.subtitle));
    }
    for (const p of (c.providers ?? []).slice(0, 4)) {
      sections.push(line(`${p.name} review`, `/${v.id}/reviews/${p.id}`, p.tagline));
    }
    for (const a of (c.articles ?? []).slice(0, 4)) {
      sections.push(line(a.title, `/${v.id}/articles/${a.slug}`, a.description));
    }
    sections.push("");
  }

  sections.push("## About");
  sections.push("");
  sections.push(line("How we rank brands (methodology)", "/fresh-dog-food/how-we-rank"));
  sections.push(line("About ZolloPet & editorial standards", "/fresh-dog-food/about"));
  sections.push(line("Advertising disclosure", "/fresh-dog-food/disclaimer"));
  sections.push("");

  return new NextResponse(sections.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
