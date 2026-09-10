import { ImageResponse } from "next/og";
import { business } from "@/data/business";

export const alt = `${business.name} — Döner, shoarma, grill & pizza`;
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
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "linear-gradient(135deg, #173F32 0%, #2E7D5B 60%, #F4B740 130%)",
          color: "#FFFCF7",
          fontSize: 40,
        }}
      >
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700 }}>
          Fresh<span style={{ color: "#E96B2C" }}>&amp;</span>Tasty
        </div>
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, opacity: 0.75, marginTop: 4 }}>
          DORDRECHT
        </div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 48, maxWidth: 900, opacity: 0.95 }}>
          Vers van de grill. Recht naar jouw tafel.
        </div>
      </div>
    ),
    { ...size }
  );
}
