import { ImageResponse } from "next/og"

export const alt = "JBM"
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
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFFFF",
          color: "#000000",
          fontSize: 72,
        }}
      >
        JBM
      </div>
    ),
    { ...size },
  )
}
