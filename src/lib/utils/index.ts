import { base } from "$app/paths";
import { ArticleAttribute } from "@/routes/blog/article";

export const getFilenameFromPath = (path: string) => {
  const filename = path.split("/").reverse()[0].split(".")[0];
  return filename;
};

// globで読み込んだときに型を付けるためのインターフェイス
export interface MarkdownObj {
  metadata: ArticleAttribute;
}

export const fetchMarkdownArticles = async () => {
  const allFiles = import.meta.glob<MarkdownObj>("/src/routes/blog/contents/*.md");
  const iterableMdFiles = Object.entries(allFiles);

  const allPosts = await Promise.all(
    iterableMdFiles.map(async ([path, mod]) => {
      const markdown: MarkdownObj = await mod();
      // const articlePath = path.slice(11, -3);
      const filename = getFilenameFromPath(path);
      const articlePath = `${base}/blog/${getFilenameFromPath(path)}`;

      const meta = markdown.metadata;
      const metadata = new ArticleAttribute(
        filename,
        meta.title,
        meta.thumbnail,
        new Date(meta.date),
        meta.tags
      );

      return {
        meta: metadata,
        path: articlePath
      };
    })
  );

  return allPosts;
};
