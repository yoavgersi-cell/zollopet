import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DisclosureBar } from "@/components/disclosure-bar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MetaPixel } from "@/components/meta-pixel";
import { GoogleAnalytics } from "@/components/google-analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Display serif for headlines - the warm, editorial pet-brand look (cream
// ground, deep green ink, serif statements).
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zollopet.com"),
  title: {
    default: "ZolloPet - Compare the Best Pet Products & Services",
    template: "%s | ZolloPet",
  },
  // Icons come from the App Router file convention (app/icon.svg, app/apple-icon.png),
  // which serves them at content-hashed URLs so they cache-bust on every update.
  description:
    "Compare fresh dog food, fresh cat food and pet insurance side by side - independent reviews of real brands, honest about what we have and haven't verified.",
  keywords: [
    "pet comparison",
    "fresh dog food comparison",
    "fresh cat food comparison",
    "pet insurance comparison",
    "best fresh dog food",
    "best fresh cat food",
    "best pet insurance",
  ],
  openGraph: {
    title: "ZolloPet - Compare the Best Pet Products & Services",
    description:
      "Independent, side-by-side comparisons across fresh dog food, fresh cat food and pet insurance.",
    type: "website",
    siteName: "ZolloPet",
    locale: "en_US",
    url: "https://www.zollopet.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZolloPet - Compare the Best Pet Products & Services",
    description:
      "Independent, side-by-side comparisons across fresh dog food, fresh cat food and pet insurance.",
  },
  other: {
    "geo.region": "US",
    "geo.position": "37.0902;-95.7129",
    "ICBM": "37.0902, -95.7129",
    "content-language": "en-US",
  },
  alternates: {
    canonical: "https://www.zollopet.com",
    languages: {
      "en-US": "https://www.zollopet.com",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ZolloPet",
              url: "https://www.zollopet.com",
              areaServed: { "@type": "Country", name: "United States" },
              description:
                "Independent guides and brand comparisons across fresh dog food, fresh cat food and pet insurance - honest reviews, pricing research, and side-by-side comparisons.",
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ZolloPet",
              url: "https://www.zollopet.com",
              description:
                "Compare trusted pet brands side by side across fresh dog food, fresh cat food and pet insurance",
            }),
          }}
        />
        <MetaPixel />
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
        <DisclosureBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
