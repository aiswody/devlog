import { PostExplorer } from "@/components/post-explorer";
import { getPublishedPosts, toListItem } from "@/lib/posts";

export default function HomePage() {
  const posts = getPublishedPosts().map(toListItem);

  return (
    <section>
      <h1 className="sr-only">글 목록</h1>
      <PostExplorer posts={posts} />
    </section>
  );
}
