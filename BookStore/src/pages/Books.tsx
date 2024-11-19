import BooksEmpty from '@/components/books/BooksEmpty'
import BooksFilter from '@/components/books/BooksFilter'
import BooksList from '@/components/books/BooksList'
import BooksViewSwitcher from '@/components/books/BooksViewSwitcher'
import Pagination from '@/components/books/Pagination'
import Loading from '@/components/common/Loading'
import Title from '@/components/common/Title'
import { useBooks } from '@/hooks/useBooks'
import React from 'react'
import styled from 'styled-components'

const Books = () => {
  const { books, pagination, isEmpty, isBooksLoading } = useBooks()

  if (isEmpty) {
    return <BooksEmpty />
  }

  if (!books || !pagination || isBooksLoading) {
    return <Loading />
  }

  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        <BooksFilter />
        <BooksViewSwitcher />
        <BooksList books={books!} />
        <Pagination pagination={pagination!} />
      </BooksStyle>
    </>
  )
}

export default Books

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`
