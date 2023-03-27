export class ArticleAttribute {
  id: string;
  title: string;
  description: string;
  // ファイル名を指定
  thumbnail: string;
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
    date: Date,
    updateDate: Date | null,
    tags: string[],
    wordCount: number,
    latex?: boolean,
    draft?: boolean
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
    this.date = date;
    this.updateDate = updateDate;
    this.tags = tags;
    this.wordCount = wordCount;
    this.latex = latex !== undefined ? latex : false;
    this.draft = draft !== undefined ? draft : true;
  }

  /** updateDateがnullでないならそれを使い, そうでなければdateを返す. */
  getLastUpdateDate() {
    return this.updateDate ?? this.date;
  }
  // // コンストラクタのオーバーロードはしたくないのでこのようにstatic methodで記述する
  // /**
  //  * json形式のArticleAttributeJsonの日付をDateオブジェクトに変換してArticleAttributeを作成する
  //  */
  // static fromJson(obj: ArticleAttributeJson) {
  //   return new ArticleAttribute(
  //     obj.id,
  //     obj.title,
  //     obj.description,
  //     obj.thumbnail,
  //     new Date(obj.date),
  //     obj.tags
  //   );
  // }
}

// export class Article {
//   id: string;
//   title: string;
//   date: Date;
//   content: string;
//   constructor(id: string, title: string, date: Date, content: string) {
//     this.id = id;
//     this.title = title;
//     this.date = date;
//     this.content = content;
//   }
// }

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
