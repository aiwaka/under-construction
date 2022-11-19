import { ArticleAttribute } from "./../article";
import type { PageLoad } from "@/../.svelte-kit/types/src/routes/blog/[slug]/$types";

export const load: PageLoad = async ({ params: { slug } }) => {
  // mdsvexで読み込むとmetadataでfrontmatterを, defaultで全体のレンダラーを取得できる.
  const markdown = await import(`../contents/${slug}.md`);
  const meta = markdown.metadata;
  const attr: ArticleAttribute = new ArticleAttribute(
    meta.id,
    meta.title,
    meta.thumbnail,
    new Date(meta.date),
    meta.tags
  );
  const post = {
    attr,
    body: markdown.default
  };

  return {
    post
  };
};
