import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import solid from "@astrojs/solid-js";
import rehypeMermaid from 'rehype-mermaid';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://adityadhara.com",
  integrations: [mdx(), sitemap(), solid()],

  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'math'],
    },
    rehypePlugins: [rehypeMermaid],
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
