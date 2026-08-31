import type { Metadata } from "next";
import { DEFAULT_VERTICAL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Disclaimer - FTC Disclosure & Affiliate Information",
  description:
    "FTC disclosure, affiliate relationship details, veterinary disclaimer, and revenue model transparency for zollopet.com.",
  alternates: {
    canonical: `https://www.zollopet.com/${DEFAULT_VERTICAL}/disclaimer`,
  },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-bold text-[#22362A]">Disclaimer</h1>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <h2 className="text-xl font-semibold text-[#22362A]">
          FTC Disclosure
        </h2>
        <p>
          In accordance with the Federal Trade Commission guidelines, ZolloPet
          discloses that this website contains affiliate links. When you click
          on a link and make a purchase or sign up for a service, we may receive
          a commission at no additional cost to you.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#22362A]">
          Affiliate Relationships
        </h2>
        <p>
          ZolloPet participates in affiliate programs with various pet food
          brands, pet insurance providers, and related services. This means we
          may earn referral fees when visitors click through our links and
          complete qualifying actions. These relationships help support the
          operation of this website.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#22362A]">
          Editorial Independence
        </h2>
        <p>
          Our affiliate relationships do not influence our rankings or reviews.
          Brands are evaluated based on objective criteria including published
          standards, pricing transparency, policy terms, and user feedback. We
          are committed to providing honest, independent assessments regardless
          of compensation.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#22362A]">
          Veterinary &amp; Insurance Disclaimer
        </h2>
        <p>
          The content on ZolloPet is for informational purposes only and is not
          veterinary, medical, financial, or insurance advice. Diet changes can
          affect your pet&apos;s health - always consult a licensed veterinarian
          about your pet&apos;s nutrition and care. Insurance policies differ by
          state and insurer; always read an insurer&apos;s sample policy and
          confirm terms directly before purchasing coverage.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#22362A]">
          Revenue Model
        </h2>
        <p>
          ZolloPet generates revenue primarily through affiliate commissions.
          When you use our links to visit a brand&apos;s website and take a
          qualifying action (such as starting a subscription or requesting a
          quote), we may receive compensation. This model allows us to provide
          free, accessible comparisons to our visitors.
        </p>
      </div>
    </div>
  );
}
