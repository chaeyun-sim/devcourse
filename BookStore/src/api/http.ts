import { getToken, removeToken } from '@/store/authStore'
import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = 'http://localhost:9999'
const DEFAULT_TIMEOUT = 30000

export const createClient = (config: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken() || ''
    },
    withCredentials: true,
    ...config
  })

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        removeToken()
        window.location.href = '/login'
        return
      }
      return Promise.reject(error)
    }
  )

  return axiosInstance
}

export const httpClient = createClient({})
