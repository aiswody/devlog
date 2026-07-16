"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

/** giscus 댓글 — GitHub Discussions 기반, 블로그 테마와 동기화 */
export function Comments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const giscusTheme = resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    const attrs: Record<string, string> = {
      "data-repo": site.giscus.repo,
      "data-repo-id": site.giscus.repoId,
      "data-category": site.giscus.category,
      "data-category-id": site.giscus.categoryId,
      "data-mapping": "pathname",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "bottom",
      "data-theme": giscusTheme,
      "data-lang": "ko",
      "data-loading": "lazy",
    };
    for (const [key, value] of Object.entries(attrs)) {
      script.setAttribute(key, value);
    }
    container.appendChild(script);
    // giscusTheme 변경은 아래 postMessage 이펙트가 처리하므로 최초 1회만 주입한다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame",
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: giscusTheme } } },
      "https://giscus.app",
    );
  }, [giscusTheme]);

  return (
    <section aria-label="댓글" className="mt-14 border-t border-line pt-8">
      <div ref={containerRef} />
    </section>
  );
}
