export interface Book {
  id: number
  title: string
  img: number
  category_id: number
  form: string
  isbn: string
  summary: string
  detail: string
  auto: string
  pages: number
  content: string
  price: number
  likes: number
  pubDate: string
}

export interface BookDetail extends Book {
  categoryName: string
  liked: boolean
}