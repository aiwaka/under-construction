type ThumbnailFormat = "png" | "jpg";

/**
 * 記事のfrontmatter属性で, 未指定の可能性があるものをそのまま扱う.
 * 個別ページで使うのはこちら.
 */
export interface ArticleRawAttribute {
  title: string;
  description: string;
  /** ファイル名を指定 */
  thumbnail: string;
  thumbnailFormat?: ThumbnailFormat;
  date: string;
  updateDate?: string;
  tags: string[];
  wordCount: number;
  latex?: boolean;
  draft?: boolean;
}

export class ArticleAttribute
  implements
    Omit<
      ArticleRawAttribute,
      "thumbnailFormat" | "date" | "updateDate" | "latex" | "draft"
    >
{
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailFormat: ThumbnailFormat;
  date: Date;
  updateDate: Date | null;
  tags: string[];
  wordCount: number;
  latex: boolean;
  draft: boolean;

  constructor(
    id: string,
    title: string,
    description: string,
    thumbnail: string,
    thumbnailFormat: ThumbnailFormat,
    date: Date,
    updateDate: Date | null,
    tags: string[],
    wordCount: number,
    latex: boolean,
    draft: boolean
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
    this.thumbnailFormat = thumbnailFormat;
    this.date = date;
    this.updateDate = updateDate;
    this.tags = tags;
    this.wordCount = wordCount;
    this.latex = latex;
    this.draft = draft;
  }

  /** updateDateがnullでないならそれを使い, そうでなければdateを返す. */
  getLastUpdateDate() {
    return this.updateDate ?? this.date;
  }
  // コンストラクタのオーバーロードはしたくないのでこのようにstatic methodで記述する
  /**
   * 未指定フィールドを含むArticleRawAttributeからArticleAttributeを作成する
   */
  static fromRawAttribute(id: string, obj: ArticleRawAttribute) {
    return new ArticleAttribute(
      id,
      obj.title,
      obj.description,
      obj.thumbnail,
      obj.thumbnailFormat ?? "png",
      new Date(obj.date),
      obj.updateDate ? new Date(obj.updateDate) : null,
      obj.tags,
      obj.wordCount,
      obj.latex ?? false,
      obj.draft ?? true
    );
  }
}

/**
 * `alt`, `caption`は両方省略はできず, この場合警告がコンソールに表示される.
 * `alt`を省略した場合自動的に`caption`が用いられる.
 */
export interface BlogImageProps {
  src: ImageMetadata | Promise<{ default: ImageMetadata }>;
  width: number;
  alt?: string;
  caption?: string;
}
