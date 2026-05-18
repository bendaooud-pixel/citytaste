import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #E63946 0%, #c1121f 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          fontSize: 18,
          fontWeight: 900,
          color: "white",
          letterSpacing: "-0.5px",
        }}
      >
        C
      </div>
    ),
    { ...size }
  );
}
