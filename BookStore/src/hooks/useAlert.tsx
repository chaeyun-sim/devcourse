import { useCallback } from 'react'

export const useAlert = () => {
  const showAlert = useCallback((message: string) => {
    alert(message)
  }, [])

  return showAlert
}
