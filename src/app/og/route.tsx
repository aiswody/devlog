import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";

/** Google Fonts에서 표시할 글자만 서브셋해 폰트 데이터를 가져온다 */
async function loadGoogleFont(family: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype)'\)/,
  );
  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) return response.arrayBuffer();
  }
  throw new Error("failed to load font data");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? site.name;
  const date = searchParams.get("date") ?? "";
  const tags = (searchParams.get("tags") ?? "")
    .split(",")
    .filter(Boolean)
    .map((tag) => `#${tag}`)
    .join("  ");
  const hash = searchParams.get("hash") ?? "";

  const monoText = `${site.name}${date}${hash}0123456789.`;
  const [titleFont, monoFont] = await Promise.all([
    loadGoogleFont("Noto+Sans+KR:wght@700", title + tags),
    loadGoogleFont("JetBrains+Mono", monoText),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F8FA",
          borderLeft: "14px solid #0E6E63",
          padding: "72px 80px",
          fontFamily: "NotoSansKR",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontFamily: "JetBrainsMono",
            fontSize: 28,
            color: "#5B6472",
          }}
        >
          <span>{site.name}</span>
          {hash && <span style={{ opacity: 0.6 }}>{hash}</span>}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 40 ? 52 : 62,
            fontWeight: 700,
            lineHeight: 1.3,
            color: "#1B2130",
            letterSpacing: "-0.02em",
            wordBreak: "keep-all",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span style={{ fontSize: 26, color: "#0E6E63" }}>{tags}</span>
          {date && (
            <span
              style={{
                fontFamily: "JetBrainsMono",
                fontSize: 26,
                color: "#5B6472",
              }}
            >
              {date.replaceAll("-", ".")}
            </span>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "NotoSansKR", data: titleFont, weight: 700, style: "normal" },
        { name: "JetBrainsMono", data: monoFont, weight: 400, style: "normal" },
      ],
    },
  );
}
