import Link from "next/link";
import { VERTICALS, DEFAULT_VERTICAL } from "@/lib/config";

// Umbrella-brand footer. Links point at real routes only; category links are
// absolute (brand-level) rather than scoped to the current vertical.
const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Categories",
    links: VERTICALS.map((v) => ({ label: v.name, href: `/${v.id}` })),
  },
  {
    title: "Resources",
    links: [
      { label: "Reviews", href: `/${DEFAULT_VERTICAL}/reviews` },
      { label: "Guides", href: `/${DEFAULT_VERTICAL}/articles` },
      { label: "How We Rank", href: `/${DEFAULT_VERTICAL}/how-we-rank` },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: `/${DEFAULT_VERTICAL}/about` },
      { label: "Disclaimer", href: `/${DEFAULT_VERTICAL}/disclaimer` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#E5E5E5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Brand blurb */}
          <div className="col-span-2 sm:col-span-1">
            <p className="text-[13px] leading-relaxed text-gray-500">
              <span className="font-bold text-[#22362A]">ZolloPet</span> is an
              independent comparison publisher for pet products and services.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-2.5 text-[12px] font-bold uppercase tracking-wider text-[#22362A]">{col.title}</h4>
              <nav className="space-y-1.5">
                {col.links.map((l) => (
                  <Link key={l.label} href={l.href} className="block text-[13px] text-gray-500 hover:text-[#1F4A33]">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-gray-100 pt-5">
          <p className="mb-4 text-xs text-gray-400">
            <strong className="text-gray-500">Affiliate Disclosure:</strong>{" "}
            ZolloPet may earn a commission when you click on links and make a
            purchase. This does not affect our rankings or reviews. We are
            committed to providing honest, independent comparisons to help you
            make informed decisions.
          </p>
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-[12px] text-gray-400">
              &copy; {new Date().getFullYear()} ZolloPet. All rights reserved.
            </p>
            <p className="text-[11px] text-gray-300">
              zollopet.com is not a veterinary provider. Always consult a licensed veterinarian about your pet&rsquo;s health.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
