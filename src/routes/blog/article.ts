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
