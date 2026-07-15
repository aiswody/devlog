import Link from "next/link";
import { formatDate, getPublishedPosts, shortHash } from "@/lib/posts";

export default function HomePage() {
  const posts = getPublishedPosts();

  return (
    <section>
      <h1 className="sr-only">글 목록</h1>
      <p aria-hidden className="font-mono text-xs text-ink-soft">
        $ git log --oneline
      </p>

      <ol className="mt-3 border-t border-line">
        {posts.map((post) => {
          const hash = shortHash(post.slug);
          return (
            <li key={post.slug} id={hash} className="border-b border-line">
              <Link
                href={post.permalink}
                className="group flex flex-col gap-1 px-2 py-4 hover:bg-accent-wash sm:flex-row sm:items-baseline sm:gap-5 sm:px-3"
              >
                <time
                  dateTime={post.date}
                  className="shrink-0 font-mono text-sm text-ink-soft"
                >
                  {formatDate(post.date)}
                </time>

                <div className="min-w-0 flex-1">
                  <p className="font-medium leading-snug text-ink group-hover:text-accent">
                    {post.title}
                  </p>
                  <p className="mt-1 flex flex-wrap gap-x-2 text-sm text-accent">
                    {post.tags.map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="hidden shrink-0 font-mono text-xs text-ink-soft opacity-60 sm:inline"
                >
                  {hash}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
