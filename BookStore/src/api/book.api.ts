import { Book } from '@/model/book.model'
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
