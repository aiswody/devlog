"use client";

import { useEffect, useState } from "react";

export interface TocEntry {
  title: string;
  url: string;
  items: TocEntry[];
}

/** 글 상세 사이드바 목차 — 현재 읽는 섹션을 스크롤 스파이로 강조 */
export function Toc({ toc }: { toc: TocEntry[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const headings = document.querySelectorAll(
      "article h2[id], article h3[id]",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "0% 0% -75% 0%" },
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, []);

  if (toc.length === 0) return null;

  return (
    <nav aria-label="목차">
      <p className="font-mono text-xs text-ink-soft">contents</p>
      <ul className="mt-3 space-y-2 border-l border-line text-sm">
        {toc.map((entry) => (
          <TocItem key={entry.url} entry={entry} activeId={activeId} depth={0} />
        ))}
      </ul>
    </nav>
  );
}

function TocItem({
  entry,
  activeId,
  depth,
}: {
  entry: TocEntry;
  activeId: string;
  depth: number;
}) {
  const isActive = entry.url === `#${activeId}`;
  return (
    <li>
      <a
        href={entry.url}
        className={`-ml-px block border-l-2 py-0.5 leading-snug ${
          depth > 0 ? "pl-7" : "pl-4"
        } ${
          isActive
            ? "border-accent text-accent"
            : "border-transparent text-ink-soft hover:text-ink"
        }`}
      >
        {entry.title}
      </a>
      {entry.items.length > 0 && (
        <ul className="mt-1 space-y-1">
          {entry.items.map((child) => (
            <TocItem
              key={child.url}
              entry={child}
              activeId={activeId}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
