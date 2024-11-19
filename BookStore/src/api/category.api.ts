import { requestHandler } from './http'

export const fetchCategory = async () => {
  return requestHandler('get', '/category')
}
