import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/components/post-list";
import { getAllTags, getPostsByTag } from "@/lib/posts";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded}`,
    description: `#${decoded} 태그가 달린 글 목록`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  if (posts.length === 0) notFound();

  return (
    <section>
      <p className="font-mono text-xs text-ink-soft">
        $ git log --oneline --grep
      </p>
      <h1 className="mt-2 font-heading text-xl font-semibold tracking-tight text-ink">
        #{decoded}{" "}
        <span className="font-mono text-sm font-normal text-ink-soft">
          {posts.length}개의 글
        </span>
      </h1>
      <PostList posts={posts} />
    </section>
  );
}
