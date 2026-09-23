import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#f3f1ec",
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: -1,
        }}
      >
        LC
        <div
          style={{
            position: "absolute",
            bottom: 12,
            width: 18,
            height: 3,
            background: "#59e3b0",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
