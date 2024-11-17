import { useBook } from '@/hooks/useBook';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../common/Title';
import { getImgSrc } from '@/utils/image';
import { BookDetail as IBookDetail } from '@/model/book.model';
import dayjs from 'dayjs';
import EllipsisBox from './EllipsisBox';
import LikeButton from '../book/LikeButton';
import AddToCart from '../book/AddToCart';

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

const BookDetail = () => {
	const { bookId } = useParams();
	const { book, likeToggle } = useBook(bookId!);

	if (!book) return null

	return (
    <BookDetailStyle>
      <header className="header">
        <div>
          <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>
          {bookInfoList.map((info) => (
            <dl key={info.key}>
              <dt>{info.label}</dt>
              <dd>{info.filter ? info.filter(book) : book[info.key as keyof IBookDetail]}</dd>
            </dl>
          ))}
          <p className="summary">
            <div className="like">라이크</div>
            <div className="add-cart">장바구니 넣기</div>
          </p>
          <div className="like">
            <LikeButton book={book} onClick={likeToggle} />
          </div>
          <div className="add-cart">
            <AddToCart book={book} />
          </div>
        </div>
      </header>
      <div className="content">
        <Title size="medium">상세 설명</Title>
        <EllipsisBox linelimit={2}>{book.detail}</EllipsisBox>
        <Title size="medium">목차</Title>
        <p className="index">{book.content}</p>
      </div>
    </BookDetailStyle>
  )
};

export default BookDetail;

const BookDetailStyle = styled.div`
	.header {
		display: flex;
		align-items: start;
		gap: 24px;
		padding: 0 0 24px 0;
	}

	.img {
		flex: 1,
		img {
			width: 100%;
			height: auto;
		}
	}

	.info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 12px;

		dl {
			display: flex;
			margin: 0;

			dt {
				width: 80px;
				color: ${({theme}) => theme.color.secondary}
			}
		}
	}

	.content {
	}
`