"use client";

import Fuse from "fuse.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { PostList } from "@/components/post-list";
import type { PostListItem } from "@/lib/posts";

/** 홈 글 목록 + Fuse.js 클라이언트 검색 ("/" 키로 검색창 포커스) */
export function PostExplorer({ posts }: { posts: PostListItem[] }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: [
          { name: "title", weight: 2 },
          { name: "tags", weight: 1.5 },
          { name: "summary", weight: 1 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [posts],
  );

  const trimmed = query.trim();
  const results = trimmed
    ? fuse.search(trimmed).map((result) => result.item)
    : posts;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = document.activeElement;
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement;
      if (event.key === "/" && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <p
          aria-hidden
          className="min-w-0 truncate font-mono text-xs text-ink-soft"
        >
          $ git log --oneline
          {trimmed && ` --grep="${trimmed}"`}
        </p>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="search ( / )"
          aria-label="글 검색"
          className="w-36 shrink-0 border-b border-line bg-transparent pb-1 font-mono text-sm text-ink outline-none placeholder:text-ink-soft focus:border-accent sm:w-52"
        />
      </div>

      {results.length > 0 ? (
        <PostList posts={results} />
      ) : (
        <p className="mt-8 font-mono text-sm text-ink-soft">
          no results for &quot;{trimmed}&quot;
        </p>
      )}
    </>
  );
}
