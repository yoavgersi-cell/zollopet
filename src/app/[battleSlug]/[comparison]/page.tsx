import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isVertical } from "@/lib/config";
import { hubContext } from "@/lib/site-context";
import { BattlePageView, battleMetadata } from "@/components/pages/battle-page";

export const revalidate = 60;

// Hub comparison / landing page: zollopet.com/<vertical>/<slug>. The first
// segment is the vertical; the second is a battle or landing-page slug within
// that vertical's own config. Deeper static paths (/reviews, /articles) are
// matched by their own folders before this dynamic segment.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ battleSlug: string; comparison: string }>;
}): Promise<Metadata> {
  const { battleSlug, comparison } = await params;
  if (!isVertical(battleSlug)) return {};
  return battleMetadata(comparison, hubContext(battleSlug));
}

export default async function HubComparisonPage({
  params,
}: {
  params: Promise<{ battleSlug: string; comparison: string }>;
}) {
  const { battleSlug, comparison } = await params;
  if (!isVertical(battleSlug)) return notFound();
  return BattlePageView({ slug: comparison, ctx: hubContext(battleSlug) });
}
