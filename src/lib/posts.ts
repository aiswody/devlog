import { posts } from "#site/content";

export type Post = (typeof posts)[number];

/** 발행된 글 목록 — 프로덕션에서는 draft 제외, 최신순 정렬 */
export function getPublishedPosts(): Post[] {
  return posts
    .filter((post) => process.env.NODE_ENV !== "production" || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPublishedPosts().find((post) => post.slug === slug);
}

/**
 * slug 기반 짧은 해시(7자리 hex) — 글의 고유 ID.
 * 홈 목록의 행 앵커(/#a3f9c21)로도 쓰인다. (djb2)
 */
export function shortHash(slug: string): string {
  let hash = 5381;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) + hash + slug.charCodeAt(i)) | 0;
  }
  return (hash >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

/** YYYY.MM.DD — git log 스타일 모노 날짜 */
export function formatDate(isoDate: string): string {
  return isoDate.slice(0, 10).replaceAll("-", ".");
}
