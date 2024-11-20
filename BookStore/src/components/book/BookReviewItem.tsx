import { BookReviewItem as IBookReviewItem } from '@/model/review.model'
import dayjs from 'dayjs';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

interface Props {
  review: IBookReviewItem
}

const Star = ({score}: Pick<IBookReviewItem, 'score'>) => {
	return (
    <span className="star">
      {Array.from({ length: score }, (_, i) => (
        <FaStar />
      ))}
    </span>
  )
};

const BookReviewItem = ({ review }: Props) => {
	return (
    <BookReviewItemStyles>
      <header className="header">
        <div>
          <span>{review.userName}</span>
					<Star score={review.score} />
        </div>
        <div>{dayjs(review.createdAt).format('YYYY.MM.DD')}</div>
      </header>
      <div className="content">
        <p>{review.content}</p>
      </div>
    </BookReviewItemStyles>
  )
}

export default BookReviewItem;

const BookReviewItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 00 4px rgba(0, 0, 0, 0.2);
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;

    .star {
      padding: 0 0 0 8px;
      svg {
        fill: ${({ theme }) => theme.color.primary};
      }
    }

    .content {
      p {
        font-size: 1rem;
        line-height: 1.5;
        margin: 0;
      }
    }
  }
`