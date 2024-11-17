import { useSearchParams } from 'react-router-dom'

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleSearchParams = (key: string, value: string, doDelete?: boolean) => {
    const newSearchParams = new URLSearchParams(searchParams)

    if (!value && doDelete) return newSearchParams.delete(key)
    newSearchParams.set(key, value)
    setSearchParams(newSearchParams)
  }

  const hasKey = (key: string) => searchParams.get(key)

  return { handleSearchParams, hasKey }
}
