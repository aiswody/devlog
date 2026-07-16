import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/code-block";
import { Comments } from "@/components/comments";
import { MDXContent } from "@/components/mdx-content";
import { ProjectCard } from "@/components/project-card";
import { Toc } from "@/components/toc";
import { getProjectBySlug } from "@/lib/projects";
import {
  formatDate,
  getAdjacentPosts,
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

  const og = `/og?title=${encodeURIComponent(post.title)}&date=${post.date.slice(0, 10)}&tags=${encodeURIComponent(post.tags.join(","))}&hash=${shortHash(post.slug)}`;

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: post.permalink,
      publishedTime: post.date,
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [og],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { newer, older } = getAdjacentPosts(slug);
  const project = post.project ? getProjectBySlug(post.project) : undefined;

  return (
    <div className="relative">
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
          <p className="mt-3 flex flex-wrap gap-x-2 text-sm">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="text-accent hover:underline hover:underline-offset-4"
              >
                #{tag}
              </Link>
            ))}
          </p>
        </header>

        <hr className="my-8 border-line" />

        <div className="prose">
          <MDXContent code={post.code} components={{ pre: CodeBlock }} />
        </div>

        {project && (
          <div className="mt-14">
            <p className="mb-3 font-mono text-xs text-ink-soft">
              related project
            </p>
            <ProjectCard project={project} />
          </div>
        )}

        <nav
          aria-label="이전/다음 글"
          className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between"
        >
          {older ? (
            <Link href={older.permalink} className="group min-w-0 sm:max-w-[48%]">
              <span className="font-mono text-xs text-ink-soft">← older</span>
              <span className="mt-1 block truncate text-sm font-medium text-ink group-hover:text-accent">
                {older.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {newer ? (
            <Link
              href={newer.permalink}
              className="group min-w-0 sm:max-w-[48%] sm:text-right"
            >
              <span className="font-mono text-xs text-ink-soft">newer →</span>
              <span className="mt-1 block truncate text-sm font-medium text-ink group-hover:text-accent">
                {newer.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <Comments />
      </article>

      <aside className="absolute left-full top-0 hidden h-full w-56 xl:block">
        <div className="sticky top-10 ml-10">
          <Toc toc={post.toc} />
        </div>
      </aside>
    </div>
  );
}
