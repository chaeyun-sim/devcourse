import { fetchCategory } from '@/api/category.api'
import { Category } from '@/model/category.model'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const useCategory = () => {
  const location = useLocation()
  const [category, setCategory] = useState<Category[]>([])

  const setActive = () => {
    const params = new URLSearchParams(location.search)
    const categoryId = params.get('category_id')
    const activeId = categoryId ? Number(categoryId) : null

    setCategory((prev) => {
      return prev.map((item) => ({
        ...item,
        isActive: item.id === activeId
      }))
    })
  }

  useEffect(() => {
    fetchCategory().then((res) => {
      if (!category) return null

      const categoryWithAll = [{ id: null, name: '전체' }, ...res]
      setCategory(categoryWithAll)
      setActive()
    })
  }, [])

  useEffect(setActive, [location.search])

  return { category }
}
