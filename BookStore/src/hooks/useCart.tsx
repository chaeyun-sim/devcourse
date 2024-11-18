import { deleteCart, fetchCart } from '@/api/cart.api'
import { Cart } from '@/model/cart.model'
import { useEffect, useState } from 'react'

export const useCart = () => {
	const [carts, setCarts] = useState<Cart[]>([])
	const [isEmpty, setIsEmpty] = useState(true)

	const deleteCartItem = (id: number) => {
		deleteCart(id).then(() => {
			setCarts(carts.filter(cart => cart.id !== id))
		})
	}

	useEffect(() => {
		fetchCart().then(res => {
			setCarts(res)
			setIsEmpty(false)
		})
	}, [])


	return { carts, deleteCartItem, isEmpty }
}