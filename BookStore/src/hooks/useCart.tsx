import { deleteCart, fetchCart } from '@/api/cart.api'
import { queryClient } from '@/api/queryClient'
import { Cart } from '@/model/cart.model'
import {useMutation, useQuery} from 'react-query'

export const useCart = () => {
	const { data: carts } = useQuery<Cart[]>(['carts'], fetchCart)
	const { mutate: deleteCartItem } = useMutation(
		['delete-cart'],
		(id: number) => deleteCart(id),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['cart'])
			}
		}
	)


	return {
		carts,
		deleteCartItem,
		isEmpty: !carts
	}
}