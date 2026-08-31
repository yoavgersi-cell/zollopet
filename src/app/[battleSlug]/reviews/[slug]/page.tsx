import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isVertical } from "@/lib/config";
import { hubContext } from "@/lib/site-context";
import { ReviewPageView, reviewMetadata } from "@/components/pages/review-page";

export const revalidate = 60;

// Hub review page: zollopet.com/<vertical>/reviews/<slug>. The first
// segment is the vertical (validated below); everything else is the same
// renderer the legacy root route uses, with the vertical's own config injected
// via the site context.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ battleSlug: string; slug: string }>;
}): Promise<Metadata> {
  const { battleSlug, slug } = await params;
  if (!isVertical(battleSlug)) return {};
  return reviewMetadata(slug, hubContext(battleSlug));
}

export default async function HubReviewPage({
  params,
}: {
  params: Promise<{ battleSlug: string; slug: string }>;
}) {
  const { battleSlug, slug } = await params;
  if (!isVertical(battleSlug)) return notFound();
  return ReviewPageView({ slug, ctx: hubContext(battleSlug) });
}
