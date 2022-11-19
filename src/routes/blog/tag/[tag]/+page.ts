import type { PageLoad } from "@/../.svelte-kit/types/src/routes/blog/tag/[tag]/$types.d";
import { ArticleAttribute } from "../../article";

export const load: PageLoad = async ({ fetch, params: { tag } }) => {
  const response = await fetch("/api/posts");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const articleData: { meta: Record<string, any>; path: string }[] = await response.json();

  const attributeList: ArticleAttribute[] = articleData.map(({ meta }) => {
    return new ArticleAttribute(
      meta.id,
      meta.title,
      meta.thumbnail,
      new Date(meta.date),
      meta.tags
    );
  });

  const posts = attributeList.filter((post) => post.tags.includes(tag));

  return {
    tag,
    posts
  };
};
