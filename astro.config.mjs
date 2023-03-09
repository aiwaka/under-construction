import { defineConfig } from "astro/config";

// https://astro.build/config
import svelte from "@astrojs/svelte";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "dracula",
      wrap: false,
    },
  },
  integrations: [
    svelte(),
    image(),
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  ],

  // trailingSlash: "always",
  base: import.meta.env.PROD ? "/under-construction" : "",
});