import { fetchBooks } from '@/api/book.api'
import { LIMIT } from '@/constants/pagination'
import { QUERYSTRING } from '@/constants/queryString'
import { Book } from '@/model/book.model'
import { Pagination } from '@/model/pagination.model'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const useBooks = () => {
  const location = useLocation()

  const [hasData, setHasData] = useState(false)
  const [books, setBooks] = useState<Book[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    totalCount: 0,
    currentPage: 1
  })

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    fetchBooks({
      category_id: Number(params.get(QUERYSTRING.CATEGORY_ID)) || undefined,
      news: !!params.get(QUERYSTRING.NEWS),
      currentPage: Number(params.get(QUERYSTRING.PAGE)) || 1,
      limit: LIMIT
    }).then((res) => {
      setBooks(res.books)
      setPagination(res.pagination)
      setHasData(true)
    })
  }, [])

  return { books, pagination, hasData }
}
