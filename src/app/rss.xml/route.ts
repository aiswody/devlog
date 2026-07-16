import { Feed } from "feed";
import { getPublishedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const feed = new Feed({
    title: site.name,
    description: site.description,
    id: site.url,
    link: site.url,
    language: "ko",
    copyright: `© ${new Date().getFullYear()} ${site.author.name}`,
    author: { name: site.author.name, email: site.author.email },
  });

  for (const post of getPublishedPosts()) {
    feed.addItem({
      title: post.title,
      id: `${site.url}${post.permalink}`,
      link: `${site.url}${post.permalink}`,
      description: post.summary,
      date: new Date(post.date),
      category: post.tags.map((tag) => ({ name: tag })),
    });
  }

  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
