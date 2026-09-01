import type { Metadata } from "next";
import { HubHome } from "@/components/hub-home";

export const revalidate = 300;

export const metadata: Metadata = {
  title: {
    absolute: "ZolloPet - Compare the Best Pet Products & Services",
  },
  description:
    "Compare fresh dog food, fresh cat food, pet insurance and dog DNA tests side by side - independent reviews of real brands, honest about what we have and haven't verified.",
  alternates: { canonical: "https://www.zollopet.com" },
  openGraph: {
    title: "ZolloPet - Compare the Best Pet Products & Services",
    description:
      "Independent, side-by-side comparisons across fresh pet food, pet insurance and dog DNA tests.",
    url: "https://www.zollopet.com",
    type: "website",
  },
};

export default function HubPage() {
  return <HubHome />;
}
