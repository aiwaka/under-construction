/**
 * エントリーのスキーマであることを示すインターフェイス.
 * isEntrySchemaはダミーフィールドだが、他の型との互換性を無くすために必要とする.
 */
export interface IsEntrySchema {
  /** 一意なid文字列. URLの末端に使う. */
  id: string;
  /** 記事作成時刻 */
  createdAt: Date;
  /** 記事更新時刻 */
  updatedAt: Date;
  /** ダミー */
  isEntrySchema: null;
}

/**
 * `T`：エントリーのスキーマ（例：`BlogPostEntry`）に変換する.
 */
export interface ToEntryObject<T extends IsEntrySchema> {
  toEntryObject(): T;
}

/**
 * コンテンツで用いる画像の型.
 */
export interface ContentsImage {
  url: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}
