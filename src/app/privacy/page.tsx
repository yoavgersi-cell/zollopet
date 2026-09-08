import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - ZolloPet",
  description:
    "How zollopet.com handles information: what we collect, what we don't, cookies, analytics, affiliate links, and how to contact us.",
  alternates: { canonical: "https://www.zollopet.com/privacy" },
};

const UPDATED = "September 8, 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6">
          <h1 className="text-[28px] font-extrabold text-[#22362A] sm:text-[36px]">Privacy Policy</h1>
          <p className="mt-2 text-[14px] text-gray-500">Last updated: {UPDATED}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] space-y-8 px-4 py-10 text-[15.5px] leading-[1.75] text-gray-600 sm:px-6">
        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">Who we are</h2>
          <p>
            ZolloPet.com (&ldquo;ZolloPet&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is an independent
            comparison and review website covering pet products and services, including fresh pet food,
            pet insurance and dog DNA tests. This policy explains what information is handled when you
            visit the site.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">What we collect - and what we don&rsquo;t</h2>
          <p className="mb-3">
            ZolloPet has no user accounts, no sign-up forms and no comment system. We do not ask for,
            and do not knowingly collect, your name, email address, payment details or any information
            about your pet.
          </p>
          <p>
            Like virtually every website, our hosting infrastructure automatically processes technical
            data needed to serve pages - such as your IP address, browser type, device type, the pages
            you request and the time of the request. This data is processed by our hosting provider
            (Vercel Inc.) to deliver the site, keep it secure and produce aggregate performance and
            traffic statistics. We see this information only in aggregate form (for example, how many
            visits a page received), not as a profile of you.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">Cookies</h2>
          <p>
            ZolloPet does not use advertising or cross-site tracking cookies. The site may use strictly
            necessary technical storage set by our hosting platform to serve the site reliably. If we
            ever add analytics or advertising tools that use cookies requiring consent, we will update
            this policy and add the appropriate consent mechanism first.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">Affiliate links and third-party sites</h2>
          <p>
            ZolloPet is supported by affiliate partnerships: some links on this site lead to the
            websites of the brands we review, and we may earn a commission if you make a purchase after
            following such a link - at no extra cost to you (see our{" "}
            <Link href="/fresh-dog-food/disclaimer" className="font-semibold text-[#1F4A33] hover:underline">
              Advertising Disclosure
            </Link>
            ). When you click through to a brand&rsquo;s site, that site&rsquo;s own privacy policy
            applies - we do not control what information those websites collect. Affiliate networks may
            use link parameters or cookies on the destination site to attribute the referral; that
            processing happens on their side, under their policies.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">How long data is kept</h2>
          <p>
            We do not maintain our own databases of visitor information. Technical logs and aggregate
            statistics are retained by our hosting provider according to its own retention schedules.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">Your rights</h2>
          <p>
            Depending on where you live (for example under the GDPR in the EU/UK or the CCPA/CPRA in
            California), you may have rights to access, correct or delete personal information and to
            object to certain processing. Because we do not collect personal information beyond the
            technical data described above, there is usually nothing for us to look up about you - but
            you are always welcome to contact us with any privacy question or request and we will do our
            best to help, including directing requests to our hosting provider where relevant.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">Children&rsquo;s privacy</h2>
          <p>
            ZolloPet is a general-audience site about pet products and is not directed at children under
            13. We do not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">Changes to this policy</h2>
          <p>
            We may update this policy as the site evolves - for example, if we add analytics tools or a
            newsletter. The &ldquo;Last updated&rdquo; date at the top reflects the current version, and
            material changes will be visible on this page.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[20px] font-bold text-[#22362A]">Contact</h2>
          <p>
            For any privacy question or request, contact us at{" "}
            <span className="font-semibold text-[#22362A]">privacy@zollopet.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
