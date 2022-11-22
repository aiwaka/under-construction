export class ArticleAttribute {
  id: string;
  title: string;
  description: string;
  // ファイル名を指定
  thumbnail: string;
  date: Date;
  tags: string[];

  constructor(
    id: string,
    title: string,
    description: string,
    thumbnail: string,
    date: Date,
    tags: string[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
    this.date = date;
    this.tags = tags;
  }
}

export class Article {
  id: string;
  title: string;
  date: Date;
  content: string;
  constructor(id: string, title: string, date: Date, content: string) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.content = content;
  }
}
