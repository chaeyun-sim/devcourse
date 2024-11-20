import { httpClient } from './http'

export const fetchCategory = async () => {
  const response = await httpClient.get('/category')

  if (response.data) {
    return [{ id: null, name: '전체' }, ...response.data]
  } else {
    return []
  }
}
