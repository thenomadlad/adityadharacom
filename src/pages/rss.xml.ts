import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

import type { MarkdownInstance } from "astro";
import type { PostFrontmatter } from "../lib/types";


export async function GET(context: any) {
  const posts = Object.values(import.meta.glob("./*.md", { eager: true })) as MarkdownInstance<PostFrontmatter>[];

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      link: post.url,
      pubDate: new Date(post.frontmatter.pubDate),
      content: post.rawContent()
    })),
  });
}
