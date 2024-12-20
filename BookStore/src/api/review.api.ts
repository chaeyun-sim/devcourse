import { BookReviewItem, BookReviewItemWrite } from '@/model/review.model'
import { requestHandler } from './http'

export const fetchBookReview = async (bookId: string) => {
	return await requestHandler<BookReviewItem[]>('get', `/reviews/${bookId}`)
}

interface AddBookReviewResponse {
	message: string;
}

export const fetchAddReview = async (bookId: string, data: BookReviewItemWrite) => {
  return await requestHandler<AddBookReviewResponse>('post', `/reviews/${bookId}`, data)
}

export const fetchReviewAll = async () => {
	return await requestHandler<BookReviewItem[]>('get', `/reviews`)
}