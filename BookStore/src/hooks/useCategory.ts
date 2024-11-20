import { fetchCategory } from '@/api/category.api'
import { Category } from '@/model/category.model'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {useQuery} from "@tanstack/react-query"

export const useCategory = () => {
  const location = useLocation()
  const [activeCategories, setActiveCategories] = useState<Category[]>([])

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategory,
  })

  const setActive = () => {
    const params = new URLSearchParams(location.search)
    const categoryId = params.get('category_id')
    const activeId = categoryId ? Number(categoryId) : null

    if (categories) {
      setActiveCategories(
        categories.map((item) => ({
          ...item,
          isActive: item.id === activeId
        }))
      )
    }
  }

  useEffect(() => {
    if (categories) {
      setActiveCategories(categories)
      setActive()
    }
  }, [categories])

  useEffect(setActive, [location.search])

  return { category: activeCategories }
}