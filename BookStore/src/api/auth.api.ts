import { FormData } from '@/pages/Signup'
import { httpClient } from './http'

export const signup = async (userData: FormData) => {
  const response = await httpClient.post('/users/join', userData)
  return response.data
}
