import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "حاسبة VIP — الحاسبات والعدادات التنازلية";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #065f46 30%, #047857 60%, #059669 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(201, 168, 76, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(201, 168, 76, 0.1) 0%, transparent 50%)",
            display: "flex",
          }}
        />

        {/* Gold accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #c9a84c, #dbb863, #c9a84c)",
            display: "flex",
          }}
        />

        {/* VIP Badge */}
        <div
          style={{
            background: "#c9a84c",
            borderRadius: 16,
            padding: "12px 32px",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 28, fontWeight: 700, color: "white" }}>
            VIP
          </span>
        </div>

        {/* Site Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "white",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span>حاسبة VIP</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "rgba(255, 255, 255, 0.85)",
            marginBottom: 40,
            textAlign: "center",
            maxWidth: 800,
            display: "flex",
          }}
        >
          حاسبات مالية وإسلامية • عدادات تنازلية • مواعيد الرواتب
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["🧮 16+ حاسبة", "⏱️ 20+ عداد", "📅 تقويم هجري", "📝 مدونة"].map(
            (item) => (
              <div
                key={item}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 50,
                  padding: "10px 24px",
                  color: "white",
                  fontSize: 22,
                  display: "flex",
                }}
              >
                {item}
              </div>
            )
          )}
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
            display: "flex",
          }}
        >
          calculatorvip.com
        </div>

        {/* Gold bottom line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #c9a84c, #dbb863, #c9a84c)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
