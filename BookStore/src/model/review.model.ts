export interface BookReviewItem {
  id: number;
  userName: string;
  content: string;
  createdAt: string;
  score: number;
}
export type BookReviewItemWrite = Pick<BookReviewItem, 'content' | 'score'>