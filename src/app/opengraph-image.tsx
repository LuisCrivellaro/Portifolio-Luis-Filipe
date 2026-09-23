import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#f3f1ec",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, color: "#8f8d86", letterSpacing: 2 }}>
          LUIS FILIPE CRIVELLARO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 600, lineHeight: 1.1, maxWidth: 980 }}>
            Turning ideas into software, automation and intelligent systems.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#59e3b0" }}>
            <div style={{ width: 40, height: 2, background: "#59e3b0" }} />
            Software Engineer · AI &amp; Automation
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
