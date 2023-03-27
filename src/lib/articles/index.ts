export class ArticleAttribute {
  id: string;
  title: string;
  description: string;
  // ファイル名を指定
  thumbnail: string;
  date: Date;
  updateDate: Date | null;
  tags: string[];
  latex: boolean;
  draft: boolean;
  wordCount: number;

  constructor(
    id: string,
    title: string,
    description: string,
    thumbnail: string,
    date: Date,
    updateDate: Date | null,
    tags: string[],
    latex?: boolean,
    draft?: boolean,
    wordCount?: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
    this.date = date;
    this.updateDate = updateDate;
    this.tags = tags;
    this.latex = latex !== undefined ? latex : false;
    this.draft = draft !== undefined ? draft : true;
    this.wordCount = wordCount !== undefined ? wordCount : 0;
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
