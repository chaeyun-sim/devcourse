import { Cart } from '@/model/cart.model';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Title from '../common/Title';
import Checkbox from './Checkbox';
import { useAlert } from '@/hooks/useAlert';

interface Props {
  cart: Cart
  checkedItems: number[]
  onCheck: (value: number) => void
  onDelete: (value: number) => void
}

const CartItem = ({ cart, checkedItems, onCheck, onDelete }: Props) => {
  const { showConfirm } = useAlert();

  const isChecked = useMemo(() => {
    return checkedItems.includes(cart.id)
  }, [checkedItems, cart.id])

  const handleDelete = () => {
    showConfirm('정말 삭제하시겠습니까?', () => onDelete(cart.id))
  }

  return (
    <CartItemStyle>
      <div className="info">
        <div className="check">
          <Checkbox isChecked={isChecked} onCheck={() => onCheck(cart.id)} />
        </div>
        <div>
          <Title size="medium">{cart.title}</Title>
          <p className="summary">{cart.summary}</p>
          <p className="primary">{cart.price.toLocaleString()}원</p>
          <p className="quantity">{cart.quantity}권</p>
        </div>
      </div>
      <Button size="medium" scheme="normal" onClick={handleDelete}>
        장바구니 삭제
      </Button>
    </CartItemStyle>
  )
}

export default CartItem;

const CartItemStyle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: start;
	border: 1px solid ${({ theme }) => theme.color.border};
	border-radius: ${({ theme }) => theme.borderRadius.default};
	padding: 12px;

  .info {
    display: flex;
    align-items: start;
    flex: 1;

    .check {
      width: 24px;
      flex-shrink: 0;
    }
  }

  p {
    padding: 0 0 8px 0;
    margin: 0;
  }
`