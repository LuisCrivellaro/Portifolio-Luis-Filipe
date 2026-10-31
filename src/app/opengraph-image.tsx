import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ABOUT, SITE } from "@/lib/data";
import { publicAssetExists } from "@/lib/assets";

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadPortrait(): Promise<string | null> {
  if (!publicAssetExists(ABOUT.portrait.src)) return null;
  const data = await readFile(join(process.cwd(), "public", ABOUT.portrait.src));
  return `data:image/jpeg;base64,${data.toString("base64")}`;
}

export default async function OpengraphImage() {
  const portrait = await loadPortrait();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
          color: "#f3f1ec",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "80px",
          }}
        >
          <div style={{ display: "flex", fontSize: 22, color: "#8f8d86", letterSpacing: 2 }}>
            LUIS FILIPE CRIVELLARO
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                display: "flex",
                fontSize: portrait ? 54 : 64,
                fontWeight: 600,
                lineHeight: 1.1,
                maxWidth: 980,
              }}
            >
              {SITE.headline}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#59e3b0" }}>
              <div style={{ width: 40, height: 2, background: "#59e3b0" }} />
              Engenheiro de Software · IA &amp; Automação
            </div>
          </div>
        </div>
        {portrait && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={portrait}
            alt=""
            width={420}
            height={630}
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
    ),
    { ...size }
  );
}
