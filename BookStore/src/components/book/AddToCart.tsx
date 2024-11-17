import { BookDetail } from '@/model/book.model';
import React, { useState } from 'react';
import styled from 'styled-components';
import InputText from '../common/Input';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { useBook } from '@/hooks/useBook';

interface Props {
	book: BookDetail;
}

const AddToCart = ({ book }: Props) => {
	const [quantity, setQuantity] = useState(0)
	const { addToCart, cartAdded } = useBook(book.id.toString())

	const handleIncrease = () => setQuantity((prev) => prev + 1)
	const handleDecrease = () => {
		if (quantity === 1) return;
		setQuantity((prev) => prev - 1)
	}


	return (
    <AddToCartStyle added={cartAdded}>
      <InputText
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <Button size="medium" scheme="normal" onClick={handleIncrease}>
        +
      </Button>
      <Button size="medium" scheme="normal" onClick={handleDecrease}>
        -
      </Button>
      <Button size="medium" scheme="primary" onClick={() => addToCart(quantity)}>
        장바구니 담기
      </Button>
      <div className="added">
        <p>장바구니에 추가되었습니다.</p>
        <Link to={'/cart'}>장바구니로 이동</Link>
      </div>
    </AddToCartStyle>
  )
}

export default AddToCart;

const AddToCartStyle = styled.div<{added: boolean}>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	transition: all 0.5s ease;

	.added {
		position: absolute;
		right: 0;
		bottom: -90px;
		background: ${({ theme }) => theme.color.background};
		border-radius: ${({ theme }) => theme.borderRadius.default};
		padding: 8px 12px;
		opacity: ${({added}) => added ? 1 : 0}

		p {
			padding: 0 0 8px 0;
			margin: 0;
		}
	}
`