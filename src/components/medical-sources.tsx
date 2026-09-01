import { BookOpen } from "lucide-react";

// Authoritative outgoing citations, per vertical. Every entry is a real,
// verifiable source (regulators, veterinary bodies, standards organizations) -
// never invent or approximate a citation. Rendered as a "Sources" section on
// articles, reviews and comparisons so YMYL pages visibly ground their claims.
export interface MedicalSource {
  label: string;
  publisher: string;
  href: string;
}

export const SOURCES_BY_VERTICAL: Record<string, MedicalSource[]> = {
  "fresh-dog-food": [
    {
      label: "Association of American Feed Control Officials (pet food nutrition standards)",
      publisher: "AAFCO",
      href: "https://www.aafco.org/",
    },
    {
      label: "Animal & Veterinary - pet food regulation and safety",
      publisher: "U.S. Food & Drug Administration",
      href: "https://www.fda.gov/animal-veterinary",
    },
    {
      label: "Global Nutrition Guidelines",
      publisher: "World Small Animal Veterinary Association (WSAVA)",
      href: "https://wsava.org/global-guidelines/global-nutrition-guidelines/",
    },
  ],
  "fresh-cat-food": [
    {
      label: "Association of American Feed Control Officials (pet food nutrition standards)",
      publisher: "AAFCO",
      href: "https://www.aafco.org/",
    },
    {
      label: "Raw or Undercooked Animal-Source Protein in Cat and Dog Diets (policy)",
      publisher: "American Veterinary Medical Association",
      href: "https://www.avma.org/resources-tools/avma-policies/raw-or-undercooked-animal-source-protein-cat-and-dog-diets",
    },
    {
      label: "Global Nutrition Guidelines",
      publisher: "World Small Animal Veterinary Association (WSAVA)",
      href: "https://wsava.org/global-guidelines/global-nutrition-guidelines/",
    },
  ],
  "dog-dna-tests": [
    {
      label: "American Veterinary Medical Association (companion animal genetics & care resources)",
      publisher: "AVMA",
      href: "https://www.avma.org/",
    },
    {
      label: "National Human Genome Research Institute (comparative & dog genome research)",
      publisher: "NIH / NHGRI",
      href: "https://www.genome.gov/",
    },
  ],
  "pet-insurance": [
    {
      label: "National Association of Insurance Commissioners (consumer insurance resources)",
      publisher: "NAIC",
      href: "https://content.naic.org/",
    },
    {
      label: "Animal & Veterinary - veterinary care resources",
      publisher: "U.S. Food & Drug Administration",
      href: "https://www.fda.gov/animal-veterinary",
    },
  ],
};

// Compact citation list for the bottom of YMYL content pages. Renders nothing
// for verticals without a curated source list yet.
export function MedicalSources({ vertical }: { vertical: string }) {
  const sources = SOURCES_BY_VERTICAL[vertical];
  if (!sources || sources.length === 0) return null;

  return (
    <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
      <div className="mb-3 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-[#1F4A33]" strokeWidth={2} />
        <h2 className="text-[15px] font-bold uppercase tracking-[0.05em] text-[#22362A]">
          Sources &amp; references
        </h2>
      </div>
      <p className="mb-4 text-[13px] leading-relaxed text-gray-500">
        Category facts on this page are grounded in regulatory guidance and veterinary-organization
        standards. Pricing and plan details come from each provider&apos;s published information.
      </p>
      <ol className="space-y-2">
        {sources.map((s, i) => (
          <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed">
            <span className="shrink-0 font-semibold text-gray-300">{i + 1}.</span>
            <span className="text-gray-600">
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#1F4A33] underline underline-offset-2 hover:text-[#163B27]"
              >
                {s.label}
              </a>{" "}
              <span className="text-gray-400">- {s.publisher}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

// One-line affiliate + care disclosure for the top of review/comparison
// pages: transparent about compensation, explicit that nothing here is
// veterinary or financial advice. Sits under the byline, above the content.
export function TrustDisclosure({ disclaimerHref }: { disclaimerHref: string }) {
  return (
    <p className="mt-2.5 max-w-[720px] rounded-lg bg-gray-50 px-3 py-2 text-[11.5px] leading-[1.55] text-gray-500 sm:mt-3 sm:px-3.5 sm:py-2.5 sm:text-[12.5px] sm:leading-relaxed">
      We may earn a commission when you visit providers through links on this page - it never
      affects our rankings (
      <a href={disclaimerHref} className="font-medium text-[#1F4A33] hover:underline">
        how we stay objective
      </a>
      ). This content is for information only and is not veterinary or financial advice - consult a
      licensed veterinarian about your pet&apos;s health.
    </p>
  );
}
