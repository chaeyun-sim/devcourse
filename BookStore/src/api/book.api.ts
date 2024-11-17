import { Book, BookDetail } from '@/model/book.model'
import { httpClient } from './http'
import { Pagination } from '@/model/pagination.model'

interface FetchBookParams {
  category_id?: number
  news?: boolean
  currentPage?: number
  limit: number
}

interface FetchBooksResponse {
  books: Book[]
  pagination: Pagination
}

export const fetchBooks = async (params: FetchBookParams) => {
  try {
    const response = await httpClient.get<FetchBooksResponse>('/books', {
      params
    })

    return response.data
  } catch (error) {
    return {
      books: [],
      pagination: {
        totalCount: 0,
        currentPage: 1
      }
    }
  }
}

export const fetchBook = async (bookId: string) => {
  const response = await httpClient.get<BookDetail>(`/books/${bookId}`);
  return response.data
}

export const likeBook = async (bookId: string) => {
  const response = await httpClient.post(`/likes/${bookId}`)
  return response.data
}

export const unlikeBook = async (bookId: string) => {
  const response = await httpClient.delete(`/likes/${bookId}`)
  return response.data
}