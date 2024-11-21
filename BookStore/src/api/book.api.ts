import { Book, BookDetail } from '@/model/book.model'
import { requestHandler } from './http'
import { Pagination } from '@/model/pagination.model'

interface FetchBookParams {
  category_id?: number
  news?: boolean
  currentPage?: number
  limit: number
}

export interface FetchBooksResponse {
  books: Book[]
  pagination: Pagination
}

export const fetchBooks = async (params: FetchBookParams) => {
  try {    
    return await requestHandler<FetchBooksResponse>('get', '/books', {
      params
    })
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
  return await requestHandler<BookDetail>('get', `/books/${bookId}`)
}

export const likeBook = async (bookId: string) => {
  return await requestHandler('post', `/likes/${bookId}`)
}

export const unlikeBook = async (bookId: string) => {
  return await requestHandler('delete', `/likes/${bookId}`)
}

export const fetchBestBooks = async () => {
  return await requestHandler<Book[]>('get', `/books/best`) 
}