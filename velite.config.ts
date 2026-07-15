import { defineCollection, defineConfig, s } from "velite";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      date: s.isodate(),
      tags: s.array(s.string()),
      summary: s.string().max(160),
      project: s.string().optional(),
      draft: s.boolean().default(false),
      path: s.path(),
      toc: s.toc(),
      code: s.mdx(),
    })
    .transform((data) => {
      const slug = data.path.replace(/^posts\//, "");
      return { ...data, slug, permalink: `/posts/${slug}` };
    }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [
        rehypePrettyCode,
        {
          // 라이트/다크 듀얼 테마 — CSS에서 prefers-color-scheme으로 전환
          theme: { light: "github-light", dark: "github-dark" },
          keepBackground: false,
        },
      ],
      rehypeKatex,
    ],
  },
});
