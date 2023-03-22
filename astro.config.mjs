import { defineConfig } from "astro/config";

// https://astro.build/config
import svelte from "@astrojs/svelte";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "rehype-toc";
import remarkCodeTitles from "remark-code-titles";

import remarkWordCountPlugin from "./plugins/remark-word-count-plugin.mjs";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "dracula",
      wrap: false,
      langs: ["rust", "rs", "yaml", "ts"],
    },
  },
  integrations: [
    svelte(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    mdx({
      remarkPlugins: [remarkCodeTitles, remarkMath, remarkWordCountPlugin],
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "append" }],
        [rehypeToc, { headings: ["h1", "h2", "h3"] }],
      ],
    }),
    partytown(),
  ],
  // trailingSlash: "always",
  site: "https://littleikawa.github.io",
  base: "/under-construction",
});
