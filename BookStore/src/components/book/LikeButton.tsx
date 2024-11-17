import { BookDetail } from '@/model/book.model';
import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { FaHeart } from 'react-icons/fa';

interface Props {
	book: BookDetail;
	onClick: () => void;
}

const LikeButton = ({book}: Props) => {
	return (
    <LikeButtonStyle size="medium" scheme={book.liked ? 'like' : 'normal'}>
      <FaHeart /> {book.likes}
    </LikeButtonStyle>
  )
}

export default LikeButton;

const LikeButtonStyle = styled(Button)`
	display: flex;
	gap: 6px;
	
	svg {
		color: inherit;
		* {
			color: inherit;
		}
	}
`