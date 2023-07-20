import type { FinalBlogCollectionEntry } from "@lib/schema";
import type { RelatedBlogPost } from "./types";

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
  allEntries: FinalBlogCollectionEntry[],
  targetEntry: FinalBlogCollectionEntry
) => {
  // NOTE: できたら様々なタグから関連を作るようにしたい.
  // 関連記事のリストを作る. specifiedは最優先として最初に入れておく.
  const relatedSlugList: Omit<RelatedEntry, "title" | "date">[] = [];
  targetEntry.data.related.forEach((related) =>
    relatedSlugList.push({ slug: related, whyRelated: "specified" })
  );
  const tags = [...targetEntry.data.tags];
  // 全記事とタグの重複数をチェックして重複度ごとに分ける
  const tagDuplicatedEntries = [...Array(targetEntry.data.tags.length + 1)].map(
    (_) => [] as FinalBlogCollectionEntry[]
  );
  for (const entry of allEntries) {
    // 自身は除く
    if (targetEntry.slug === entry.slug) continue;
    const multiplicity = intersection(entry.data.tags, tags).length;
    tagDuplicatedEntries[multiplicity].push(entry);
  }
  // 重複度が大きい順に取っていく.
  for (let i = tagDuplicatedEntries.length - 1; i > 0; i--) {
    // 5個以上なら終了
    if (relatedSlugList.length >= 5) break;
    for (const entry of tagDuplicatedEntries[i]) {
      // 追加済みのものは除く（特別に指定されたものでなければ起こり得ない）
      if (relatedSlugList.find((v) => v.slug === entry.slug)) continue;
      relatedSlugList.push({
        slug: entry.slug,
        whyRelated: intersection(entry.data.tags, tags),
      });
    }
  }
  // 得たslugのリストからエントリーを得て必要な形の配列に変換
  const related = relatedSlugList.slice(0, 5).map(({ slug, whyRelated }) => {
    const entry = allEntries.find((entry) => entry.slug === slug);
    if (entry === undefined) {
      throw new Error(`slug '${slug}' is not defined`);
    }
    return {
      slug: entry.slug,
      title: entry.data.title,
      date: entry.data.date,
      whyRelated,
    } satisfies RelatedEntry;
  });
  return related;
};
