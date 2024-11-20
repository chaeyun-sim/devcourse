import { deleteCart, fetchCart } from '@/api/cart.api'
import { queryClient } from '@/api/queryClient'
import { Cart } from '@/model/cart.model'
import {useMutation, useQuery} from "@tanstack/react-query"

export const useCart = () => {
	const { data: carts } = useQuery<Cart[]>({
    queryKey: ['carts'],
    queryFn: fetchCart
  })

	const { mutate: deleteCartItem } = useMutation({
    mutationKey: ['delete-cart'],
    mutationFn: (id: number) => deleteCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] })
    }
  })


	return {
		carts,
		deleteCartItem,
		isEmpty: !carts
	}
}