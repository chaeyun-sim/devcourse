import { useBook } from '@/hooks/useBook'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Title from '../common/Title'
import { getImgSrc } from '@/utils/image'
import { BookDetail as IBookDetail } from '@/model/book.model'
import dayjs from 'dayjs'
import EllipsisBox from './EllipsisBox'
import LikeButton from '../book/LikeButton'
import AddToCart from '../book/AddToCart'
import BookReview from '../book/BookReview'
import { Tab, Tabs } from '../common/Tabs'
import Modal from '../common/Modal'

const bookInfoList = [
  {
    label: '카테고리',
    key: 'categoryName',
    filter: (book: IBookDetail) => (
      <Link to={`/book?category_id=${book.category_id}`}>{book.categoryName}</Link>
    )
  },
  {
    label: '포맷',
    key: 'form'
  },
  {
    label: '페이지',
    key: 'pages'
  },
  {
    label: 'ISBN',
    key: 'isbn'
  },
  {
    label: '출간일',
    key: 'pubDate',
    filter: (book: IBookDetail) => dayjs(book.pubDate).format('YYYY년 MM월 DD일')
  },
  {
    label: '가격',
    key: 'price',
    filter: (book: IBookDetail) => `${book.price.toLocaleString()}원`
  }
]

function BookDetail() {
  const { bookId } = useParams()
  const { book, likeToggle, reviews, addReview } = useBook(bookId!)
  const [isImgOpen, setIsImgOpen] = useState(false)

  if (!book) return null

  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img" onClick={() => setIsImgOpen(true)}>
          <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <Modal isOpen={isImgOpen} onClose={() => setIsImgOpen(false)}>
          <img src={getImgSrc(book.img)} alt={book.title} />
        </Modal>
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>
          {bookInfoList.map((item) => (
            <dl>
              <dt>{item.label}</dt>
              <dd>{item.filter ? item.filter(book) : book[item.key as keyof IBookDetail]}</dd>
            </dl>
          ))}
          <p className="summary">{book.summary}</p>

          <div className="like">
            <LikeButton book={book} onClick={likeToggle} />
          </div>

          <div className="add-cart">
            <AddToCart book={book} />
          </div>
        </div>
      </header>
      <div className="content">
        <Tabs>
          <Tab title="상세 설명">
            <Title size="medium">상세 설명</Title>
            <EllipsisBox linelimit={4}>{book.detail}</EllipsisBox>
          </Tab>
          <Tab title="목차">
            <Title size="medium">목차</Title>
            <p className="index">{book.content}</p>
          </Tab>
          <Tab title="리뷰">
            <Title size="medium">리뷰</Title>
            <BookReview reviews={reviews} onAdd={addReview} />
          </Tab>
        </Tabs>
      </div>
    </BookDetailStyle>
  )
}

const BookDetailStyle = styled.div`
  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;

    .img {
      flex: 1;
      img {
        width: 100%;
        height: auto;
      }
    }
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  dl {
    display: flex;
    margin: 0;
    dt {
      width: 80px;
      color: ${({ theme }) => theme.color.secondary};
    }
    a {
      color: ${({ theme }) => theme.color.primary};
    }
  }

  .content {
    // .detail {
    //   overflow: hidden;
    //   text-overflow: ellipsis;
    //   display: -webkit-box;
    //   -webkit-line-clamp: 4;
    //   -webkit-box-orient: vertical;
    // }
  }
`

export default BookDetail