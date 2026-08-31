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
          background: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)",
          padding: 60,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
            background: "linear-gradient(135deg, #2563eb, #4f46e5)",
            borderRadius: 16,
            padding: "12px 20px",
          }}
        >
          <div style={{ fontSize: 32 }}>❤</div>
          <div style={{ color: "white", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>COMMUNITY FOUNDATION</div>
        </div>
        <div style={{ fontSize: 56, fontWeight: 800, color: "#1e40af", textAlign: "center", lineHeight: 1.1 }}>
          Building Tomorrow Together
        </div>
        <div style={{ fontSize: 20, color: "#475569", marginTop: 16, textAlign: "center", maxWidth: 800 }}>
          Empowering communities since 2015 — 50+ partners · 100k+ lives impacted · 12 countries
        </div>
      </div>
    ),
    { ...size }
  );
}
