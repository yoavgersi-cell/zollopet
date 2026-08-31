import { ImageResponse } from "next/og";
import { getConfig } from "@/lib/config-store";
import { isVertical } from "@/lib/config";

export const runtime = "edge";
export const alt = "Compare Pet Brands - zollopet.com";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ battleSlug: string }>;
}) {
  const { battleSlug } = await params;

  let heading = battleSlug.replace(/-/g, " ");
  let subline = "Side-by-side comparison";
  try {
    if (isVertical(battleSlug)) {
      const config = await getConfig(battleSlug);
      heading = config.hero.h1;
      subline = config.hero.h2;
    }
  } catch {
    // fallback
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1F4A33 0%, #163B27 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <span
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "rgba(255,255,255,0.6)",
            marginBottom: "40px",
          }}
        >
          zollopet.com
        </span>
        <div
          style={{
            fontSize: "60px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.2,
            marginBottom: "24px",
          }}
        >
          {heading}
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          {subline}
        </div>
      </div>
    ),
    { ...size }
  );
}
