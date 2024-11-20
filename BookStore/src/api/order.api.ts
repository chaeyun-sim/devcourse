import { OrderDetailItem, OrderListItem, OrderSheet } from '@/model/order.model';
import { requestHandler } from './http';

export const order = async (orderData: OrderSheet) => {
	return await requestHandler('post', '/orders', orderData)
}

export const fetchOrders = async () => {
	return await requestHandler<OrderListItem[]>('get', '/orders')
}

export const fetchOrder = async (orderId: number) => {
	return await requestHandler<OrderDetailItem>('get', `/orders/${orderId}`)
}