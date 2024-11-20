import { fetchOrder, fetchOrders } from '@/api/order.api';
import { OrderListItem } from '@/model/order.model'
import { useEffect, useState } from 'react'

export const useOrders = () => {
	const [orders, setOrders] = useState<OrderListItem[]>([]);
	const [selectedItemId, setSelectedItemId] = useState<number | null>(null)

	useEffect(() => {
		fetchOrders().then(order => setOrders(order))
	}, [])

	const selectOrderItem = (orderId: number) => {
		if (orders.filter(item => item.id === orderId)[0].detail) {
			return setSelectedItemId(orderId)
		}

		fetchOrder(orderId).then((orderDetail) => {
			setSelectedItemId(orderId)
			setOrders(
				orders.map((item) => {
					if (item.id === orderId) {
						return {
							...item,
							detail: [orderDetail]
						}
					}
					return item
				})
			)
		})
	}

	return { orders, selectedItemId, selectOrderItem }
}