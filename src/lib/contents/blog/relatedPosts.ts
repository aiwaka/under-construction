import type { BlogPostEntry, RelatedBlogPost } from "./types";

/** 共通部分を取得する. */
const intersection = <T>(x: T[], y: T[]) => {
  return [...x].filter((e) => y.includes(e));
};

/**
 * 以下で関連記事を追加する.
 * 記事のタグごとにリスト化し, タグごとに一つずつ関連記事として取る.
 * @param allEntries 全エントリーのリスト
 * @param targetEntry 関連記事を作りたい記事のエントリー
 */
export const createRelated = (
  allEntries: BlogPostEntry[],
  targetEntry: BlogPostEntry,
) => {
  // NOTE: できたら様々なタグから関連を作るようにしたい.
  // 関連記事のリストを作る. specifiedは最優先として最初に入れておく.
  const relatedPostList: Omit<RelatedBlogPost, "title" | "date">[] = [];
  targetEntry.related.forEach((relatedId) =>
    relatedPostList.push({ id: relatedId, factor: "specified" }),
  );
  const tags = [...targetEntry.tags];
  // 全記事とタグの重複数をチェックして重複度ごとに分ける
  const tagDuplicatedEntries = [...Array(targetEntry.tags.length + 1)].map(
    (_) => [] as BlogPostEntry[],
  );
  for (const entry of allEntries) {
    // 自身は除く
    if (targetEntry.id === entry.id) continue;
    const multiplicity = intersection(entry.tags, tags).length;
    tagDuplicatedEntries[multiplicity].push(entry);
  }
  // 重複度が大きい順に取っていく.
  for (let i = tagDuplicatedEntries.length - 1; i > 0; i--) {
    // 5個以上なら終了
    if (relatedPostList.length >= 5) break;
    for (const entry of tagDuplicatedEntries[i]) {
      // 追加済みのものは除く（特別に指定されたものでなければ起こり得ない）
      if (relatedPostList.find((v) => v.id === entry.id)) continue;
      relatedPostList.push({
        id: entry.id,
        factor: intersection(entry.tags, tags),
      });
    }
  }
  // 得たslugのリストからエントリーを得て必要な形の配列に変換
  const related = relatedPostList.slice(0, 5).map(({ id, factor }) => {
    const entry = allEntries.find((entry) => entry.id === id);
    if (entry === undefined) {
      throw new Error(`slug '${id}' is not defined`);
    }
    return {
      id: entry.id,
      title: entry.title,
      date: entry.updatedAt,
      factor,
    } satisfies RelatedBlogPost;
  });
  return related;
};
