import type { MetadataRoute } from "next";
import { getAllTags, getPublishedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts();

  return [
    { url: site.url, lastModified: posts[0] && new Date(posts[0].date) },
    { url: `${site.url}/projects` },
    { url: `${site.url}/about` },
    ...posts.map((post) => ({
      url: `${site.url}${post.permalink}`,
      lastModified: new Date(post.date),
    })),
    ...getAllTags().map(({ tag }) => ({
      url: `${site.url}/tags/${encodeURIComponent(tag)}`,
    })),
  ];
}
