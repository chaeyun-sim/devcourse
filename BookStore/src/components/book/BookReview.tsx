import { BookReviewItemWrite, BookReviewItem as IBookReviewItem } from '@/model/review.model'
import React from 'react';
import styled from 'styled-components';
import BookReviewItem from './BookReviewItem';
import BookReviewAdd from './BookReviewAdd';

interface Props {
  reviews: IBookReviewItem[]
	onAdd: (data: BookReviewItemWrite) => void;
}

const BookReview = ({ reviews, onAdd }: Props) => {
  return (
    <BookReviewStyle>
      <BookReviewAdd onAdd={onAdd} />
      {reviews.map((review) => (
        <BookReviewItem key={review.id} review={review} />
      ))}
    </BookReviewStyle>
  )
}

export default BookReview;

const BookReviewStyle = styled.div`

`