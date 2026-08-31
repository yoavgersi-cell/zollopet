import { getConfig } from "@/lib/config-store";
import { NotFoundLinks } from "@/components/not-found-links";

export default async function NotFound() {
  const config = await getConfig();
  const { providerOrder } = config.ranking;

  const topProviders = providerOrder
    .slice(0, 4)
    .map((id) => config.providers.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .map((p) => ({ id: p.id, name: p.name, logo: p.logo }));

  const comparisons = (config.battles ?? [])
    .map((b) => {
      const p1 = config.providers.find((p) => p.id === b.provider1Id);
      const p2 = config.providers.find((p) => p.id === b.provider2Id);
      return p1 && p2 ? { slug: b.slug, name: `${p1.name} vs ${p2.name}` } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .slice(0, 4);

  return (
    <div className="min-h-[70vh] bg-gray-50">
      <div className="mx-auto max-w-[760px] px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#1F4A33]">Error 404</p>
        <h1 className="mt-2 text-[30px] font-extrabold leading-tight text-[#22362A] sm:text-[38px]">
          We couldn&rsquo;t find that page
        </h1>
        <p className="mt-3 max-w-[520px] text-[16px] leading-relaxed text-gray-500">
          The page may have moved or no longer exists. Here&rsquo;s where most people head next.
        </p>

        <NotFoundLinks topProviders={topProviders} comparisons={comparisons} />
      </div>
    </div>
  );
}
