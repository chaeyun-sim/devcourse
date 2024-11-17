import { Book } from '@/model/book.model'
import { getImgSrc } from '@/utils/image'
import React from 'react'
import { FaHeart } from 'react-icons/fa'
import styled from 'styled-components'
import { ViewMode } from './BooksViewSwitcher'

interface IProps {
  book: Book
  view?: ViewMode
}

const BookItem = ({ book, view }: IProps) => {
  return (
    <BookItemStyle view={view}>
      <div className="img">
        <img src={getImgSrc(book.id)} alt={book.title} />
      </div>
      <div className="content">
        <h2 className="title">{book.title}</h2>
        <p className="summary">{book.summary}</p>
        <p className="author">{book.author}</p>
        <p className="price">{book.price.toLocaleString()}원</p>
        <div className="liked">
          <FaHeart />
          <span>{book.likes}</span>
        </div>
      </div>
    </BookItemStyle>
  )
}

export default BookItem

const BookItemStyle = styled.div<Pick<IProps, 'view'>>`
  display: flex;
  flex-direction: ${({ view }) => (view === 'grid' ? 'column' : 'row')};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);

  .img {
    border-radius: ${({ theme }) => theme.borderRadius.default};
    overflow: hidden;
    width: ${({ view }) => (view === 'grid' ? 'auto' : '160px')};
    img {
      max-width: 100%;
    }
  }

  .content {
    padding: 16px;
    position: relative;
    flex: ${({ view }) => (view === 'grid' ? 0 : 1)};

    .title {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 0 12px 0;
    }

    .summary {
      font-size: 0.075rem;
      color: ${({ theme }) => theme.color.secondary};
      margin: 0 0 4px 0;
    }

    .author {
      font-size: 0.075px;
      color: ${({ theme }) => theme.color.secondary};
      margin: 0 0 4px 0;
    }

    .price {
      font-size: 1rem;
      color: ${({ theme }) => theme.color.secondary};
      margin: 0 0 4px 0;
      font-weight: 700;
    }

    .likes {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.075rem;
      color: ${({ theme }) => theme.color.primary};
      margin: 0 0 4px 0;
      font-weight: 700;
      border: 1px solid ${({ theme }) => theme.color.border};
      border-radius: ${({ theme }) => theme.borderRadius.default};
      padding: 4px 12px;
      position: absolute;
      bottom: 14px;
      right: 14px;

      svg {
        color: ${({ theme }) => theme.color.primary};
      }
    }
  }
`