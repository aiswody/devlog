import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx-content";
import {
  formatDate,
  getPostBySlug,
  getPublishedPosts,
  shortHash,
} from "@/lib/posts";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl">
      <header>
        <p className="font-mono text-xs text-ink-soft">
          <span className="opacity-60">{shortHash(post.slug)}</span>
          {" · "}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h1 className="mt-3 font-heading text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl">
          {post.title}
        </h1>
        <p className="mt-3 flex flex-wrap gap-x-2 text-sm text-accent">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </p>
      </header>

      <hr className="my-8 border-line" />

      <div className="prose">
        <MDXContent code={post.code} />
      </div>
    </article>
  );
}
