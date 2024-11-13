import { fetchCategory } from '@/api/category.api'
import { Category } from '@/model/category.model'
import { useEffect, useState } from 'react'

export const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([])

  useEffect(() => {
    fetchCategory().then((res) => {
      if (!category) return null

      const categoryWithAll = [{ id: null, name: '전체' }, ...res]
      setCategory(categoryWithAll)
    })
  }, [])

  return { category }
}
