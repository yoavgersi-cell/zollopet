import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// ZolloPet paw mark, drawn with positioned circles so no image asset or emoji
// font is needed at build time.
export default function AppleIcon() {
  const pad = (
    left: number,
    top: number,
    w: number,
    h: number,
    radius: string
  ) => ({
    position: "absolute" as const,
    left,
    top,
    width: w,
    height: h,
    background: "#fff",
    borderRadius: radius,
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#1F4A33",
          position: "relative",
        }}
      >
        <div style={pad(61, 96, 58, 50, "50%")} />
        <div style={pad(38, 62, 28, 28, "50%")} />
        <div style={pad(62, 43, 28, 28, "50%")} />
        <div style={pad(90, 43, 28, 28, "50%")} />
        <div style={pad(114, 62, 28, 28, "50%")} />
      </div>
    ),
    { ...size }
  );
}
