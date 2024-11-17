import { fetchBook, likeBook, unlikeBook } from '@/api/book.api'
import { BookDetail } from '@/model/book.model'
import { useAuthStore } from '@/store/authStore'
import { useEffect, useState } from 'react'
import { useAlert } from './useAlert'
import { addCart } from '@/api/cart.api'

export const useBook = (bookId: string) => {
	const [book, setBook] = useState<BookDetail | null>(null)
	const [cartAdded, setCartAdded] = useState(false)
	const { isLoggedIn } = useAuthStore()		
	const showAlert = useAlert();

	useEffect(() => {
		if (!bookId) return;

    fetchBook(bookId).then(setBook)
	}, [bookId])
	
	const likeToggle = () => {
		if (!isLoggedIn) {
			showAlert('로그인이 필요합니다.')
			return;
		}

		if (!book) return;

		const updateBookLikes = (liked: boolean) => {
      setBook({
        ...book,
        liked,
        likes: book.likes + (liked ? 1 : -1)
      })
    }

    if (book.liked) {
      unlikeBook(bookId).then(() => updateBookLikes(false))
    } else {
      likeBook(bookId).then(() => updateBookLikes(true))
    }
	}

	const addToCart = (quantity: number) => {
    if (!book) return

    addCart({
      book_id: book.id,
      quantity: quantity
    }).then(() => {
      setCartAdded(true)
      setTimeout(() => {
        setCartAdded(false)
      }, 3000)
    })
  }


	return { book, likeToggle, addToCart, cartAdded }
}