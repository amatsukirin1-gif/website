import { ImageResponse } from "next/og";

export const alt = "Community Foundation — Building Tomorrow Together";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          background: "linear-gradient(135deg, #2563eb, #4f46e5)",
          padding: 60,
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 800, color: "white", textAlign: "center", lineHeight: 1.1 }}>
          Building Tomorrow Together
        </div>
        <div style={{ fontSize: 18, color: "#dbeafe", marginTop: 16, letterSpacing: 2, fontWeight: 700 }}>
          COMMUNITY FOUNDATION
        </div>
        <div style={{ fontSize: 18, color: "#bfdbfe", marginTop: 12, textAlign: "center" }}>
          50+ partners · 100k+ lives impacted · 12 countries
        </div>
      </div>
    ),
    { ...size }
  );
}
