import Button from '@/components/common/Button';
import Title from '@/components/common/Title';
import { useOrders } from '@/hooks/useOrders';
import dayjs from 'dayjs';
import React, { Fragment } from 'react';
import styled from 'styled-components';

const thList = ['id', '주문일자', '주소', '수령인', '전화번호', '대표상품명', '수량', '금액']

const OrderList = () => {
	const { orders, selectedItemId, selectOrderItem } = useOrders()

	return (
    <>
      <Title size="large">주문 내역</Title>
      <OrderListStyle>
        <table>
          <thead>
            <tr>
              {thList.map((item) => (
                <th key={item}>{item}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <Fragment key={order.id}>
                <tr>
                  <td>{order.id}</td>
                  <td>{dayjs(order.createdAt).format('YYYY.MM.DD')}</td>
                  <td>{order.address}</td>
                  <td>{order.receiver}</td>
                  <td>{order.contact}</td>
                  <td>{order.bookTitle}</td>
                  <td>{order.totalQuantity}권</td>
                  <td>{order.totalPrice.toLocaleString()}원</td>
                  <td>
                    <Button size="small" scheme="normal" onClick={() => selectOrderItem(order.id)}>
                      자세히
                    </Button>
                  </td>
                </tr>
                {order?.detail && selectedItemId === order.id && (
                  <tr>
                    <td></td>
                    <td colSpan={8}>
                      <ul className="detail">
                        {order.detail?.map((item) => (
                          <li key={item.bookId}>
                            <div>
                              <span>{item.bookId}</span>
                              <span>{item.author}</span>
                              <span>{item.price.toLocaleString()}원</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </OrderListStyle>
    </>
  )
};

export default OrderList;

const OrderListStyle = styled.div`
  padding: 24px 0 0 0;

  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};

    th,
    td {
      padding: 14px;
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
      text-align: center;
    }

    .detail {
      margin: 0;
      li {
        list-style: square;
				text-align: center;
        div {
          display: flex;
          padding: 8px 12px;
					gap: 8px;
        }
      }
    }
  }
`