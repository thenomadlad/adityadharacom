import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";
import remarkMermaid from "astro-diagram/remark-mermaid";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), tailwind(), svelte()],
  markdown: {
    remarkPlugins: [remarkMermaid],
  },
});

