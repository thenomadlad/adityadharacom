import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    pattern: "**/index.md",
    base: "./src/content/blog",
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ""),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      heroImage: image().optional(),
    }),
});

export const collections = { blog };
