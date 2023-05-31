/**
 * 記事内の画像オブジェクト
 */
export interface ImageInArticle {
  url: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

// /** `BlogPostEntry`に変換する */
// export interface ToBlogPostEntry {
//   toBlogPostEntry(): BlogPostEntry;
// }
