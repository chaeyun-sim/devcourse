import { OrderListItem, OrderSheet } from '@/model/order.model';
import { requestHandler } from './http';

export const order = async (orderData: OrderSheet) => {
	return requestHandler('post', '/orders', orderData)
}

export const fetchOrders = async () => {
	return requestHandler<OrderListItem[]>('get', '/orders')
}

export const fetchOrder = async (orderId: number) => {
	return requestHandler('get', `/orders/${orderId}`)
}