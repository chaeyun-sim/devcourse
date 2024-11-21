import { fetchBanners } from '@/api/banner.api';
import { fetchBestBooks, fetchBooks } from '@/api/book.api';
import { fetchReviewAll } from '@/api/review.api';
import { Banner } from '@/model/banner.model';
import { Book } from '@/model/book.model';
import { BookReviewItem } from '@/model/review.model';
import { useEffect, useState } from 'react';

export const useMain = () => {
	const [reviews, setReviews] = useState<BookReviewItem[]>([])
	const [newBooks, setNewBooks] = useState<Book[]>([])
	const [bestBooks, setBestBooks] = useState<Book[]>([])
	const [banners, setBanners] = useState<Banner[]>([])

	useEffect(() => {
		fetchReviewAll().then(setReviews)

		fetchBooks({
      category_id: undefined,
      news: true,
      currentPage: 1,
      limit: 4
		}).then((res) => setNewBooks(res.books))
		
		fetchBestBooks().then(setBestBooks)

		fetchBanners().then(setBanners)
	}, [])

	return { reviews, newBooks, bestBooks, banners }
}