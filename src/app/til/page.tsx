import type { Metadata } from "next";
import { PostList } from "@/components/post-list";
import { getTilPosts, toListItem } from "@/lib/posts";

export const metadata: Metadata = {
  title: "til",
  description: "공부하며 남기는 짧은 학습 기록 (Today I Learned)",
};

export default function TilPage() {
  const posts = getTilPosts().map(toListItem);

  return (
    <section>
      <p aria-hidden className="font-mono text-xs text-ink-soft">
        $ git log --oneline -- til/
      </p>
      <h1 className="mt-2 font-heading text-xl font-semibold tracking-tight text-ink">
        TIL{" "}
        <span className="font-mono text-sm font-normal text-ink-soft">
          {posts.length}개의 기록
        </span>
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        공부하다 배운 것을 그날그날 짧게 남깁니다. 완성된 글은 아닙니다.
      </p>
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="mt-8 font-mono text-sm text-ink-soft">
          아직 기록이 없습니다.
        </p>
      )}
    </section>
  );
}
