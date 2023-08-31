import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import loadMicroCMSImage from "./src/integrations/astro-load-microcms-image";
import downloadRemoteImages from "./src/integrations/download-remote-images";

import remarkMath from "remark-math";
import remarkCodeTitles from "remark-code-titles";
import remarkJaRuby from "remark-jaruby";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkWordCountPlugin from "./plugins/remark-word-count-plugin.mjs";
import rehypeHoverFootnote from "./plugins/rehype-hover-footnote";
import rehypeModifyFnHeadingText from "./plugins/rehype-modify-fn-heading-text.mjs";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "dracula",
      wrap: false,
    },
  },
  integrations: [
    loadMicroCMSImage({}),
    downloadRemoteImages(),
    svelte(),
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
  site: "https://aiwaka.github.io",
  base: "/under-construction/",
  build: {
    // NOTE: ビルド時ページファイルとして`foo/index.html`が作られるのを防ぎ, 代わりに`foo.html`を作る.
    // これによりマークダウンの中で相対リンクを貼るようにすれば開発環境と同じリンク関係が保たれる.
    // GitHub Pagesはルートの`index.html`を探すが, このプロジェクトでは`index.astro`があるので問題ない.
    format: "file",
  },
});
