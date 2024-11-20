import { fetchBook, likeBook, unlikeBook } from '@/api/book.api'
import { BookDetail } from '@/model/book.model'
import { useAuthStore } from '@/store/authStore'
import { useEffect, useState } from 'react'
import { useAlert } from './useAlert'
import { addCart } from '@/api/cart.api'
import { BookReviewItem, BookReviewItemWrite } from '@/model/review.model'
import { fetchAddReview, fetchBookReview } from '@/api/review.api'

export const useBook = (bookId: string) => {
	const { isLoggedIn } = useAuthStore()
	const { showAlert } = useAlert()
	
	const [book, setBook] = useState<BookDetail | null>(null)
	const [cartAdded, setCartAdded] = useState(false)
	const [reviews, setReviews] = useState<BookReviewItem[]>([])

	useEffect(() => {
		if (!bookId) return;

		fetchBook(bookId).then(setBook)
		fetchBookReview(bookId).then(setReviews)
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
	
	const addReview = (data: BookReviewItemWrite) => {
		if (!book) return;

		fetchAddReview(String(bookId), data).then(() => {
      fetchBookReview(bookId).then(setReviews)
    })
	}


	return { book, reviews, likeToggle, addToCart, cartAdded, addReview }
}