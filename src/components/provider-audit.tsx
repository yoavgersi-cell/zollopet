import { BadgeCheck } from "lucide-react";
import { PROVIDER_AUDITS } from "@/lib/provider-audit";
import { PROVIDER_DATA_CHECKED } from "@/lib/config";
import { BoldKeyFacts } from "@/components/prose";

// "What we verified" - the ZolloPet audit card for a provider's review
// page. Renders the verified-facts registry for this provider and vertical;
// providers without a complete, verified entry render nothing at all (an
// audit full of gaps would undermine the very trust it exists to build).
export function ProviderAudit({
  providerId,
  providerName,
  vertical,
}: {
  providerId: string;
  providerName: string;
  vertical: string;
}) {
  const audit = PROVIDER_AUDITS[`${vertical}:${providerId}`];
  if (!audit || audit.rows.length === 0) return null;

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-gray-100 bg-gray-50/70 px-6 py-4 sm:px-7">
        <div className="flex items-center gap-2.5">
          <BadgeCheck className="h-[19px] w-[19px] text-[#1F4A33]" strokeWidth={2} />
          <h2 className="text-[15px] font-bold uppercase tracking-[0.05em] text-[#22362A]">
            What we verified
          </h2>
        </div>
        <p className="text-[12px] font-semibold text-gray-400">
          Checked {PROVIDER_DATA_CHECKED}
        </p>
      </div>

      <div className="px-6 py-5 sm:px-7">
        <p className="mb-5 max-w-[760px] text-[13.5px] leading-relaxed text-gray-500">
          Every line below was checked against {providerName}&apos;s own published pricing and plan
          information - not copied from other review sites. When we can&apos;t verify something, we
          leave it out rather than guess.
        </p>

        <dl className="grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
          {audit.rows.map((row, i) => (
            <div key={i} className="flex flex-col gap-0.5 border-l-2 border-gray-100 pl-3.5">
              <dt className="text-[11.5px] font-bold uppercase tracking-[0.05em] text-gray-400">
                {row.label}
              </dt>
              <dd className="text-[14px] leading-[1.6] text-gray-700">
                <BoldKeyFacts text={row.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
