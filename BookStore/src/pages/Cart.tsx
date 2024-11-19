import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import Button from '@/components/common/Button';
import Empty from '@/components/common/Empty';
import Title from '@/components/common/Title';
import { useAlert } from '@/hooks/useAlert';
import { useCart } from '@/hooks/useCart';
import { OrderSheet } from '@/model/order.model';
import React, { useMemo, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Cart = () => {
  const navigate = useNavigate();
  const { carts, deleteCartItem, isEmpty } = useCart()
  const { showAlert, showConfirm } = useAlert();
  const [checkedItems, setCheckedItems] = useState<number[]>([])

  const handleCheckItem = (cartId: number) => {
    if (checkedItems.includes(cartId)) {
    } else {
      setCheckedItems([...checkedItems, cartId])
    }
  }

  const totalQuantity = useMemo(() => {
    return carts?.reduce((acc, cur) => {
      if (checkedItems.includes(cur.id)) {
        return acc + cur.quantity
      }
      return acc
    }, 0)
  }, [carts, checkedItems])

  const totalPrice = useMemo(() => {
    return carts?.reduce((acc, cur) => {
      if (checkedItems.includes(cur.id)) {
        return acc + cur.price * cur.quantity
      }
      return acc
    }, 0)
  }, [carts, checkedItems])

  const handleOerder = () => {
    if (!checkedItems.length) {
      return showAlert('주문할 상품을 선택해 주세요.')
    }

    const orderData: Omit<OrderSheet, 'delivery'> = {
      items: checkedItems,
      totalPrice: totalPrice as number,
      totalQuantity: totalQuantity as number,
      firstBookTitle: carts?.[0].title as string
    }

    showConfirm('주문하시겠습니까?', () => {
      navigate('/order', { state: orderData })
    })
  }

  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        {isEmpty ? (
          <Empty
            title="장바구니가 비었습니다."
            description={<>장바구니를 채워보세요.</>}
            icon={<FaShoppingCart />}
          />
        ) : (
          <>
            <div className="content">
              {carts?.map((cart) => (
                <CartItem
                  key={cart.id}
                  cart={cart}
                  checkedItems={checkedItems}
                  onCheck={handleCheckItem}
                  onDelete={deleteCartItem}
                />
              ))}
            </div>
            <div className="summary">
              <CartSummary totalQuantity={totalQuantity!} totalPrice={totalPrice!} />
              <Button size="large" scheme="primary" onClick={handleOerder}>
                주문하기
              </Button>
            </div>
          </>
        )}
      </CartStyle>
    </>
  )
};

export default Cart;

export const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .order-info {
    h1 {
      padding: 0 0 24px 0;
    }

    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;
  }

  .delivery {
    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 12px 0;
      display: flex;
      justify-content: start;
      gap: 8px;

      label {
        width: 80px;
      }

      .input {
        flex: 1;
        input {
          width: 100%;
        }
      }
    }
    
    .error-text {
      color: red;
      margin: 0;
      padding: 0 0 12px 0;
      text-align: right;
    }
  }
`