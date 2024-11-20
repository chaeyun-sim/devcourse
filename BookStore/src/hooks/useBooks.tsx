import { fetchBooks } from '@/api/book.api'
import { LIMIT } from '@/constants/pagination'
import { QUERYSTRING } from '@/constants/queryString'
import { useLocation } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query"

export const useBooks = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const { data: booksData, isLoading } = useQuery({
    queryKey: ['books', location.search],
    queryFn: () => {
      return fetchBooks({
        category_id: Number(params.get(QUERYSTRING.CATEGORY_ID)) || undefined,
        news: !!params.get(QUERYSTRING.NEWS),
        currentPage: Number(params.get(QUERYSTRING.PAGE)) || 1,
        limit: LIMIT
      })
    }
  })

  return {
    books: booksData?.books,
    pagination: booksData?.pagination,
    isEmpty: !booksData?.books.length,
    isBooksLoading: isLoading
  }
}
