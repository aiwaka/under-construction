import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import loadMicroCMSImage from "./src/integrations/astro-load-microcms-image";

import remarkMath from "remark-math";
import remarkCodeTitles from "remark-code-titles";
import remarkJaRuby from "remark-jaruby";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
// import rehypeToc from "rehype-toc";
import remarkWordCountPlugin from "./plugins/remark-word-count-plugin.mjs";
import rehypeHoverFootnote from "./plugins/rehype-hover-footnote";
import rehypeModifyFnHeadingText from "./plugins/rehype-modify-fn-heading-text.mjs";

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true,
  },
  markdown: {
    shikiConfig: {
      theme: "dracula",
      wrap: false,
    },
  },
  integrations: [
    loadMicroCMSImage({ skip: true }),
    svelte(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    mdx({
      remarkPlugins: [
        remarkCodeTitles,
        remarkJaRuby,
        remarkMath,
        remarkWordCountPlugin,
      ],
      rehypePlugins: [
        rehypeKatex,
        rehypeHoverFootnote,
        rehypeModifyFnHeadingText,
        rehypeSlug,
        // [
        //   rehypeToc,
        //   {
        //     headings: ["h1", "h2", "h3"],
        //   },
        // ],
        [
          rehypeAutolinkHeadings,
          {
            content: {
              type: "element",
              tagName: "span",
              properties: {
                className: ["anchor-link"],
              },
              children: [
                {
                  type: "text",
                  value: "#",
                },
              ],
            },
          },
        ],
      ],
    }),
    partytown(),
    sitemap(),
  ],
  compressHTML: true,
  // trailingSlash: "always",
  site: "https://aiwaka.github.io",
  base: "/under-construction",
  build: {
    // NOTE: ビルド時ページファイルとして`foo/index.html`が作られるのを防ぎ, 代わりに`foo.html`を作る.
    // これによりマークダウンの中で相対リンクを貼るようにすれば開発環境と同じリンク関係が保たれる.
    // GitHub Pagesはルートの`index.html`を探すが, このプロジェクトでは`index.astro`があるので問題ない.
    format: "file",
    inlineStylesheets: "auto",
  },
});
