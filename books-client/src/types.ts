export interface Book {
  _id?: string; // optional for new books
  title: string;
  author: string;
  publicationYear: number | undefined;
  genre: string;
}