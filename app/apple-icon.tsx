import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #E63946 0%, #c1121f 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {/* Fork & knife icon */}
        <div style={{ fontSize: 72, lineHeight: 1 }}>🍽️</div>
        <div
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: 900,
            fontFamily: "serif",
            letterSpacing: 1,
          }}
        >
          CityTaste
        </div>
      </div>
    ),
    { ...size }
  );
}
