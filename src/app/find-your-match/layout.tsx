import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Best Match - Free Quiz",
  description:
    "Answer a few quick questions and get a personalized brand recommendation for your pet - based on your pet, preferences, and budget.",
  alternates: {
    canonical: "https://www.zollopet.com/fresh-dog-food/find-your-match",
  },
  openGraph: {
    title: "Find Your Best Match",
    description:
      "Take our free quiz and get matched with the best brand for your pet and budget.",
    url: "https://www.zollopet.com/fresh-dog-food/find-your-match",
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
