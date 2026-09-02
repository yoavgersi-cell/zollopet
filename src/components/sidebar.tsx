import Link from "next/link";
import { Shield, Users, Award, Info } from "lucide-react";
import type { SidebarConfig, Provider } from "@/lib/config";

const ALL_BLOCKS = ["socialProof", "secureBadge", "featuredImage", "editorialReviews", "rankingMethodology", "disclosure"] as const;

function SidebarCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-[#EAEAEA] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${className ?? ""}`}>
      {children}
    </div>
  );
}

export function Sidebar({ config, providers, linkPrefix = "" }: { config: SidebarConfig; providers: Provider[]; linkPrefix?: string }) {
  const topProviders = providers.slice(0, 5);
  const blockOrder = config.blockOrder && config.blockOrder.length > 0
    ? config.blockOrder
    : [...ALL_BLOCKS];

  const renderBlock = (blockId: string) => {
    switch (blockId) {
      case "socialProof":
        return (
          <SidebarCard key="socialProof">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1F4A33]/8">
                <Users className="h-6 w-6 text-[#1F4A33]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[22px] font-extrabold text-[#22362A] leading-tight">{config.socialProofNumber}</p>
                <p className="text-[13px] leading-snug text-gray-400">{config.socialProofText}</p>
              </div>
            </div>
          </SidebarCard>
        );

      case "secureBadge":
        return (
          <SidebarCard key="secureBadge">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#09553D]/8">
                <Shield className="h-6 w-6 text-[#09553D]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#22362A]">{config.secureTitle}</p>
                <p className="text-[13px] leading-snug text-gray-400">{config.secureText}</p>
              </div>
            </div>
          </SidebarCard>
        );

      case "featuredImage": {
        const featured = topProviders[0];
        const imgSrc = featured?.sidebarImage || config.featuredImageUrl;
        const href = featured?.affiliateUrl || config.featuredImageLink;
        return (
          <a key="featuredImage" href={href} className="block overflow-hidden rounded-xl border border-[#EAEAEA]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgSrc}
              alt={featured ? `${featured.name} - Editor's Featured Provider` : config.featuredImageAlt}
              className="w-full h-auto"
              loading="lazy"
            />
          </a>
        );
      }

      case "editorialReviews":
        return (
          <SidebarCard key="editorialReviews">
            <h3 className="text-[20px] font-bold text-[#22362A]">Editorial Reviews</h3>
            {/* Real brand logos only - the provider's actual logo in a light
                rounded tile, never an invented initials placeholder. */}
            <div className="mt-1 divide-y divide-gray-200">
              {topProviders.map((p) => (
                <Link key={p.id} href={`${linkPrefix}/reviews/${p.id}`} className="group flex items-center gap-4 py-4">
                  <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50/60 p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.logo} alt={`${p.name} logo`} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <p className="text-[16px] font-bold text-[#22362A] transition-colors group-hover:text-[#2E6B47]">{p.name}</p>
                    <p className="mt-0.5 text-[13.5px] font-medium text-gray-600 underline underline-offset-2 group-hover:text-[#2E6B47]">
                      Read More
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <Link href={`${linkPrefix}/reviews`} className="mt-4 block text-[14px] font-semibold text-[#2E6B47] hover:underline">
              Read All Reviews
            </Link>
          </SidebarCard>
        );

      case "rankingMethodology":
        return (
          <SidebarCard key="rankingMethodology">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50">
                <Award className="h-5 w-5 text-amber-500" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[15px] font-bold text-[#22362A]">Our Ranking Methodology</p>
                <p className="mt-0.5 text-[13px] text-gray-400">Provider scores are based on:</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Quality & trust", pct: 92 },
                { label: "Customer satisfaction", pct: 85 },
                { label: "Pricing & value", pct: 78 },
              ].map(({ label, pct }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-[#22362A]">{label}</span>
                  <div className="h-1.5 w-24 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] text-gray-400">Scores are updated regularly by our editorial team.</p>
          </SidebarCard>
        );

      case "disclosure":
        return (
          <SidebarCard key="disclosure">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={1.5} />
              <p className="text-xs leading-relaxed text-gray-400">
                We may earn compensation from some providers featured on this page. Rankings and reviews are determined independently by our editorial team.
              </p>
            </div>
          </SidebarCard>
        );

      default:
        return null;
    }
  };

  return (
    <aside className="hidden lg:block w-[340px] shrink-0">
      <div className="sticky top-6 space-y-4">
        {blockOrder.map((blockId) => renderBlock(blockId))}
      </div>
    </aside>
  );
}
