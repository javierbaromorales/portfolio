import { ImageResponse } from "next/og"
import { siteConfig } from "@/config/site"

export const alt = `${siteConfig.name} — ${siteConfig.role}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0C0F",
          color: "#EDE8DF",
          padding: "72px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, #2A2C31 1px, transparent 1px), linear-gradient(to bottom, #2A2C31 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div style={{ display: "flex", fontSize: 18, letterSpacing: "0.28em", color: "#6BA8C4" }}>
          SOFTWARE ENGINEER
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 72, letterSpacing: "-0.04em", lineHeight: 0.95 }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 28, color: "#8C8880" }}>
            I build software that holds together.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 18, letterSpacing: "0.18em", color: "#8C8880" }}>
          HIALEAH, FL
        </div>
      </div>
    ),
    { ...size },
  )
}
