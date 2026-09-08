import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - ZolloPet",
  description:
    "The terms that govern your use of zollopet.com: what the site is (and isn't), editorial independence, affiliate disclosure, intellectual property and limitations of liability.",
  alternates: { canonical: "https://www.zollopet.com/terms" },
};

const UPDATED = "September 8, 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6">
          <h1 className="text-[28px] font-extrabold text-[#22362A] sm:text-[36px]">Terms of Service</h1>
          <p className="mt-2 text-[14px] text-gray-500">Last updated: {UPDATED}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] space-y-8 px-4 py-10 text-[15.5px] leading-[1.75] text-gray-600 sm:px-6">
        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">1. Acceptance of these terms</h2>
          <p>
            By accessing or using zollopet.com (&ldquo;ZolloPet&rdquo;, the &ldquo;Site&rdquo;), you
            agree to these Terms of Service and to our{" "}
            <Link href="/privacy" className="font-semibold text-[#1F4A33] hover:underline">
              Privacy Policy
            </Link>
            . If you do not agree, please do not use the Site.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">2. What ZolloPet is - and is not</h2>
          <p className="mb-3">
            ZolloPet is an independent editorial website that compares and reviews pet products and
            services, such as fresh pet food subscriptions, pet insurance and dog DNA tests. All content
            is provided for general information and comparison purposes only.
          </p>
          <p>
            ZolloPet is <strong className="text-[#22362A]">not</strong> a veterinary provider, an
            insurer, an insurance agent or broker, or a seller of any of the products reviewed. Nothing
            on the Site is veterinary, medical, financial or legal advice. Always consult a licensed
            veterinarian about your pet&rsquo;s diet and health, and read an insurer&rsquo;s own sample
            policy before buying coverage. Decisions you make based on Site content are your own
            responsibility.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">3. Editorial independence &amp; affiliate disclosure</h2>
          <p>
            Some brands featured on the Site may compensate us through affiliate partnerships, meaning we
            may earn a commission when you visit a brand through our links or make a purchase - at no
            additional cost to you. Compensation may affect how and where brands are displayed, but it
            does not determine our ratings, reviews or verdicts, which are set by our editorial
            methodology. Where we have not verified a brand&rsquo;s pricing or claims, the Site says so
            explicitly. See our{" "}
            <Link href="/fresh-dog-food/disclaimer" className="font-semibold text-[#1F4A33] hover:underline">
              Advertising Disclosure
            </Link>{" "}
            and{" "}
            <Link href="/fresh-dog-food/how-we-rank" className="font-semibold text-[#1F4A33] hover:underline">
              ranking methodology
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">4. Accuracy of information</h2>
          <p>
            We work to keep comparisons, reviews and guides accurate and current, and we label
            unverified information as such. However, brands change their products, prices, policies and
            terms at any time and without notice to us. Information on the Site may therefore be
            outdated or incomplete, and is provided &ldquo;as is&rdquo; without warranties of any kind.
            The authoritative source for any brand&rsquo;s current pricing, terms and policies is that
            brand&rsquo;s own website and documents.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">5. Third-party websites</h2>
          <p>
            The Site links to third-party websites, including the brands we review. We do not control
            and are not responsible for their content, offers, availability or privacy practices. Your
            dealings with any third party - including purchases, subscriptions and insurance policies -
            are solely between you and that third party.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">6. Intellectual property</h2>
          <p>
            The Site&rsquo;s editorial content, design and original graphics are owned by ZolloPet and
            protected by applicable intellectual-property laws. Third-party trademarks and logos
            (including brand names and logos of reviewed companies) belong to their respective owners
            and are used for identification and review purposes only; their use does not imply
            endorsement of ZolloPet by those companies. You may link to and quote the Site with
            attribution; you may not republish substantial portions of it without permission.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">7. Acceptable use</h2>
          <p>
            You agree not to misuse the Site - including attempting to disrupt it, scraping it at scale,
            probing or bypassing security measures, or using the content to mislead consumers.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">8. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, ZolloPet and its operators will not be liable for
            any indirect, incidental, consequential or special damages arising from your use of the Site
            or reliance on its content, including decisions about pet food, insurance coverage or any
            other product or service. Where liability cannot be excluded, it is limited to the maximum
            extent permitted by law.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">9. Changes to the Site and these terms</h2>
          <p>
            We may change, suspend or discontinue any part of the Site at any time, and may update these
            terms as the Site evolves. The &ldquo;Last updated&rdquo; date above reflects the current
            version; continued use of the Site after changes means you accept the updated terms.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">10. Contact</h2>
          <p>
            Questions about these terms: <span className="font-semibold text-[#22362A]">legal@zollopet.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
