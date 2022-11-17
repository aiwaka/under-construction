import type { PageLoad } from "../../../../.svelte-kit/types/src/routes/blog/[slug]/$types";

export const load: PageLoad = async (event) => {
  const { slug } = event.params;

  const markdown = await import(`../contents/${slug}.md`);
  const post = {
    meta: markdown.attributes,
    body: markdown.html
  };

  return {
    post
  };
};
