import { Book } from '@/model/book.model';
import React from 'react';
import styled from 'styled-components';
import BookBestItem from '../books/BookBestItem';

interface Props {
	books: Book[]
}

const MainBestBooks = ({books}: Props) => {
	return (
		<MainBestBookStyle>
			{books.map((book, index) => (
				<BookBestItem key={book.id} book={book} itemIndex={index} />
			))}
		</MainBestBookStyle>
	);
};

export default MainBestBooks;

const MainBestBookStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  @media screen AND (${({ theme }) => theme.mediaQuery.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`