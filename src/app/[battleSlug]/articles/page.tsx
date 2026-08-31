import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isVertical } from "@/lib/config";
import { hubContext } from "@/lib/site-context";
import { ArticlesIndexView, articlesIndexMetadata } from "@/components/pages/articles-index-page";

export const revalidate = 60;

// Hub articles index: zollopet.com/<vertical>/articles.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ battleSlug: string }>;
}): Promise<Metadata> {
  const { battleSlug } = await params;
  if (!isVertical(battleSlug)) return {};
  return articlesIndexMetadata(hubContext(battleSlug));
}

export default async function HubArticlesIndexPage({
  params,
}: {
  params: Promise<{ battleSlug: string }>;
}) {
  const { battleSlug } = await params;
  if (!isVertical(battleSlug)) return notFound();
  return ArticlesIndexView({ ctx: hubContext(battleSlug) });
}
