import { Cart } from '@/model/cart.model';
import { requestHandler } from './http'

interface AddCartParams {
	book_id: number;
	quantity: number;
}

export const addCart = async (params: AddCartParams) => {
  return requestHandler('post', '/carts', params)
}

export const fetchCart = async () => {
	return requestHandler<Cart[]>('get', '/carts')
}

export const deleteCart = async (cartId: number) => {
	return requestHandler('delete', `/carts/${cartId}`)
}