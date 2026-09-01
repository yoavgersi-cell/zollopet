import { ImageResponse } from "next/og";

export const alt = "ZolloPet - Compare the Best Pet Products & Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #17301F 0%, #1F4A33 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 64, fontWeight: 700 }}>
          <span style={{ color: "#ffffff" }}>Zollo</span>
          <span style={{ color: "#F2C94C" }}>Pet</span>
          <span style={{ color: "#ffffff", fontSize: 36, marginLeft: 6 }}>.com</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 40,
            fontWeight: 800,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Compare the Best Pet Products &amp; Services
        </div>
        <div style={{ marginTop: 20, fontSize: 26, color: "#F1E3B5" }}>
          Fresh dog food · Fresh cat food · Pet insurance · Dog DNA tests
        </div>
      </div>
    ),
    { ...size }
  );
}
