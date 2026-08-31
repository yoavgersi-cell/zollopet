"use client";

import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";
import { useNavPrefix, navHref } from "@/lib/nav-prefix";
import { DEFAULT_VERTICAL } from "@/lib/config";

type Provider = { id: string; name: string; logo: string };
type Comparison = { slug: string; name: string };

// Client half of the 404 page: the links need the active vertical prefix, which
// is only known client-side (usePathname). Data is resolved in the server
// component and passed in.
export function NotFoundLinks({
  topProviders,
  comparisons,
}: {
  topProviders: Provider[];
  comparisons: Comparison[];
}) {
  const prefix = useNavPrefix();
  // Content links need a vertical to land on real routes - when the 404 path
  // isn't under a vertical, fall back to the default vertical.
  const href = (path: string) => navHref(prefix || `/${DEFAULT_VERTICAL}`, path);

  return (
    <>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={href("/")}
          className="inline-flex h-[46px] items-center justify-center gap-2 rounded-xl bg-[#1F4A33] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#163B27]"
        >
          <Home className="h-4 w-4" strokeWidth={2} />
          Compare all providers
        </Link>
        <Link
          href={href("/find-your-match")}
          className="inline-flex h-[46px] items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 text-[14px] font-bold text-[#22362A] transition-colors hover:bg-gray-50"
        >
          <Search className="h-4 w-4" strokeWidth={2} />
          Find your match
        </Link>
      </div>

      {topProviders.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-gray-400">Top providers</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {topProviders.map((p) => (
              <Link
                key={p.id}
                href={href(`/reviews/${p.id}`)}
                className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 transition-colors hover:border-[#1F4A33]/30"
              >
                <div className="flex h-[26px] w-[90px] items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logo} alt={`${p.name} logo`} className="max-h-full max-w-full object-contain" />
                </div>
                <span className="ml-auto text-[13px] font-semibold text-[#1F4A33] group-hover:underline">Read review</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {comparisons.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-gray-400">Popular comparisons</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                href={href(`/${c.slug}`)}
                className="group flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-[13px] font-semibold text-[#22362A] transition-colors hover:border-[#1F4A33]/30"
              >
                {c.name}
                <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-[#1F4A33]" strokeWidth={2.5} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
