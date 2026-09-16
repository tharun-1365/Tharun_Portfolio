import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.positioning}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Static Open Graph card generated at build time. */
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
          padding: 72,
          background: "#0a0a0a",
          color: "#f5f5f5",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 24, color: "#8a8a8a" }}>{site.location}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 72, fontWeight: 600, letterSpacing: -2 }}>{site.name}</div>
          <div style={{ fontSize: 34, color: "#a3a3a3" }}>{`${site.role} — ${site.roleSecondary}`}</div>
        </div>
        <div style={{ fontSize: 22, color: "#8a8a8a" }}>{`github.com/${site.handle}`}</div>
      </div>
    ),
    size,
  );
}
