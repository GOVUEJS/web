export class ArticleItem {
  id: number;
  title: string;
  content: string;
  date: Date;
  writer: string;

  constructor() {
    this.id = -1;
    this.title = '';
    this.content = '';
    this.date = new Date();
    this.writer = '';
  }
}