import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Search, BarChart3 } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { DEFAULT_VERTICAL } from "@/lib/config";
import { ExpertTeam } from "@/components/expert-team";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About ZolloPet - Our Mission, Team & Review Methodology",
  description:
    "Learn how zollopet.com independently ranks and reviews pet brands across fresh dog food, fresh cat food and pet insurance. Our editorial methodology and commitment to unbiased comparisons.",
  alternates: {
    canonical: `https://www.zollopet.com/${DEFAULT_VERTICAL}/about`,
  },
};

export default async function AboutPage() {
  const config = await getConfig();
  const experts = config.experts ?? [];

  const teamSchema = experts.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "zollopet.com",
    url: "https://www.zollopet.com",
    employee: experts.map((e) => ({
      "@type": "Person",
      name: e.credentials ? `${e.name}, ${e.credentials}` : e.name,
      jobTitle: e.role,
      description: e.bio,
    })),
  } : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {teamSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }} />}
      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="text-[28px] font-extrabold text-[#22362A] sm:text-[36px]">
            About ZolloPet
          </h1>
          <p className="mt-3 max-w-[600px] text-[16px] leading-relaxed text-gray-500">
            We help pet owners make informed decisions by independently comparing
            pet brands - fresh dog food, fresh cat food and pet insurance - on
            what each service includes, how its pricing works, and what to verify
            before buying.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
        {/* Mission */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#22362A]">Our Mission</h2>
          <p className="mb-4 text-[16px] leading-[1.75] text-gray-600">
            The market for premium pet services has grown rapidly - fresh food
            subscriptions quote a different price for every pet, insurance
            policies bury their real differences in sample-policy fine print,
            and every brand&rsquo;s marketing sounds the same. For pet owners, that
            makes honest comparison genuinely hard.
          </p>
          <p className="text-[16px] leading-[1.75] text-gray-600">
            ZolloPet.com exists to simplify this decision. We independently
            research, compare, and review the major brands in each category so
            you can find the right fit for your pet and your budget - and where
            we haven&rsquo;t verified a brand&rsquo;s numbers, we say so instead
            of guessing.
          </p>
        </section>

        {/* What we do - icons grid */}
        <section className="mb-12">
          <h2 className="mb-6 text-[22px] font-bold text-[#22362A]">What We Do</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Search, title: "Research Brands", desc: "We evaluate the major brands in each category on what they offer, how their pricing actually works, and their plan and cancellation terms." },
              { icon: BarChart3, title: "Compare Side by Side", desc: "Our comparison pages show exactly how brands differ on the factors that matter most to you and your pet." },
              { icon: BookOpen, title: "Educate Pet Owners", desc: "Our guides explain how each category works - fresh feeding, policy mechanics, what's never covered - so you know what to check before buying." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1F4A33]/5">
                  <Icon className="h-5 w-5 text-[#1F4A33]" strokeWidth={1.5} />
                </div>
                <h3 className="mb-1 text-[15px] font-bold text-[#22362A]">{title}</h3>
                <p className="text-[13px] leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial team */}
        <ExpertTeam experts={experts} />

        {/* Methodology */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#22362A]">How We Rank Brands</h2>
          <p className="mb-6 text-[16px] leading-[1.75] text-gray-600">
            Our rankings are based on a weighted evaluation across five core
            categories. We update our assessments as brands change their
            pricing, services, and terms.
          </p>
          <div className="space-y-4">
            {[
              { category: "Value & Pricing Transparency", weight: "25%", desc: "What the money actually buys, how honestly pricing is presented, and whether quoted prices hold up over time." },
              { category: "Product & Coverage Quality", weight: "25%", desc: "Recipe formulation standards and ingredient quality for food; policy mechanics, limits and exclusions for insurance." },
              { category: "Trust & Track Record", weight: "20%", desc: "Brand history, published standards and certifications, and verified customer review records." },
              { category: "Customer Experience", weight: "15%", desc: "Sign-up flow, delivery or claims reliability, support responsiveness, and app/site quality." },
              { category: "Flexibility", weight: "15%", desc: "Trial terms, pause and cancellation policies, and how easy it is to adjust a plan as your pet's needs change." },
            ].map(({ category, weight, desc }) => (
              <div key={category} className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
                <span className="shrink-0 rounded bg-[#1F4A33] px-2.5 py-1 text-[12px] font-bold text-white">{weight}</span>
                <div>
                  <p className="text-[14px] font-bold text-[#22362A]">{category}</p>
                  <p className="mt-0.5 text-[13px] text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[15px] leading-[1.75] text-gray-600">
            Want the full picture? Read our detailed{" "}
            <Link href={`/${DEFAULT_VERTICAL}/how-we-rank`} className="font-semibold text-[#1F4A33] hover:underline">
              ranking &amp; review methodology
            </Link>{" "}
            - the factors we score, where our data comes from, and how we pick winners.
          </p>
        </section>

        {/* Editorial standards */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#22362A]">Editorial Standards</h2>
          <div className="space-y-4 text-[16px] leading-[1.75] text-gray-600">
            <p>
              <strong className="text-[#22362A]">Independence.</strong> Our editorial team operates
              independently. Brand rankings and reviews are determined by our evaluation criteria,
              not by commercial relationships.
            </p>
            <p>
              <strong className="text-[#22362A]">Transparency.</strong> We clearly disclose that some
              brands may compensate us through affiliate partnerships. This may affect how brands are
              displayed but does not influence our ratings or review content.
            </p>
            <p>
              <strong className="text-[#22362A]">Honesty about verification.</strong> We only publish
              prices, ratings and plan details we have verified against a brand&rsquo;s own published
              information. Where we haven&rsquo;t verified something yet, the page says so explicitly.
            </p>
            <p>
              <strong className="text-[#22362A]">Regular updates.</strong> We continuously review and
              update our rankings, reviews, and guides as brands change their offerings and the market
              evolves.
            </p>
          </div>
        </section>

        {/* Care disclaimer */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#22362A]">Disclaimer</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[15px] leading-[1.75] text-gray-600">
              ZolloPet.com is not a veterinary provider, an insurer, or a licensed insurance agent.
              The information on this site is for educational and comparison purposes only and should
              not replace professional advice. Always consult a licensed veterinarian about your
              pet&rsquo;s diet and health, and read an insurer&rsquo;s sample policy before buying
              coverage. Individual pricing and results vary.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <p className="mb-4 text-[16px] font-bold text-[#22362A]">Ready to compare brands?</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/${DEFAULT_VERTICAL}`}
              className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#1F4A33] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#163B27]"
            >
              Compare Brands
            </Link>
            <Link
              href="/"
              className="inline-flex h-[44px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#22362A] transition-colors hover:bg-gray-50"
            >
              Browse All Categories
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
