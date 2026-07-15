import { PostList } from "@/components/post-list";
import { getPublishedPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getPublishedPosts();

  return (
    <section>
      <h1 className="sr-only">글 목록</h1>
      <p aria-hidden className="font-mono text-xs text-ink-soft">
        $ git log --oneline
      </p>
      <PostList posts={posts} />
    </section>
  );
}
