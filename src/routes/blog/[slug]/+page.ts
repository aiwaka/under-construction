import type { PageLoad } from "../../../../.svelte-kit/types/src/routes/blog/[slug]/$types";

export const load: PageLoad = async ({ params: { slug } }) => {
  const markdown = await import(`../contents/${slug}.md`);
  const post = {
    meta: markdown.metadata,
    body: markdown.default
  };
  console.log(post.body);

  return {
    post
  };
};
