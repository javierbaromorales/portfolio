import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0B0C0F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #6BA8C4",
        }}
      >
        <div
          style={{
            width: 18,
            height: 10,
            border: "1px solid #6BA8C4",
          }}
        />
      </div>
    ),
    { ...size },
  )
}
